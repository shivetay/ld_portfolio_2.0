const Project = require('../models/Project.model');

exports.create = async (req, res) => {
  const { title, description, photo, tags, git, demo } = req.body;

  try {
    const payload = {
      title,
      description,
      tags,
      creator: req.user,
    };
    const project = new Project(payload);
    await project.save();
    return res.json(project);
  } catch (err) {}
};
