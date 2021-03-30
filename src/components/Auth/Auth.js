import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Input from '../Input/Input';
import * as actions from '../../store/action/Auth';
import styles from './Auth.module.css';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    isEmail: true
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    valid: false,
                    touched: false,
                    minLength: 6
                }
            },
            isSignUp: true
        }
    }

    componentDidUpdate() {
        console.log(this.state.form);
    }

    checkValidity = (value, type) => {
        let isValid = true;

        isValid = value.trim() !== '' && isValid;

        if (type.minLength) {
            isValid = value.length >= type.minLength && isValid;
        }

        if (type.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, type) => {
        const updatedForm = {
            ...this.state.form,
            [type]: {
                ...this.state.form[type],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.form[type]),
                touched: true
            }
        };
        this.setState({ form: updatedForm, isSignUp: true })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignUp)
        this.props.history.push({ pathname: '/movies' })
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key]
            });
        }

        let form = formElementArray.map(formElement => {

            return (<Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.valid}
                touched={formElement.config.touched}
                changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
            />)
        });

        return (
            <div className={styles["Auth"]}>
                <form onSubmit={this.formSubmitHandler} className={styles["Form"]}>
                    {form}
                    <button type="submit" className={styles["Button-Submit"]}>SUBMIT</button>
                </form>
                <button className={styles["Button-Switch"]} onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Auth));