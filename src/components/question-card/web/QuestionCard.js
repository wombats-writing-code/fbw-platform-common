import React, { Component, }  from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import { isTarget, isSyntheticDivision } from '../../../selectors/mission';

import _ from 'lodash';

import Choices from './Choices'
import QuestionHeader from './QuestionHeader'

let styles = require('./QuestionCard.styles');
import './QuestionCard.scss';


class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoiceId: null,
      isExpanded: props.isExpanded
    }
  }
  componentDidMount() {
    if (window.MathJax) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
  }

  componentDidUpdate() {
    if (window.MathJax) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    // if (this.activeSubmitButton) {
    //   this.activeSubmitButton.focus()
    // }
  }

  render() {
    let questionCardClasses = 'question-card clearfix';

    if (isSyntheticDivision(this.props.question)) {
      questionCardClasses += ' question-card__synthetic_division';
    }

    let submitButtonText;
    if (!this.props.isInProgressSubmitChoice) {
      submitButtonText = 'Submit';

    } else {
      submitButtonText = 'Working...';
    }

    // submit button is NOT available if the props is *explicitly* set to false. if it's not set, it's available by default.
    let submitButton;
    if (this.props.isSubmitEnabled !== false) {
      if (!this.props.question.responded && !this.state.selectedChoiceId) {
        submitButton = (
          <button disabled
                  onClick={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question)}
                  className="submit-button is-disabled">
                  {submitButtonText}
          </button>);

      } else if (!this.props.question.responded && !this.props.isInProgressSubmitChoice) {
        submitButton = (<button onClick={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question)}
                                className="submit-button"
                                ref={(btn) => this.activeSubmitButton = btn}>
              {submitButtonText}
        </button>);
      }
    }

    // console.log('question', this.props.question)

    let inProgressIndicator;
    if (this.props.isInProgressShowAnswer) {
      if (isTarget(this.props.question)) {
        inProgressIndicator = (<div style={styles.inProgressIndicator}>
          <p style={_.assign({}, styles.inProgressIndicatorText, this._getTextProgressStyles())}
            onLayout={this._onProgressTextLayout}>
            Fetching the answer...you can no longer get points on this Target.
          </p>
        </div>)
      } else {
        inProgressIndicator = (
          <div style={styles.inProgressIndicator}>
            <p style={_.assign({}, styles.inProgressIndicatorText, this._getTextProgressStyles())}>
              Fetching the answer...
            </p>
          </div>
        )
      }
    }

    let questionTypeIcon;
    if (isTarget(this.props.question)) {
      if (this.props.question.responded && this.props.question.response.isCorrect) {
        questionTypeIcon = <img
          alt="Goal question"
          className="question-type-icon"
          src={require('../../../assets/target-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <img
          alt="Goal question"
          className="question-type-icon"
          src={require('../../../assets/target-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <img
          alt="Goal question"
          className="question-type-icon"
          src={require('../../../assets/target-icon@2x.png')} />
      }
    } else {
      if (this.props.question.responded && this.props.question.response.isCorrect) {
        questionTypeIcon = <img
          alt="Review question"
          className="question-type-icon"
          src={require('../../../assets/waypoint-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <img
          alt="Review question"
          className="question-type-icon"
          src={require('../../../assets/waypoint-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <img
          alt="Review question"
          className="question-type-icon"
          src={require('../../../assets/waypoint-icon@2x.png')} />
      }
    }

    // console.log('outcome:', this.props.outcome);
    // console.log('question', this.props.question)
    const solutionStateText = this.props.question.responded && this.props.question.response.isCorrect ? 'Correct!' : 'Incorrect...';

    let solution = (this.props.question.responded && this.state.isExpanded) ?
                    (<div
                      tabIndex={-1}
                      ref={(solution) => {this.solution = solution}}
                      role="group"
                      className="question-card__solution">
                        <p className="bold uppercase">{solutionStateText}</p>
                        <p className="bold uppercase">Solution</p>
                        <div className=""
                          dangerouslySetInnerHTML={{__html: this.props.question.text}}>
                        </div>
                        <div className="question-card__question-border"></div>
                        <div className=""
                          dangerouslySetInnerHTML={{__html: this.props.question.feedback}}>
                        </div>
                      </div>) : null;

    let choices = this.state.isExpanded ?
          (<Choices onSelectChoice={(choiceId) => this.setState({selectedChoiceId: choiceId})}
                      selectedChoiceId={this.state.selectedChoiceId}
                      choices={this.props.question.choices}
                      responseId={this.props.question.responded ? this.props.question.response.choice.id : null}
                      isResponseCorrect={this.props.question.responded ? this.props.question.response.isCorrect : null}/>) : null;

    return (
      <div
        role="group"
        className={questionCardClasses}>
        <QuestionHeader questionTypeIcon={questionTypeIcon}
                        headerText={this.props.outcome ? this.props.outcome.displayName : ''}
                        onShowAnswer={() => this._onShowAnswer(this.props.question)}
                        isExpanded={this.state.isExpanded}
                        isExpandable={this.props.question.responded || this.props.isExpandable}
                        onToggleExpand={() => this.setState({isExpanded: !this.state.isExpanded})}
        />

      {inProgressIndicator}

      <fieldset className="question-card__body clearfix">
        <legend dangerouslySetInnerHTML={{__html: this.props.question.text}}></legend>

        {choices}
      </fieldset>
      {solution}
      {submitButton}
    </div>
    )
  }

  _onSubmitChoice = (choiceId, question) => {
    if (!this.props.isInProgressSubmitChoice) {
      let choice = _.find(this.props.question.choices, {id: choiceId});

      // we'll move this logic elsewhere, but for now it belongs here
      // we cut out the Target from the response history

      // console.log('this.props.routeQuestions', this.props.routeQuestions)
      // setTimeout(() => {
        // let the browser automatically move to the right spot via focus, instead
        //   of trying to manually scroll. Especially since now we want it to
        //   focus / stop on the solution, instead of scrolling to the next
        //   question.
        // this.solution.focus();
        // $('html, body').animate({
        //   scrollTop: $(document).scrollTop() + ReactDOM.findDOMNode(this.solution).scrollHeight / 2
        // }, 1000);
      // 1500 seconds seems to be enough for the aria-live message
      //   about the progress state (in Mission.js) to complete,
      //   before the solution starts reading. It's a compromise,
      //   because there is a slight delay on the UI for the .focus()
      //   call. But we have to wait for the RESTful response, anyways.
      // }, 1500);
      this.props.onSubmitResponse({
        mission: this.props.mission,
        choice: choice,
        question: question,
        // responseHistory: _.tail(this.props.routeQuestions),
        responseHistory: this.props.routeQuestions,
        user: this.props.user
      });
    }
  }

}

QuestionCard.propTypes = {
  question: React.PropTypes.object.isRequired,
  outcome: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool,
  isExpandable: React.PropTypes.bool,
  isSubmitEnabled: React.PropTypes.bool
}

export default QuestionCard
