import _ from 'lodash'
import React, {Component} from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import './NavBar.scss'

import {getD2LDisplayName} from '../../../selectors/login'

class NavBar extends Component {

  render() {
    let props = this.props;
    let breadcrumbs = this._getPath(this.props);

    if (!props.user) {
      return null;
    }

    // console.log('props in NavBar', props)

    return (
      <div className="nav-bar flex-container align-center space-between wrap">
        <a href="/" aria-label="Home"><img
          aria-hidden
          alt-text=""
          className="nav-bar__logo"
          src={require('../../../assets/logo-site--inverted.png')}/>
        </a>
        <span className="nav-bar__app-name">{props.appName}</span>
        <ul className="breadcrumbs">
          {_.map(breadcrumbs, (crumb, idx) => {
            return (
              <li className="breadcrumb" key={`breadcrumbs_${idx}`}>
                <Link to={crumb.path} className={idx === breadcrumbs.length - 1 ? "breadcrumb__link is-inactive" : "breadcrumb__link"}>
                  {crumb.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-bar__app-control flex-container align-center space-between">
          <p className="username">
            {getD2LDisplayName(props.user)}
          </p>
          <button className="logout-button" tabIndex="1" onClick={this._logout}>
            Logout
          </button>
        </div>

      </div>
    )
  }

  _getPath(props) {
    let breadcrumbs = [{
      path: '/', name: 'Home'
    }];

    if (!props.route) {
      return breadcrumbs
    }

    switch(props.route.path) {
      case 'missions':
        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Missions'
        });
        break;

      // case 'dashboard':
      //   breadcrumbs = _.concat(breadcrumbs, {
      //     path: '/dashboard',
      //     name: 'Dashboard'
      //   });
      //   break;

      case '/missions/:missionName':
        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Missions'
        }, {
          path: props.route.path,
          name: props.routeParams.missionName
        });
        break;

      case 'dashboard/:missionName':
        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Dashboard'
        }, {
          path: props.route.path,
          name: props.routeParams.missionName
        });
        break;

      case 'students/:studentId/missions/:missionName':
        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Dashboard'
        }, {
          path: props.route.path,
          name: props.routeParams.missionName
        });
        break;
    }


    return breadcrumbs;
  }

  _getTitle(props) {
    if (props.routeParams) {
      let key = _.keys(props.routeParams)[0];
      return props.routeParams[key];
    }
  }

  _logout = () => {
    browserHistory.push('/logout-success')
    this.props.logout();
  }

}



export default NavBar
