import React from 'react'
import {Input, Textarea} from "../../components/FormsControl";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="card-body">
                <div className="card-title">
                    <b>Имя: </b><Field placeholder={'Введите имя'} name={'fullName'} validate={[required]} component={Input}
                                       className="form-control"/>
                </div>
                <div className="card-text">
                    <b>Обо мне: </b><Field placeholder={'Напишите о себе'} name={'aboutMe'} validate={[required]} component={Textarea}
                                           className="form-control"/>
                </div>
                <div className="form-check pt-2 pb-2">
                    <Field type={'checkbox'} placeholder={''} name={'lookingForAJob'} component={Input}
                           className="form-check-input pl-5"/>
                    <label className="form-check-label"> <b>Я ищу работу</b></label>
                </div>
                <div className="card-text pb-3">
                    <b>Мои навыки: </b><Field placeholder={'Мои профессиональные навыки'}
                                              name={'lookingForAJobDescription'} validate={[required]} component={Textarea}
                                              className="form-control"/>
                </div>
                <small className='text-muted'>
                    <b>Контакты: </b> {Object.keys(props.Profile.contacts).map(key => {
                    return (
                        <div className="input-group input-group-sm mb-3" key={key}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">{key}:</span>
                                 <Field placeholder='' name={'contacts.' + key} component={Input} validate={[required]}
                                                     className="form-control"/>
                            </div>
                        </div>
                    )
                })}
                </small>
                { props.error && <div className='alert alert-danger'>
                    {props.error}
                </div>}
                <div>
                    <button className="btn btn-info">Сохранить профиль</button>
                </div>
            </div>
        </form>
    )
}

const ProfileDataFormRedux = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormRedux;