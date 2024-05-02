// src/components/Filters.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters, fetchJobs } from '../store/actions';
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filters: {
    marginBottom: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterItem: {
    marginRight: '1rem',
    marginBottom: '1rem',
  },
}));

const Filters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleFilterChange = (filterName, filterValue) => {
    dispatch(updateFilters({ [filterName]: filterValue }));
  };

  const handleApplyFilters = () => {
    dispatch(fetchJobs(filters));
  };

  return (
    <div className={classes.filters}>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Min Experience</Typography>
        <TextField
          type="number"
          value={filters.minExperience}
          onChange={(e) => handleFilterChange('minExperience', e.target.value)}
        />
      </div>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Company Name</Typography>
        <TextField
          value={filters.companyName}
          onChange={(e) => handleFilterChange('companyName', e.target.value)}
        />
      </div>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Location</Typography>
        <TextField
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>
      <div className={classes.filterItem}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.isRemote}
              onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
            />
          }
          label="Remote"
        />
      </div>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Tech Stack</Typography>
        <TextField
          value={filters.techStack.join(', ')}
          onChange={(e) =>
            handleFilterChange('techStack', e.target.value.split(','))
          }
        />
      </div>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Role</Typography>
        <FormControl>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Data Scientist">Data Scientist</MenuItem>
            <MenuItem value="Product Manager">Product Manager</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.filterItem}>
        <Typography variant="subtitle1">Min Base Pay</Typography>
        <TextField
          type="number"
          value={filters.minBasePay}
          onChange={(e) => handleFilterChange('minBasePay', e.target.value)}
        />
      </div>
      <div className={classes.filterItem}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
      </div>