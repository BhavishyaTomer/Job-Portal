import React from 'react';

const Filter = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
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

  return (
    <div className='text-textColor text-2xl'>
      {filterData.map((filter, index) => (
        <div key={index} className='mb-10'>
          <h3 className='font-semibold mb-2'>{filter.filterType}</h3>
          {filter.array.map((option, i) => (
            <div key={i}>
              <label>
                <input type="radio" name={filter.filterType} value={option} className='mr-2' />
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
