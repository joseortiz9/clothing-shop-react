import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import HomePage from "./pages/homepage/homepage.comp";
import ShopPage from "./pages/shop/shop.comp";
import Header from "./components/header/header.comp";
import LoginRegisterPage from "./pages/login-register/login-register.comp";

import { setCurrentUser } from "./redux/user/user.actions";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth =
            auth.onAuthStateChanged(async userAuth => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot(snapshot => {
                        setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data()
                        })
                    });
                } else
                    setCurrentUser(userAuth);
            });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route path='/signin'
                           render={ () =>
                               this.props.currentUser ?
                                   (<Redirect to='/' />) :
                                   (<LoginRegisterPage />)
                           } />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
