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
                   response={questionItem.response}
                   outcome = {outcome}
                   nextQuestion={nextQuestion}
                   nextOutcome={nextOutcome}
                   onClickTryNextTarget={() => this.props.onClickTryNextTarget(questionItem, this.props.mission)}
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

    let isSubmitEnabled = checkMissionStatus(this.props.mission) === 'over' ? false : true;

    return (
      <li key={`${questionItem.id}-${idx}`} className="questions-list__item">
        <div className="row">
          <div className="medium-9 medium-centered large-8 large-centered columns">
            <QuestionCard question={questionItem} outcome={outcome} isExpanded={isExpanded} isSubmitEnabled={isSubmitEnabled}/>
          </div>
        </div>

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
      </div>
    )
  }
}

export default Questions
