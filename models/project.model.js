const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    id: Number,
    date: {
      type: Date,
      default: Date.now,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      max: 32,
    },
    description: {
      type: String,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    tags: {
      type: [String],
    },
    projectType: {
      type: [String],
    },
    links: {
      git: {
        type: String,
      },
      demo: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = Project = mongoose.model('project', ProjectSchema);
