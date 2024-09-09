import React from 'react';
import Filter from './Filter';
import JobTile from './JobTile';
import { useSelector } from 'react-redux';

const JobWall = () => {
  const fetchedJobs = useSelector((state) => state.jobs.filteredJobs);

  return (
    <div className='flex items-center flex-col'>
      <span className='text-center text-4xl md:text-6xl text-textColor font-google mx-auto mb-6'>
        Find Your Dream Job Here
      </span>
      <div className='w-full'>
        <div className='bg-backGround w-full h-auto flex flex-col md:flex-row p-4 md:p-10'>
          <div className='w-full md:w-1/5 h-auto md:h-screen sticky top-0 hidden md:block'>
            <Filter />
          </div>
          <div className='w-full md:w-4/5 h-auto md:h-screen overflow-y-auto'>
            {!fetchedJobs || fetchedJobs.length === 0 ? (
              <span className='block text-center text-2xl mt-10'>No Vacancies for now</span>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full bg-backGround'>
                {fetchedJobs.map((data, index) => (
                  <JobTile key={index} data={data} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWall;
