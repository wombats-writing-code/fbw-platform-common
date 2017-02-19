

export const getDisplayNameFromD2LUser = (d2lUser) => {
  if (!d2lUser) {
    return new TypeError('the d2l user object with FirstName and LastName fields must be provided');
  }

  let parts = d2lUser.DisplayName.split(', ');

  return parts[1] + ' ' + parts[0];
}


export const usernameToDisplayName = (username) => {
  if (username.indexOf('-') >= 0) {
    return `${username.split('-')[0]} ${username.split('-')[1]}`
  }

  return username
}

export const d2LDisplayNameToDisplayName = (d2LDisplayName) => {
  if (d2LDisplayName && d2LDisplayName.indexOf(', ') > -1) {
    let parts = d2LDisplayName.split(', ');
    return parts[1] + ' ' + parts[0];
  }
}

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
