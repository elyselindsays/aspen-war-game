import { useEffect, useState } from "react";


export const Gameboard = ({
  p1Card, 
  p2Card, 
  setPlayer1Hand, 
  setPlayer2Hand, 
  player1Hand, 
  player2Hand, 
  setP1ActiveCard, 
  setP2ActiveCard, 
  setGameInSession, 
  setCurrentWinner}) => {

  const [warArr1, setWarArr1] = useState([]);
  const [warArr2, setWarArr2] = useState([]);

  const [moveHistory, setMoveHistory] = useState([]);
  const [showMoves, setShowMoves] = useState(false);

  useEffect(()=> {
    compareCards()
  }, [p1Card, p2Card]);



  const playWar = () => {
    const p1War1 = player1Hand.pop()
    warArr1.push(p1War1)
    const p1War2 = player1Hand.pop()
    warArr1.push(p1War2)
    const p2War1 = player2Hand.pop()
    warArr2.push(p2War1)
    const p2War2 = player2Hand.pop()
    warArr2.push(p2War2);

    if (!warArr1.includes(undefined) && !warArr2.includes(undefined)) {
      if (warArr1[warArr1.length - 1].value > warArr2[warArr2.length - 1].value) {
        moveHistory.push(`Player 1 and Player 2 each flipped a card face down.`)
        moveHistory.push(`Player 1 played ${p1War2.value} of ${p1War2.suit}`)
        moveHistory.push(`Player 2 played ${p2War2.value} of ${p2War2.suit}`)
        moveHistory.push(`${p1War2.value} is higher`)
        setPlayer1Hand([...warArr1, ...warArr2, ...player1Hand])
        setWarArr1([])
        setWarArr2([])
      } else if (warArr1[warArr1.length - 1].value < warArr2[warArr2.length - 1].value) {
        moveHistory.push(`Player 1 and Player 2 each flipped a card face down.`)
        moveHistory.push(`Player 1 played ${p1War2.value} of ${p1War2.suit}`)
        moveHistory.push(`Player 2 played ${p2War2.value} of ${p2War2.suit}`)
        moveHistory.push(`${p2War2.value} is higher`)
        setPlayer2Hand([...warArr2, ...warArr1, ...player2Hand])
        setWarArr1([])
        setWarArr2([])
      } else if (warArr1[warArr1.length - 1].value === warArr2[warArr2.length - 1].value) {
        playWar()
      } 
    } else if (warArr1.includes(undefined) && !warArr2.includes(undefined)) {
      const filtered1 = warArr1.filter(card => card !== undefined)
      const filtered2 = warArr2.filter(card => card !== undefined)
      setPlayer2Hand([...filtered1, ...filtered2, ...player2Hand])
      setGameInSession(false)
      setCurrentWinner(2)
    } else if (!warArr1.includes(undefined) && warArr2.includes(undefined)) {
      const filtered1 = warArr1.filter(card => card !== undefined)
      const filtered2 = warArr2.filter(card => card !== undefined)
      setPlayer2Hand([...filtered1, ...filtered2, ...player2Hand])
      setGameInSession(false)
      setCurrentWinner(1)
    } 
  };

  const compareCards = () => {
    if (p1Card && p2Card) {
      moveHistory.push(`Player 1 played ${p1Card.value} of ${p1Card.suit} Player 2 played ${p2Card.value} of ${p2Card.suit}`)
      if (p1Card.value > p2Card.value) {
        moveHistory.push(`${p1Card.value} is higher`)
        setPlayer1Hand([p1Card, p2Card, ...player1Hand])
        setP1ActiveCard(null)
        setP2ActiveCard(null)
      }
      else if (p1Card.value < p2Card.value) {
        moveHistory.push(`${p2Card.value} is higher`)
        setPlayer2Hand([p2Card, p1Card, ...player2Hand])
        setP1ActiveCard(null)
        setP2ActiveCard(null)
      } else if (p1Card.value === p2Card.value) {
        moveHistory.push('This is war')
        warArr1.push(p1Card)
        warArr2.push(p2Card)
        setP1ActiveCard(null)
        setP2ActiveCard(null)
        playWar()
      }
    }
  };


return (
  <div>
    <p onClick={()=>setShowMoves(!showMoves)} style={{textAlign: 'center', textDecoration: 'underline', color: 'blue', cursor: "pointer"}}>show move history</p>
    {showMoves && moveHistory.map((move, i) => (
      <p style={{textAlign: 'center'}}>{move}</p>
    ))}
  </div>
)
};