import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import HomePage from "./pages/homepage/homepage.comp";
import ShopPage from "./pages/shop/shop.comp";
import Header from "./components/header/header.comp";
import LoginRegisterPage from "./pages/login-register/login-register.comp";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

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
            auth.onAuthStateChanged(async userAuth => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot(snapshot => {
                        this.setState({ currentUser: {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                        })
                    });
                } else
                    this.setState({ currentUser: null });
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
