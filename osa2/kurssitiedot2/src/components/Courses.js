import React from 'react'

const Courses = ({courses}) => {
    console.log(courses)
    return (
      <div>
        {courses.map(courses =>
          <div key={courses.id}>
            <h1>{courses.name}</h1>
              <ul>
                {courses.parts.map(part =>
                  <li key={part.id}>
                    {part.name} {part.exercises}
                  </li>
                )}
              </ul>
            <p>total of {courses.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
          </div>
          )}
      </div>
    ) 
  } 

export default Courses