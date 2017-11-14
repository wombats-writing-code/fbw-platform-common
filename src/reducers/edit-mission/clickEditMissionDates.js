export const CLICK_EDIT_MISSION_DATES = 'CLICK_EDIT_MISSION_DATES'
export const CANCEL_EDIT_MISSION_DATES = 'CANCEL_EDIT_MISSION_DATES'

export const clickEditMissionDates = (mission) => {
  return {type: CLICK_EDIT_MISSION_DATES, mission}
}

export const cancelEditMissionDates = () => {
  return {type: CANCEL_EDIT_MISSION_DATES}
}
