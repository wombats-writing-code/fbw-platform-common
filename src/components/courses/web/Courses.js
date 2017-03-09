import React, {Component} from 'react'
import _ from 'lodash';

// import './Courses.scss'

class Courses extends Component {


  render() {
    return (
      <ul>
        {_.map(this.props.courses, course => {
          return (
            <li className="course" key={`course_${course.Id}`} onClick={() => this.props.onSelectCourse(course)}>
              <p>{course.Name}</p>
            </li>
          )
        })}

      </ul>
    )
  }
}

export default Courses
