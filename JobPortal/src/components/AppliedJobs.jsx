import React from 'react';

const AppliedJobs = () => {
  return (
    <div className='min-h-screen max-h-auto flex flex-col items-center'>
      <section className='text-5xl mb-8'>
        One must learn to tolerate failures without being disturbed.
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
                [1,2,3,4,5].map((info)=>{
                    return(
                        <tr className='text-center border-b border-white'>
                            <td className="px-4 py-2">19-06-2000</td>
            <td className="px-4 py-2">Software Solution</td>
            <td className="px-4 py-2">Microsoft</td>
            <td className="px-4 py-2">Blacklisted</td>
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
