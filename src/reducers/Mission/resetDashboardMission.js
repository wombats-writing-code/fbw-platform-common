// action type
export const RESET_DASHBOARD_MISSION = 'RESET_DASHBOARD_MISSION'


// action
export function resetDashboardMission(mission) {
  return {type: RESET_DASHBOARD_MISSION, mission};
}
