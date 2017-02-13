import _ from 'lodash'
import { connect } from 'react-redux'
import {getCourses} from '../../selectors'
import {selectCourse} from '../../reducers/Course/selectCourse'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionsContainer', state)

  return {
    courses: state.course.courses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCourse: (course) => {dispatch(selectCourse(course))}
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
