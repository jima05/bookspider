import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
      const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/matches')
            .then(response => setMatches(response.data))
            .catch(error => console.error(error));
    }, []);

  return (
        <div>
            <h1>Virtual Sports Matches</h1>
            <ul>
                {matches.map(match => (
                    <li key={match.matchId}>
                        {match.teamA} vs {match.teamB} - {match.result || 'Upcoming'}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default App
