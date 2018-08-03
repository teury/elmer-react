import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import TopNavigation from './components/TopNavigation';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import BoardPage from './pages/BoardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CreateSubjectPage from './pages/CreateSubjectPage';
import CreateBoardPage from './pages/CreateBoardPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      user_details: {}
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://127.0.0.1:8000/api/users/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ user_details: json });
        });
    }
  }

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, user_details: {} });
  };

  render() {
    return (
      <React.Fragment>
        <TopNavigation
          {...this.props}
          logged_in={this.state.logged_in}
          handle_logout={this.handle_logout}
          user_details={this.state.user_details}
         />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/trending' component={TrendingPage} />
          <Route exact path='/b/:board_slug' component={BoardPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/privacy' component={PrivacyPolicyPage} />
          <Route exact path='/terms' component={TermsOfUsePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignUpPage} />
          <Route exact path='/new_post' component={CreateSubjectPage} />
          <Route exact path='/new_board' component={CreateBoardPage} />
          <Route exact path='/results' render={(props) => <SearchResultsPage {...props} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
