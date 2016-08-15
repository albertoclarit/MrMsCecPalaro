/**
 * Created by albertoclarit on 1/17/16.
 */
import React,{PropTypes} from 'react';
import NotificationSystem  from 'react-notification-system';
import objectAssign from 'object-assign';

export default class  Notifications  extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(newProps){

         if(newProps.message){
             this.refs.notifications.addNotification(objectAssign({},newProps));
             this.props.dialogActions.clearNotificationStore();
         }


    }

    render(){


        return (<NotificationSystem ref="notifications"/>)
    }
}
