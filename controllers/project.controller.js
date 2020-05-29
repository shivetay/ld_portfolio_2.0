const Project = require('../models/Project.model');
const User = require('../models/user.model');

/* Create project with creator */

exports.getAll = async (req, res) => {
  try {
    const project = await Project.find();
    return res.json(project);
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
    const user = await User.findById(req.params.userId);
    await user.populate('projects').execPopulate();
    console.log('id', user.projects);
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
