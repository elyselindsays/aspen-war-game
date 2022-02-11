import { useEffect, useState } from "react";


export const Gameboard = ({p1Card, p2Card, setPlayer1Hand, setPlayer2Hand, player1Hand, player2Hand, setP1ActiveCard, setP2ActiveCard, setThisIsWar, setGameInSession, setCurrentWinner}) => {



  const [warArr1, setWarArr1] = useState([]);
  const [warArr2, setWarArr2] = useState([]);

  const [warState, setWarState] = useState(false);

  useEffect(()=> {
    compareCards()
  }, [p1Card, p2Card]);



  const playWar = () => {
    setWarState(true)
    console.log('PLAY WAR')
    warArr1.push(player1Hand.pop())
    warArr2.push(player2Hand.pop())
    warArr1.push(player1Hand.pop())
    warArr2.push(player2Hand.pop())
    console.log(warArr1, warArr2)

    if (warArr1.includes(undefined) && !warArr2.includes(undefined)) {
      setPlayer2Hand([...warArr2, ...warArr1, ...player2Hand])
      setGameInSession(false)
      setCurrentWinner(2)
      console.log('player 2 wins')
    } else if (!warArr1.includes(undefined) && warArr2.includes(undefined)) {
      setPlayer1Hand([...warArr1, ...warArr2, ...player1Hand])
      setGameInSession(false)
      setCurrentWinner(1)
      console.log('player 1 wins')
    } else if (warArr1[warArr1.length-1].value > warArr2[warArr2.length-1].value) {
      setPlayer1Hand([...warArr1, ...warArr2, ...player1Hand])
      setWarArr1([])
      setWarArr2([])
      setWarState(false)
    } else if (warArr1[warArr1.length - 1].value < warArr2[warArr2.length - 1].value) {
      setPlayer2Hand([...warArr2, ...warArr1, ...player2Hand])
      setWarArr1([])
      setWarArr2([])
      setWarState(false)
    } else if (warArr1[warArr1.length - 1].value === warArr2[warArr2.length - 1].value) {
      playWar()
    } 
  }

  const compareCards = () => {
    if (p1Card && p2Card) {
      console.log(p1Card.value, p2Card.value)
      if (p1Card.value > p2Card.value) {
        console.log(`${p1Card.value} is higher`)
        setPlayer1Hand([p1Card, p2Card, ...player1Hand])
        setP1ActiveCard(null)
        setP2ActiveCard(null)
      }
      else if (p1Card.value < p2Card.value) {
        console.log(`${p2Card.value} is higher`)
        setPlayer2Hand([p2Card, p1Card, ...player2Hand])
        setP1ActiveCard(null)
        setP2ActiveCard(null)
      } else if (p1Card.value === p2Card.value) {
        warArr1.push(p1Card)
        warArr2.push(p2Card)
        setP1ActiveCard(null)
        setP2ActiveCard(null)
        playWar()
      }
    }
  }


return (
  <div style={{backgroundColor: warState ? 'red' : 'white'}}>
  <div style={{display: 'flex', flexDirection: 'row'}}>
      <h3>Player 1 Card</h3>
      {p1Card && <p>{p1Card.value}</p>}
  </div>
<div style={{display: 'flex', flexDirection: 'row'}}>
      <h3>Player 2 Card</h3>
      {p2Card && <p>{p2Card.value}</p>}
</div>

  </div>
)
};