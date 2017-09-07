import React, {Component} from 'react'
import Spinner from 'react-spinner'
import slug from 'slug'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'

import DirectiveCarouselContainer from '../DirectiveCarouselContainer'
import DirectiveCarouselComponent from './DirectiveCarousel'
const DirectiveCarousel = DirectiveCarouselContainer(DirectiveCarouselComponent)

import TargetCarouselContainer from '../TargetCarouselContainer'
import TargetCarouselComponent from './TargetCarousel'
const TargetCarousel = TargetCarouselContainer(TargetCarouselComponent)

import QuestionsContainer from '../../questions/QuestionsContainer'
import QuestionsComponent from '../../questions/web/Questions'
const Questions = QuestionsContainer(QuestionsComponent)

import {checkMissionStatus } from '../../../utilities/time'
import { numberCorrectTargets, numberAttemptedTargets,
  numberUnansweredTargets, isTarget } from '../../../selectors/mission';

import './Mission.scss'
const styles = {
  container: {
    height: '100%'
  }
}

class Mission extends Component {
  componentDidMount() {
    let missionState = checkMissionStatus(this.props.mission);
    let mission = this.props.params && this.props.missions ?
              _.find(this.props.missions, m => slug(m.displayName) === slug(this.props.params.missionName)) :
              this.props.mission;

    // console.log('this.props', this.props)
    // console.log('slugged:', slug('test 1'))
    // console.log('mission', mission)
    // console.log('missions', this.props.missions)

    if (!this.props.doNotTakeMission && !this.props.isGetMissionInProgress && missionState !== 'over') {
      this.props.onSelectOpenMission({
        course: this.props.course,
        mission,
        user: this.props.user
      });

    } else if (missionState === 'over') {
      this.props.onSelectClosedMission({
        course: this.props.course,
        mission,
        user: this.props.user
      });
    }
  }

  currentStatus = (records) => {
    // calculate the student's:
    // # question / # correct / # unattempted
    // to show at the top of the page
    // `records` should be from this.props.mission.questions
    //    which needs to be flattened
    const targetQuestions = _.filter(_.flattenDeep(records), isTarget);
    const correct = numberCorrectTargets(targetQuestions);
    const attempted = numberAttemptedTargets(targetQuestions);
    const unattempted = numberUnansweredTargets(targetQuestions);
    return `${correct} Correct | ${attempted} Attempted | ${unattempted} Remaining`;
  }

  render() {
    // console.log('Mission.props', this.props)

    let loadingIndicator;
    if (this.props.isGetMissionInProgress) {
      return (<Spinner/>)
    }

    if (this.props.mission) {
      // console.log('this.props.mission', this.props.mission)
      let missionState = checkMissionStatus(this.props.mission)
      // console.log('checkMissionStatus', missionState, this.props.mission.questions.length)

      if (this.props.mission.questions.length === 0 && missionState === "over") {
      // if (this.props.mission.questions.length === 0 && missionState === "over") {
        return (
          <div style={[styles.container, {paddingTop: 80, paddingLeft: 30}]}>
            <div>This mission is over. You didn't open it while it was open, so you have no results here.</div>
          </div>
        )
      }
    }

    return (
      <DocumentTitle title={`Mission: ${this.props.mission.displayName}`}>
        <div>
          <div>
            <div className='current-status'>
              {this.currentStatus(this.props.mission.questions)}
            </div>
          </div>
          <nav
            tabIndex={-1}
            role="navigation"
            aria-label="Directives Menu"
            ref={ (directives) => {this.directiveCarouselRef = directives;} }>
            <DirectiveCarousel directives={this.props.directives}
                               currentDirectiveIndex={this.props.currentDirectiveIndex}
                               directiveIndicators={this.props.directiveIndicators}
                               onSelectDirective={this._onSelectDirective}
                               />
          </nav>
          <nav
            tabIndex={-1}
            className="nav-target-carousel"
            role="navigation"
            aria-label="Target Questions Menu"
            ref={ (targets) => {this.targetCarouselRef = targets;} }>
            <TargetCarousel
              onSelectTarget={this._onSelectTarget}
              mission={this.props.mission}
              />
          </nav>
          <main
            tabIndex={-1}
            ref={ (questions) => {this.questionsRef = questions;} }>
            <Questions
              mission={this.props.mission}
              isSubmitEnabled={this.props.doNotTakeMission ? false : undefined}
              onClickReturnToTargetCarousel={this.onClickReturnToTargetCarousel}
              onClickReturnToDirectiveCarousel={this.onClickReturnToDirectiveCarousel}/>
          </main>

          {loadingIndicator}
        </div>
      </DocumentTitle>
    )
  }

  _onSelectDirective = (index) => {
    this.targetCarouselRef.focus();
    this.props.onSelectDirective(index);
  }

  _onSelectTarget = (target) => {
    this.questionsRef.focus();
    this.props.onSelectTarget(target);
  }

  onClickReturnToTargetCarousel = () => {
    this.targetCarouselRef.focus();
  }

  onClickReturnToDirectiveCarousel = () => {
    this.directiveCarouselRef.focus();
  }
}

export default Mission
