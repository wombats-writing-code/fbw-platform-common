import React, {Component} from 'react'
import Spinner from 'react-spinner'
import slug from 'slug'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'
import { LiveMessage } from 'react-aria-live'

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
  numberUnattemptedTargets, grabTargetQuestionsFromMission } from '../../../selectors/mission';

import './Mission.scss'
const styles = {
  container: {
    height: '100%'
  }
}

// This attempts to make the rest of the app "hidden" from screenreaders
//   while the modal is open.
if (process.env.NODE_ENV !== 'test') {
  // This was throwing an error in the mission.spec.js file,
  //    because it couldn't find a DOM element with the given ID.
  Modal.setAppElement('#root');
}

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeModal: true
    }
  }
  componentDidMount() {
    this.onCheckMissionDone();

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

  componentWillReceiveProps = (nextProps) => {
    const status = this.calculateStatus(nextProps);
    const previousStatus = this.calculateStatus();
    if (this.state.closeModal &&
        status.unattempted === 0 &&
        status.attempted > 0 &&
        previousStatus.unattempted !== status.unattempted) {
      // make sure this only checks mission status if
      //   student is working on target questions -- so if
      //   student comes back and answers waypoints, the
      //   .unattempted stays the same, so this doesn't check
      this.onCheckMissionDone();
    }
  }

  calculateStatus = (props) => {
    let currentProps = props;
    if (!currentProps) {
      currentProps = this.props;
    }
    const missionQuestionsFlat = _.flattenDeep(currentProps.mission.questions);
    const targetQuestions = grabTargetQuestionsFromMission(missionQuestionsFlat);
    return {
      correct: numberCorrectTargets(targetQuestions),
      attempted: numberAttemptedTargets(targetQuestions),
      unattempted: numberUnattemptedTargets(targetQuestions)
    }
  }

  currentStatus = () => {
    // calculate the student's:
    // # question / # correct / # unattempted
    // to show at the top of the page
    // `records` should be from this.props.mission.questions
    //    which needs to be flattened
    const status = this.calculateStatus();
    return `${status.correct} Correct | ${status.attempted} Attempted | ${status.unattempted} Remaining`;
  }

  render() {
    // console.log('Mission.props', this.props)
    // show a modal window telling them they've finished the mission, if
    //   there are 0 unattempted.
    const status = this.calculateStatus();
    const summaryString = `${status.correct} out of ${status.attempted}`; // for testing
    const statusModal = (
      <Modal
        onAfterOpen={this.onOpenModal}
        onBeforeClose={this.onClickReturnToDirectiveCarousel}
        isOpen={!this.state.closeModal}
        contentLabel="Completed Mission Summary"
      >
        <div
          aria-label={`You've answered all the goal questions for this mission. You correctly answered ${summaryString} goal questions. Feel free to return to the mission and review your questions.`}
          ref={(modal) => {this.modal = modal;}}
          tabIndex={-1}>
          <h3>Mission complete!</h3>
          <div className="modal-contents">
            <p>
              Congratulations, you've answered all the goal questions for this mission.
            </p>
            <p>
              You correctly answered {summaryString} goal questions.
            </p>
            <p>
              Feel free to close this dialog window and review the questions,
              or quit the Fly-by-Wire application.
            </p>
          </div>
          <button
            aria-label="Return to mission"
            className="close-modal-button"
            onClick={this.onCloseModal}>Return to Mission</button>
        </div>
      </Modal>
    )

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
          <LiveMessage message={`Mission: ${this.props.mission.displayName}`} aria-live="polite"/>
          <div>
            <div className='current-status'>
              <h4 className='current-status-heading'>Current Mission Status:</h4>
              {this.currentStatus()}
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
          {statusModal}
        </div>
      </DocumentTitle>
    )
  }

  _onSelectDirective = (index) => {
    this.targetCarouselRef.focus();
    this.props.onSelectDirective(index);
  }

  _onSelectTarget = (target) => {
    // this.questionsRef.focus();
    // Changing focus here causes funky / annoying scroll backwards
    //   issues in Chrome...removing.
    this.props.onSelectTarget(target);
  }

  onClickReturnToTargetCarousel = () => {
    this.targetCarouselRef.focus();
  }

  onClickReturnToDirectiveCarousel = () => {
    this.directiveCarouselRef.focus();
  }

  onOpenModal = () => {
    this.modal.focus();
  }

  onCheckMissionDone = () => {
    // delay checking to see if the modal
    //   should be opened or not.
    setTimeout(() => {
      const status = this.calculateStatus();
      if (this.state.closeModal && status.unattempted === 0 && status.attempted > 0) {
        this.setState({ closeModal: false });
      }
    }, 3000);
  }

  onCloseModal = () => {
    this.setState({ closeModal: true });
    this.directiveCarouselRef.focus();
  }
}

export default Mission
