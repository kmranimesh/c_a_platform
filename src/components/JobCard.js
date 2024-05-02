// src/components/JobCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: '1rem',
  },
  description: {
    maxHeight: '4rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const JobCard = ({ job }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {job.company}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job.location}
        </Typography>
        <Typography
          variant="body2"
          className={classes.description}
          title={job.description}
        >
          {job.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Experience: {job.experience} years
        </Typography>
        <Button variant="contained" color="primary">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;