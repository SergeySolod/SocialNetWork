import React from 'react'
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator, required} from '../../utils/validators/validators'
import userPhoto from '../../img/usersmall.png'
import {Textarea} from '../../components/FormsControl'

const  maxLength30 = maxLengthCreator(30)

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Введите текст</label>
                <Field name="newPostText" component={Textarea} className="form-control" rows="3" placeholder={'Сегодня был хороший день!'} validate={[required, maxLength30]}/>
                <div className="pt-3">
                    <button className="btn btn-primary ">Добавить пост</button>
                </div>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export const ProfilePosts = (props) => {
    if (!props.Profile) {
        return <></>
    }
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
    return (
        <div>
            <h1 className="display-4">Мои посты</h1>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <ul className="list-unstyled"> {
                props.ProfilePosts.map(post => <li className="media pt-3" key={post.id}>
                    <img src={props.Profile.photos.small || userPhoto} className="mr-3"
                         alt="Фото профиля"/>
                    <div className="media-body">
                        <h5 className="mt-0 mb-1">{post.header}</h5>
                        {post.message}
                    </div>
                </li>)
            }
            </ul>
        </div>
    )
}


