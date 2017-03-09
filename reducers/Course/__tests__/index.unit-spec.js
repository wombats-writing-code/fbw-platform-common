

var _selectCourse=require('../selectCourse');
var _getItems=require('../getItems');
var _authenticateD2L=require('../../Login/authenticateD2L');
var _getD2LClassRoster=require('../getD2LClassRoster');
var _logOutUser=require('../../Login/logOutUser');

var _index=require('../index');var _index2=_interopRequireDefault(_index);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');

describe('Course reducer',function(){

it('should update state upon SELECT_COURSE',function(){
var newState=(0,_index2['default'])({},{
type:_selectCourse.SELECT_COURSE,
course:{"name":"foo"}});


newState.currentCourse.name.should.be.eql('foo');
});

it('should update state upon RECEIVE_AUTHENTICATE_D2L',function(){
var mockCourse={"name":"foo"};
var newState=(0,_index2['default'])({},{
type:_authenticateD2L.RECEIVE_AUTHENTICATE_D2L,
data:{
courses:[mockCourse]}});



newState.courses.should.be.eql([mockCourse]);
});

it('should update state upon RECEIVE_ITEMS',function(){
var newState=(0,_index2['default'])([],{
type:_getItems.RECEIVE_ITEMS,
items:['one','two']});


newState.items.should.be.eql(['one','two']);
});

it('should update state upon RECEIVE_D2L_CLASS_ROSTER',function(){
var newState=(0,_index2['default'])({},{
type:_getD2LClassRoster.RECEIVE_D2L_CLASS_ROSTER,
roster:['1','2']});


newState.roster.should.be.eql(['1','2']);
newState.isGetRosterInProgress.should.eql(false);
});

it('should clear everything in course state upon LOG_OUT',function(){
var newState=(0,_index2['default'])({},{
type:_logOutUser.LOG_OUT});


should.not.exist(newState.currentCourse);
should.not.exist(newState.items);
newState.courses.length.should.eql(0);
newState.isGetRosterInProgress.should.eql(false);
});

});