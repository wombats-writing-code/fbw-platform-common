import React, {Component} from 'react'
import Spinner from 'react-spinner'
import slug from 'slug'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'
import { LiveMessage } from 'react-aria-live'
import Progress from 'react-progressbar'

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
import { numberCorrectQuestions, numberAttemptedQuestions,
  numberUnattemptedQuestions, grabTargetQuestionsFromMission,
  numberUnfinishedGoals, numberUnfinishedRoutes } from '../../../selectors/mission';
import { missionConfig } from '../../../reducers/Mission';

import './Mission.scss'

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
    const status = this.calculateStatus(props);

    this.state = {
      closeModal: true,
      progressText: `${status.finished} / ${status.numberGoals} finished`
    }
  }
  componentDidMount() {
    this.div.focus();
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
    this.setState({ progressText: `${status.finished} / ${status.numberGoals} finished`});
    if (this.state.closeModal &&
        status.unfinished === 0 &&
        status.finished > 0 &&
        previousStatus.unfinished !== status.unfinished) {
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
    const unfinishedGoalQs = numberUnfinishedRoutes(missionQuestionsFlat);
    const totalGoals = currentProps.mission.questions ? targetQuestions.length : 0;
    return {
      correct: numberCorrectQuestions(targetQuestions),
      attempted: numberAttemptedQuestions(targetQuestions),
      numberGoals: totalGoals,
      finished: totalGoals - unfinishedGoalQs,
      unfinished: unfinishedGoalQs,
      unattempted: numberUnattemptedQuestions(targetQuestions)
    }
  }

  render() {
    // console.log('Mission.props', this.props)
    // show a modal window telling them they've finished the mission, if
    //   there are 0 unattempted.
    let content;
    let renderContent = true;
    const status = this.calculateStatus();
    const routeProgress = 100 * status.finished / status.numberGoals;
    // const progressString = `${status.finished} / ${status.numberGoals} finished`;
    const summaryString = `${status.correct} out of ${status.attempted}`; // for testing

    let modalContent = (
      <div
        aria-label={`You've answered all the goal questions for attempt 1. You correctly answered ${summaryString} goal questions. Feel free to return to the mission and review your questions.`}
        ref={(modal) => {this.modal = modal;}}
        tabIndex={-1}>
        <h3>Attempt <span className="bold">1</span> complete!</h3>
        <div className="modal-contents">
          <p>
            Thank you for trying all of the questions.
          </p>
          <p>
            You correctly answered {summaryString} goal questions. You will have the opportunity
            to get more goal questions right in <span className="bold">Attempt 2</span>.
          </p>
          <p>
            Click "Return to Mission" to review the questions, or you can close
            the Fly-by-Wire application.
          </p>
        </div>
        <button
          aria-label="Return to mission"
          className="close-modal-button"
          onClick={this.onCloseModal}>Return to Mission</button>
      </div>
    );

    if (this.props.mission.type === missionConfig.PHASE_II_MISSION_TYPE) {
      modalContent = (
        <div
          aria-label={`You've answered all the goal questions for attempt 2. You correctly answered ${summaryString} goal questions. Feel free to return to the mission and review your questions.`}
          ref={(modal) => {this.modal = modal;}}
          tabIndex={-1}>
          <h3>Attempt <span className="bold">2</span> complete!</h3>
          <div className="modal-contents">
            <p>
              Thank you for trying all of the questions. This will help you master the material for the exams.
            </p>
            <p>
              You correctly answered {summaryString} goal questions.
            </p>
            <p>
              Click "Return to Mission" to review the questions, or you can close
              the Fly-by-Wire application.
            </p>
          </div>
          <button
            aria-label="Return to mission"
            className="close-modal-button"
            onClick={this.onCloseModal}>Return to Mission</button>
        </div>
      )
    }

    const statusModal = (
      <Modal
        onAfterOpen={this.onOpenModal}
        onBeforeClose={this.onClickReturnToDirectiveCarousel}
        isOpen={!this.state.closeModal}
        contentLabel="Completed Attempt Summary"
      >
        {modalContent}
      </Modal>
    )
    // console.log('props in mission component', this.props)
    if (this.props.isGetMissionInProgress) {
      content = <Spinner/>;
      renderContent = false;
    }

    if (!this.props.isGetMissionInProgress && this.props.mission) {
      // console.log('this.props.mission', this.props.mission)
      let missionState = checkMissionStatus(this.props.mission)

      if (this.props.mission.goals.length === 0 && this.props.mission.type === missionConfig.PHASE_II_MISSION_TYPE) {
        content = (
          <div className="mission-done-message">
            <div>Congratulations! You aced the goals on the first attempt, so you have no second attempt questions.</div>
            <div>We encourage you to review your first attempt before your exam.</div>
          </div>
        );
        renderContent = false;
      } else if (this.props.mission.questions.length === 0 && missionState === "over") {
        content = (
          <div className="mission-done-message">
            <div>This mission is over. You didn't open it while it was open, so you have no results here.</div>
          </div>
        );
        renderContent = false;
      }
    }

    if (renderContent) {
      content = (
        <div>
          <div className="status-wrapper">
            <div className="progress-bar-wrapper">
              <Progress completed={routeProgress} color="hsla(210,29%,24%,1)"/>
            </div>
            <LiveMessage message={this.state.progressText} aria-live="assertive" />
            <h4 className="current-status-heading">
              {this.state.progressText}
            </h4>
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

          {statusModal}
        </div>
      );
    }

    return (
      <DocumentTitle title={`Mission: ${this.props.mission.displayName}`}>
        <div
          ref={(div) => { this.div = div }}
          tabIndex={-1}>
          <LiveMessage message={`Mission: ${this.props.mission.displayName}`} aria-live="polite"/>
          {content}

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
    // Prevent funky scrolling to the bottom of the
    //   questions list and then back up, by
    //   explicitly calling .scrollTo() here
    window.scrollTo(0,0);

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
      // need to check status.finished > 0 here in case they didn't even open
      //   the original mission before the deadline
      if (this.state.closeModal && status.unfinished === 0 && status.finished > 0) {
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
