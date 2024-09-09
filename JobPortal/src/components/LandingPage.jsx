import React from 'react'
import { Carousel } from "@material-tailwind/react";
import backGroundImg from '../config/banner.jpeg'
import { useNavigate } from 'react-router-dom';
import JobCrads from './JobCrads';
import { useDispatch } from 'react-redux';
import { filterJobs } from '../redux/jobSlice';


const LandingPage = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  
  return (
    <main className='bg-backGround h-auto'>
      <section className='bg-backGround text-textColor font-google text-1xl xl:text-6xl lg:text-4xl md: text-3xl flex justify-center items-center mx-auto my-10'>
        Rishtedaaron ke taano se tang aagae ho?
      </section>
    
      <section className='bg-backGround text-textColor font-google text-6xl flex flex-col lg:flex-row justify-center items-center mx-auto my-10 gap-10  '>
        <button className="bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-md font-google text-1xl xl:text-6xl lg:text-4xl md: text-3xl" onClick={() => navigate("/jobPosting")}>
          Find a Job
        </button>
        <button className="bg-red-800 hover:bg-red-400 text-textColor font-bold py-2 px-4 border-b-4 border-red-700 hover:red-blue-500 rounded-md font-google text-1xl xl:text-6xl lg:text-4xl md: text-3xl" onClick={()=>navigate("/CreateJob")}>
          Hire Some One
        </button>
      </section>
      <section className='w-full m-8 mx-auto flex justify-center items-center'>
        <img src={backGroundImg} alt="" className='w-auto md:w-full p-8'/>
      </section>
      <section className='bg-backGround text-textColor font-google text-3xl flex flex-col justify-center items-center mx-auto my-10 gap-2 p-1'>
        Popular Categories For Recruiters
        <section className='bg-backGround text-textColor font-google text-1xl xl:text-6xl lg:text-4xl md: text-3xl flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center mx-auto my-10 gap-10'>
          <button className='bg-textColor border-blue-950 rounded-full text-backGround p-2'onClick={() => dispatch(filterJobs("frontend"))}>Frontend Developer</button>
          <button className='bg-textColor border-blue-950 rounded-full text-backGround p-2' onClick={() => dispatch(filterJobs("backend"))} >Backend Developer</button>
          <button className='bg-textColor border-blue-950 rounded-full text-backGround p-2' onClick={() => dispatch(filterJobs("fullStack"))} >Full Stack Developer</button>
        </section>
      </section>
     
      <section className='bg-backGround text-textColor font-google text-3xl flex  justify-center items-center mx-auto my-10 gap-2 p-1'>
        Latest and Top Job <span className='text-red-500'>Openings</span>
      </section>
      <JobCrads />
        
    </main>
  )
}

export default LandingPage
