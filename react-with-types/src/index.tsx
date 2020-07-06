import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Sum from "./components/Sum";


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface NewInterface extends CoursePartBase {
  name:string;
  description:string;
}


interface CoursePartOne extends NewInterface {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends NewInterface {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyOwnInterFace  {
  name:"Super interface",
  exerciseCount:number,
  description:string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyOwnInterFace;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name:"Super interface",
      exerciseCount: 68,
      description:"This is super"
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts}/>
      <Sum courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));