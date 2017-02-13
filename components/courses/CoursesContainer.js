import _ from 'lodash'
import { connect } from 'react-redux'
import {getCourses, getUser} from '../../selectors'
import {selectCourse} from '../../reducers/Course/selectCourse'
import {getMapping} from '../../reducers/Mapping/getMapping'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionsContainer', state)

  return {
    courses: state.course.courses,
    user: getUser(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCourse: (course) => {dispatch(selectCourse(course))},
    getMapping: (course, entityTypes) => {dispatch(getMapping(course, entityTypes))}
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
