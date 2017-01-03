import React, {Component} from 'react'
import { browserHistory } from 'react-router'


class D2LCallback extends Component {

  componentDidMount () {

    this.props.authenticateD2L(this.props.credentials);


    // // console.log(this.props)
    // let url = `${this.props.location.pathname}${this.props.location.search}`
    // console.log('mounted d2l callback!', url)
    // this.props.onSetD2LAuthenticatedUrl(url)
    //
    // // now get the user enrollments and set them in the global state
    // instructorCourses(credentials, url)
    // .then((instructorBanks) => {
    //   console.log("got banks", instructorBanks)
    //
    //   this.props.onReceiveBanks(instructorBanks)
    //   return whoami(credentials, url)
    // })
    // .then((response) => {
    //   // console.log('logging in', response)
    //   this.props.login('acc', stringifyUsername(response))
    //   browserHistory.push('/')
    // })
  }

  render() {
    return (
      <div>
        <h1 className="callback-text">Redirecting you to your dashboard...</h1>
      </div>
    )
  }

}

export default D2LCallback
