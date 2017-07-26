import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import api from '../../services/api';
import auth from '../../services/auth';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LinearProgress from 'material-ui/LinearProgress';
import { withCookies, Cookies } from 'react-cookie';
import config from '../../config.js';
import utils from '../../services/utils';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Footer from '../Footer';

// import theme from './themes/default'
if (process.env.BROWSER) {
  require('../../../public/scss/main.scss');
}

// injectGlobal`
// `

injectTapEventPlugin();

class App extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      completed: 0,
      fbInit: false,
    };
  }

  getChildContext() {
    // console.log('CHILD', this.props.setting)
    return { setting: this.props.setting };
  }

  genHash = (nextProps) => {
    // console.log('HASHED', nextProps, this.props)
    let hash = new Date().valueOf().toString(36) + Math.round(Math.random() * 100);

    let { location, history } = nextProps;

    // 1. Create hash
    let sid = utils.getPublicSidFromPath(location.pathname);
    api.createHash(hash, sid);
    // // 1.1 For story URL
    // // count dark social if story countView is true
    // if (match.params.countView) api.createHash(hash, match.params.story._id)
    // else
    // 	// 1.2 For non-story URL
    // 	api.createHash(hash)

    // 2. Append #hash to url
    // history.replace(location.pathname+'#'+hash)
    // console.log(location)
    history.replace({ hash: `#${hash}`, search: location.search });
    // this.props.router.replace({
    //   ...nextProps.location,
    //   hash:'#'+hash
    // })
  };

  progress = (completed) => {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 30;
      this.timer = setTimeout(() => this.progress(completed + diff), 100);
    }
  };

  componentWillMount() {
    // console.log('COOK', this.props.cookies)
    global.cookies = this.props.cookies;
  }

  componentDidMount() {
    // this.timer = setTimeout(() => this.progress(10), 100);
    // console.log('MOUNTED', this.props.location)
    // key'll be null if enter for the first time
    // for page refresh or re-enter on url bar, key'll have value
    if (this.props.location.hash && !this.props.location.key) {
      // direct enter with hash, mean dark social traffic
      // if have hash, send to dark social service
      // console.log('CASE 1', this.props.location)
      // console.log('nextState', nextState, nextProps)
      api.checkHash(this.props.location.hash.substring(1));
      return this.genHash(this.props);
    }
    // first time but no hash presented or have key, gen hash
    // console.log('CASE 2', this.props.location)
    return this.genHash(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("RECEIVE1", /*nextProps.location.pathname, this.props.location.pathname, */nextProps.location.action, nextProps.location.key, this.props.location.key)
    // console.log("RECEIVE2", nextProps.location.hash, nextProps.location.action)
    // console.log('componentWillReceiveProps', nextProps.history, nextProps.location, this.props.location)
    // let isFirstTime = !nextProps.location.key && !this.props.location.key
    if (nextProps.location.pathname !== this.props.location.pathname) {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }

    if (nextProps.history.action === 'PUSH') {
      // this.timer = setTimeout(() => this.progress(10), 100); //loading
      // if pushing for the next path, gen hash
      // console.log('CASE 3')
      if (
        nextProps.location.pathname !== this.props.location.pathname ||
        nextProps.location.search !== this.props.location.search
      ) {
        return this.genHash(nextProps);
      }
      // if reclick the same url
      // if(this.props.location.hash && !nextProps.location.hash) {

      //   nextProps.location.hash = this.props.location.hash
      //   console.log('XXX', this.props.location.hash, 'ZZ', nextProps.location.hash)
      // }
    }

    // occur on client side only
    // if(nextProps.setting && this.props.setting != nextProps.setting){
    // 	this.props.
    // }

    // if(nextProps.setting !== this.props.setting){
    // 	consolee.log('NOT EQUAL', nextProps.setting, this.props.setting)
    // }
    // for case POP i.e. reenter url with hash
    // console.log('CASE 4', nextProps.location, this.props.location)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (differenceWith(nextProps.children, this.props.children, isEqual)) {
      this.timer = setTimeout(() => this.progress(10), 100);
    }
    // console.log('UPDATE0', (nextProps.location.action === 'REPLACE' && !!nextProps.location.hash), nextProps.location.hash, this.props.location.hash)
    if (nextProps.location.pathname != this.props.location.pathname) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    // If intention is to change hash, no need to update component
    if (
      nextProps.history.action === 'REPLACE' &&
      nextProps.location.hash !== this.props.location.hash
    ) {
      return false;
    }
    // console.log('-- Component Updated --')
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // FB.XFBML.parse()
    clearTimeout(this.timer);
  }

  render() {
    let {
      name,
      desc,
      tagline,
      keywords,
      analytic,
      channels,
      cover,
      theme,
    } = this.props.setting.publisher;
    // console.log('SETTING', this.context.setting.publisher)
    if (!analytic) analytic = {};
    let coverMedium;
    if (cover) coverMedium = cover.medium;
    let title = (name || '') + (tagline ? ` | ${tagline}` : '');

    let { completed } = this.state;
    // let {theme} = this.context.setting.publisher

    // console.log('AGENT', navigator.userAgent)
    let context = {
      appBar: {
        height: 60,
      },
      menuItem: {
        hoverTextColor: '#FFF',
        selectedTextColor: '#FFF',
      },
      textField: {
        floatingLabelColor: theme.accentColor,
        focusColor: theme.accentColor,
      },
      flatButton: {},
      raisedButton: {},
      tabs: {
        selectedTextColor: '#FFF',
      },
    };
    if (navigator.userAgent) context.userAgent = navigator.userAgent;
    let muiTheme = getMuiTheme(context);

    return (
      <div>
        {/* <Helmet
					title={title}
					meta={[
						{ name: 'title', content: title },
						{ name: 'keywords', content: keywords },
						{ name: 'description', content: desc },
					]}
					link={[
						{
							rel: 'shortcut icon',
							type: 'image/ico',
							href: config.BACKURL + '/publishers/' + config.PID + '/favicon'
						},
						channels && channels.fb
							? { rel: 'author', href: utils.getFbUrl(channels.fb) }
							: {},
						{
							rel: 'canonical',
							href: config.FRONTURL + this.props.location.pathname
						}
					]}

				/> */}

        <ThemeProvider theme={theme}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              {!utils.isMobile() &&
                completed < 100 &&
                <LinearProgress
                  mode="determinate"
                  value={completed}
                  color={theme.accentColor}
                  style={{ position: 'absolute' }}
                />}

              <Switch>

                <Route exact path="/" component={Footer} />

              </Switch>

            </div>
          </MuiThemeProvider>
        </ThemeProvider>
      </div>
    );
  }
}

App.childContextTypes = {
  setting: PropTypes.object,
};

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.any,
  cookies: instanceOf(Cookies).isRequired,
};

export default withRouter(withCookies(App));
