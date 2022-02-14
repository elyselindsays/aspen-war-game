export const Deck = () => {


  return (
    <>
      {!gameInSession && <h2 style={{ textAlign: 'center' }}>Player {currentWinner} Wins!!!!!</h2>}


      <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
        <div>
          {p1ActiveCard && <h2>{p1ActiveCard.value}</h2>}
          <h3>Player 1 Hand - {player1Hand.length}</h3>
        </div>
        <div >
          {p2ActiveCard && <h2>{p2ActiveCard.value}</h2>}
          <h3>Player 2 Hand - {player2Hand.length}</h3>
        </div>
      </div>
    
    
    </>
  );
};