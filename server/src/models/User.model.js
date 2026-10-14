import mongoose from 'mongoose';

export const ROLES = [
  'guest', 'buyer', 'owner', 'investor', 'host', 'agent', 'admin', 'super_admin'
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
      default: null,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    roles: {
      type: [String],
      enum: ROLES,
      default: ['buyer'],
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    profilePhoto: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    refreshTokenHash: { type: String, select: false, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.passwordHash;
        delete ret.refreshTokenHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);


export const User = mongoose.model('User', userSchema);
