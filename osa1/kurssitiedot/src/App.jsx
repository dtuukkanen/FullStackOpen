const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // Main component
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts} />
    </div>
  )
}

// Header component
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// Content component
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

// Total component
const Total = (props) => {
  return (
    <p>Number of exercises {sum(props.exercises)}</p>
  )
}

const sum = (exercises) => {
  let total = 0
  exercises.forEach(part => {
    total += part.exercises
  });
  return total
}

export default App