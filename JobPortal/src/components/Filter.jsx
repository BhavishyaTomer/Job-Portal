import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByCreatedAt, filterByLocation, filterBySalary, filterJobs } from '../redux/jobSlice';


const Filter = () => {
  const dispatch = useDispatch();
  
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Aligarh"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
    {
      filterType: "Posted Date",
      array: ["within 7 days", "within 20 days", "within 30 days"]
    }
  ];

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "Location":
        dispatch(filterByLocation(value));
        break;
      case "Industry":
        dispatch(filterJobs(value));
        break;
      case "Salary":
        // Map salary ranges to min/max values
        const salaryRanges = {
          "0-40k": [0, 40000],
          "42-1lakh": [42000, 100000],
          "1lakh to 5lakh": [100000, 500000]
        };
        dispatch(filterBySalary(salaryRanges[value]));
        break;
      case "Posted Date":
        // Map posted date ranges to days
        const daysMapping = {
          "within 7 days": 7,
          "within 20 days": 20,
          "within 30 days": 30
        };
        dispatch(filterByCreatedAt(daysMapping[value]));
        break;
      default:
        break;
    }
  };

  return (
    <div className='text-textColor text-2xl'>
      {filterData.map((filter, index) => (
        <div key={index} className='mb-10'>
          <h3 className='font-semibold mb-2'>{filter.filterType}</h3>
          {filter.array.map((option, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={filter.filterType}
                  value={option}
                  className='mr-2'
                  onChange={() => handleFilterChange(filter.filterType, option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Filter;
