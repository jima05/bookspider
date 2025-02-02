function getSessionId(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}`;
}

function processMatches(matches) {
    return matches.map(match => ({
        matchId: match.id,
        sessionId: getSessionId(new Date(match.start_time)),
        teamA: match.teams[0],
        teamB: match.teams[1],
        odds: {
            '1x2': { teamA: match.odds['1x2'].teamA, draw: match.odds['1x2'].draw, teamB: match.odds['1x2'].teamB },
            overUnder: { over: match.odds.overUnder.over, under: match.odds.overUnder.under },
            btts: { yes: match.odds.btts.yes, no: match.odds.btts.no },
            doubleChance: { teamAOrDraw: match.odds.doubleChance.teamAOrDraw, teamAOrTeamB: match.odds.doubleChance.teamAOrTeamB, teamBOrDraw: match.odds.doubleChance.teamBOrDraw },
            htFt: { teamATeamA: match.odds.htFt.teamATeamA, teamATeamB: match.odds.htFt.teamATeamB, teamBTeamA: match.odds.htFt.teamBTeamA, teamBTeamB: match.odds.htFt.teamBTeamB }
        },
        startTime: new Date(match.start_time).toISOString(),
        result: match.result || null // Null for upcoming matches
    }));
}

module.exports = processMatches;