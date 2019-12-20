import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";

import {sendMessage} from '../../redux/reducers/dialogs-reduser'
import {getDialogs} from '../../redux/selectors/dialogs-reduser'
import {NavLink} from "react-router-dom";
import {Input} from "../../components/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const  maxLength100 = maxLengthCreator(100)

const Dialogs = (props) => {

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText);
        debugger
    }

    return (
        <div className="featurebox col-md-12 col-sm-12 col-xs-12">
            <div className='row'>
                <div className='col-md-3 col-sm-3 col-xs-3'>
                    <div className='card'>
                        <ul className='list-group list-group-flush'>
                            {
                                props.dialogs.dialogs.map(dialog => <div key={dialog.id}>
                                    <NavLink to={`/dialogs/${dialog.id}`}
                                             className="list-group-item">{dialog.name}</NavLink>

                                </div>)
                            }
                        </ul>
                    </div>
                </div>


                <div className='col-md-5 col-sm-5 col-xs-5'>
                    <div className='card'>
                        <ul className='list-group list-group-flush'>
                            {
                                props.dialogs.messages.map(message => <div key={message.id}>
                                    <li className="list-group-item">{message.message}</li>

                                </div>)
                            }
                        </ul>
                    </div>
                </div>
<div className='col-md-4 col-sm-4 col-xs-4'>
    <AddNewMessageRedux onSubmit={addNewMessage}/>
</div>
            </div>
        </div>
    )

}



const AddNewMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Введите текст</label>
                <Field name="newMessageText" component={Input} className="form-control" rows="3" placeholder={'Хватит мне писать!'} validate={[required, maxLength100]}/>
                <div className="pt-3">
                    <button className="btn btn-primary ">Добавить пост</button>
                </div>
            </div>
        </form>
    )
}

const AddNewMessageRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewMessage);


const mapStateToProps = (state) => {
    return {
        dialogs: getDialogs(state)
    }
}

export default connect(mapStateToProps, {sendMessage})(Dialogs)