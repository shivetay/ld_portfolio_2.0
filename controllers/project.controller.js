const Project = require('../models/Project.model');

/* Create project with creator */

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

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
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* push project to proper user */
exports.addProjectToUser = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
