
import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const JobCard = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleShowMore = () => {
    setShowFullDescription(true);
    setExpanded(true);
  };

  const handleShowLess = () => {
    setShowFullDescription(false);
    setExpanded(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px' }}>
      <Card variant="outlined" sx={{
        borderRadius: '10px',
        bgcolor: '#f8f9fa',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px) scaleY(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          '& .MuiCardActions-root': {
            borderBottom: '2px solid #3f51b5', 
          },
        },
        height: '100%',
        width: '320px', 
        '@media (max-width: 600px)': {
          width: '100%',
          marginLeft: 0,
          marginRight: 0,
        },
      }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ fontSize: '20px'}}>
            <span style={{fontWeight:600}}> Title :</span>{job.jobRole}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
           <span style={{fontWeight:600}}>Location :</span> {job.location}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
           <span style={{fontWeight:600}}>Estimated Salary :</span> {job.salaryCurrencyCode} {job.maxJdSalary}-{job.minJdSalary} 
          </Typography>
          <Typography variant="body2" gutterBottom>
            <span style={{fontSize: '16px' , fontWeight: '600'}}>About Company</span> <br/>
            {showFullDescription ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.slice(0, 150)}...`}
            {!showFullDescription && <Button onClick={handleShowMore} >View Job</Button>}
            {showFullDescription && expanded && <Button onClick={handleShowLess} style={{fontWeight: '600'}}>Show Less</Button>}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
           <span style={{fontWeight:600}}>Minium Experience :</span> {job.minExp}-{job.maxExp} year
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button sx={{ width: '150px' }}  variant="contained" color="success" href={job.jdLink} target="_blank">Easy Apply</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default JobCard;


