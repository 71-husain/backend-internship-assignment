const e = require('express');
const {Project} = require('../models');

exports.createProject = async (req, res) => {
    try {
        const {name,description , start_date, end_date , status} = req.body;

        if(!name || !description || !start_date || !end_date || !status){
            return res.status(400).json({message : "Please fill all the fields"});
        }   

        const project = await Project.create({
            name,
            description,
            start_date,
            end_date,
            status,
            created_by : req.user.userId
        });
        res.status(201).json({success : true , message : "Project created successfully", projectId : project.id});
    } catch (error) {
        res.status(500).json({message : "Error creating project"});
    }
}

exports.getProjects = async (req, res) => {
    try {
        const role = req.user.role;
        let projects;
        if(role === "admin"){
            projects = await Project.findAll();
        }else if(role === "manager"){
            projects = await Project.findAll({where : {created_by : req.user.userId}});
        }   else{
            return res.status(403).json({message : "Access denied"});
        }   

        if(projects.length === 0){
            return res.status(200).json({message : "No projects found",projects : []});
        }

        res.status(200).json({success : true , projects});
            
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Error fetching projects"});
    }
}