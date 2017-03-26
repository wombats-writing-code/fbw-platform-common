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
      if (this.props.nextQuestion && this.props.nextOutcome) {
        cueText = (
          <p className="cue-text">
            <span>Good! Now let's </span>
            <span className="bold">{this.props.nextOutcome.displayName}</span>
            <span>.</span>
          </p>
        )

      } else if (this.props.nextQuestion && !this.props.nextOutcome) {
        cueText = <p className="cue-text">No outcome bug. Please notify your instructors.</p>

      } else if (isTarget(this.props.currentQuestion) && !this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <p className="cue-text">Nice! &thinsp;
                      <span className="try-next-target" onClick={this.props.onClickTryNextTarget}>
                        Do the next one! &uarr;
                      </span>
                    </p>

      } else if (!isTarget(this.props.currentQuestion) && !this.props.nextQuestion && !this.props.isLastTarget) {
        cueText = <p className="cue-text">Good job! You should now be able to do the next Target question. &thinsp;
                      <span className="try-next-target" onClick={this.props.onClickTryNextTarget}>
                        Try another one &uarr;
                      </span>
                    </p>

      } else if (this.props.isLastTarget) {
        cueText = <p className="cue-text">Well done!</p>
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
