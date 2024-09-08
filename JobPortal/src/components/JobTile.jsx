import React from 'react'
import { FaArrowRight, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const JobTile = ({ data }) => {

  const navigate=useNavigate()
  return (
    <div className=' border-2 border-white flex flex-col shadow-md shadow-white ' onClick={()=>{
      navigate(`/jobDiscription/${data._id}`)
    }}>
      <section className='p-1 mx-2 text-4xl'>{data.title}</section>
      <section className='p-1 mx-2 text-2xl'>{data.description}</section>
      <section className='p-1 mx-2'>{data.salary}</section>
      <section className='p-1 mx-2'>{data.position}</section>
      <section className='flex'>
        {
          data.skills.map((info, index) => {
            return (<span className='p-1  bg-textColor text-backGround  text-2xl mx-2 rounded-full' key={index}>
              {info}
            </span>
            )
          })
        }
      </section>
      <section className='p-1 mx-2'>{data.location}</section>
      <section className='p-1 mx-2 mb-2 flex justify-between items-center'>
        <div>
          
        </div>
        <div>
          <FaBookmark className="text-blue-500" size={24} />
        </div>
      </section>

    </div>
  )
}

export default JobTile
