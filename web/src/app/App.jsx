
import React from 'react';
import { Route,withRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';

import './App.css';

import { PrivateRoute } from '../routes';
import HeaderComponent from '../layoutComponents/HeaderComponent';
import FooterComponent from '../layoutComponents/FooterComponent';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import HomeComponent from '../components/home/HomeComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container fluid>
          <ToastContainer />

          <Row className="justify-content-md-center">
            <Col>
              <HeaderComponent location={this.props.location} history={this.props.history} />
              <div className='homepage m-t-80'>
                <div>
                  <Switch>
                    <PrivateRoute exact path="/dashboard" component={DashboardComponent}  />
                    <Route path="*" component={HomeComponent}  />
                  </Switch>
                </div>
              </div>
              <FooterComponent />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = {
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));