import React from "react";

import SignIn from "../../components/sign-in/sign-in.comp";

import './login-register.styles.scss';
import SignUp from "../../components/sign-up/sign-up.comp";

const LoginRegisterPage = () => (
    <div className="login-register">
        <SignIn />
        <SignUp />
    </div>
);

export default LoginRegisterPage;