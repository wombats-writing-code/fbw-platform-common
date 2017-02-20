
export const getD2LDisplayName = (d2lUser) => {
  if (d2lUser.d2LDisplayName && d2lUser.d2LDisplayName.indexOf(', ') > -1) {
    let parts = d2LDisplayName.split(', ');
    return parts[1] + ' ' + parts[0];

  } else if (d2lUser.FirstName && d2lUser.LastName) {
    return d2lUser.FirstName + ' ' + d2lUser.LastName;
  }
}

export const getD2LUserIdentifer = (state) => {
  if (state.login.user && state.login.user.d2lUser) {
    return state.login.user.d2lUser.Identifier;
  }
}

// ==========

export const osidToDisplayName = (agentId) => {
  if (!agentId) return '';

  let username = agentId.split('%3A')[1].split('%25')[0];

  return usernameToDisplayName(username)
}

export const agentIdFromTakingAgentId = (agentId) => {
  if (!agentId) return '';

  return decodeURIComponent(decodeURIComponent(agentId.split('%3A')[1].split('%40')[0]));
}

export const agentIdFromD2LRoster = (rosterObject) => {
  if (rosterObject && rosterObject.DisplayName.indexOf(', ') > -1) {
    let parts = rosterObject.DisplayName.split(', ');
    // return parts[1] + '-' + parts[0] + '-' + rosterObject.ProfileIdentifier + '@acc.edu';
    return parts[1] + '-' + parts[0] + '-' + rosterObject.Identifier + '@acc.edu';
  }

}
