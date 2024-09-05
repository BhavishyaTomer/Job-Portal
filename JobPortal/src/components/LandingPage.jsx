import React from 'react'
import { Carousel } from "@material-tailwind/react";
import backGroundImg from '../config/banner.jpeg'
import { useNavigate } from 'react-router-dom';
import JobCrads from './JobCrads';
const LandingPage = () => {
  const navigate = useNavigate()
  
  return (
    <main className='bg-backGround h-auto'>
      <section className='bg-backGround text-textColor font-google text-6xl flex justify-center items-center mx-auto my-10'>
        Rishtedaaron ke taano se tang aagae ho?
      </section>
      <section className='bg-backGround text-textColor font-google text-3xl flex justify-center items-center mx-auto my-10 gap-10'>
        <input type='text' className='w-2/3 bg-rose-100 border-blue-950 rounded-full h-16 text-backGround p-4' placeholder='Apni Majdoori yahan khojen' />
        <button className='rounded-md bg-backGround h-16 text-textColor border-rose-100 border-2 p-2 hover:bg-red-500 text-white' onClick={() => navigate("/browseJobs")}>Search</button>
      </section>
      <section className='bg-backGround text-textColor font-google text-6xl flex justify-center items-center mx-auto my-10 gap-10'>
        <button className="bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-md font-google" onClick={() => navigate("/jobPosting")}>
          Find a Job
        </button>
        <button className="bg-red-800 hover:bg-red-400 text-textColor font-bold py-2 px-4 border-b-4 border-red-700 hover:red-blue-500 rounded-md font-google" onClick={()=>navigate("/listedCompany")}>
          Hire Some One
        </button>
      </section>
      <section className='w-full m-8 mx-auto flex justify-center items-center'>
        <img src={backGroundImg} alt="" className='w-auto md:w-full p-8'/>
      </section>
      <section className='bg-backGround text-textColor font-google text-3xl flex flex-col justify-center items-center mx-auto my-10 gap-2 p-1'>
        Popular Categories For Recruiters
        <section className='bg-backGround text-textColor font-google text-5xl flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center mx-auto my-10 gap-10'>
          <button className='bg-rose-100 border-blue-950 rounded-full text-backGround p-2'>Frontend Developer</button>
          <button className='bg-rose-100 border-blue-950 rounded-full text-backGround p-2'>Backend Developer</button>
          <button className='bg-rose-100 border-blue-950 rounded-full text-backGround p-2'>Full Stack Developer</button>
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
