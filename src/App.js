    import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import Users from './pages/Users/Users'
import ProfileContainer from "./pages/Profile/ProfileContainer";
import {Home} from './pages/Home'
import Dialogs from './pages/dialogs/dialogs'
import Login from './pages/Login'
import {connect} from 'react-redux'
import {initializeApp} from "./redux/reducers/App-reducer";
import {getInitialized} from "./redux/selectors/App-reducer";
import {compose} from "redux";
import Preloader from "./components/Preloader";


const App = (props) =>   {

    useEffect( () => {
        props.initializeApp();
    }, [] );

        if (!props.initialized) {
            return <Preloader/>
        }
        return (
            <div>
                <Navbar/>
                <div className="container pt-4">
                    <Switch>
                        <Route path='/' exact render={() => <Home/>}/>
                        <Route path='/users' exact render={() => <Users/>}/>
                        <Route path='/profile/:id' render={() => <ProfileContainer/>}/>
                        <Route path='/profile' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <Dialogs/>}/>
                        <Route path='/dialogs/:id' render={() => <Dialogs/>}/>
                        <Route path='/login' exact render={() => <Login/>}/>
                    </Switch>
                </div>
            </div>
        );
}

const mapStateToProps = (state) => {
    return (
        {
            initialized: getInitialized(state)
        }
    )
}

export default compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App);