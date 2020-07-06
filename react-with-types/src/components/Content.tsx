import React from 'react'
import Part from './Part';
import { CoursePart } from '..';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <>
      {courseParts.map((p,idx) => <Part key={idx} part={p}/> )}
    </>
  )
  
  
};

export default Content