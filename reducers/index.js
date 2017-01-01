// reducers/index.js

import missionReducer from './Mission'
import editMissionReducer from './edit-mission'
import loginReducer from './Login'
import subjectReducer from './Subject'
import mappingReducer from './Mapping'
import resultReducer from './Result'
// ... other reducers

export default {
  mission: missionReducer,
  editMission: editMissionReducer,
  login: loginReducer,
  subject: subjectReducer,
  mapping: mappingReducer,
  result: resultReducer

  // ... other reducers
};
