import React, { useState, useEffect, useRef } from 'react';
import JobCard from './JobCard';
import Filters from './Filters';
import { Grid, Typography } from '@mui/material';

const AppLayout = () => {
  // State variables
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
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Ref for IntersectionObserver
  const observer = useRef(null);

  // Cleanup observer when unmounting
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Fetch jobs based on filterParams and pageNumber
  useEffect(() => {
    setLoading(true);

    const fetchJobs = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filterParams, page: pageNumber }),
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        console.log(data)

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

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilterParams(newFilters);
    setPageNumber(1);
  };

  // Apply filters to jobs
  const applyFilters = (job) => {
    const { minExperience, location, remote, techStack, role, minBasePay } = filterParams;

    if (minExperience && parseInt(job.minExp) !== parseInt(minExperience)) {
      return false;
    }

    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    if (remote === 'remote' && !job.location.toLowerCase().includes('remote')) {
      return false;
    }

    if (remote === 'onsite' && job.location.toLowerCase().includes('remote')) {
      return false;
    }

    if (techStack && job.jobRole !== techStack) {
      return false;
    }

    if (role && job.jobRole !== role) {
      return false;
    }

    if (minBasePay && job.minJdSalary < minBasePay) {
      return false;
    }

    return true;
  };

  // Filter jobs based on applied filters
  const filteredJobs = jobs.filter(applyFilters);

  // Callback function for IntersectionObserver
  const observerCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  // Initialize IntersectionObserver when the last job card is rendered
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    observer.current = new IntersectionObserver(observerCallback, options);

    if (observer.current && !loading && hasMore) {
      const lastJobCard = document.querySelector('.job-card:last-child');
      if (lastJobCard) {
        observer.current.observe(lastJobCard);
      }
    }
  }, [loading, hasMore]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
     
      
      {/* Filters */}
      <Filters onFilterChange={handleFilterChange} />
      
      {/* Loading indicator */}
      {loading && pageNumber === 1 ? (
        <Typography variant="body1" align="center" gutterBottom style={{ marginTop: '20px' }}>
          Loading...
        </Typography>
      ) : 
      // Error message
      error ? (
        <Typography variant="body1" align="center" gutterBottom style={{ marginTop: '20px', color: 'red' }}>
          Error: {error.message}
        </Typography>
      ) : (
        // Jobs grid
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
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
