const { Dpr } = require("../models");

// Create a new DPR
exports.createDpr = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.userId; 
    const { date, work_description, weather, worker_count } = req.body;

    if (!date || !work_description || !weather || !worker_count) {
      return res.status(400).json({ success: false, message : "All fields are required" });
    }

    const dpr = await Dpr.create({
      project_id: projectId,
      user_id: userId,
      date,
      work_description,
      weather,
      worker_count,
    });
    res.status(201).json({success: true, message: "DPR created successfully", dpr});
  } catch (error) {
    console.error("Error creating DPR:", error);
    res.status(500).json({ error: "Failed to create DPR" });
  }
};

// Get all DPRs for a project
exports.getProjectDprs = async (req, res) => {
  try {
    const projectId = req.params.id;
    const dprs = await Dpr.findAll({ where: { project_id: projectId } });
    res.status(200).json({success: true, message: "DPRs fetched successfully", dprs});
  } catch (error) {
    console.error("Error fetching DPRs:", error);
    res.status(500).json({ error: "Failed to fetch DPRs" });
  }
};
