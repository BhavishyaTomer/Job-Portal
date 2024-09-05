const job = require('../models/JobScehma.js')
const createJob = async (req, res) => {
    const { title, description, salary, position, location, skills, company, application } = req.body
    try {
        const createJob = await job.create({ title, description, salary, position, location, skills, company, created_by: req.id, application })
        res.status(200).json({
            success: true,
            createJob
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }; 
        const jobs = await job.find(query).populate({
            path: "company"
            }).sort({ createdAt: -1 });
           
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const Job = await job.findById(jobId).populate({
            path:"application"
        });;
        if (!Job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ Job, success: true });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports={createJob,getAllJobs,getJobById}