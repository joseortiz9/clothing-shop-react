import React, { useState } from "react";

import { connect } from "react-redux";

import FormInput from "../form-input/form-input.comp";
import CustomButton from "../custom-button/custom-button.comp";

import { signUpStart } from "../../redux/user/user.actions";

import './sign-up.styles.scss';


const SignUp = ({ signUpStart }) => {
    const [ userCredentials, setUserCredentials ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { displayName, email, password, confirmPassword } = userCredentials;


    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        signUpStart({ displayName, email, password });
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };


    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput type="text"
                           name="displayName"
                           label="Display Name"
                           value={displayName}
                           handleChange={handleChange} required
                />
                <FormInput type="email"
                           name="email"
                           label="Email"
                           value={email}
                           handleChange={handleChange} required
                />
                <FormInput type="password"
                           name="password"
                           label="Password"
                           value={password}
                           handleChange={handleChange} required
                />
                <FormInput type="password"
                           name="confirmPassword"
                           label="Confirm Password"
                           value={confirmPassword}
                           handleChange={handleChange} required
                />
                <CustomButton type="submit"> Sign Up </CustomButton>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    signUpStart: (userData) => dispatch(signUpStart(userData))
});

export default connect(null, mapDispatchToProps)(SignUp);