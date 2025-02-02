const express = require('express');
const scrapeMatches = require('./scraper');
const processMatches = require('./processor');
const saveMatches = require('./storage');

const app = express();
app.use(express.json());

// Endpoint to fetch all matches
app.get('/matches', (req, res) => {
    const matches = db.prepare('SELECT * FROM matches').all();
    res.json(matches);
});

// Endpoint to fetch matches by session ID
app.get('/matches/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId;
    const matches = db.prepare('SELECT * FROM matches WHERE sessionId = ?').all(sessionId);
    res.json(matches);
});

// Automate scraping and saving data every 5 minutes
const cron = require('node-cron');
cron.schedule('*/5 * * * *', async () => {
    const rawMatches = await scrapeMatches();
    const processedMatches = processMatches(rawMatches);
    saveMatches(processedMatches);
    console.log('Data updated at:', new Date());
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});