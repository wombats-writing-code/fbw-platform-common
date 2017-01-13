import React from 'react';
import QuestionCard from '../web/QuestionCard';
import {mount, shallow} from 'enzyme';


import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'
import '../../../styles/common.css'


let chai = require('chai')
chai.should()

// mock question from the 1st question of directive 7 of the Algebra Internal test mission
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

    questionCard.props().question.displayName.text.should.be.eql("1");
    questionCard.find('.choice').length.should.be.eql(4);
    questionCard.find('.question-header-text').text().should.be.eql(OUTCOME.displayName.text);

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

    questionCard.find('.is-selected').length.should.be.eql(1);
    questionCard.find('.responded-choice-icon').length.should.be.eql(1);
    questionCard.find('.expand-question-icon').length.should.be.eql(1);

    questionCard.detach();
  });

  // after( () => {
  //
  // })

})
