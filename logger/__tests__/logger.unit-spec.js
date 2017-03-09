

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);




var _index=require('../index');var _index2=_interopRequireDefault(_index);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var chai=require('chai');var should=require('should');chai.should();


describe('logger middleware',function(){

it('should log',function(done){
var dispatched=(0,_index2['default'])();

done();
});

});