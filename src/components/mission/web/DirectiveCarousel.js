'use strict'

import React, {Component} from 'react'
import _ from 'lodash'

import './DirectiveCarousel.scss'

class DirectiveCarousel extends Component {

  _renderThumb = (directive, idx) => {
    // let outcome = _.find(this.props.outcomes, {id: directive.learningObjectiveId})

    let indicatorText;
    let indicatorStyle = 'carousel-thumb__icon';

    if (this.props.directiveIndicators) {
      let indicator = this.props.directiveIndicators[idx];

      // if the goal is completed, show a green or brown check
      if (indicator.isComplete && indicator.isMastered) {
        indicatorText = 'Achieved';
        indicatorStyle += ' carousel-thumb__achieved';
        // checkIcon = <img className="carousel-thumb__check" src={require('../../../assets/goal--mastered.png')}/>

      } else if (indicator.isComplete && !indicator.isMastered) {
        indicatorText = 'Completed';
        indicatorStyle += ' carousel-thumb__tried';
        // checkIcon = <img className="carousel-thumb__check" src={require('../../../assets/goal--tried.png')}/>

      // if the goal isn't completed, show how many left
      } else {
        const numberRemaining = indicator ? indicator.denominator - indicator.numerator : '?';
        indicatorText = `Unfinished (${numberRemaining})`;
        indicatorStyle += ' carousel-thumb__unfinished'
        // indicatorText = indicator ? `${indicator.numerator || '--'} of ${indicator.denominator}` : ''
      }
    }

    let displayName = directive ? directive.displayName : 'Error. Somehow this outcome is undefined';


    let isActive = idx === this.props.currentDirectiveIndex;
    let thumb = (
      <div key={idx}
          className={isActive ? "carousel-thumb is-active carousel-thumb--directive" : "carousel-thumb carousel-thumb--directive"}>
        <button className="carousel-thumb__button" onClick={() => this.props.onSelectDirective(idx)}
                aria-label={`Learning Outcome: ${displayName}; ${indicatorText}`}>
          <div className="flex-container align-bottom space-between prewrap">
            <span className={indicatorStyle}>
              {indicatorText}
            </span>
            <p className="carousel-thumb__text">{displayName}</p>
          </div>
        </button>
      </div>
    )

    return thumb;
  }

  render() {
    // let loadingBox;
    // if (!this.props.directives) {
    //   loadingBox = (
    //     <LoadingBox type="enter-active"/>
    //   )
    // } else {
    //   loadingBox = (
    //     <LoadingBox type="enter"/>
    //   )
    // }

    // console.log('DirectivesCarousel props', this.props)

    let directivesCarousel;
    if (this.props.directives && this.props.directives.length > 0) {
      directivesCarousel = (
        <div className="carousel-container directive-carousel">
          <div className="carousel flex-container">
            {_.map(this.props.directives, this._renderThumb)}
          </div>
        </div>
      )
    }

    return (
      <div id="directive-carousel" className="">
        {directivesCarousel}
      </div>

    )
  }
}

export default DirectiveCarousel
