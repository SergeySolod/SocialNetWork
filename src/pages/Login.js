import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux'
import {login} from "../redux/reducers/Auth-reducer";
import {getAuth, reqCaptchaUrl} from "../redux/selectors/Auth-selector";
import {Redirect} from "react-router-dom";
import {Input} from "../components/FormsControl";
import {required} from '../utils/validators/validators'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Введите email</label>
                <Field placeholder={'Логин'} name={'email'} validate={[required]} component={Input}
                       className="form-control"/>
            </div>
            <div className="form-group">
                <Field placeholder={'Пароль'} name={'password'} validate={[required]} component={Input}
                       className="form-control" type={"password"}/>
            </div>

            {props.captchaUrl && <img className="img-thumbnail" src={props.captchaUrl}/>}
            {props.captchaUrl &&   <Field placeholder={'Введите символы с картинки'} name={'captcha'} validate={[required]} component={Input}
                className="form-control"/>}

            { props.error && <div className='alert alert-danger'>
                {props.error}
            </div>}
            <div className="form-group form-check">
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} className="form-check-input"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Запомнить меня</label>
            </div>
            <button class="btn btn-primary">Войти</button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }


    return (
        <div>
            <h1 className="display-4">Вход</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    captchaUrl: reqCaptchaUrl(state),
    isAuth: getAuth(state)
})


export default connect(mapStateToProps, {login})(Login);
