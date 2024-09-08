import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Select from "react-dropdown-select"
import { COMPANY_ENDPOINT, JOB_CREATE } from '../config/endpoint';
import styled from 'styled-components';

import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const StyledSelect = styled(Select)`
background: bg-backGround;
border: 1px solid #fff !important;
color: text-textColor;
border-radius:4px !important


.react-dropdown-select-clear,
.react-dropdown-select-dropdown-handle {
  color: #fff;
}

.react-dropdown-select-option {
  border: 1px solid green ! important;
}

.react-dropdown-select-item {
  
}

.react-dropdown-select-input {
 
}

.react-dropdown-select-dropdown {
  position: absolute;
  left: 0;
  border: 1px solid white;
  width: 310px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  max-height: 300px;
  overflow: auto;
  z-index: 9;
  background: #1F2232 !important;
  box-shadow: none;
  color: #fff !important;
}

.react-dropdown-select-item {
  color: #f2f2f2;
  border-bottom: 1px solid white;
     
  :hover {
     color: #ffffff80;
  }
}

.react-dropdown-select-item.react-dropdown-select-item-selected,
.react-dropdown-select-item.react-dropdown-select-item-active {
  //background: #111;
  border-bottom: 1px solid #333;
  color: #fff;
  font-weight: bold;
}

.react-dropdown-select-item.react-dropdown-select-item-disabled {
  background: #777;
  color: #ccc;
}`
const CreateJob = () => {
    const skillOptions = [
        { value: "React", label: "React" },
        { value: "Angular", label: "Angular" },
        { value: "NodeJs", label: "NodeJs" },
        { value: "AWS", label: "AWS" },
        { value: "Figma", label: "Figma" },
        { value: "Git", label: "Git" },
    ];
    const formHandler = (e) => {
        setFormValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const navigate=useNavigate()


    const [skills, setSkills] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [companyOptions, setCompanyOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [formValue, setFormValue] = useState({
        title: "",
        location: "",
        salary: "",
        position: "",
        skills: [],
        company: "",
        description: ""
    })

    const handleSkillChange = (value) => {
        setSelectedSkills(value);
        setFormValue((prev) => ({
            ...prev,
            skills: value.map(item => item.value)
        }));
        console.log('Selected Skills:', value.map(item => item.value));
    };
    const handleCompanyChange = (value) => {
        if (value && value.length > 0) {
            const selectedCompanyValue = value[0]?.value;
            setSelectedCompany(selectedCompanyValue);
            setFormValue((prev) => ({
                ...prev,
                company: selectedCompanyValue
            }));
            console.log('Selected Company:', selectedCompanyValue);
        } else {
            console.error('Company selection is empty or invalid');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (!formValue.title || !formValue.location || !formValue.salary || !formValue.position || !selectedSkills.length || !selectedCompany || !formValue.description) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const createJob = await axios.post(JOB_CREATE, formValue, { withCredentials: true });
            if (createJob) {
                toast.success("Job Successfully Created");
                
                setFormValue({
                    title: "",
                    location: "",
                    salary: "",
                    position: "",
                    skills: [],
                    company: "",
                    description: ""
                });
                setSelectedCompany('');
                setSelectedSkills([]);
            }
        } catch (error) {
            toast.error("Error in Job Creation");
            console.log(error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const fetchCompanyDetails = async () => {
            try {
                const response = await axios.get(COMPANY_ENDPOINT, { withCredentials: true });
                if (isMounted && response.data) {
                    const options = response.data.map(company => ({
                        value: company._id,
                        label: company.name
                    }));
                    setCompanyOptions(options);
                }
            } catch (error) {
                console.error('Failed to fetch company details:', error);
                toast(error.response?.data?.message || 'Error fetching company details');
            }
        };
        fetchCompanyDetails();

        return () => { isMounted = false; };
    }, []);


    return (
        <div className='min-h-screen flex flex-col items-center w-full'>
            <ToastContainer />
            <section className='text-6xl m-10'>Create Job Here</section>
            <form className='w-1/2 h-3/4 flex-col' onSubmit={handleSubmit}>
                <div className='flex justify-between items-center my-6'>
                    <section className='flex flex-col'>
                        <span className='text-textColor text-3xl'>Title</span>
                        <input
                            type='text'
                            className='bg-backGround text-textColor font-semibold w bottom-2 border border-white rounded-lg px-1 text-2xl'
                            onChange={formHandler}
                            value={formValue.title}
                            name='title'
                        />
                    </section>
                    <section className='flex flex-col'>
                        <span className='text-textColor text-3xl'>Location</span>
                        <input
                            type='text'
                            className='bg-backGround text-textColor font-semibold w bottom-2 border border-white rounded-lg px-1 text-2xl'
                            onChange={formHandler}
                            value={formValue.location}
                            name='location'
                        />
                    </section>
                </div>
                <div className='flex justify-between items-center my-6'>
                    <section className='flex flex-col'>
                        <span className='text-textColor text-3xl'>Salary</span>
                        <input
                            type='number'
                            className='bg-backGround text-textColor font-semibold w bottom-2 border border-white rounded-lg px-1 text-2xl'
                            onChange={formHandler}
                            value={formValue.salary}
                            name='salary'
                        />
                    </section>
                    <section className='flex flex-col'>
                        <span className='text-textColor text-3xl'>Vacancy</span>
                        <input
                            type='number'
                            className='bg-backGround text-textColor font-semibold w bottom-2 border border-white rounded-lg px-1 text-2xl '
                            onChange={formHandler}
                            value={formValue.position}
                            name='position'
                        />
                    </section>
                </div>
                <div className='flex justify-between items-center my-6'>
                    <section className='flex flex-col w-1/3'>
                        <span className='text-textColor text-3xl'>Skill Select</span>
                        <StyledSelect
                            values={selectedSkills}
                            onChange={handleSkillChange}
                            options={skillOptions}
                            multi={true}
                        />
                    </section>
                    <section className='flex flex-col w-1/3'>
                        <span className='text-textColor text-3xl'>Company Select</span>
                        <StyledSelect

                            onChange={handleCompanyChange}
                            className='bg-backGround text-textColor'
                            values={selectedCompany ? [{ value: selectedCompany, label: companyOptions.find(opt => opt.value === selectedCompany)?.label }] : []}
                            options={companyOptions}

                        />


                    </section>

                </div>
                <section>
                    <label for="large-input" className="block mb-2 text-sm font-medium mt-10 text-textColor">Discription</label>
                    <input type="text" id="large-input" className="block w-full p-4 border border-gray-300 rounded-lg text-textColor bg-backGround"
                        onChange={formHandler}
                        value={formValue.description}
                        name='description' />
                </section>
                <div className='mb-10 flex justify-between'>
                    <button className='bg-red-600 px-2 py-1 rounded-md text-3xl mt-10 ' type='submit'>Post A Job</button>
                    <button className='bg-green-500 px-2 py-1 rounded-md text-3xl mt-10' onClick={() => navigate("/postedJob")}>Job History</button>

                </div>
                <span className='text-red-600 my-10 text-2xl'> * Please register <span className=' pointer-events-auto cursor-pointer hover:text-red-400 underline' onClick={()=>navigate("/listedCompany")}>a company here</span> Before Posting a Job!!</span>


            </form>
        </div>
    )
}

export default CreateJob;
