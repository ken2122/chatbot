import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { InitDataset } from '../../types/type';

admin.initializeApp();
const db = admin.firestore();

const sendResponse = (
    response: functions.Response,
    statusCode: number,
    body: { error: string } | { message: string }
) => {
    response.send({
        statusCode,
        body: JSON.stringify(body),
    });
};

export const addDataset = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        sendResponse(res, 405, { error: 'Invalid Request' });
    } else {
        const dataset: InitDataset = req.body;
        for (const key of Object.keys(dataset)) {
            const data = dataset[key];
            await db.collection('questions').doc(key).set(data);
        }
        sendResponse(res, 200, {
            message: 'Successfully added dataset! WooHoo!',
        });
    }
});
