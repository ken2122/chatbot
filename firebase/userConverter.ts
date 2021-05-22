import firebase from 'firebase/app';
import { Dataset } from '../types/type';

type UserConverter<T> = {
    toFirestore(data: T): firebase.firestore.DocumentData;
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): T;
};

export const userConverter: UserConverter<Dataset> = {
    toFirestore(dataset) {
        return {
            answers: dataset.answers,
            question: dataset.question,
        };
    },

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        return {
            answers: data.answers,
            question: data.question,
        };
    },
};
