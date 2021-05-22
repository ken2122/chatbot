import React from 'react';
import styles from './../src/assets/styles/style.module.css';
import Answer from './Answer';
import { AnswersListProps } from '../types/type';

const AnswersList = (props: AnswersListProps): JSX.Element => {
    return (
        <div className={styles.cGridAnswer}>
            {props.answers.map((value, index) => {
                return (
                    <Answer
                        content={value.content}
                        nextId={value.nextId}
                        key={index.toString()}
                        select={props.select}
                    />
                );
            })}
        </div>
    );
};

export default AnswersList;
