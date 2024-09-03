import React from 'react'
import { FaArrowRight, FaBookmark } from 'react-icons/fa'

const JobDiscription = () => {
  const skills = ["AWS", "REACT", "Angular"]
  const applyStatus=true
  return (
    <div className='min-h-screen p-10'>
      <div className=' border-2 border-white flex flex-col shadow-md shadow-white mb-auto'>
        <div className=' border-b-2 border-white mx-2'>
          <div className='flex justify-between items-center'>
            <section className='p-1 mx-2 text-6xl'>Title</section>
            <div>
              {applyStatus?
              <button className='bg-gray-500 p-2 flex justify-center items-center rounded-lg mx-2 text-2xl px-6'>Applied


              </button>:
                
                <button className='bg-red-600 p-2 flex justify-center items-center rounded-lg mx-2 text-2xl px-6'>Apply


              </button>}
            </div>

          </div>
          <section className='flex my-2'>
          {
            skills.map((info, index) => {
              return (<span className='p-1  bg-textColor text-backGround  text-2xl mx-2 rounded-full'>
                {info}
              </span>
              )
            })
          }
        </section>
        </div>

        <section className='p-1 mx-2 '>job discription</section>
        <section className='p-1 mx-2 '>role:title</section>
        <section className='p-1 mx-2'>discription: Job discription</section>
        <section className='p-1 mx-2'>salary :12 lpa</section>
        <section className='p-1 mx-2'>vacancy: 8 postions</section>

        <section className='p-1 mx-2'>location: Banglore</section>
        <section className='p-1 mx-2'>Date Posted: 2 days ago</section>
        <section className='p-1 mx-2 mb-2 flex justify-between items-center'>
          <div>

          </div>
          <div>
            <FaBookmark className="text-blue-500" size={24} />
          </div>
        </section>
      </div>
    </div>

  )
}

export default JobDiscription
