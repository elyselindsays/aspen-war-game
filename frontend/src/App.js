import {useEffect, useState} from 'react';
import { Gameboard } from './components/gameboard';
import { LifetimeWins } from './components/LifetimeWins';
import { connectToBackend } from './dispatches/apiDispatch';

const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let deck = [];
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < ranks.length; j++) {
    let card = { value: ranks[j], suit: suits[i] };
    deck.push(card);
  }
};
let shuffledDeck = deck.sort(()=> Math.random() - 0.5);


const App = () => {
  const [gameInSession, setGameInSession] = useState(false);

  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);

  const [p1ActiveCard, setP1ActiveCard] = useState(null);
  const [p2ActiveCard, setP2ActiveCard] = useState(null);

  const [currentWinner, setCurrentWinner] = useState(null);
  const [winnerData, setWinnerData] = useState(null)
  const [p1Wins, setP1Wins] = useState([])
  const [p2Wins, setP2Wins] = useState([])

  useEffect(()=> {
    connectToBackend();
  }, []);
  

  const winnerHandler = async () => {
    const res = await getWinnerData();
    const parse = await res.json();
    setWinnerData(parse)
  }

  useEffect(() => {
    winnerHandler()
    setGameInSession(true);
    setPlayer1Hand(shuffledDeck.slice(0,26));
    setPlayer2Hand(shuffledDeck.slice(26));
  }, []);

  const flipCard = () => {
    setP1ActiveCard(player1Hand.pop());
    setP2ActiveCard(player2Hand.pop());
  }

  const postWinnerData = async () => {
    const res = await fetch("http://localhost:5000/wins", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playerId: currentWinner})
    })
    const data = await res.json();
    return data;
  }

  const getWinnerData = async() => {
    const res1 = await fetch("http://localhost:5000/wins/1", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res2 = await fetch("http://localhost:5000/wins/2", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const parsed1 = await res1.json()
    const parsed2 = await res2.json()
    setP1Wins(parsed1)
    setP2Wins(parsed2)
  }

  useEffect(()=> {
    postWinnerData()
    const winnerStats = getWinnerData();
    setWinnerData(winnerStats.wins);
  }, [currentWinner])


  useEffect(()=> {
    getWinnerData()
    console.log(p1Wins)
  }, [])

  useEffect(() => {
    if (player1Hand.length===0 && player2Hand.length!==0) {
      setGameInSession(false);
      setCurrentWinner(2);
    } else if (player1Hand.length !== 0 && player2Hand.length === 0) {
      setGameInSession(false);
      setCurrentWinner(1)
    } else {
      setGameInSession(true)
      flipCard()
    }
  }, [player1Hand, player2Hand]);


  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <h1 style={{textAlign: 'center'}}>Aspen Capital WAR GAME</h1>

      {!gameInSession && <h2 style={{ textAlign: 'center' }}>Player {currentWinner} Wins!!!!!</h2>}


      <div style={{display: 'flex', justifyContent: 'space-evenly', }}>
        <div>
          {p1ActiveCard && <h2>{p1ActiveCard.value}</h2>}
          <h3>Player 1 Hand - {player1Hand.length}</h3>
        </div>
        <div >
          {p2ActiveCard && <h2>{p2ActiveCard.value}</h2>}
          <h3>Player 2 Hand - {player2Hand.length}</h3>
        </div>
      </div>
      <LifetimeWins p1Wins={p1Wins} p2Wins={p2Wins} />
      <Gameboard 
        p1Card={p1ActiveCard} 
        p2Card={p2ActiveCard} 
        setPlayer1Hand={setPlayer1Hand} 
        setPlayer2Hand={setPlayer2Hand} 
        player1Hand={player1Hand}
        player2Hand={player2Hand}
        setP1ActiveCard={setP1ActiveCard}
        setP2ActiveCard={setP2ActiveCard}
        setGameInSession={setGameInSession}
        setCurrentWinner={setCurrentWinner}/>
    </div>
  );
}

export default App;
