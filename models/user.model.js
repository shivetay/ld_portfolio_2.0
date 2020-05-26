const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    id: Number,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: Number,
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          requierd: true,
        },
      },
    ],
    salt: String,
  },
  { timestamps: true }
);

/* hash password before saving */
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('hash_password')) {
    user.hash_password = await bcrypt.hash(user.hash_password, 8);
  }

  next();
});

module.exports = User = mongoose.model('user', UserSchema);
