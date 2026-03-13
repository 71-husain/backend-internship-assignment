const express = require('express');
const {authorizeRoles} = require('../middleware/roleMiddleware');

const router = express.Router();

const {createProject,getProjects} = require('../controllers/projectController');
const {authenticate} = require('../middleware/authMiddleware');

router.post('/', authenticate,authorizeRoles('admin', 'manager'), createProject);
router.get("/"  , authenticate, getProjects);

module.exports = router;