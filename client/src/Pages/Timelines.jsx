import React from 'react';
import { useSelector } from 'react-redux';
import TimeLineCard from '../Components/TimeLineCard';

const Timelines = () => {
  const admin = useSelector( state => state.admin.admin);
  
  return (
    <div className='timelines'>
      {
        admin !== undefined && (
            <>
               {
                admin.timeline.map((val)=> <TimeLineCard key={val._id} id={val._id} title={val.title} desc={val.desc} date={val.date} />)
               } 
            </>
        )
      }
    </div>
  )
}

export default Timelines