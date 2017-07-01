import React, { Component, }  from 'react';

import _ from 'lodash'
import {isTarget} from '../../../selectors/mission'

import './NextCue.scss'

class NextCue extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    // console.log('inRender of NextCue', this.props.response, 'next question', this.props.nextQuestion);
    var response = this.props.response;

    var cueText;
    if (response.isCorrect) {

      // if there is a next question and a next outcome
      if (this.props.nextQuestion && this.props.nextOutcome) {

        // if the next question is a Target, this means that the student has climbed back up the scaffold
        console.log('this.props.nextQuestion', this.props.nextQuestion);
        
        if (isTarget(this.props.nextQuestion)) {
          cueText = (
            <p className="cue-text">
              <span>Good, you've climbed back up the ladder! Now let's try the original goal again: </span>
              <span className="bold">{this.props.nextOutcome.displayName}</span>
              <span>.</span>
            </p>
          )

        } else {
          cueText = (
            <p className="cue-text">
              <span>Good! Now let's </span>
              <span className="bold">{this.props.nextOutcome.displayName}</span>
              <span>.</span>
            </p>
          )
        }

      // if there is a next question but no outcome, something has gone astray and we need to check out the authoring tool
      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <p className="cue-text">No outcome bug. Please notify your instructors.</p>

      // if the current question is a Target question, and there's no next Question, and it's not the last target in the goal,
      // this means the student got it right upon first try
      } else if (isTarget(this.props.currentQuestion) && !this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <p className="cue-text">Nice! &thinsp;
                      <span className="try-next-target" onClick={this.props.onClickTryNextTarget}>
                        Do the next one! &uarr;
                      </span>
                    </p>

      // if there's no next question, and it's not the last target,
      // it means the student has reached the end of the scaffold
      } else if (!this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <p className="cue-text">Good job! You should now be able to do the next Target question. &thinsp;
                      <span className="try-next-target" onClick={this.props.onClickTryNextTarget}>
                        Try another one &uarr;
                      </span>
                    </p>

      // if the target is the last one in the goal, tell the student to review
      } else if (this.props.isLastTarget) {
        cueText = <p className="cue-text">You've reached the end of this goal. Review this goal's questions again or move on to the next goal.</p>
      }

    } else {
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
            <span >Not quite. Looks like you need to work on</span>
            <span className="bold"> {this.props.nextOutcome.displayName}</span>
            <span>.</span>
          </p>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
              <span >Not quite. Let's try to </span>
              <span className="bold">{this.props.outcome.displayName}</span>
              <span> again.</span>
          </p>
        )

      } else if (!this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <p className="cue-text">Study the solution carefully and try another Target question.</p>
      }
    }

    if (!this.props.nextQuestion) {
      // console.log('No next question');
    }

    return (
      <div className="answered-question-cue">
        {cueText}
      </div>
    )
  }
}

module.exports = NextCue;
