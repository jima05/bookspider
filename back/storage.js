const Database = require('better-sqlite3');
const db = new Database('matches.db');

function saveMatches(matches) {
    const insert = db.prepare(`
        INSERT INTO matches (
            matchId, sessionId, teamA, teamB, startTime, result, odds
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(matchId) DO UPDATE SET
            sessionId=excluded.sessionId,
            teamA=excluded.teamA,
            teamB=excluded.teamB,
            startTime=excluded.startTime,
            result=excluded.result,
            odds=excluded.odds;
    `);

    matches.forEach(match => {
        insert.run(
            match.matchId,
            match.sessionId,
            match.teamA,
            match.teamB,
            match.startTime,
            match.result,
            JSON.stringify(match.odds)
        );
    });
}

module.exports = saveMatches;