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
                    (<div className="question-card__solution">
                        <p className="bold uppercase">Solution</p>
                        <div className=""
                          dangerouslySetInnerHTML={{__html: this.props.question.text}}>
                        </div>
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
      <div className="question-card clearfix">
        <QuestionHeader questionTypeIcon={questionTypeIcon}
                        headerText={this.props.outcome ? this.props.outcome.displayName : ''}
                        onShowAnswer={() => this._onShowAnswer(this.props.question)}
                        isExpanded={this.state.isExpanded}
                        isExpandable={this.props.question.responded || this.props.isExpandable}
                        onToggleExpand={() => this.setState({isExpanded: !this.state.isExpanded})}
        />

      {inProgressIndicator}

      <div className="question-card__body clearfix">
      <div dangerouslySetInnerHTML={{__html: this.props.question.text}}></div>

      {choices}
      {solution}
      </div>

      {submitButton}
    </div>
    )
  }

  _onSubmitChoice = (choiceId, question) => {
    if (!this.props.isInProgressSubmitChoice) {
      $('html, body').animate({
        scrollTop: $("body")[0].scrollHeight - 30
      }, 1000);

      let choice = _.find(this.props.question.choices, {id: choiceId});

      // we'll move this logic elsewhere, but for now it belongs here
      // we cut out the Target from the response history

      console.log('this.props.routeQuestions', this.props.routeQuestions)

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
