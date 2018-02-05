import React, { Component } from 'react';


import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ChatMessages from './list';

/**
 * Chat component.
 */
class Chat extends Component {


    constructor(props) {
        super(props);

        this.storage = props.storage;

        let userName = this.storage.getItem('username');
        if (userName === undefined) {
            userName = '';
        }

        this.uid = Date.now();

        this.state =  {
            message: '',
            username: userName,
            avatar: this.getRandomAvatar(),
            messages: [],
            messageError: ''
        };

        const self = this;
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.transport = props.transport;
        this.transport.init();
        this.transport.onMessage = function(message) {
            self.addMessageToList(message);
        }
    }

    /**
     * Get random value between min and max.
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    rnd(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Get list of avatars urls.
     *
     * @returns {[string,string,string,string,string]}
     */
    getAvatarsList() {
        return [
            'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
            'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
            'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
            'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
            'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png',
        ];
    }

    /**
     * Get random avatar
     * @returns {String}
     */
    getRandomAvatar() {
        let avatar = this.storage.getItem('avatar');
        if (avatar !== null && avatar != undefined) {
            return avatar;
        }

        const avatars = this.getAvatarsList();
        avatar = avatars[this.rnd(0, avatars.length-1)];
        this.storage.setItem('avatar', avatar);
        return avatar;
    }

    /**
     * Add message to message list.
     * @param {Object} message
     */
    addMessageToList(message) {
        message.key = Date.now();
        this.state.messages.push(message);

        this.setState(this.state);
    }

    /**
     * Send message.
     */
    sendMessage() {
        if (this.state.message.length === 0) {
            this.state.messageError = 'This field is required';
        }
        else {
            const message = {
                avatar: this.state.avatar,
                username: this.state.username,
                text: this.state.message,
                sender: this.uid,
            };
            this.transport.sendMessage(message);

            this.state.message = '';
            this.state.messageError = '';
        }
        this.setState(this.state);
    }

    handleNameChange(event) {
        this.setState({username: event.target.value});
        this.storage.setItem('username', event.target.value);
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <div id="chat">

                <ChatMessages messages={this.state.messages} uid={this.uid}/>

                <div id="newMessageBox">
                    <Avatar src={this.state.avatar} />
                    <TextField id="username" hintText="Enter your name" defaultValue={this.state.username}
                               onChange={this.handleNameChange} />

                    <TextField id="message" hintText="Enter your message here" value={this.state.message}
                               onChange={this.handleMessageChange} fullWidth={true} errorText={this.state.messageError}/>

                    <RaisedButton id="btnSendMessage" label="Send message" primary={true} onClick={this.sendMessage} />
                </div>
            </div>
        )
    }
}

export default Chat;