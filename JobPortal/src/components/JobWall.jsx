import React from 'react'
import Filter from './Filter'
import JobTile from './JobTile'
import { useSelector } from 'react-redux'

const JobWall = () => {

  const fetchedJobs=useSelector((state)=>state.jobs.allJobs)
  return (
    <div className='flex items-center flex-col' >
      <span className='text-center text-6xl text-textColor font-google mx-auto'>Find Your Dream Job Here</span>
      <div className='w-full'>
        <div className='bg-backGround w-full h-auto flex p-10'>
          <div className='w-1/5 h-screen sticky top-0'>
            <Filter />
          </div>
          <div className='w-4/5 h-screen overflow-y-auto'>
            {
              !fetchedJobs ? <span>NO Vacncies for now</span>
                :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-backGround ">
                  {fetchedJobs.map((data, index) => {
                    return <JobTile key={index} data={data} />
                  })
                  }
                </div>
            }
          </div>



        </div>
      </div>
    </div>
  )
}

export default JobWall
