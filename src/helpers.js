export const getStemCells = () => {
  return Array.apply(null, { length: 50 }).map(x =>
    Math.floor(Math.random() * Math.floor(401))
  );
};

export const areCoordinatesValid = (x, y) => {
  const upperBound = 20;
  const validCoords = (x >= 1
    && x <= upperBound
    && y >= 1
    && y <= upperBound)

  return validCoords && [x, y];
}

export const findNeighbors = (x, y) => {
  const neighborCoords = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1]
  ];

  return neighborCoords.reduce((acc, coords) => {
    const validCoords = areCoordinatesValid(coords[0], coords[1]);
    validCoords && acc.push(validCoords);
    return acc;
  }, []);
};

export const isAlive = (coord, cells) => {
  const x = coord[0];
  const y = coord[1];

  return cells.find(c => c.coord.x === x && c.coord.y === y).alive;
};

export const willCellLive = (cell, numberOfLivingNeighbors) => {
  if (cell.alive === true) {
    return (numberOfLivingNeighbors < 2 || numberOfLivingNeighbors > 3) ? false : true;
  } else {
    return (numberOfLivingNeighbors === 3) ? true : false;
  }
};

export const getNumberOfLivingNeighbors = (cell, allCells) => {
  const neighbors = cell.neighbors
    .map(n => {
      return isAlive(n, allCells);
    })
    .filter(n => n === true);

  return neighbors.length;
};

export const determineNextGeneration = cells => {
  let nextGen = cells;

  return nextGen.map(c => {
    const livingNeighborCount = getNumberOfLivingNeighbors(c, cells);
    c.alive = willCellLive(c, livingNeighborCount);
    return c;
  });
};

export const createLife = cells => {
  const stemCells = getStemCells();

  return cells.map(c => {
    c.alive = stemCells.indexOf(c.id) > -1;
    return c;
  });
};
