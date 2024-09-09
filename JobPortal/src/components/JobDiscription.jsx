import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaBookmark } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { API_ENDPOINT, Job_ENDPOINT } from "../config/endpoint"
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../service/Loader'

const JobDiscription = () => {
  const [applyStatus, setApplyStatus] = useState(false)
  const [jobData, setJobData] = useState(null)
  const [visibileApply, setVisibileApply] = useState(true)
  const { id } = useParams()

  const fetchJobs = async () => {
    try {
      const data = await axios.get(`${Job_ENDPOINT}/${id}`, { withCredentials: true })
      const user = JSON.parse(localStorage.getItem("user"));
      setJobData(data.data.Job)
      console.log("job", data.data.Job) // Updated to log the correct data
      if (user && data.data.Job.application.some(app => app.applicant.toString() === user._id)) {
        setApplyStatus(true)
      }
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [id])

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const ParsedUser = JSON.parse(user)
      const role = ParsedUser.role
      if (role !== "Job seeker" || user == null) {
        setVisibileApply(false)
      } else if (role === "Job seeker") {
        setVisibileApply(true)
      }
    } else {
      setVisibileApply(false)
    }
  }, [])

  const calculateDaysSinceUpdate = (dateString) => {
    const updatedDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - updatedDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  const applyOnJob = async () => {
    try {
      const applicationApply = await axios.get(`${API_ENDPOINT}/ApplyToJob/${id}`, { withCredentials: true })
      toast(applicationApply.data.message)
      setApplyStatus(true)
      fetchJobs()
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='min-h-screen p-10'>
      <ToastContainer />
      {jobData ? (
        <div className='border-2 border-white flex flex-col shadow-md shadow-white mb-auto'>
          <div className='border-b-2 border-white mx-2'>
            <div className='flex justify-between items-center'>
              <section className='p-1 mx-2 text-6xl'>{jobData.title}</section>
              <div>
                {visibileApply &&
                  (applyStatus ?
                    <button className='bg-gray-500 p-2 flex justify-center items-center rounded-lg mx-2 text-2xl px-6'>Applied</button> :
                    <button className='bg-red-600 p-2 flex justify-center items-center rounded-lg mx-2 text-2xl px-6' onClick={applyOnJob}>Apply</button>
                  )}
              </div>
            </div>
            <section className='flex my-2'>
              {jobData.skills?.map((info, index) => (
                <span key={index} className='p-1 bg-textColor text-backGround text-2xl mx-2 rounded-full'>
                  {info}
                </span>
              ))}
            </section>
          </div>

          <section className='p-1 mx-2 text-3xl'>Job Description</section>
          <section className='p-1 mx-2 text-2xl'>Title: {jobData.title}</section>
          <section className='p-1 mx-2 text-2xl'>Description: {jobData.description}</section>
          <section className='p-1 mx-2 text-2xl'>Salary: {jobData.salary}</section>
          <section className='p-1 mx-2 text-2xl'>Vacancy: {jobData.position}</section>
          <section className='p-1 mx-2 text-2xl'>Location: {jobData.location}</section>
          <section className='p-1 mx-2 text-2xl'>Date Posted: {calculateDaysSinceUpdate(jobData.updatedAt)} days ago</section>
          <section className='p-1 mx-2 text-2xl'>Applicant: {jobData.application.length}</section>
          <section className='p-1 mx-2 mb-2 flex justify-between items-center'>
            <div></div>
            <div>
              <FaBookmark className="text-blue-500" size={24} />
            </div>
          </section>
        </div>
      ) : (
        <div className='min-h-screen flex justify-center items-center'>
        <Loader />
        </div> // Replace this with your loader component or a fallback UI
      )}
    </div>
  )
}

export default JobDiscription
