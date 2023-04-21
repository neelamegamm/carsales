import React from "react";
import { connect } from "react-redux";
import { Modal } from 'react-responsive-modal';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    loginModelOpen,
    login,
    signupModalOpen,
    isAuth
} from '../../actions';
import { commonService } from "../../services/commonService";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitted: false,
            loading: false,
            redirect_open: false,
            error: ""
        };
    }

    onCloseModal = () => { }

    isOpenLogin = (type) => {
        this.cleatState();

        if (type) {
            this.props.loginModelOpen(true);
            this.props.signupModalOpen(false);
        }
        else {
            this.props.loginModelOpen(false);
            this.props.signupModalOpen(true);
        }
    }
    
    closeModel = () => { //for close the login model
        this.cleatState();
        this.props.loginModelOpen(false);
        this.props.signupModalOpen(false);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    cleatState = () => {
        this.setState({
            username: "",
            password: "",
            submitted: false,
            loading: false,
            error: "",
            email_pattern_error: false
        });
    }

    loginSubmit = (e) => { //for submit login
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }
        if ((username && !commonService.mailPatternCheck(username))) {
            this.setState({ email_pattern_error: !commonService.mailPatternCheck(username) })
            return;
        }

        this.setState({ loading: true });
        let email = username;
        this.props.login(email, password).then(
            response => {
                this.setState({ error: "" });
                this.props.isAuth();
                this.closeModel();
                toast.success(response.message);
               // this.getUserDetail();
                const { from } = { from: { pathname: "/dashboard" } };
                this.props.history.push(from);
            },
            error => {
                this.setState({ error: error, loading: false });
            }
        );
    }
    render() {
        const { username, password, submitted, loading, error, email_pattern_error } = this.state;

        return (
            <React.Fragment>
                <Modal
                    className="removebbg-popup"
                    open={this.props.isLoginModelOpen && !this.props.is_auth}
                    onClose={this.closeModel}
                    center
                >
                    <div className="modal-dialog modal-width--custom m-t-80" role="document">
                        <div className="modal-content">
                            <div className="modal-header header-styling  border-0">
                                <h5
                                    className="modal-title text-center col-md-11 p-0 font-semibold"
                                    id="exampleModalLabel font-medium"
                                >
                                    Login to Application
                                </h5>
                            </div>
                            <div className="modal-body body-padding--value pb-0">
                                <form name="login" onSubmit={this.loginSubmit}>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !username ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="username"
                                            value={username}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !username && (
                                            <div className="text-danger">Email is required</div>
                                        )}
                                        {submitted && username && email_pattern_error && (
                                            <div className="text-danger">Not a valid email</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="password"
                                            value={password}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !password && (
                                            <div className="text-danger">Password is required</div>
                                        )}
                                    </div>
                                    <div className="text-center form-group">
                                        {error && <span className="text-danger">{error}</span>}
                                    </div>

                                    <div className="col-md-12 text-center p-0">
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="btn btn-primary mt-2"
                                        >
                                            Login
                                        </button>
                                    </div>

                                    <div className="col-md-12 ">
                                        <div className="login-or text-center">
                                            <span className="span-or text-uppercase">or</span>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <p className="text-center signup-here font-qmedium font-14 m-b-30">
                                            Not got an account?{" "}
                                            <Link
                                                //to="/register"
                                                className="signup-here--text font-qmedium font-14"
                                                id="signup"
                                                onClick={() => { this.isOpenLogin(false) }}
                                            >
                                                Sign up here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
               
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoginModelOpen: state.headerinfo.isLoginModelOpen,
        isSignupModalOpen: state.headerinfo.isSignupModalOpen,
    };
};

const mapDispatchToProps = {
    login,
    loginModelOpen,
    signupModalOpen,
    isAuth
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);