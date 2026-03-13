const express = require('express');

const {createDpr, getProjectDprs} = require("../controllers/dprController");
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new DPR
router.post("/projects/:id/dpr",authenticate, createDpr);

// Get all DPRs for a project
router.get("/projects/:id/dpr",authenticate, getProjectDprs);

module.exports = router;
