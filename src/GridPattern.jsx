import React, { useEffect, useState } from "react";

const GridPattern = ({ rows = 15, columns = 20 }) => {
  const [grid, setGrid] = useState(Array(rows * columns).fill(false));
  const [helloStartIndex, setHelloStartIndex] = useState(columns - 5);

  const helloPattern = [
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  ];

  const updateGrid = () => {
    const newGrid = Array(rows * columns).fill(false);

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < helloPattern[i].length; j++) {
        if (helloPattern[i][j] === 1) {
          const index = i * columns + (helloStartIndex + j);
          if (index >= 0 && index < rows * columns) {
            newGrid[index] = true;
          }
        }
      }
    }

    setGrid(newGrid);

    // Move the hello pattern one column to the left
    setHelloStartIndex((prevIndex) =>
      prevIndex > -5 ? prevIndex - 1 : columns - 5
    );
  };

  useEffect(() => {
    const interval = setInterval(updateGrid, 1000);
    return () => clearInterval(interval);
  }, [helloStartIndex, columns]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
      }}
    >
      {grid.map((isHello, index) => (
        <div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: isHello ? "red" : "black",
            border: "1px solid #333",
          }}
        />
      ))}
    </div>
  );
};

export default GridPattern;
