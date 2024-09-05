const application = require('../models/ApplicationSchema.js')
const job = require('../models/JobScehma.js')

const applyToApplication = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicantId = req.id;
        if (!jobId) {
            res.status(400).json({
                message: "please provide JobId",
                success: false
            });
            return;
        }

        const applicationExist = await application.findOne({ job: jobId, applicant: applicantId });
        if (applicationExist) {
            res.status(400).json({
                message: "Already Applied",
                success: false
            });
            return;
        }

        const jobExist = await job.findById(jobId);  // Corrected here
        if (!jobExist) {
            res.status(400).json({
                message: "Job isn't there",
                success: false
            });
            return;
        }

        const newApplication = await application.create({
            job: jobId, applicant: applicantId
        });

        jobExist.application.push(newApplication._id);
        await jobExist.save();

        res.status(200).json({
            message: "Successfully Applied",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};


const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applicationApplied = await application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });


        if (!applicationApplied) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            applicationApplied,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching applied jobs" });
    }
}

const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const Job = await job.findById(jobId).populate({
            path: 'application',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            Job,
            succees: true
        });
    } catch (error) {
        console.log(error);
    }
}
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        const Application = await application.findOne({ _id: applicationId });
        if (!Application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };
  
        Application.status = status.toLowerCase();
        await Application.save();
        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        }); I
    }
    catch (error) {
        console.log(error);
    }
}

module.exports={updateStatus,getApplicants,getAppliedJobs,applyToApplication}