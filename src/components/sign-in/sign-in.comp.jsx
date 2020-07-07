import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.comp";
import CustomButton from "../custom-button/custom-button.comp";

import { emailSignInStart, googleSignInStart } from "../../redux/user/user.actions";

import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [ userCredentials, setCredentials ] = useState({ email: '', password: '' })
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    // we have to pass the before value in order to avoid null pointer exceptions,
    // trying to get the values from the input
    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type="email"
                           name="email"
                           label="email"
                           value={email}
                           handleChange={handleChange} required
                />
                <FormInput type="password"
                           name="password"
                           label="password"
                           value={password}
                           handleChange={handleChange} required
                />

                <div className="buttons">
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
})

export default connect(null, mapDispatchToProps)(SignIn);