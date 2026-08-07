const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip reference is required'],
      index: true,
    },
    provider: {
      type: String,
      enum: ['google', 'internal', 'partner'],
      default: 'internal',
    },
    providerBookingId: {
      type: String,
      trim: true,
      default: '',
    },
    serviceType: {
      type: String,
      enum: ['flight', 'hotel', 'car', 'package'],
      required: [true, 'Service type is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
