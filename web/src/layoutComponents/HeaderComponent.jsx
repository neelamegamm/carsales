import React from "react";
import { connect } from "react-redux";
import {
    loginModelOpen,
    signupModalOpen,
    isAuth,
    getAllCarListing,
    logout,
    getUserDetails
} from '../actions';
import { Nav, Col, Row } from 'react-bootstrap';

import LoginComponent from "../components/login/LoginComponent";
import RegisterComponent from "../components/login/RegisterComponent";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'home'
        }
    }
    componentDidMount() {
        this.props.getAllCarListing();
        this.props.getUserDetails();

    }
    activateUrl = (menu) => {
        this.setState({ activeMenu: menu });
        const { from } = { from: { pathname: '/' + menu } };
        this.props.history.push(from);
    }

    loginClick = () => {
        this.props.loginModelOpen(true);
    }

    signupClick = () => {
        this.props.signupModalOpen(true);
    }
    logoutClick = () => {
        this.props.logout();
        this.props.isAuth();
        window.location.href = "/home";
    }
    render() {
        const { activeMenu } = this.state;
        const { is_auth, user_data } = this.props;
        return (
            <React.Fragment>
                <Row className="mb-5">
                    <Col lg={2}>{is_auth && user_data.first_name && <span>Hi {user_data.first_name + " " + user_data.last_name}!</span>}
                    </Col>
                    <Col lg={10}>
                        <Nav className="justify-content-end" variant="pills" activeKey={activeMenu}>
                            <Nav.Item>
                                <Nav.Link eventKey="home" onClick={() => this.activateUrl('home')}>Home</Nav.Link>
                            </Nav.Item>
                            {is_auth &&
                                <>
                                    <Nav.Item>
                                        <Nav.Link eventKey="dashboard" onClick={() => this.activateUrl('dashboard')}>Dashboard</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="logout" onClick={() => {
                                            this.logoutClick();
                                        }}>Logout</Nav.Link>
                                    </Nav.Item>
                                </>
                            }
                            {!is_auth &&
                                <>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-1" onClick={this.loginClick}>Sign In</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-2" onClick={this.signupClick}>Get Started</Nav.Link>
                                    </Nav.Item>
                                </>
                            }
                        </Nav>
                    </Col>
                </Row>
                <LoginComponent location={this.props.location} history={this.props.history} />
                <RegisterComponent location={this.props.location} history={this.props.history} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        is_auth: state.auth.is_auth,
        user_data: state.auth.user_data
    };
};

const mapDispatchToProps = {
    loginModelOpen,
    signupModalOpen,
    isAuth,
    getAllCarListing,
    logout,
    getUserDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);