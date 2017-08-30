'use strict'

import React, {Component} from 'react'
import {targetStatus, targetKey } from '../../../selectors/mission'

var _ = require('lodash');

import './TargetCarousel.scss'

class TargetCarousel extends Component {
  constructor() {
    super();
    this.buttonRefs = [];
  }

  componentDidUpdate() {
    // let's shift focus to here, so keyboard users
    // know that they should navigate within targets
    if (this.props.targets && this.props.targets.length > 0 && !this.props.currentTarget) {
      _.compact(this.buttonRefs)[0].focus()
    }
  }

  _renderTarget = (target, idx) => {
    let targetNumber = targetKey(target)
    let sectionQuestions = this.props.currentMissionSections[this.props.currentDirectiveIndex]
    let targetRouteQuestions = sectionQuestions[idx];

    // console.log('targetNumber', targetNumber);
    // console.log('sectionQuestions', sectionQuestions)
    // console.log('targetRouteQuestions', targetRouteQuestions)
    //
    // console.log('currentDirectiveIndex', this.props.currentDirectiveIndex)
    // console.log('idx', idx)

    let status = targetStatus(target, targetRouteQuestions);
    let statusText = 'Unattempted';
    let image;
    switch(status) {
      case 'COMPLETE':
        image = <img
          alt="Correct goal question"
          className="target-icon"
          src={require('../../../assets/target-question--correct@2x.png')}/>;
        statusText = 'Correct';
        break;
      case 'FAIL':
        image = <img
          alt="Incorrect goal question"
          className="target-icon"
          src={require('../../../assets/target-question--incorrect@2x.png')}/>;
        statusText = 'Incorrect goal question, route incomplete';
        break;
      case 'NAVIGATED':
        image = <img
          alt="Navigated goal question route"
          className="target-icon"
          src={require('../../../assets/target-question--navigated@2x.png')}/>;
        statusText = 'Incorrect goal question, route complete';
        break;
      case 'PRISTINE':
        image = <img
          alt="Unattempted goal question"
          className="target-icon"
          src={require('../../../assets/target-question@2x.png')}/>;
        break;

      default:
        console.warn('Warning: unrecognized status', status);
        image = <img
          alt="Unattempted goal question"
          src={require('../../../assets/target-question@2x.png')}/>;
    }

    // let accessibilityLabel = `Target Question ${target.displayName}`;
    let isActive = targetNumber === targetKey(this.props.currentTarget);
    if (idx === 0) {
      this.buttonRefs = []
      // for some reason this was not getting set to [], and thus
      // the new button refs kept being appended
    }
    let thumb = (
      <li key={target.id} className={isActive ? "carousel-thumb is-active" : "carousel-thumb"}
          onClick={() => this.props.onSelectTarget(target)}>
        <button className="carousel-thumb__button" ref={(btn) => this.buttonRefs.push(btn)}
          aria-label={`Goal Question ${targetNumber}; ${statusText}`}>
          <div className="flex-container align-center">
            {image}
            <p className="carousel-thumb__text carousel-thumb__text--target">#{target.referenceNumber}</p>
          </div>
        </button>
      </li>
    )

    return thumb;

  }

  render() {
    // let totalQuestions = this.props.targets.length || 0,
      // requiredAccessibilityLabel = `Required: ${this.props.requiredNumber} of ${totalQuestions}`;
    if (!this.props.targets ||
        (this.props.targets && this.props.targets.length === 0)) {
      return (
        <div></div>
      )
    }

    this.buttonRefs = []
    return (
      <div id="target-carousel" className="carousel-container flex-container align-top">
        <ul className="carousel flex-container align-center" >
          {_.map(this.props.targets, this._renderTarget)}
        </ul>
      </div>
    )
  }

}

export default TargetCarousel
