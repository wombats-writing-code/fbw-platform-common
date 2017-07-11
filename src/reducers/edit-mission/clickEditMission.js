export const CLICK_EDIT_MISSION = 'CLICK_EDIT_MISSION'
export const CANCEL_EDIT_MISSION = 'CANCEL_EDIT_MISSION'

export const clickEditMission = (mission) => {
  return {type: CLICK_EDIT_MISSION, mission}
}

export const cancelEditMission = () => {
  return {type: CANCEL_EDIT_MISSION}
}
