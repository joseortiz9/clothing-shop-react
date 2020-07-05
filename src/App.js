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

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";


class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
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
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
