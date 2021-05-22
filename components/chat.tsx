import React from 'react';
import styles from './../src/assets/styles/style.module.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ChatType } from '../types/type';

const Chat = (props: ChatType): JSX.Element => {
    const isQuestion = props.type === 'question';
    const classes = isQuestion ? 'pChatRow' : 'pChatReverse';
    return (
        <ListItem className={styles[classes]}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="icon" src="/images/icon.png" />
                ) : (
                    <Avatar alt="icon" src="/images/no-profile.png" />
                )}
            </ListItemAvatar>
            <div className={styles.pChatBubble}>{props.text}</div>
        </ListItem>
    );
};
export default Chat;
