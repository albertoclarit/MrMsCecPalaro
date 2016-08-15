/**
 * Created by albertoclarit on 1/17/16.
 */
import {
    DIALOG_OPEN_ALERT,
    DIALOG_OPEN_CONFIRM,
    DIALOG_CLOSE_ALERT,
    DIALOG_CLOSE_CONFIRM,
    DIALOG_ADDNOTIFICATION,
    DIALOG_CLEARNOTIFICATIONSTORE,
    DIALOG_OPEN_PROMPT,
    DIALOG_CLOSE_PROMPT
} from '../constants/DialogsActionTypes';
import objectAssign from 'object-assign';


export default function dialogsreducer(state={
    alert:{
        isOpen:false,
        type:'info'
    },
    confirm:{
        isOpen:false
    },
    prompt:{
        isOpen:false
    },
    notification:null
}, action={}) {

    switch (action.type) {

        case DIALOG_OPEN_ALERT:
            return objectAssign({},
                state,
                {
                    alert: {
                        message:action.message,
                        title:action.title,
                        isOpen:action.isOpen,
                        type:action.typeDialog,
                        onClosed:action.onClosed
                    }
                }
            );

        case DIALOG_CLOSE_ALERT:
            return objectAssign({},
                state,
                {
                    alert: {
                        isOpen:false
                    }
                }
            );

        case DIALOG_OPEN_CONFIRM:
            return objectAssign({},
                state,
                {
                    confirm: {
                        message:action.message,
                        title:action.title,
                        isOpen:action.isOpen,
                        confirmLabel:action.confirmLabel,
                        cancelLabel:action.cancelLabel,
                        onClosed:action.onClosed
                    }
                }
            );
        case DIALOG_CLOSE_CONFIRM:
            return objectAssign({},
                state,
                {
                    confirm: {
                        isOpen:false
                    }
                }
            );
        case DIALOG_OPEN_PROMPT:
            return objectAssign({},
                state,
                {
                    prompt: {
                        message:action.message,
                        title:action.title,
                        isOpen:action.isOpen,
                        onClosed:action.onClosed
                    }
                }
            );
        case DIALOG_CLOSE_PROMPT:
            return objectAssign({},
                state,
                {
                    prompt: {
                        isOpen:false
                    }
                }
            );
        case DIALOG_ADDNOTIFICATION:
            return objectAssign({},
                state,
                {
                    notification: {
                        title: action.title,
                        message:action.message,
                        level:action.level,
                        position:action.position,
                        autoDismiss:action.autoDismiss,
                        dismissible:action.dismissible,
                        action:action.action,
                        onAdd:action.onAdd,
                        onRemove:action.onRemove,
                        uid:action.uid
                    }
                }
            );

        case DIALOG_CLEARNOTIFICATIONSTORE:
            return objectAssign({},
                state,
                {
                    notification: null
                }
            );

        default:
            return state;

    }
};
