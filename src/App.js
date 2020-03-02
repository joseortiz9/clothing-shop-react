import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";

import './App.css';
import HomePage from "./pages/homepage/homepage.comp";
import ShopPage from "./pages/shop/shop.comp";
import Checkout from "./pages/checkout/checkout.comp";
import Header from "./components/header/header.comp";
import LoginRegisterPage from "./pages/login-register/login-register.comp";

import { setCurrentUser } from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {selectShopCollectionsForPreview} from './redux/shop/shop.selectors'

import {auth, createUserProfileDocument, addCollectionAndDocuments} from "./firebase/firebase.utils";


class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser, collectionsArray } = this.props;

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

                addCollectionAndDocuments(
                    'collections',
                    collectionsArray.map(({title, items}) => ({title, items})));
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
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={Checkout} />
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


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: selectShopCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
