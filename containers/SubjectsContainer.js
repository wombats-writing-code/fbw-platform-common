// Subjects container
import { connect } from 'react-redux'

import { getSubjects } from '../reducers/Subject/getSubjects'
import { selectSubject } from '../reducers/Subject/selectSubject'
import { getMapping } from '../reducers/Mapping/getMapping'


const mapStateToProps = (state, ownProps) => {
  // console.log('state', state);
  return {
    privateBankId: state.subject.privateBankId,
    bankIds: state.subject.enrolledBankIds ? state.subject.enrolledBankIds : null,
    subjects: state.subject ? state.subject.subjects : null,
    isGetSubjectsInProgress: state.subject ? state.subject.isGetSubjectsInProgress : false,
    isSelectSubjectInProgress: state.subject ? state.subject.isSelectSubjectInProgress : false,
    username: state.login.user.username ? state.login.user.username : null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectSubject: (data) => dispatch(selectSubject(data)),
    getSubjects: (bankIds) => dispatch(getSubjects(bankIds)),
    getMapping: () => dispatch(getMapping())
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
