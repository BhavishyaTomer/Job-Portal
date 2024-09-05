import axios from "axios"
import { useEffect } from "react"
import { Job_ENDPOINT } from "../config/endpoint"
import { useDispatch } from "react-redux"
import { getJobs } from "../redux/jobSlice"

export const useFetchJobs=()=>{
    const dispatch=useDispatch()
useEffect(()=>{
    const jobsFetch=async()=>{
        try {
         const jobPosted= await axios.get(`${Job_ENDPOINT}`,{withCredentials:true})
         if(jobPosted.data.success)
         {
         dispatch(getJobs(jobPosted.data.jobs))
         }
        } catch (error) {
            console.log("error ",error)
        }
    }
    jobsFetch()
},[])
}
