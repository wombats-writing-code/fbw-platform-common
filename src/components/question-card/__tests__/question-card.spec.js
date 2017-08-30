import React from 'react';
import QuestionCard from '../web/QuestionCard';
import {mount, shallow} from 'enzyme';


import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'


let chai = require('chai')
chai.should()

const QUESTION = require('./question.mock.json')
const QUESTION_WRONG = require('./question-wrong.mock.json')

const OUTCOME = require('./outcome.mock.json')


describe('QuestionCard', () => {
  it('should render a pristine question text, choices and outcome', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const questionCard = mount(
      <QuestionCard question={QUESTION}
                    outcome={OUTCOME}
                    isExpanded={true}
                    />,
      {attachTo: div}
    );

    questionCard.props().question.displayName.should.be.eql(QUESTION.displayName);
    questionCard.find('.choice').length.should.be.eql(4);
    questionCard.find('input[checked=true]').length.should.be.eql(0);
    questionCard.find('.is-selected').length.should.be.eql(0);
    questionCard.find('.question-header-text').text().should.be.eql('Goal: ' + OUTCOME.displayName);
    questionCard.find('.question-type-icon').first().prop('alt').should.be.eql('Review question');

    questionCard.detach();
  });

  it('should render an answered wrong question', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const questionCard = mount(
      <QuestionCard question={QUESTION_WRONG}
                    outcome={OUTCOME}
                    isExpanded={true}
                    />,
      {attachTo: div}
    );

    questionCard.find('input[checked=true]').length.should.be.eql(1);
    questionCard.find('.is-selected').length.should.be.eql(1);
    questionCard.find('.responded-choice-icon').length.should.be.eql(1);
    questionCard.find('.expand-question-icon').length.should.be.eql(1);
    questionCard.find('.toggle-question-label').length.should.be.eql(1);
    questionCard.find('.question-type-icon').first().prop('alt').should.be.eql('Goal question');

    questionCard.detach();
  });

  // after( () => {
  //
  // })

})
