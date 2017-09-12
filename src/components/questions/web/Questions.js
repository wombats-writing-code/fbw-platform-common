import React, {Component} from 'react'
import {checkMissionStatus} from '../../../utilities/time'

import _ from 'lodash';
import $ from 'jquery';
import Spinner from 'react-spinner'

import QuestionCardContainer from '../../question-card/QuestionCardContainer'
import QuestionCardComponent from '../../question-card/web/QuestionCard'
const QuestionCard = QuestionCardContainer(QuestionCardComponent)

import NextCue from './NextCue'
// var ShowAnswerPrompt = require('./show-answer/ShowAnswerPrompt');
// var ShowAnswer = require('./show-answer/ShowAnswer');

import './Questions.scss'

class Questions extends Component {

  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isInProgressSubmitChoice && !this.props.isInProgressSubmitChoice) {
      let nextCueTop = $('.answered-question-cue').last();
      // console.log('scroll to', nextCueTop);
      $("html, body").animate({ scrollTop: nextCueTop.offset.top }, 1000);
    }

    // if (prevProps.questions !== this.props.questions) {
    //   console.log('questions changed')
    // }

    if (prevProps.currentTarget !== this.props.currentTarget) {
      // console.log('prev target', prevProps.currentTarget, 'currentTarget', this.props.currentTarget)
      $("html, body").animate({ scrollTop: 0 }, 1000);
    }
  }

  renderListRow = (questionItem, idx) => {
    let outcome = _.find(this.props.outcomes, {id: questionItem.outcome});

    // console.log( this.props.questions.length, 'questions', this.props.questions);

    let nextQuestion;
    let nextCue;
    if (questionItem.responded) {
      // let hasNextQuestion = (questionItem !== _.last(this.props.questions));
      nextQuestion = this.props.questions[parseInt(idx)+1];

      let nextOutcome;
      if (nextQuestion && questionItem.response.isCorrect) {
        nextOutcome = _.find(this.props.outcomes, {id: nextQuestion.outcome});

      } else if (nextQuestion && questionItem.response.choice.confusedOutcomes && !questionItem.response.isCorrect){
        nextOutcome = _.find(this.props.outcomes, {id: questionItem.response.choice.confusedOutcomes[0]});
      }

      nextCue = (
          <NextCue isLastTarget={this.props.isLastTarget}
                  currentQuestion={questionItem}
                  isFirstQuestion={idx === 0}
                   response={questionItem.response}
                   outcome = {outcome}
                   nextQuestion={nextQuestion}
                   nextOutcome={nextOutcome}
                   currentPath={this.props.currentPath}
                   onClickReturnToDirectiveCarousel={this.props.onClickReturnToDirectiveCarousel}
                   onClickReturnToTargetCarousel={this.props.onClickReturnToTargetCarousel}
          />
      )
    }

    // ==== determines if question card should be expanded
    let isExpanded;
    // console.log('questionItem', questionItem)
    if (!questionItem.responded) {
      isExpanded = true;
    } else {
      if (questionItem === _.last(this.props.questions)) {
        isExpanded = true;
      }
    }

    let isSubmitEnabled = checkMissionStatus(this.props.mission) === 'over' || (this.props.isSubmitEnabled === false) ? false : true;

    let questionCard = (
      <div className="row">
        <div className="medium-9 medium-centered large-8 large-centered columns">
          <QuestionCard question={questionItem} outcome={outcome} isExpanded={isExpanded} isSubmitEnabled={isSubmitEnabled}/>
        </div>
      </div>
    )

    if (questionItem === _.last(this.props.questions)) {
      questionCard = (
        <div className="row" id="main-content" tabIndex={-1}>
          <div className="medium-9 medium-centered large-8 large-centered columns">
            <QuestionCard
              question={questionItem}
              outcome={outcome}
              isExpanded={isExpanded}
              isSubmitEnabled={isSubmitEnabled}/>
          </div>
        </div>
      )
    }

    return (
      <li
        key={`${questionItem.id}-${idx}`}
        className="questions-list__item">
        {questionCard}

        {nextCue}
      </li>
    )
  }

  render() {
    // console.log('this.props of Questions.js', this.props);

    if (!this.props.questions) {
      return null;
    }



    // console.log('will render questions', this.props.questions);
    let inProgressIndicator;
    if (this.props.isInProgressSubmitChoice) {
      inProgressIndicator = (
        <div className="text-center">
          <p>Please wait while we check your answer...</p>
          <Spinner />
        </div>);
    }


    let infiniteTimelineHeight = {
      height: this.props.questionListHeight,
    };

    let infiniteTimeline = (<div></div>);

    return (
      <div className="questions">
        {infiniteTimeline}
        <ul className="questions-list">
          {_.map(this.props.questions, this.renderListRow)}
        </ul>

        {inProgressIndicator}
        <div id="skip-link-to-directive-carousel">
          <a
            href="#directive-carousel"
            className="element-invisible element-focusable"
            onClick={this._skipToDirectiveCarousel}>Skip to goals</a>
        </div>
        <div id="skip-link-to-target-carousel">
          <a
            href="#target-carousel"
            className="element-invisible element-focusable"
            onClick={this._skipToTargetCarousel}>Skip to goal questions</a>
        </div>
      </div>
    )
  }

  _skipToDirectiveCarousel = () => {
    // need to shift focus to the directive carousel...
    // kind of hacky, as stated here:
    //   https://stackoverflow.com/questions/37956513/react-router-reset-focus-on-route-change-accessibility#37957318
    // But don't feel like passing refs through so many other
    //   components...
    document.getElementById('directive-carousel').focus();
  }

  _skipToTargetCarousel = () => {
    // need to shift focus to the target carousel...
    // kind of hacky, as stated here:
    //   https://stackoverflow.com/questions/37956513/react-router-reset-focus-on-route-change-accessibility#37957318
    // But don't feel like passing refs through so many other
    //   components...
    document.getElementById('target-carousel').focus();
  }
}

export default Questions
