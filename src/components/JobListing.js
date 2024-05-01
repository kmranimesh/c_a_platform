import React from 'react';

const JobListing = ({ jobData }) => {
  return (
    <div className="job-listing">
      <h3>{jobData.role}</h3>
      <p>Company: {jobData.company}</p>
      <p>Salary: {jobData.salary}</p>
      {/* Other job details */}
      <button>View Job</button>
    </div>
  );
};

export default JobListing;