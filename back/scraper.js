const axios = require('axios');

async function scrapeMatches() {
    try {
        const response = await axios.get('https://www.betpawa.ug/api/sportsbook/virtual/v1/events/list/by-round/496106');
        return response.data.matches; // Assuming the API returns a 'matches' array
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}

module.exports = scrapeMatches;