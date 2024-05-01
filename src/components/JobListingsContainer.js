import React from 'react';
import JobListing from './JobListing';

const JobListingsContainer = ({ jobListings }) => {
  return (
    <div className="job-listings-container">
      {jobListings.map((job) => (
        <JobListing key={job.id} jobData={job} />
      ))}
    </div>
  );
};

export default JobListingsContainer;