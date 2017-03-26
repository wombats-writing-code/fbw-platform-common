import React, {Component} from 'react'
import Spinner from 'react-spinner'
import slug from 'slug'

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
              null;

    if (!this.props.isGetMissionInProgress && missionState !== 'over') {
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
      <div>
        <nav role="navigation" aria-label="Directives Menu">
          <DirectiveCarousel directives={this.props.directives}
                            currentDirectiveIndex={this.props.currentDirectiveIndex}
                            directiveIndicators={this.props.directiveIndicators}
                              onSelectDirective={this.props.onSelectDirective}/>
        </nav>
        <nav className="nav-target-carousel" role="navigation" aria-label="Target Questions Menu">
          <TargetCarousel mission={this.props.mission}/>
        </nav>
        <main>
          <Questions mission={this.props.mission} />
        </main>

        {loadingIndicator}
      </div>
    )
  }

}

export default Mission
