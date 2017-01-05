
export const usernameToDisplayName = (username) => {
  if (username.indexOf('-') >= 0) {
    return `${username.split('-')[0]} ${username.split('-')[1]}`
  }

  return username
}

export const agentDisplayName = (agentId) => {
  if (!agentId) return '';

  return agentId.split('%3A')[1].split('%25')[0];
}

export const agentIdFromTakingAgentId = (agentId) => {
  if (!agentId) return '';

  return decodeURIComponent(decodeURIComponent(agentId.split('%3A')[1].split('%40')[0]));
}
