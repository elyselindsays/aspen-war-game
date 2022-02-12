export const LifetimeWins = ({p1Wins, p2Wins}) => {

  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      {p1Wins.wins && (
        <div>
          <p>Player 1 Lifetime Wins: {p1Wins.wins.length}</p>
        </div>
      )}
      {p2Wins.wins && (
        <div>
          <p>Player 2 Lifetime Wins: {p2Wins.wins.length}</p>
        </div>
      )}
    </div>
  );
};