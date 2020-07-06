import React from 'react'
import { CoursePart } from '../index';
import { assertNever } from '../util';

const Part: React.FC<{part:CoursePart}> = ({part}) => {

  switch (part.name) {
    case "Fundamentals":
      return <div>{part.name} {part.description} {part.exerciseCount}</div>
    case "Using props to pass data":
      return <div>{part.name} {part.exerciseCount} {part.groupProjectCount}</div>
    case "Deeper type usage":
      return <div>{part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}</div>
    case "Super interface":
  return <div>{part.name} {part.description} {part.exerciseCount}</div>
    default:
      return assertNever(part)
  }
}


export default Part