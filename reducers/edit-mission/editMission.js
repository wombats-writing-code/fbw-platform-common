 export const EDIT_MISSION = 'EDIT_MISSION'


 export const editMission = (mission, directives) => {
   return {type: EDIT_MISSION, mission, directives}
 }
