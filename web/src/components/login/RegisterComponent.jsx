import React from "react";
import { connect } from "react-redux";
import { Modal } from 'react-responsive-modal';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    loginModelOpen,
    signupModalOpen,
    signup,
    isAuth,
    isExistEmail
} from '../../actions';
import { commonService } from "../../services/commonService";

class RegisterComponent extends React.Component {
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
        this.setState({ [name]: value, email_pattern_error: false, error_msg: '' });
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
    strongPasswordValidation = () => {
        let password = this.state.password;
        console.log('password', password)
        console.log('confirm_password', this.state.confirm_password)
        if (password !== "" && password === this.state.confirm_password) {
            if (password && password.length < 8) {
                this.setState({ error_msg: "Password must contain at least eight characters", password_error: true });
                return false;
            }

            var number_regx = /[0-9]/;
            if (!number_regx.test(password)) {
                this.setState({ error_msg: "Password must contain at least one number (0-9)", password_error: true });
                return false;

            }
            var lowercase_regx = /[a-z]/;
            if (!lowercase_regx.test(password)) {
                this.setState({ error_msg: "password must contain at least one lowercase letter (a-z)", password_error: true });
                return false;

            }
            var uppercase_regx = /[A-Z]/;
            if (!uppercase_regx.test(password)) {
                this.setState({ error_msg: "password must contain at least one uppercase letter (A-Z)", password_error: true });
                return false;

            }
            this.setState({ error_msg: null, password_error: false });
            return true;
        } else {
            this.setState({ error_msg: "Please check that you've entered and confirmed your password", password_error: true });
            return false;

        }
    }
    signupSubmit = (e) => { //for submit login
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password, first_name, last_name, confirm_password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }
        if ((username && !commonService.mailPatternCheck(username))) {
            this.setState({ email_pattern_error: !commonService.mailPatternCheck(username) })
            return;
        }
        if (!this.strongPasswordValidation())
            return;

        this.setState({ loading: true });
        let email = username;
        var params = {
            email, first_name, last_name, password, password_confirmation: confirm_password
        }
        this.props.isExistEmail({ email }).then(
            response => {
                this.props.signup(params).then(
                    response => {
                        this.setState({ error: "" });
                        this.props.isAuth();
                        this.closeModel();
                        toast.success(response.message);
                        //this.getUserDetail();
                        const { from } = { from: { pathname: "/dashboard" } };
                        this.props.history.push(from);
                    },
                    error => {
                        this.setState({ error: error, loading: false });
                    }
                );
            },
            error => {
                toast.error(error);
                this.setState({ loading: false });

            }
        )


    }
    render() {
        const { username, password, first_name, last_name, confirm_password, submitted, loading, error, email_pattern_error, error_msg } = this.state;

        return (
            <React.Fragment>

                <Modal
                    className="removebbg-popup"
                    open={this.props.isSignupModalOpen && !this.props.is_auth}
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
                                    Signup to Application
                                </h5>
                            </div>
                            <div className="modal-body body-padding--value pb-0">
                                <form name="login" onSubmit={this.signupSubmit}>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !first_name ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="first_name"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="first_name"
                                            value={first_name}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !first_name && (
                                            <div className="text-danger">First Name is required</div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "form-group"
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="last_name"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="last_name"
                                            value={last_name}
                                            onChange={this.handleChange}
                                        />

                                    </div>
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

                                    <div className="form-group">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm_password"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="confirm_password"
                                            value={confirm_password}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !confirm_password && (
                                            <div className="text-danger">Confirm password is required</div>
                                        )}
                                        {submitted && error_msg && <p className="text-danger">{error_msg}</p>}
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
                                            Sign Up
                                        </button>
                                    </div>

                                    <div className="col-md-12 ">
                                        <div className="login-or text-center">
                                            <span className="span-or text-uppercase">or</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="text-center signup-here font-qmedium font-14 m-b-30">
                                            Already have an account?{" "}
                                            <Link
                                                className="signup-here--text font-qmedium font-14"
                                                id="signup"
                                                onClick={() => this.isOpenLogin(true)}
                                            >
                                                Sign In
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
    signup,
    loginModelOpen,
    signupModalOpen,
    isAuth,
    isExistEmail
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterComponent);