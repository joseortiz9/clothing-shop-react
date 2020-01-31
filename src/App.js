import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import HomePage from "./pages/homepage/homepage.comp";
import ShopPage from "./pages/shop/shop.comp";
import Header from "./components/header/header.comp";
import LoginRegisterPage from "./pages/login-register/login-register.comp";

import { auth } from "./firebase/firebase.utils";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth =
            auth.onAuthStateChanged(user => {
                this.setState({ currentUser:user })
            });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route path='/signin' component={LoginRegisterPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
