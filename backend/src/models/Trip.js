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
      required: [true, 'Destination reference is required'],
      index: true,
    },
    destinationName: {
      type: String,
      trim: true,
      default: '',
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
    itinerary: [
      {
        day: { type: Number, required: true, min: 1 },
        title: { type: String, trim: true, default: '' },
        summary: { type: String, trim: true, default: '' },
        activities: [{ type: String, trim: true }],
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

module.exports = mongoose.model('Trip', tripSchema);
