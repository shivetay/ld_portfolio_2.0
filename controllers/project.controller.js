const Project = require('../models/Project.model');
const User = require('../models/user.model');

/* Create project with creator */

/* get all projects */

exports.read = async (req, res) => {
  try {
    const project = await Project.find();
    return res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* get one project */

exports.getProject = async (req, res) => {
  try {
    return res.json(req.project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Porject not found' });
    }
    res.status(500).send('Server Error');
  }
};

/* create projects */
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

/* update projects */

exports.update = async (req, res) => {
  const _id = req.params.projectId;
  try {
    const project = await Project.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.send(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* push project to proper user */
exports.addProjectToUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    await user.populate('projects').execPopulate();
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* find project by id */

exports.findProjectById = async (req, res, next) => {
  const _id = req.params.projectId;
  try {
    let project = await Project.findById(_id);
    if (!project) return res.status(400).json({ msg: 'Porject not found' });
    req.project = project;
    next();
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Porject not found' });
    }
    res.status(500).send('Server Error');
  }
};
