import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APllIED_JOB } from '../config/endpoint';
const AppliedJobs = () => {

const [appliedJob,setAppliedJob]=useState([])
  useEffect(()=>{
  const getAppliedJobs=async()=>{
    try {
      const jobList=await axios.get(APllIED_JOB,{withCredentials:true})
      if(jobList)
      {
        setAppliedJob(jobList.data.applicationApplied)
        console.log(jobList.data.applicationApplied[0])
      }
    } catch (error) {
      
    }
  }
  getAppliedJobs()
  },[])
  const dateConverter = (date) => {
    return new Date(date).toLocaleDateString(); 
  };
  return (
    <div className='min-h-screen max-h-auto flex flex-col items-center'>
      <section className='text-5xl mb-8'>
        Applied Companies
      </section>
      <table className="table-fixed m-36 w-3/4 text-2xl border border-white">
        <thead>
          <tr className="border-b border-white">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Job Role</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
            {
                appliedJob.map((info)=>{
                    return(
                        <tr className='text-center border-b border-white'>
                            <td className="px-4 py-2">{dateConverter(info.job.updatedAt)}</td>
            <td className="px-4 py-2">{info.job.title}</td>
            <td className="px-4 py-2">{info.job.company.name}</td>
            <td className="px-4 py-2">{info.status}</td>
                        </tr>
                    )
                })
            }
         
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobs;
