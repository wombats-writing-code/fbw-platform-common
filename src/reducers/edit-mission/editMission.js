 export const EDIT_MISSION = 'EDIT_MISSION'


 export const editMission = (mission, outcomes) => {
   return {type: EDIT_MISSION, mission, outcomes}
 }
