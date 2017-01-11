// import reducer from '../index'
//
// let chai = require('chai');
// let should = require('should');
// chai.should();
// const chaiHttp = require('chai-http');
// chai.should();
// chai.use(chaiHttp);
//
// const _ = require('lodash')
// const Q = require('q')
//
// import thunk from 'redux-thunk'
// import configureMockStore from 'redux-mock-store'
// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)
//
// import {getSectionQuestions} from '../getMissions'
//
// describe('getSectionQuestions', () => {
//   it('should call getSectionQuestions and receive a list of questions', function(done) {
//     this.timeout(15000);
//
//     const store = mockStore({})
//
//     store.dispatch(getSectionQuestions({
//       mission: '',
//       sectionId: '',
//     }))
//     .then(res => {
//       // console.log(' res', res);
//       res.should.be.a('array');
//       res.length.should.be.at.least(10);    // as of Jan 10, 2017
//
//       done();
//     });
//   })
// })
