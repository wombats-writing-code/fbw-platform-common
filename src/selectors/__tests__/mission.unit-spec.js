let chai = require('chai');
let path = require('path')
chai.should();

import _ from 'lodash';

const sectionQuestions = require('./section-questions.json');
import {getSectionTargets, isTargetRouteNavigated,
  isLastTargetInRoute, getRouteQuestions, pointsEarned,
  numberUnansweredTargets, grabTargetQuestionsFromRecords} from '../mission'

describe('mission selectors', () => {

  it('should return the targets of a given section', done => {
    let result = getSectionTargets([], 0);

    result.should.be.eql([]);

    done();
  });

  it('should say a route is navigated given the target', done => {
    let result = isTargetRouteNavigated(sectionQuestions[0], sectionQuestions);

    result.should.be.eql(true);

    done();
  });

  it('should say a route is navigated given the single target', done => {
    let result = isTargetRouteNavigated([
      {
        name: 'foo',
        responded: true
      }
    ], sectionQuestions);

    result.should.be.eql(true);

    done();
  });

  it('should say the given target is the last target in the section', done => {
    let section = [
      [],
      [],
      [
        {id: '1'},
        {id: '2'}
      ]
    ]
    let target = section[2][0];
    let result = isLastTargetInRoute(target, section)

    result.should.be.eql(true);

    done();
  })

  it('should return the questions when target is the first in the list', () => {
    let section = [
      [{
        id: '1',
        referenceNumber: '1'
      }, {
        id: '2',
        referenceNumber: '1.2'
      }],
      [{
        id: '3',
        referenceNumber: '2'
      }]
    ];
    let target = {
      id: '1'
    }
    let questions = getRouteQuestions(section, target);
    questions.should.be.eql(section[0]);
  })

  it('should return the questions when target is not the first in the list', () => {
    let section = [
      [{
        id: '1',
        referenceNumber: '1.1'
      }, {
        id: '2',
        referenceNumber: '1'
      }],
      [{
        id: '3',
        referenceNumber: '2'
      }]
    ];
    let target = {
      id: '2'
    }
    let questions = getRouteQuestions(section, target);
    // make sure this is NOT sorted, otherwise the student experience breaks
    questions.should.be.eql([{
      id: '1',
      referenceNumber: '1.1'
    }, {
      id: '2',
      referenceNumber: '1'
    }]);
  })
})

describe('(resultsSelector) pointsEarned', () => {

  it(`should calculate points earned for all correct`, function(done) {
    const questions = [
      {response: {
        isCorrect: true,
      }},
      {response: {
        isCorrect: true,
      }},
      {response: {
        isCorrect: true,
      }},
    ];

    let points = pointsEarned(questions);
    points.should.eql('3 / 3; 100%');

    done();
  });

  it(`should calculate points earned for all wrong`, function(done) {
    const questions = [
      {response: {
        isCorrect: false,
      }},
      {response: {
        isCorrect: false,
      }},
      {response: {
        isCorrect: false,
      }},
    ];

    let points = pointsEarned(questions);
    points.should.eql('0 / 3; 0%');

    done();
  });

  it(`should calculate points earned for none responded`, function(done) {
    const questions = [
      {response: {
        isCorrect: null,
      }},
      {response: {
        isCorrect: null,
      }},
      {response: {
        isCorrect: null,
      }},
    ];

    let points = pointsEarned(questions);
    points.should.eql('0 / 3; 0%');

    done();
  });
})

describe('grabTargetQuestionsFromRecords selector', () => {

  it(`should not return waypoint questions`, function(done) {
    const records = [
      {question: {
        referenceNumber: '1',
        id: '1'
      }},
      {question: {
        referenceNumber: '1.1',
        id: '2'
      }},
      {question: {
        referenceNumber: '2',
        id: '3'
      }},
    ];

    let targets = grabTargetQuestionsFromRecords(records);
    targets.length.should.eql(2);
    _.map(targets, 'question.id').should.eql(['1', '3']);

    done();
  });

  it(`should not return duplicate target questions`, function(done) {
    // though this should be an impossible state to reach
    const records = [
      {question: {
        referenceNumber: '1',
        id: '1'
      }},
      {question: {
        referenceNumber: '1.1',
        id: '2'
      }},
      {question: {
        referenceNumber: '2',
        id: '1'
      }},
    ];

    let targets = grabTargetQuestionsFromRecords(records);
    targets.length.should.eql(1);
    _.map(targets, 'question.id').should.eql(['1']);

    done();
  });

})

describe('numberUnansweredTargets selector', () => {

  it(`should calculate 0 targets remaining when all responded`, function(done) {
    const questions = [
      {responded: true,
       referenceNumber: '1',
       id: '1'},
      {responded: true,
       referenceNumber: '2',
       id: '2'},
      {responded: true,
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnansweredTargets(questions);
    results.should.eql(0);

    done();
  });

  it(`should not calculate unresponded targets`, function(done) {
    const questions = [
      {responded: true,
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '2',
       id: '2'},
      {responded: true,
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnansweredTargets(questions);
    results.should.eql(1);

    done();
  });

  it(`should not calculate unresponded targets with responded false`, function(done) {
    // this state should never actually happen?
    const questions = [
      {responded: true,
       referenceNumber: '1',
       id: '1'},
      {responded: false,
       referenceNumber: '2',
       id: '2'},
      {responded: true,
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnansweredTargets(questions);
    results.should.eql(1);

    done();
  });

})
