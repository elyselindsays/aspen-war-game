
import {useEffect, useState, useRef} from 'react';
import { Gameboard } from './components/gameboard';

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

  const [thisIsWar, setThisIsWar] = useState(false);

  const [currentWinner, setCurrentWinner] = useState(null);
  const [winnerData, setWinnerData] = useState(null)



  const connectToBackend = async () => {
    const res = await fetch("http://localhost:5000/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'}
    });
    const body = await res.json();
    console.log(body)
  }
  useEffect(()=> {
    connectToBackend()
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
    const res = await fetch("http://localhost:5000/wins", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    setWinnerData(data.wins)
  }

  useEffect(()=> {
    postWinnerData()
    const winnerStats = getWinnerData();
    setWinnerData(winnerStats.wins);
    console.log(winnerData)
  }, [currentWinner])


  useEffect(()=> {
    getWinnerData()
    console.log(winnerData)
  }, [])

  useEffect(() => {
    if (player1Hand.length===0 && player2Hand.length!==0) {
      setGameInSession(false);
      setCurrentWinner(2)
      console.log('GAME OVER')
      console.log('PLAYER 2 WINS')

    } else if (player1Hand.length !== 0 && player2Hand.length === 0) {
      setGameInSession(false);
      setCurrentWinner(1)
      console.log('GAME OVER')
      console.log('PLAYER 1 WINS')
    } else {
      setGameInSession(true)
      flipCard()
    }
  }, [player1Hand, player2Hand]);


  return (
    <>
      <h1>Elyse's WAR GAME</h1>

      {!gameInSession && <h2>{currentWinner} Wins!!!!!</h2>}

      {winnerData && winnerData.map((win, i) => (
        <>
        <p key={`id${i}`}>{win.playerId}</p>
        <p key={`time${i}`}>{win.createdAt}</p>
        </>
      ))}

      <Gameboard 
        p1Card={p1ActiveCard} 
        p2Card={p2ActiveCard} 
        setPlayer1Hand={setPlayer1Hand} 
        setPlayer2Hand={setPlayer2Hand} 
        player1Hand={player1Hand}
        player2Hand={player2Hand}
        setP1ActiveCard={setP1ActiveCard}
        setP2ActiveCard={setP2ActiveCard}
        setThisIsWar={setThisIsWar}
        setGameInSession={setGameInSession}
        setCurrentWinner={setCurrentWinner}/>

      <div style={{display: 'flex', justifyContent: 'space-evenly', }}>
        <div>
          {p1ActiveCard && <h2>{p1ActiveCard.value}</h2>}
          <h5>Player 1 Hand - {player1Hand.length}</h5>
          {/* {player1Hand && player1Hand.map((card, i) => (
            <p key={i}>{card.value} {card.suit}</p>
            ))} */}
        </div>
      <div >
          {p2ActiveCard && <h2>{p2ActiveCard.value}</h2>}
        <h5>Player 2 Hand - {player2Hand.length}</h5>
          {/* {player2Hand && player2Hand.map((card, i) => (
            <p key={i}>{card.value} {card.suit}</p>
          ))} */}
      </div>
      </div>
    </>
  );
}

export default App;
