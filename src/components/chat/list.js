import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

/**
 * Component for displaying chat messages.
 */
class ChatMessages extends Component {

    render() {
        return (
            <List id="messages">
                {this.props.messages.map(message => {
                    if (message.sender === this.props.uid) {
                        message.style = {background: '#f6f6f6'};
                    }

                    return (
                        <ListItem
                            leftAvatar={<Avatar src={message.avatar}/>}
                            primaryText={message.username}
                            secondaryText={message.text}
                            secondaryTextLines={2}
                            style={message.style}
                            key={message.key}
                        />
                    )
                })}
            </List>
        )
    }
}

export default ChatMessages;