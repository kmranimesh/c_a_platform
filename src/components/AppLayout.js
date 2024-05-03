
import React, { useState, useEffect, useRef } from 'react';
import JobCard from './JobCard';
import Filters from './Filters';
import { Grid, Typography } from '@mui/material';

const AppLayout = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({
    minExperience: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: '',
  });

  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [hasMore, setHasMore] = useState(true); // Track if there are more jobs to fetch

  const observer = useRef(null); // Ref for observing the last job card

  useEffect(() => {
    // Cleanup observer when unmounting
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching new jobs

    const fetchJobs = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ ...filterParams, page: pageNumber }), // Include page number in the request
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();

        // Update jobs state based on whether there are more jobs to fetch
        setJobs(prevJobs => [...prevJobs, ...data.jdList]);
        setHasMore(data.jdList.length > 0);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filterParams, pageNumber]);

  const handleFilterChange = (newFilters) => {
    setFilterParams(newFilters);
    setPageNumber(1); // Reset page number when filters change
  };
const applyFilters = (job) => {
    const {
      minExperience,
      location,
      remote,
      techStack,
      role,
      minBasePay,
    } = filterParams;
  
    console.log("Filter params:", filterParams);
    console.log("Job details:", job);
  
    // Check if minExperience is provided and if job's minExp matches
    if (minExperience !== '' && parseInt(job.minExp) !== parseInt(minExperience)) {
      console.log("Min experience does not match");
      return false;
      
    }
  
    // Check if location is provided and if job's location matches
    if (location !== '' && job.location.toLowerCase().indexOf(location.toLowerCase()) === -1) {
      console.log("Location does not match");
      return false;
   
    }
  
    // Check if remote filter is provided and if job's location includes 'remote'
    if (remote === 'remote' && !job.location.toLowerCase().includes('remote')) {
      console.log("Remote does not match");
      return false;
    
    }
  
    // Check if onsite filter is provided and if job's location does not include 'remote'
    if (remote === 'onsite' && job.location.toLowerCase().includes('remote')) {
      console.log("On-site does not match");
      return false;
    
    }
  
    // Check if techStack is provided and if job's jobRole matches
    if (techStack !== '' && job.jobRole !== techStack) {
      console.log("Tech stack does not match");
      return false;
    
    }
  
    // Check if role is provided and if job's jobRole matches
    if (role !== '' && job.jobRole !== role) {
      console.log("Role does not match");
      return false;
   
    }
  
    // Check if minBasePay is provided and if job's minJdSalary is greater than or equal to minBasePay
    if (minBasePay !== '' && job.minJdSalary < minBasePay) {
      console.log("Min base pay does not match");
      return false;
    
    }
  
    return true; //actual filtering logic
  };
  

  const filteredJobs = jobs.filter(applyFilters);

  const observerCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPageNumber(prevPageNumber => prevPageNumber + 1); // Increment page number when last job card becomes visible
    }
  };

  useEffect(() => {
    // Initialize IntersectionObserver when the last job card is rendered
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    observer.current = new IntersectionObserver(observerCallback, options);

    if (observer.current && loading === false && hasMore) {
      const lastJobCard = document.querySelector('.job-card:last-child');
      if (lastJobCard) {
        observer.current.observe(lastJobCard);
      }
    }
  }, [loading, hasMore]);

  return (
    <div>
    <Typography variant="h4" align="center" gutterBottom style={{fontWeight:'600' , color:'green'}}>
        Candidate Application Platform
    </Typography>
      <Filters onFilterChange={handleFilterChange} />
      {loading && pageNumber === 1 ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3} className={index === jobs.length - 1 ? 'job-card' : ''}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AppLayout;
