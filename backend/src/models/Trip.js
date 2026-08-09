const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      index: true,
    },
    destinationName: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
      minlength: [2, 'Destination must be at least 2 characters'],
      maxlength: [200, 'Destination cannot exceed 200 characters'],
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
      minlength: [3, 'Trip title must be at least 3 characters'],
      maxlength: [150, 'Trip title cannot exceed 150 characters'],
    },
    summary: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Summary cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['draft', 'planned', 'active', 'completed', 'cancelled', 'archived'],
      default: 'planned',
    },
    travelType: {
      type: String,
      enum: ['solo', 'couple', 'family', 'friends', 'business', 'adventure', 'luxury'],
      default: 'solo',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    budget: {
      type: Number,
      default: 0,
      min: [0, 'Budget cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true,
    },
    travelers: {
      type: Number,
      default: 1,
      min: [1, 'Travelers must be at least 1'],
    },
    accommodation: {
      type: String,
      trim: true,
      default: 'hotel',
    },
    foodPreference: {
      type: String,
      trim: true,
      default: 'local cuisine',
    },
    interests: [{ type: String, trim: true, maxlength: 100 }],
    transportationPreference: { type: String, trim: true, default: '' },
    itinerary: [
      {
        day: { type: Number, required: true, min: 1 },
        title: { type: String, trim: true, default: '' },
        summary: { type: String, trim: true, default: '' },
        date: { type: String, trim: true, default: '' },
        activities: [{ time: { type: String, trim: true }, title: { type: String, trim: true }, description: { type: String, trim: true } }],
        notes: { type: String, trim: true, default: '' },
      },
    ],
    hotelSuggestions: [
      {
        name: { type: String, trim: true, default: '' },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        pricePerNight: { type: Number, default: 0, min: 0 },
        city: { type: String, trim: true, default: '' },
        notes: { type: String, trim: true, default: '' },
      },
    ],
    weatherSnapshot: {
      city: { type: String, trim: true, default: '' },
      temperature: { type: Number, default: 0 },
      condition: { type: String, trim: true, default: '' },
      source: { type: String, trim: true, default: 'openweather' },
    },
    budgetPlan: { accommodation: Number, food: Number, transportation: Number, activities: Number, miscellaneous: Number, totalEstimated: Number },
    travelTips: [{ type: String, trim: true }],
    packingSuggestions: [{ type: String, trim: true }],
    bestTime: { type: String, trim: true, default: '' },
    importantNotes: [{ type: String, trim: true }],
    personalizedRecommendations: [{ type: String, trim: true }],
    aiPrompt: {
      type: String,
      trim: true,
      default: '',
    },
    generatedFrom: {
      type: String,
      enum: ['manual', 'ai', 'template'],
      default: 'manual',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
      min: [0, 'View count cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.index({ userId: 1, status: 1, startDate: 1 });
tripSchema.index({ destinationId: 1, status: 1 });
tripSchema.index({ isPublic: 1, createdAt: -1 });

tripSchema.pre('validate', function validateTripDates() {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    this.invalidate('endDate', 'End date must be on or after start date');
  }
});

module.exports = mongoose.model('Trip', tripSchema);
