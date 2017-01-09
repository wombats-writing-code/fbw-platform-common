import React, { Component, }  from 'react';
import $ from 'jquery'
import { isTarget } from '../../../selectors/mission';

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
      isExpanded: (props.isExpanded === false) ? false : true
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

    if (this.activeSubmitButton) {
      this.activeSubmitButton.focus()
    }
  }

  render() {
    let submitButtonText;
    if (!this.props.isInProgressSubmitChoice) {
      submitButtonText = 'Submit';

    } else {
      submitButtonText = 'Working...';
    }

    let submitButton;
    if (!this.props.question.responded && !this.state.selectedChoiceId) {
      submitButton = (
        <button disabled
                onClick={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question.id)}
                className="submit-button is-disabled">
                {submitButtonText}
        </button>);

    } else if (!this.props.question.responded && !this.props.isInProgressSubmitChoice) {
      submitButton = (<button onClick={() => this._onSubmitChoice(this.state.selectedChoiceId, this.props.question.id)}
                              className="submit-button"
                              ref={(btn) => this.activeSubmitButton = btn}>
            {submitButtonText}
      </button>);
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
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/target-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/target-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/target-icon@2x.png')} />
      }
    } else {
      if (this.props.question.responded && this.props.question.response.isCorrect) {
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/waypoint-icon--correct@2x.png')} />

      } else if (this.props.question.responded && !this.props.question.response.isCorrect) {
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/waypoint-icon--incorrect@2x.png')} />

      } else {
        questionTypeIcon = <img className="question-type-icon" src={require('../../../assets/waypoint-icon@2x.png')} />
      }
    }

    // console.log('outcome:', this.props.outcome);
    // console.log('question', this.props.question)

    let solution = (this.props.question.responded && this.state.isExpanded) ?
                    (<div className="solution">
                        <p className="bold">Solution</p>
                        <div className="question-card__body"
                          dangerouslySetInnerHTML={{__html: this.props.question.response.feedback.text}}>
                        </div>
                      </div>) : null;

    let choices = this.state.isExpanded ?
          (<Choices onSelectChoice={(choiceId) => this.setState({selectedChoiceId: choiceId})}
                      selectedChoiceId={this.state.selectedChoiceId}
                      choices={this.props.question.choices}
                      responseId={this.props.question.responded ? this.props.question.response.choiceIds[0] : null}
                      isResponseCorrect={this.props.question.isCorrect}/>) : null;

    return (
      <div className="question-card clearfix">
        <QuestionHeader questionTypeIcon={questionTypeIcon}
                        headerText={this.props.outcome ? this.props.outcome.displayName.text : ''}
                        onShowAnswer={() => this._onShowAnswer(this.props.question)}
                        isExpanded={this.state.isExpanded}
                        isExpandable={this.props.question.responded}
                        onToggleExpand={() => this.setState({isExpanded: !this.state.isExpanded})}
        />

      {inProgressIndicator}

      <div className="question-card__body clearfix">
      <div dangerouslySetInnerHTML={{__html: this.props.question.text.text}}></div>

      {choices}
      {solution}
      </div>

      {submitButton}
    </div>
    )
  }

  _onSubmitChoice = (choiceId, questionId) => {
    if (!this.props.isInProgressSubmitChoice) {
      $('html, body').animate({
        scrollTop: $("body")[0].scrollHeight - 30
      }, 1000);

      this.props.onSubmitResponse({
        bankId: this.props.bank.id,
        // bankId: this.props.privateBankId,
        choiceId: choiceId,
        questionId: questionId,
        section: this.props.section,
        username: this.props.user.username
        // username: this.props.username
      });
    }
  }

  _onShowAnswer = (questionItem) => {
    if (!this.props.isInProgressShowAnswer) {
      this.props.onShowAnswer({
        // bankId: this.props.privateBankId,
        bankId: this.props.bank.id,
        questionId: this.props.question.id,
        section: this.props.section,
        username: this.props.user.username
      });
    }
  }
}

QuestionCard.propTypes = {
  question: React.PropTypes.object.isRequired,
  outcome: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool
}

export default QuestionCard
