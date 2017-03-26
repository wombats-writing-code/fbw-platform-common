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
    if (!this.props.mission && !this.props.isGetMissionInProgress) {
      let mission = this.props.params && this.props.missions ?
                _.find(this.props.missions, m => slug(m.displayName) === slug(this.props.params.missionName)) :
                null;

      this.props.onSelectOpenMission({
        course: this.props.course,
        mission,
        user: this.props.user
      });
    }
  }

  render() {
    let loadingIndicator;
    if (this.props.isGetMissionInProgress) {
      return (<Spinner/>)
    }


    let missionState = checkMissionStatus(this.props.mission)
    console.log('checkMissionStatus', missionState, mission)

    if (this.props.mission.questions.length === 0 && missionState === "over") {
      return (
        <div style={[styles.container, {paddingTop: 80, paddingLeft: 30}]}>
          <div>You did not participate in this mission, so you have no results.</div>
        </div>
      )
    }

    // console.log('Mission.props', this.props)

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
