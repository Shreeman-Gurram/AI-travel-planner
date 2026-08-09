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
  const prompt = `Create a realistic personalized travel plan using these preferences: ${JSON.stringify(input)}. Generate general activities only. Do not name real hotels, restaurants, businesses, booking links, real-time weather, maps, contacts, ratings, or factual current prices. Budget values are estimates only. Keep activities relaxed and feasible.`;
  try {
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
