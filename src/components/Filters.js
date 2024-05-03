
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, Grid } from '@mui/material';

const Filters = ({ onFilterChange }) => {
  const initialFilters = {
    minExperience: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: '',
  };

  const [filters, setFilters] = useState(initialFilters);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  const handleClear = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '50px' , marginLeft: '20px', marginRight: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Min Experience"
            name="minExperience"
            value={filters.minExperience}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="text"
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="remote-label">Remote/On-site</InputLabel>
            <Select
              labelId="remote-label"
              id="remote"
              name="remote"
              value={filters.remote}
              onChange={handleChange}
            >
              <MenuItem value="">Select Remote/On-site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="onsite">On-site</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="tech-stack-label">Tech Stack</InputLabel>
            <Select
              labelId="tech-stack-label"
              id="tech-stack"
              name="techStack"
              value={filters.techStack}
              onChange={handleChange}
            >
              <MenuItem value="">Select Tech Stack</MenuItem>
              <MenuItem value="frontend">Reactjs</MenuItem>
              <MenuItem value="frontend">Angular</MenuItem>
              <MenuItem value="backend">Nodejs , Python ,Java</MenuItem>
              <MenuItem value="fullstack">Mern</MenuItem>
              <MenuItem value="fullstack">Mean</MenuItem>
              <MenuItem value="android">Android</MenuItem>
              <MenuItem value="ios">ios</MenuItem>
              {/* Add more tech stack options here */}
            </Select>
          </FormControl>
        </Grid>
         <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="tech-stack-label">Role</InputLabel>
            <Select
              labelId="Select Roles"
              id="role"
              name="role"
              value={filters.role}
              onChange={handleChange}
            >
              <MenuItem value="">Select Roles</MenuItem>
              <MenuItem value="frontend">Frontend</MenuItem>
              <MenuItem value="backend">Backened</MenuItem>
              <MenuItem value="fullstack">Fullstack</MenuItem>
              <MenuItem value="ios">ios</MenuItem>
              <MenuItem value="android">Android</MenuItem>
              
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Min Base Pay"
            name="minBasePay"
            value={filters.minBasePay}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} >
          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" style={{ marginRight: '10px', marginBottom: '10px' }}>Apply Filters</Button>
            <Button onClick={handleClear} variant="contained" style={{ marginBottom: '10px' }}>Clear Filters</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Filters;
