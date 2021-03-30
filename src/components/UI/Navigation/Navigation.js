import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import * as actions from '../../../store/action/Auth';
import styles from './Navigation.module.css';

const Navigation = (props) => {

    const logout = () => {
        props.onLogout();
        props.history.push('/auth');
    }

    const navigation = !props.email ? (
        <ul className={styles["Navigation"]}>
            <li><NavLink to="/movies" activeClassName={styles["active"]}>MOVIES</NavLink></li>
            <li><NavLink to="/auth" exact activeClassName={styles["active"]}>{props.email ? 'LOGOUT' : 'LOGIN'}</NavLink></li>
        </ul>
    ) :
        (
            <ul className={styles["Navigation"]}>
                <li onClick={() => logout()}><NavLink to="/logout">LOGOUT</NavLink></li>
            </ul>
        );
    return (
        <div>
            {navigation}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));