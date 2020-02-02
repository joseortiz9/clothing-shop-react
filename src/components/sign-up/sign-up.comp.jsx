import React from "react";

import FormInput from "../form-input/form-input.comp";
import CustomButton from "../custom-button/custom-button.comp";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }


    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        }
        catch (e) {
            alert("ERROR: " + e);
            console.log(e);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };


    render() {
        //const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text"
                               name="displayName"
                               label="Display Name"
                               value={this.state.displayName}
                               handleChange={this.handleChange} required
                    />
                    <FormInput type="email"
                               name="email"
                               label="Email"
                               value={this.state.email}
                               handleChange={this.handleChange} required
                    />
                    <FormInput type="password"
                               name="password"
                               label="Password"
                               value={this.state.password}
                               handleChange={this.handleChange} required
                    />
                    <FormInput type="password"
                               name="confirmPassword"
                               label="Confirm Password"
                               value={this.state.confirmPassword}
                               handleChange={this.handleChange} required
                    />
                    <CustomButton type="submit"> Sign Up </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;