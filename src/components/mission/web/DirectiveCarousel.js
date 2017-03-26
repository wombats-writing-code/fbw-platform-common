'use strict'

import React, {Component} from 'react'
import _ from 'lodash'

import { hasAchievedDirective } from '../../../selectors/mission'
import './DirectiveCarousel.scss'

class DirectiveCarousel extends Component {

  _renderThumb = (directive, idx) => {
    // let outcome = _.find(this.props.outcomes, {id: directive.learningObjectiveId})

    let indicatorText;
    if (this.props.directiveIndicators) {
      let indicator = this.props.directiveIndicators[idx];
      indicatorText = indicator ? `${indicator.numerator || '--'}/${indicator.denominator}` : '';
    }

    let displayName = directive ? directive.displayName : 'Error. Somehow this outcome is undefined';

    let isActive = idx === this.props.currentDirectiveIndex;
    let thumb = (
      <div key={idx}
          className={isActive ? "carousel-thumb is-active carousel-thumb--directive" : "carousel-thumb carousel-thumb--directive"}>
        <button className="carousel-thumb__button" onClick={() => this.props.onSelectDirective(idx)}
                aria-label={`Learning Outcome: ${displayName}`}>
          <div className="flex-container align-bottom space-between prewrap">
            <span className="carousel-thumb__icon">{indicatorText}</span>
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
          <div className="carousel flex-container align-top">
            {_.map(this.props.directives, this._renderThumb)}
          </div>
        </div>
      )
    }

    return (
      <div className="">
        {directivesCarousel}
      </div>

    )
  }
}

export default DirectiveCarousel
