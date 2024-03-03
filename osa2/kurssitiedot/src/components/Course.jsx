const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Total sum={total} />
    </>
  )
}

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content key={course.id} parts={course.parts} />
      </>
    )
  }

export default Course