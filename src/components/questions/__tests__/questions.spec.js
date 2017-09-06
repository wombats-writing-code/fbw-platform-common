import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import QuestionsComponent from '../web/Questions';
import QuestionsContainer from '../QuestionsContainer'
const Questions = QuestionsContainer(QuestionsComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('Questions', () => {

  let mockStore = configureStore([]);
  let connectedQuestions, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedQuestions = mount(
      <Provider store={store}>
        <Questions  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render a list of 2 answered question cards and 1 pristine card for an over mission', () => {
    const questions = connectedQuestions.find(Questions)

    // questions.props().questions.length.should.be.eql(3);
    questions.find('.question-card').length.should.be.eql(3);
    questions.find('.choice').length.should.be.eql(4);
    questions.find('.is-selected').length.should.be.eql(0);
    questions.find('.answered-question-cue').length.should.be.eql(2);

    // Cannot submit to an "over" mission
    questions.find('.submit-button').length.should.be.eql(0);
  });

  it('should include a (hidden) skip link to directives', () => {
    const questions = connectedQuestions.find(Questions)
    questions.find('#skip-link-to-directive-carousel').length.should.eql(1);
  });

  it('should include a (hidden) skip link to targets', () => {
    const questions = connectedQuestions.find(Questions)
    questions.find('#skip-link-to-target-carousel').length.should.eql(1);
  });

  after( () => {
    connectedQuestions.detach();
  })
});
