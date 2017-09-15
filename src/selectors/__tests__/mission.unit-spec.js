let chai = require('chai');
let path = require('path')
should = chai.should();

import _ from 'lodash';

const sectionQuestions = require('./section-questions.json');
import {getSectionTargets, isTargetRouteNavigated,
  isLastTargetInRoute, getRouteQuestions, pointsEarned,
  numberUnattemptedTargets, grabTargetQuestionsFromRecords,
  numberAttemptedTargets, numberCorrectTargets,
  grabTargetQuestionsFromMission, questionResponded,
  numberUnfinishedRoutes, isSyntheticDivision,
  numberUnfinishedGoals} from '../mission'

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

describe('numberCorrectTargets selector', () => {

  it(`should count all correct`, function(done) {
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

    let results = numberCorrectTargets(questions);
    results.should.eql(3);

    done();
  });

  it(`should not count all wrong`, function(done) {
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

    let results = numberCorrectTargets(questions);
    results.should.eql(0);

    done();
  });

  it(`should not count none responded`, function(done) {
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

    let results = numberCorrectTargets(questions);
    results.should.eql(0);

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

describe('grabTargetQuestionsFromMission selector', () => {

  it(`should not return waypoint questions`, function(done) {
    const records = [
      {
        referenceNumber: '1',
        id: '1'
      },
      {
        referenceNumber: '1.1',
        id: '2'
      },
      {
        referenceNumber: '2',
        id: '3'
      },
    ];

    let targets = grabTargetQuestionsFromMission(records);
    targets.length.should.eql(2);
    _.map(targets, 'id').should.eql(['1', '3']);

    done();
  });

  it(`should not return duplicate target questions`, function(done) {
    // though this should be an impossible state to reach
    const records = [
      {
        referenceNumber: '1',
        id: '1'
      },
      {
        referenceNumber: '1.1',
        id: '2'
      },
      {
        referenceNumber: '2',
        id: '1'
      },
    ];

    let targets = grabTargetQuestionsFromMission(records);
    targets.length.should.eql(1);
    _.map(targets, 'id').should.eql(['1']);

    done();
  });

})

describe('numberUnattemptedTargets selector', () => {

  it(`should calculate 0 targets remaining when all have responseResult`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {responseResult: {},
       referenceNumber: '2',
       id: '2'},
      {responseResult: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnattemptedTargets(questions);
    results.should.eql(0);

    done();
  });

  it(`should not calculate unresponded targets with responseResult`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '2',
       id: '2'},
      {responseResult: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnattemptedTargets(questions);
    results.should.eql(1);

    done();
  });

  it(`should calculate 0 targets remaining when all responded`, function(done) {
    const questions = [
      {response: {},
       referenceNumber: '1',
       id: '1'},
      {response: {},
       referenceNumber: '2',
       id: '2'},
      {response: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnattemptedTargets(questions);
    results.should.eql(0);

    done();
  });

  it(`should not calculate unresponded targets`, function(done) {
    const questions = [
      {response: {},
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '2',
       id: '2'},
      {response: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnattemptedTargets(questions);
    results.should.eql(1);

    done();
  });
})

describe('numberAttemptedTargets selector', () => {

  it(`should calculate 3 attempted targets when all have responseResult`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {responseResult: {},
       referenceNumber: '2',
       id: '2'},
      {responseResult: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberAttemptedTargets(questions);
    results.should.eql(3);

    done();
  });

  it(`should not calculate non-responseResult targets`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '2',
       id: '2'},
      {responseResult: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberAttemptedTargets(questions);
    results.should.eql(2);

    done();
  });

  it(`should calculate 3 attempted targets when all have response`, function(done) {
    const questions = [
      {response: {},
       referenceNumber: '1',
       id: '1'},
      {response: {},
       referenceNumber: '2',
       id: '2'},
      {response: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberAttemptedTargets(questions);
    results.should.eql(3);

    done();
  });

  it(`should not calculate non-response targets`, function(done) {
    const questions = [
      {response: {},
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '2',
       id: '2'},
      {response: {},
       referenceNumber: '3',
       id: '3'},
    ];

    let results = numberAttemptedTargets(questions);
    results.should.eql(2);

    done();
  });
})

describe('isSyntheticDivision selector', () => {

  it(`should throw exception when nothing passed in`, function(done) {
    should.Throw(() => {
      isSyntheticDivision(null)
    });
    done();
  });

  it(`should throw exception when question arg has no displayName`, function(done) {
    should.Throw(() => {
      isSyntheticDivision({
        foo: 'bar'
      })
    });
    done();
  });

  it(`should return true for "synthetic division"`, function(done) {
    const results = isSyntheticDivision({
      displayName: 'synthetic division #3'
    });
    results.should.eql(true);
    done();
  });

  it(`should return true for "SYNTHETIC DIVISION"`, function(done) {
    const results = isSyntheticDivision({
      displayName: 'SYNTHETIC DIVISION #3'
    });
    results.should.eql(true);
    done();
  });

  it(`should return false for "synthetic multiplication"`, function(done) {
    const results = isSyntheticDivision({
      displayName: 'synthetic multiplication #3'
    });
    results.should.eql(false);
    done();
  });

  it(`should return false for "real division"`, function(done) {
    const results = isSyntheticDivision({
      displayName: 'real division #3'
    });
    results.should.eql(false);
    done();
  });
});

describe('questionResponded selector', () => {

  it(`should return true for responseResult`, function(done) {
    const results = questionResponded({
      responseResult: {}
    });
    results.should.eql(true);
    done();
  });

  it(`should return true for response`, function(done) {
    const results = questionResponded({
      response: {}
    });
    results.should.eql(true);
    done();
  });

  it(`should return false for no responseResult or response`, function(done) {
    const results = questionResponded({
      foo: 'bar'
    });
    results.should.eql(false);
    done();
  });
});



describe('numberUnfinishedRoutes selector', () => {

  it(`should calculate 0 when all have responseResult`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {responseResult: {},
       referenceNumber: '1.1',
       id: '2'},
      {responseResult: {},
       referenceNumber: '2',
       id: '3'},
    ];

    let results = numberUnfinishedRoutes(questions);
    results.should.eql(0);

    done();
  });

  it(`should include non-targets in the calculation`, function(done) {
    const questions = [
      {responseResult: {},
       referenceNumber: '1',
       id: '1'},
      {foo: 'bar',
       referenceNumber: '1.1',
       id: '2'},
      {responseResult: {},
       referenceNumber: '2',
       id: '3'},
      {foo: 'bar',
       referenceNumber: '2.1',
       id: '4'},
    ];

    let results = numberUnfinishedRoutes(questions);
    results.should.eql(2);

    done();
  });

  it(`should include targets in the calcuation`, function(done) {
    const questions = [
      {referenceNumber: '1',
       id: '1'},
      {referenceNumber: '2',
       id: '2'},
      {referenceNumber: '3',
       id: '3'},
    ];

    let results = numberUnfinishedRoutes(questions);
    results.should.eql(3);

    done();
  });
})

describe('numberUnfinishedGoals selector', () => {
  it(`should only count each goal once, even if multiple routes unfinished`, (done) => {
    const questions = [
      {
        isComplete: false
      },
      {
        isComplete: false
      }
    ];
    const result = numberUnfinishedGoals(questions);
    result.should.eql(2);
    done();
  });

  it(`should not count goals where all routes finished`, (done) => {
    const indicators = [
      {
        isComplete: false
      },
      {
        isComplete: true
      }
    ];
    const result = numberUnfinishedGoals(indicators);
    result.should.eql(1);
    done();
  });
});
