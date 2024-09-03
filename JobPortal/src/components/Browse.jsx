import React from 'react';
import JobTile from './JobTile';

const Browse = () => {
    const ary=[1,2,3,4,5,6]
    
  return (
    <div className="min-h-screen max-h-auto flex justify-center">
      
            {
              !ary ? <span className='text-7xl'>No vacancies for now 😭</span>
                :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-backGround p-10 h-auto" style={{height:"fit-content"}} >
                  {ary.map((data, index) => {
                    return <JobTile key={index} data={data} />
                  })
                  }
                </div>
            }
          </div>
 
  );
}

export default Browse;
