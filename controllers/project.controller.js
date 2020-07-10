const formidable = require('formidable');
const fs = require('fs');

const Project = require('../models/project.model');
const User = require('../models/user.model');

/* Create project with creator */

/* get all projects */

exports.read = async (req, res) => {
  try {
    let project = await Project.find();
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
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Image could not be uploaded' }] });
    }

    const { git, demo } = fields;

    fields.creator = req.user._id;

    fields.links = {};
    if (git) fields.links.git = git;
    if (demo) fields.links.demo = demo;

    let project = new Project(fields);

    //1kb = 1000
    //1mb = 1000000kb
    //name 'photo' mus match client side. use photo
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          errors: [{ msg: 'Image could not be uploaded. File to big.' }],
        });
      }
      //this relates to data in schema product
      project.photo.data = fs.readFileSync(files.photo.path);
      project.photo.contentType = files.photo.type;
    }
    project.save();
    return res.json(project);
  });
};

// exports.create2 = async (req, res) => {
//   const { title, description, photo, tags, git, demo, projectType } = req.body;

//   //get links object
//   const projectFields = {};
//   projectFields.creator = req.user._id;
//   if (title) projectFields.title = title;
//   if (title) projectFields.description = description;
//   if (photo) projectFields.photo = photo;
//   if (projectType) projectFields.projectType = projectType;
//   if (tags) {
//     projectFields.tags = tags.split(',').map((tag) => tag.trim());
//   }

//   //get links object
//   projectFields.links = {};
//   if (git) projectFields.links.git = git;
//   if (demo) projectFields.links.demo = demo;

//   try {
//     let project = new Project(projectFields);
//     await project.save();
//     return res.json(project);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

/* update projects */

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Image could not be uploaded' }] });
    }

    const { git, demo } = fields;

    fields.creator = req.user._id;

    fields.links = {};
    if (git) fields.links.git = git;
    if (demo) fields.links.demo = demo;

    let project = req.project;

    //1kb = 1000
    //1mb = 1000000kb
    //name 'photo' mus match client side. use photo
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          errors: [{ msg: 'Image could not be uploaded. File to big.' }],
        });
      }
      //this relates to data in schema product
      project.photo.data = fs.readFileSync(files.photo.path);
      project.photo.contentType = files.photo.type;
    }
    project.save();
    return res.json(project);
  });
};

// exports.update = async (req, res) => {
//   const { title, description, photo, tags, git, demo, projectType } = req.body;

//   //get links object
//   const projectFields = {};
//   if (title) projectFields.title = title;
//   if (title) projectFields.description = description;
//   if (photo) projectFields.photo = photo;
//   if (projectType) projectFields.projectType = projectType;
//   if (tags) {
//     projectFields.tags = tags.split(',').map((tag) => tag.trim());
//   }

//   //get links object
//   projectFields.links = {};
//   if (git) projectFields.links.git = git;
//   if (demo) projectFields.links.demo = demo;
//   try {
//     let project = await Project.findById(req.project._id);
//     if (!project) {
//       return res.status(404).json({ msg: 'No project found' });
//     }
//     if (project.creator._id.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ msg: 'Unauthorize' });
//     }
//     console.log('photo', photo);
//     console.log('project', project);
//     await project.save(projectFields);

//     return res.json(project);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

/* delete project */
exports.remove = async (req, res) => {
  try {
    let project = await Project.findById(req.project._id);

    if (project.creator._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Unauthorize' });
    }

    await project.remove();
    return res.status(200).json({ msg: 'Project was removed' });
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

/* show project photo */

exports.photo = async (req, res, next) => {
  try {
    if (req.project.photo.data) {
      res.set('Content-Type', req.project.photo.contentType);
      return res.send(req.project.photo.data);
    }
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

//TODO:
/* 
check for proper project update after frontend part
add file upoload for photo
*/
