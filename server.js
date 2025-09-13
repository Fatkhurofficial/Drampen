import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { token } from './get-token.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Route to get the latest dramas
app.get('/api/latest', async (req, res) => {
    try {
        const gettoken = await token();
        const url = "https://sapi.dramaboxdb.com/drama-box/he001/theater";
        const headers = {
            "User-Agent": "okhttp/4.10.0",
            "tn": `Bearer ${gettoken.token}`,
            "device-id": gettoken.deviceid,
            // Add other necessary headers from your original files
        };
        const data = {
            newChannelStyle: 1,
            isNeedRank: 1,
            pageNo: 1,
            index: 1,
            channelId: 43
        };
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest dramas' });
    }
});

// Route to search for dramas
app.get('/api/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const gettoken = await token();
        const url = "https://sapi.dramaboxdb.com/drama-box/search/suggest";
        const headers = {
            "User-Agent": "okhttp/4.10.0",
            "tn": `Bearer ${gettoken.token}`,
            "device-id": gettoken.deviceid,
             // Add other necessary headers from your original files
        };
        const data = { keyword };
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform search' });
    }
});

// Route to get the stream link
app.get('/api/stream-link', async (req, res) => {
    try {
        const { bookId, index } = req.query;
        const gettoken = await token();
        const url = "https://sapi.dramaboxdb.com/drama-box/chapterv2/batch/load";
        const headers = {
            "User-Agent": "okhttp/4.10.0",
            "tn": `Bearer ${gettoken.token}`,
            "device-id": gettoken.deviceid,
             // Add other necessary headers from your original files
        };
        const data = {
            boundaryIndex: 0,
            index: parseInt(index),
            bookId: bookId
             // Add other necessary data properties from your original files
        };
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stream link' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
