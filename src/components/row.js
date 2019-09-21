import React from "react";
import Tile from "./tile.js";

const Row = props => {
  const { row, placeToken } = props;
  let rowTiles = Object.keys(row).map(i => {
    return <Tile key={i} value={row[i]} colIndex={i} placeToken={placeToken} />;
  });

  return <tr>{rowTiles}</tr>;
};
export default Row;
