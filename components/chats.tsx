import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Chat from './chat';
import { ChatType } from '../types/type';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: 400,
            padding: 0,
            overflow: 'auto',
        },
    })
);

const Chats = (props: { chats: ChatType[] }): JSX.Element => {
    const classes = useStyles();
    return (
        <List className={classes.root} id={'scrollArea'}>
            {props.chats.map((chat, index) => {
                return (
                    <Chat
                        text={chat.text}
                        type={chat.type}
                        key={index.toString()}
                    />
                );
            })}
        </List>
    );
};

export default Chats;
