import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { TimelineOppositeContent } from '@mui/lab';
import { Event } from '@mui/icons-material';
import { Typography } from '@mui/material';


const TimeLine = ({timelines = []}) => {
  
  return (
    <div>
        <Timeline position="alternate">
          {
            timelines.map((val)=>(
               
                <TimelineItem key={val._id}>
                  <TimelineOppositeContent
                    sx={{m: "auto 0"}}
                    align="right"
                    variant='body2'
                    color="text.secondary"
                  >
                    {val.date}
                  </TimelineOppositeContent>

                  <TimelineSeparator>
                    <TimelineConnector />

                     <TimelineDot>
                       <Event />
                     </TimelineDot>
                     
                    <TimelineConnector />
                   
                  </TimelineSeparator>

                  <TimelineContent sx={{py: "12px", px: 2}}>
                    <Typography variant='h6' >{val.title}</Typography>
                    <Typography>{val.desc}</Typography>
                  </TimelineContent>
                </TimelineItem>
            ))
          }
        </Timeline>
    </div>
  )
}

export default TimeLine