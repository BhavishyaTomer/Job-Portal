import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CHANGE_STATUS, UPDATE_STATUS } from '../config/endpoint';
import Select from "react-dropdown-select";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../service/Loader';

const StyledSelect = styled(Select)`
  background: bg-backGround;
  border: 1px solid #fff !important;
  color: text-textColor;
  border-radius: 4px !important;

  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
  }

  .react-dropdown-select-option {
    border: 1px solid green !important;
  }

  .react-dropdown-select-input {}

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
    border-bottom: 1px solid #333;
    color: #fff;
    font-weight: bold;
  }

  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;

const ChangeStatus = () => {
  const { id } = useParams();
  const [candidateProfile, setCandidateProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loader state
  const skillOptions = [
    { value: "pending", label: "pending" },
    { value: "accepted", label: "accepted" },
    { value: "rejected", label: "rejected" }
  ];
  const navigate = useNavigate();

  const fetchApplicant = async () => {
    try {
      setIsLoading(true);
      const listedJobs = await axios.get(`${CHANGE_STATUS}${id}`, { withCredentials: true });
      if (listedJobs) {
        setCandidateProfile(listedJobs.data.Job.application);
        console.log(listedJobs.data.Job.application[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  useEffect(() => {
    fetchApplicant();
  }, [id]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const ParsedUser = JSON.parse(user);
      const role = ParsedUser?.role;
      if (role === "Job seeker") {
        navigate("/redirect");
      }
    }
  }, []);

  const handleCompanyChange = async (id, selectedValue) => {
    console.log(id, selectedValue);
    try {
      const updateStatus = await axios.post(`${UPDATE_STATUS}${id}`, { status: selectedValue }, { withCredentials: true });
      console.log(updateStatus);
      toast("Successfully Updated");
      fetchApplicant();
    } catch (error) {
      console.log(error);
      toast("Some problem has occurred");
    }
  };

  return (
    <div className='min-h-screen flex justify-center'>
      <ToastContainer />
      {isLoading ? (
        <Loader /> // Show loader while loading
      ) : (
        <div className='w-3/4'>
          <table className="table-auto w-full text-2xl border border-white">
            <thead>
              <tr className="border-b border-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidateProfile.map((info) => (
                <tr className='text-center border-b border-white' key={info._id}>
                  <td className="px-4 py-2">{info.applicant.firstName} {info.applicant.lastName}</td>
                  <td className="px-4 py-2">{info.applicant.email}</td>
                  <td className="px-4 py-2">{info.status}</td>
                  <td className="px-4 py-2">
                    <StyledSelect
                      onChange={(selected) => handleCompanyChange(info._id, selected[0].value)}
                      className='bg-backGround text-textColor'
                      values={info.status ? [{ value: info.status, label: skillOptions.find(opt => opt.value === info.status)?.label }] : []}
                      options={skillOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChangeStatus;
