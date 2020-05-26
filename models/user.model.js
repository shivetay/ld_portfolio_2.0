const mongoose = require('mongoose');
const crypto = require('crypto');
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
    tokens: {
      type: Array,
      token: [],
    },
    // salt: String,
  },
  { timestamps: true }
);

/* Virtual fields */
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = config.get('passwordSALT');
    this.hash_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      // detials of use in express documentation
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = User = mongoose.model('user', UserSchema);
