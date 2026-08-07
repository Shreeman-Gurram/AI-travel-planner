const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
      index: true,
    },
    travelStyles: [
      {
        type: String,
        enum: ['relaxing', 'adventure', 'luxury', 'budget', 'family', 'solo', 'romantic', 'foodie', 'culture', 'nature'],
        trim: true,
      },
    ],
    budgetRange: {
      min: { type: Number, default: 0, min: 0 },
      max: { type: Number, default: 10000, min: 0 },
    },
    accommodationTypes: [
      {
        type: String,
        enum: ['hotel', 'resort', 'hostel', 'apartment', 'boutique', 'villa'],
        trim: true,
      },
    ],
    foodPreferences: [
      {
        type: String,
        enum: ['local', 'fine-dining', 'street-food', 'vegetarian', 'vegan', 'seafood', 'fast-food'],
        trim: true,
      },
    ],
    preferredRegions: [
      {
        type: String,
        trim: true,
      },
    ],
    preferredDestinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
      },
    ],
    weatherPreference: {
      type: String,
      enum: ['warm', 'cool', 'mild', 'any'],
      default: 'any',
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Preference', preferenceSchema);
