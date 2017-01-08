
export const usernameToDisplayName = (username) => {
  if (username.indexOf('-') >= 0) {
    return `${username.split('-')[0]} ${username.split('-')[1]}`
  }

  return username
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