const { GoogleGenAI } = require('@google/genai');

const schema = { type: 'object', properties: {
  tripSummary: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } }, required: ['title', 'description'] },
  itinerary: { type: 'array', items: { type: 'object', properties: { day: { type: 'integer' }, date: { type: 'string' }, title: { type: 'string' }, activities: { type: 'array', items: { type: 'object', properties: { time: { type: 'string' }, title: { type: 'string' }, description: { type: 'string' } }, required: ['time', 'title', 'description'] } } }, required: ['day', 'date', 'title', 'activities'] } },
  budgetPlan: { type: 'object', properties: { accommodation: { type: 'number' }, food: { type: 'number' }, transportation: { type: 'number' }, activities: { type: 'number' }, miscellaneous: { type: 'number' }, totalEstimated: { type: 'number' } }, required: ['accommodation', 'food', 'transportation', 'activities', 'miscellaneous', 'totalEstimated'] },
  travelTips: { type: 'array', items: { type: 'string' } }, packingSuggestions: { type: 'array', items: { type: 'string' } }, bestTime: { type: 'string' }, importantNotes: { type: 'array', items: { type: 'string' } }, personalizedRecommendations: { type: 'array', items: { type: 'string' } },
}, required: ['tripSummary', 'itinerary', 'budgetPlan', 'travelTips', 'packingSuggestions', 'bestTime', 'importantNotes', 'personalizedRecommendations'] };

const generateTravelPlan = async (input) => {
  if (!process.env.GEMINI_API_KEY) throw Object.assign(new Error('AI trip planning is not configured'), { statusCode: 503 });
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const prompt = `
You are an AI travel planner.

Create a realistic, personalized travel itinerary using the
user's trip preferences provided below.

IMPORTANT:

The user's interests are CATEGORY-LEVEL preferences,
not specific places.

You must identify real, well-known tourist attractions
within the specified destination that match the user's
selected interests.

For example:

Destination: Hyderabad
Interests: ["Monuments", "Forts", "Lakes"]

The itinerary should contain actual relevant tourist
attractions such as:
- Charminar
- Golconda Fort
- Hussain Sagar
- Chowmahalla Palace
- Qutb Shahi Tombs

Do NOT return generic activities such as:
- "Visit a famous monument"
- "Explore a fort"
- "Visit a nearby lake"
- "Explore local attractions"

Use actual attraction/place names whenever reasonably known.

The selected attractions must be appropriate for:
- the destination
- trip duration
- number of travelers
- budget
- travel type
- user's selected interests

Prioritize attractions that strongly match the user's
selected interests.

Do not randomly invent attractions.

Do not add unrelated attractions merely to fill the itinerary.

You may organize multiple attractions into a practical
day-wise schedule.

IMPORTANT RESTRICTIONS:

Do NOT generate:
- hotels
- restaurants
- businesses
- booking links
- fake URLs
- Google Maps information
- real-time weather
- contact information
- ratings
- claims about current prices

Hotels, restaurants, maps, weather and other live information
will be handled by separate APIs later.

Budget values should be reasonable estimates based on the
provided total budget, but must not be presented as
real-time factual prices.

Make the itinerary realistic and feasible.
Avoid overcrowding too many attractions into one day.

Return ONLY valid JSON matching the provided schema.
Do not return Markdown.
Do not return explanations outside the JSON.

USER TRIP PREFERENCES:

${JSON.stringify(input, null, 2)}
`;  try {
    const response = await Promise.race([
      ai.models.generateContent({ model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite', contents: prompt, config: { responseMimeType: 'application/json', responseJsonSchema: schema } }),
      new Promise((_, reject) => setTimeout(() => reject(Object.assign(new Error('AI request timed out'), { statusCode: 504 })), 45000)),
    ]);
    const data = JSON.parse(response.text || '{}');
    if (!data.tripSummary?.title || !Array.isArray(data.itinerary) || !data.itinerary.length || !data.budgetPlan) throw Object.assign(new Error('AI returned an invalid travel plan'), { statusCode: 502 });
    return data;
  } catch (error) {
    if (error.statusCode) throw error;
    const statusCode = error.status === 429 || error.code === 429 ? 429 : 502;
    throw Object.assign(new Error(statusCode === 429 ? 'AI service is temporarily rate limited. Please try again shortly.' : 'Unable to generate a travel plan right now'), { statusCode });
  }
};
module.exports = { generateTravelPlan };
