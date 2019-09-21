import React from "react";

const Tile = props => {
  const { colIndex, value, placeToken } = props;
  const player1 = "bg-red br-100 h3 w3";
  const player2 = "bg-yellow br-100 h3 w3";
  const noPlayer = "bg-white br-100 h3 w3";
  let tileStyle = value !== null ? (value === 1 ? player1 : player2) : noPlayer;
  return (
    <td
      style={{
        borderTop: "none",
        paddingRight: "1rem"
      }}
      className="h-50 w-50 bg-light-blue"
    >
      <div
        class="h3 w3 flex justify-center bg-light-blue"
        onClick={() => placeToken(colIndex)}
      >
        <div class={tileStyle}></div>
      </div>
    </td>
  );
};

export default Tile;
