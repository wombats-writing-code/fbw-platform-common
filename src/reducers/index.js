
import courseReducer from './Course'
import missionReducer from './Mission'
import editMissionReducer from './edit-mission'
import loginReducer from './Login'
import mappingReducer from './Mapping'
import resultReducer from './Result'

// ... other reducers

export default {
  login: loginReducer,
  course: courseReducer,
  mission: missionReducer,
  editMission: editMissionReducer,
  mapping: mappingReducer,
  result: resultReducer

  // ... other reducers
};
