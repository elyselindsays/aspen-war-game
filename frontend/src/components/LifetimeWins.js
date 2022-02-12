export const LifetimeWins = ({winnerData}) => {

  return (
    <>
      <p>lifetime wins</p>
      {winnerData && (
        <div>
          <p>Player 1 Lifetime Wins: {winnerData.length}</p>
          <p>Player 2 Lifetime Wins: { }</p>
        </div>
      )}
    </>


  );
};