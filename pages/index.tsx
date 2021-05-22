import Head from 'next/head';
import { GetStaticProps } from 'next';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './../src/assets/styles/style.module.css';
import AnswersList from './../components/AnswersList';
import Chats from '../components/chats';
import FormDialog from '../components/Forms/FormDialog';
import { db } from '../firebase/db';
import { userConverter } from '../firebase/userConverter';
import {
    PageProps,
    InitDataset,
    AnswerType,
    ChatType,
    Dataset,
} from '../types/type';

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const initDataset: InitDataset = {};
    await db
        .collection('questions')
        .withConverter(userConverter)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                initDataset[id] = data;
            });
        });

    return {
        props: { initDataset },
    };
};

export default function Home({ initDataset }: PageProps): JSX.Element {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [chats, setChats] = useState<ChatType[]>([]);
    const [currentId, setCurrentId] = useState('init');
    const [dataset, setDataset] = useState<InitDataset>({});
    const [open, setOpen] = useState(false);

    const addChats = (chat: ChatType) => {
        setChats((prevChats) => {
            return [...prevChats, chat];
        });
    };

    const displayNextQuestion = (
        nextQuestionId: string,
        nextDataset: Dataset
    ) => {
        addChats({ text: nextDataset.question, type: 'question' });
        setAnswers(nextDataset.answers);
        setCurrentId(nextQuestionId);
    };

    const selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
        const a = document.createElement('a');
        switch (true) {
            case /^https:*/.test(nextQuestionId):
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;
            case nextQuestionId === 'contact':
                handleClickOpen();
                break;
            default:
                addChats({
                    text: selectedAnswer,
                    type: 'answer',
                });
                setTimeout(
                    () =>
                        displayNextQuestion(
                            nextQuestionId,
                            dataset[nextQuestionId]
                        ),
                    500
                );
                break;
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    useEffect(() => {
        setDataset(initDataset);
        displayNextQuestion(currentId, initDataset[currentId]);
    }, []);

    useEffect(() => {
        const scrollArea = document.getElementById('scrollArea');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });

    return (
        <div>
            <Head>
                <title>First Test</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <main>
                <section className={styles.cSection}>
                    <div className={styles.cBox}>
                        <Chats chats={chats} />
                        <AnswersList answers={answers} select={selectAnswer} />
                        <FormDialog
                            open={open}
                            handleClose={() => handleClose()}
                        />
                    </div>
                </section>
            </main>

            <footer></footer>
        </div>
    );
}
