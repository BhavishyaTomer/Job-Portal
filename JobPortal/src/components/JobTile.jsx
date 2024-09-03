import React from 'react'
import { FaArrowRight, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const JobTile = ({ data }) => {
  const skills = ["AWS", "REACT", "Angular"]
  const navigate=useNavigate()
  return (
    <div className=' border-2 border-white flex flex-col shadow-md shadow-white mb-auto' onClick={()=>{
      navigate(`/jobDiscription/${12345}`)
    }}>
      <section className='p-1 mx-2 text-6xl'>Title</section>
      <section className='p-1 mx-2 text-4xl'>Description</section>
      <section className='p-1 mx-2'>12 lpa</section>
      <section className='p-1 mx-2'>8 postions</section>
      <section className='flex'>
        {
          skills.map((info, index) => {
            return (<span className='p-1  bg-textColor text-backGround  text-2xl mx-2 rounded-full'>
              {info}
            </span>
            )
          })
        }
      </section>
      <section className='p-1 mx-2'>Banglore</section>
      <section className='p-1 mx-2 mb-2 flex justify-between items-center'>
        <div>
          <button className='bg-red-600 p-2 flex justify-center items-center rounded-lg'>Apply <span className='text-white m-2'><FaArrowRight /></span></button>
        </div>
        <div>
          <FaBookmark className="text-blue-500" size={24} />
        </div>
      </section>

    </div>
  )
}

export default JobTile
