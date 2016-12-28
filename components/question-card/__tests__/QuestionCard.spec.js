// import 'jsdom-global/register';     // this needs to go first, before React
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
const OUTCOME = require('./outcome.mock.json')


describe('QuestionCard', () => {
  it('should render question text, choices and outcomes', () => {
    // const foo = 1;
    // foo.should.be.eql(1);

    // Render a checkbox with label in the document
    const questionCard = mount(
      <QuestionCard question={QUESTION}
                    outcome={OUTCOME}
                    isInProgressSubmitChoice={false}/>,
      {attachTo: document.body}
    );

    questionCard.props().question.displayName.text.should.be.eql("1");
    questionCard.find('.choice').length.should.be.eql(4);
    questionCard.find('.question-header-text').text().should.be.eql(OUTCOME.displayName.text);
  });
})
