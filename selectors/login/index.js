Object.defineProperty(exports,"__esModule",{value:true});var _=require('lodash');

var getD2LDisplayName=exports.getD2LDisplayName=function(){function getD2LDisplayName(d2lUser){
if(!d2lUser)return null;

if(d2lUser.DisplayName&&d2lUser.DisplayName.indexOf(', ')>-1){
var parts=d2lUser.DisplayName.split(', ');
return parts[1]+' '+parts[0];

}else if(d2lUser.FirstName&&d2lUser.LastName){
return _.capitalize(d2lUser.FirstName)+' '+_.capitalize(d2lUser.LastName);
}
}return getD2LDisplayName;}();

var getD2LDisplayNameLastFirst=exports.getD2LDisplayNameLastFirst=function(){function getD2LDisplayNameLastFirst(d2lUser){
if(!d2lUser)return null;

if(d2lUser.DisplayName){
return d2lUser.DisplayName;
}

if(d2lUser.FirstName&&d2lUser.LastName){
return _.capitalize(d2lUser.LastName)+', '+_.capitalize(d2lUser.FirstName);

}else if(d2lUser.FirstName){
return _.capitalize(d2lUser.FirstName);
}

return'No name '+d2lUser.Identifier;
}return getD2LDisplayNameLastFirst;}();

var getD2LUserIdentifier=exports.getD2LUserIdentifier=function(){function getD2LUserIdentifier(d2lUser){
return d2lUser.Identifier;
}return getD2LUserIdentifier;}();