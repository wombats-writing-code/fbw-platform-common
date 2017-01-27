import _ from 'lodash'

import { LO_SCAFFOLD_MISSION_GENUS_TYPE, PHASE_I_MISSION_RECORD_TYPE } from '../../utilities'
import {  momentToQBank, afterMidnight, beforeMidnight} from '../../utilities/time'


export function convertMissionForm (data, directivesItemsMap, itemBankId) {
  return {
    displayName: data.displayName,
    genusTypeId: data.genusTypeId,
    startTime: afterMidnight(momentToQBank(data.startTime)),
    deadline: beforeMidnight(momentToQBank(data.deadline)),
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
