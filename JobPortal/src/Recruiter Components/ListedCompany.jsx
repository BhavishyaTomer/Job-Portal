import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { COMPANY_ENDPOINT } from '../config/endpoint'
import { ToastContainer,toast } from 'react-toastify'

const ListedCompany = () => {
    const [companyDetails,setCompanyDetails]=useState('')
    useEffect(() => {
        const fetchCompanyDetails = async () => {
          try {
            const response = await axios.get(COMPANY_ENDPOINT);
            console.log(response)
            if (response) {
              setCompanyDetails(response.data);
            }
          } catch (error) {
            console.error('Failed to fetch company details:', error);
            toast(error.response.data.message)
          }
        };
      
        fetchCompanyDetails();
      }, []);
      
    return (
        <div className='min-h-screen max-h-auto flex flex-col items-center'>
            <ToastContainer/>
          <section className='text-5xl mb-8'>
            One must learn to tolerate failures without being disturbed.
          </section>
          <table className="table-fixed m-36 w-3/4 text-2xl border border-white">
            <thead>
              <tr className="border-b border-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Website</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Registered At</th>
              </tr>
            </thead>
            <tbody>
                {/* {
                    companyDetails.map((info)=>{
                        return(
                            <tr className='text-center border-b border-white'>
                                <td className="px-4 py-2">19-06-2000</td>
                <td className="px-4 py-2">Software Solution</td>
                <td className="px-4 py-2">Microsoft</td>
                <td className="px-4 py-2">Blacklisted</td>
             
                            </tr>
                        )
                    })
                } */}
             
            </tbody>
          </table>
        </div>
      );
}

export default ListedCompany
