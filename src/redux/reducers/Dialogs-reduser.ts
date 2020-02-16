const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Сергей'},
        {id: 2, name: 'Артём'},
        {id: 3, name: 'Егор'},
        {id: 4, name: 'Антон'},
        {id: 5, name: 'Семён'},
        {id: 6, name: 'Фёдор'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Привет'},
        {id: 2, message: 'Как дела?'},
        {id: 3, message: 'Что делаешь?'},
        {id: 4, message: 'Задать ещё какой-нибудь бесполезный вопрос?'},
        {id: 5, message: 'В принципе могу ещё тебя поотвлекать от работы'}
    ] as Array<MessagesType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;