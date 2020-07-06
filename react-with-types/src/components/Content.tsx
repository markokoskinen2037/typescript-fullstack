import React from 'react'
import { CoursePart } from './Sum';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <>
      {courseParts.map((p,i) => <p key={i}>{p.name} {p.exerciseCount}</p>)}
    </>
  )
  
  
};

export default Content