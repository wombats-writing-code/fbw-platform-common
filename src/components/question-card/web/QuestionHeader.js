import React, { Component, }  from 'react';
import _ from 'lodash';

import './QuestionHeader.scss'

class QuestionHeader extends Component {
  constructor(props) {
    super (props);

    this.state = {
      // pressAction: new Animated.Value(0)
    };
  }

  componentWillMount() {
    // this._value = 0;
    // this.state.pressAction.addListener((v) => this._value = v.value);
  }

  componentWillUnmount() {
    // this.state.pressAction.removeListener();
  }

  render() {
    let showMoreIcon, toggleButtonLabel = '';
    let ariaExpanded = false;
    if (this.props.isExpandable && !this.props.isExpanded) {
      showMoreIcon = <img
        aria-hidden
        className="expand-question-icon"
        src={require('../../../assets/show-more--down@2x.png')}/>
      toggleButtonLabel = 'Show choices';

    } else if (this.props.isExpandable && this.props.isExpanded) {
      showMoreIcon = <img
        aria-hidden
        className="expand-question-icon"
        src={require('../../../assets/show-more--up@2x.png')}/>
      toggleButtonLabel = 'Hide choices';
      ariaExpanded = true;
    }

    let toggleButton;
    if (this.props.isExpandable) {
      toggleButton = (
        <button
          aria-expanded={ariaExpanded}
          aria-label="Toggle choices and solution"
          className="expand-question-button"
          onClick={this.props.onToggleExpand}>
          {showMoreIcon}
          <p className="question-header-text toggle-question-label">{toggleButtonLabel}</p>
        </button>
      )
    }

    return (
      <div className="question-header flex-container align-center">
        {this.props.questionTypeIcon}

        <p className="question-header-text">
          <span className="bold">Goal:</span> {this.props.headerText}</p>

        {toggleButton}

      </div>
    )
  }
}

QuestionHeader.PropTypes = {
  questionTypeIcon: React.PropTypes.string.isRequired,
  onToggleExpand: React.PropTypes.func
}

export default QuestionHeader
