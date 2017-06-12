





var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _index=require('../index');var _index2=_interopRequireDefault(_index);

var _getMapping=require('../getMapping');

var _visualizeEntity=require('../visualizeEntity');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('mapping reducer',function(){

it('should update state upon GET_MAPPING_OPTIMISTIC',function(done){
var newState=(0,_index2['default'])({},{
type:_getMapping.GET_MAPPING_OPTIMISTIC,
mapping:null});


newState.isGetMappingInProgress.should.eql(true);

done();
});

it('should update state upon RECEIVE_MAPPING',function(done){
var newState=(0,_index2['default'])({},{
type:_getMapping.RECEIVE_MAPPING,
mapping:{
entities:[
{type:'MODULE',name:'foo'},
{type:'OUTCOME',name:'bar'}],

relationships:[]}});



newState.modules.length.should.eql(1);
newState.outcomes.length.should.eql(1);
newState.relationships.length.should.eql(0);
newState.isGetMappingInProgress.should.eql(false);

done();
});

it('should update state upon VISUALIZE_ENTITY',function(done){
var newState=(0,_index2['default'])({},{
type:_visualizeEntity.VISUALIZE_ENTITY,
entity:{
name:'foo'}});



newState.currentEntity.name.should.eql('foo');
done();
});

it('should update state upon CLOSE_VISUALIZE_ENTITY',function(done){
var newState=(0,_index2['default'])({},{
type:_visualizeEntity.CLOSE_VISUALIZE_ENTITY});


should.not.exist(newState.currentEntity);
done();
});
});