import React, { Component, }  from 'react';

const _ = require('lodash');
const Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
import './Choices.scss'

class Choices extends Component {
  constructor() {
    super();
    this.choiceButtonRefs = [];
  }

  componentDidMount() {
    if (this.choiceButtonRefs.length > 0) {
      this.choiceButtonRefs[0].focus()
    }
  }

  renderChoice = (choice, idx, responseId) => {

    let respondedChoiceIcon;
    // we style it a bit differently if it's a responded-to choice
    if (responseId && responseId === choice.id) {
      const imageId = `response-image-${choice.id}`;
      if (this.props.isResponseCorrect) {
        respondedChoiceIcon = <img
          alt="Correct"
          className="responded-choice-icon"
          src={require('../../../assets/responseType--correct@2x.png')} />

      } else {
        respondedChoiceIcon  = <img
          alt="Incorrect"
          className="responded-choice-icon"
          src={require('../../../assets/responseType--incorrect@2x.png')} />
      }
    }

    let isChoiceSelected = responseId && responseId === choice.id ||
                            this.props.selectedChoiceId === choice.id;

    let inactiveStyle = {pointerEvents: 'none', cursor: 'default'}

    return (
      <li
        key={choice.id}
        className={isChoiceSelected ? "choice is-selected" : "choice"}
        style={responseId && inactiveStyle}>
        <button className="choice__button"
                onClick={() => this.props.onSelectChoice(choice.id)}
                ref={(btn) => this.choiceButtonRefs.push(btn)}>

          <div className="choice__row flex-container align-center">
            <span className="choice__label">
              {Alphabet[idx]}&#x00029;
            </span>

            <div className="choice__text" dangerouslySetInnerHTML={{__html: choice.text}}></div>
            <span aria-live="polite">
              {respondedChoiceIcon}
            </span>
          </div>
        </button>
      </li>
    )
  }

  render() {
    if (!this.props.choices) return null;

    return (
      <ul className="choices" aria-controls="submitBtn">
        {_.map(this.props.choices, _.partial(this.renderChoice, _, _, this.props.responseId))}
      </ul>
    )
  }
}

Choices.propTypes = {
  selectedChoiceId: React.PropTypes.string,
  choices: React.PropTypes.array.isRequired,
  responseId: React.PropTypes.string,
  isResponseCorrect: React.PropTypes.bool,
  onSelectChoice: React.PropTypes.func.isRequired
}

export default Choices
