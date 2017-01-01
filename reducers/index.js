
import bankReducer from './Bank'
import subjectReducer from './Subject'
import missionReducer from './Mission'
import editMissionReducer from './edit-mission'
import loginReducer from './Login'
import mappingReducer from './Mapping'
import resultReducer from './Result'

// ... other reducers

export default {
  login: loginReducer,
  bank: bankReducer,
  subject: subjectReducer,
  mission: missionReducer,
  editMission: editMissionReducer,
  mapping: mappingReducer,
  result: resultReducer

  // ... other reducers
};
