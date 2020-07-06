import React from 'react'
import { CoursePart } from '..';


const Sum: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return <h1>Total Exercise count: {courseParts.reduce((pre,cur) => pre+cur.exerciseCount,0)}</h1>
};

export default Sum