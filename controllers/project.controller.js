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
      creator: req.userProf._id,
    };
    const project = new Project(payload);
    await project.save();
    console.log(project.createor);
    return res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

/* update projects */

// exports.update = async (req, res) => {
//   try {
//     let project = await Project.findByIdAndUpdate(req.project._id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     console.log('project', project);
//     if (!project) {
//       return res.status(404).json({ msg: 'No project found' });
//     }
//     console.log('creator', project.creator._id);
//     console.log('user', req.user._id);
//     if (req.user._id !== req.project.creator._id) {
//       return res.status(401).json({ msg: 'Unauthorize' });
//     }
//     console.log('proj', project);
//     return res.json(project);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

exports.update = async (req, res) => {
  const { title, description } = req.body;
  const newData = { title, description };
  console.log('body', req.body);
  console.log('new', newData);
  console.log('proj', req.params.projectId);
  console.log('user id', req.user._id);
  try {
    let project = await Project.findById(req.params.projectId);
    console.log('creator proj', project);
    console.log('creator id', req.user._id);
    // if (!project) {
    //   return res.status(404).json({ msg: 'No project found' });
    // }
    if (project.creator._id !== req.user._id) {
      return res.status(401).json({ msg: 'wrong creator' });
    }
    console.log('creator', project.creator._id);
    console.log('user', req.user._id);
    // if (req.user._id !== req.project.creator._id) {
    //   return res.status(401).json({ msg: 'Unauthorize' });
    // }
    console.log('proj', project);
    // return res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// /* push project to proper user */
exports.addProjectToUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userProf._id);
    await user.populate('projects').execPopulate();
    console.log('user projects', user.projects);
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
