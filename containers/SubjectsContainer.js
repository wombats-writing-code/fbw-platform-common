// Subjects container
import { connect } from 'react-redux'

import { getBanks } from '../reducers/Bank/getBanks'
import { selectBank } from '../reducers/Bank/selectBank'
import { getMapping } from '../reducers/Mapping/getMapping'
import {getUser} from '../selectors/'
import {findBankDomain} from '../selectors/bank'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in subjects container', state);
  return {
    // privateBankId: state.subject.privateBankId,
    // bankIds: state.bank.banks ? _.map(state.bank.banks, 'id') : null,
    subjects: state.bank.banks ? state.bank.banks : null,
    isGetSubjectsInProgress: state.subject ? state.subject.isGetSubjectsInProgress : false,
    isSelectSubjectInProgress: state.subject ? state.subject.isSelectSubjectInProgress : false,
    user: getUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectSubject: (bank, username) => dispatch(selectBank(bank, username)),
    getMapping: data => dispatch(getMapping(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
