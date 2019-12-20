import React, {useState} from 'react'
import {Redirect} from "react-router-dom";

import Preloader from "../../components/Preloader";
import userPhoto from '../../img/user.png'
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm";

const Profile = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.Profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        )
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.Profile.photos.large || userPhoto} className="card-img" alt="Фото профиля"/>
                        {props.isOwner && <div className="custom-file">
                            <input className="custom-file-input" type={"file"} onChange={onMainPhotoSelected}/>
                            <label className="custom-file-label">Выбрать файл</label>
                        </div>}
                        <div className="pt-1 pb-1 pl-2">
                            <p className="card-text"><ProfileStatus status={props.status}
                                                                    updateStatus={props.updateStatus}/></p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {editMode ? <ProfileDataForm initialValues={props.Profile} Profile={props.Profile} onSubmit={onSubmit}/> :
                            <ProfileData Profile={props.Profile} isOwner={props.isOwner} goToEditMode={() => {
                                setEditMode(true)
                            }}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return (
        <div className="card-body">

            <h5 className="card-title"><b>Имя:</b> {props.Profile.fullName}</h5>
            <p className="card-text"><b>Обо мне:</b> {props.Profile.aboutMe}</p>
            <p className="card-text"><b>Поиск работы:</b> {props.Profile.lookingForAJob ? "ищу работу" : "не ищу работу"}
            </p>
            <p className="card-text"><b>Мои навыки:</b> {props.Profile.lookingForAJobDescription}</p>
            <p className="card-text">
                <small
                    className="text-muted">Контакты: {Object.keys(props.Profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={props.Profile.contacts[key]}/>
                })}</small>
            </p>
            {props.isOwner &&
            <button onClick={props.goToEditMode} type="button" className="btn btn-info">Редактировать профиль</button>}
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default Profile;