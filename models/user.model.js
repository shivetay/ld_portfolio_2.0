const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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
    password: {
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
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

UserSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.get('jwtSecret')); //jwt expcts string toString will convert objId to string

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

module.exports = User = mongoose.model('user', UserSchema);
