





var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);




var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);




var _getD2LClassRoster=require('../getD2LClassRoster');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();var chaiHttp=require('chai-http');chai.should();chai.use(chaiHttp);var _=require('lodash');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var D2LConfig=require('../../../d2lcredentials');