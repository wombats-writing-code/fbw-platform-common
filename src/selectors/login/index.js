
export const getD2LDisplayName = (d2lUser) => {
  if (d2lUser.DisplayName && d2lUser.DisplayName.indexOf(', ') > -1) {
    let parts = d2lUser.DisplayName.split(', ');
    return parts[1] + ' ' + parts[0];

  } else if (d2lUser.FirstName && d2lUser.LastName) {
    return d2lUser.FirstName + ' ' + d2lUser.LastName;
  }
}

export const getD2LDisplayNameLastFirst = (d2lUser) => {
  if (d2lUser.DisplayName) {
    return d2lUser.DisplayName;
  }

  if (d2lUser.FirstName && d2lUser.LastName) {
    return d2lUser.LastName + ', ' + d2lUser.FirstName;
  }

  return 'No name ' + d2lUser.Identifier;
}

export const getD2LUserIdentifier = (d2lUser) => {
  return d2lUser.Identifier;
}
