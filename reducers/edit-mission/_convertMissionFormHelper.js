import _ from 'lodash'

import { LO_SCAFFOLD_MISSION_GENUS_TYPE, PHASE_I_MISSION_RECORD_TYPE } from '../../utilities'
import {  momentToQBank, afterMidnight, beforeMidnight, utcNoon} from '../../utilities/time'


export function convertMissionForm (data, directivesItemsMap, itemBankId) {
  // Note, need to use utcNoon here, or in the editMission reducer
  //   for the edit mission form, because the rest of the code
  //   assumes the dates passed in from the datepicker are UTC noon times.
  //   If they are not forced to UTC noon, we get into weird corner case
  //   states where they can "jump" days because they are "set" to
  //   UTC again. i.e. when the editMission form is given a deadline
  //   of 1/1/2017 23:59:59, and that is passed into beforeMidnight(momentToQBank),
  //   that becomes 1/2/2017 23:59:59. Using utcNoon insures that the input
  //   to the server only uses the "date" the user picked, and disregards
  //   any crufty hours / minutes / seconds.
  return {
    displayName: data.displayName.text ? data.displayName.text : data.displayName,
    genusTypeId: data.genusTypeId,
    startTime: afterMidnight(momentToQBank(utcNoon(data.startTime))),
    deadline: beforeMidnight(momentToQBank(utcNoon(data.deadline))),
    recordTypeIds: [PHASE_I_MISSION_RECORD_TYPE],
    assessmentOfferedId: data.assessmentOfferedId, // only used for update
    sections: _.map(data.selectedDirectives, (directive) => {
      let outcomeId = directive.id,
        numItems = directivesItemsMap[outcomeId];

      return {
        type: LO_SCAFFOLD_MISSION_GENUS_TYPE,
        learningObjectiveId: outcomeId,
        quota: Math.floor(numItems / 2) || 1,
        waypointQuota: 1,
        itemBankId: itemBankId,
        minimumProficiency: (Math.floor(numItems / 4) || 1).toString()
      }
    })
  }
}
