const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return(<h4>Total of {sum} exercises</h4>);
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part => <Part part={part} key={part.id} />)

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
}
export default Course;