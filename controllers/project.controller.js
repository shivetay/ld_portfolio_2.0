const Project = require('../models/project.model');
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

  //get links object
  const projectFields = {};
  projectFields.creator = req.user._id;
  if (title) projectFields.title = title;
  if (title) projectFields.description = description;
  if (photo) projectFields.photo = photo;
  if (tags) {
    projectFields.tags = tags.split(',').map((tag) => tag.trim());
  }

  //get links object
  projectFields.links = {};
  if (git) projectFields.links.git = git;
  if (demo) projectFields.links.demo = demo;

  try {
    let project = new Project(projectFields);
    await project.save();
    return res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* update projects */

//FIXME:
exports.update = async (req, res) => {
  const { title, description, photo, tags, git, demo } = req.body;

  //get links object
  const projectFields = {};
  if (title) projectFields.title = title;
  if (title) projectFields.description = description;
  if (photo) projectFields.photo = photo;
  if (tags) {
    projectFields.tags = tags.split(',').map((tag) => tag.trim());
  }

  //get links object
  projectFields.links = {};
  if (git) projectFields.links.git = git;
  if (demo) projectFields.links.demo = demo;
  try {
    let project = await Project.findById(req.project._id);
    if (!project) {
      return res.status(404).json({ msg: 'No project found' });
    }
    if (project.creator._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Unauthorize' });
    }
    await project.save(projectFields);

    return res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//TODO:
/* delete project */
exports.delete = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// /* push project to proper user */
exports.addProjectToUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userProf._id);
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
