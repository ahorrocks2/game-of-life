export const getStemCells = () => {
  return Array.apply(null, { length: 50 }).map(x =>
    Math.floor(Math.random() * Math.floor(401))
  );
};

export const findNeighbors = (x, y) => {
  const neighbors = [];

  if (x !== 1) {
    neighbors.push([x - 1, y]);
    if (y !== 20) {
      neighbors.push([x - 1, y + 1]);
    }
  }

  if (x !== 20) {
    neighbors.push([x + 1, y]);
    if (y !== 20) {
      neighbors.push([x + 1, y + 1]);
    }
  }

  if (y !== 1) {
    neighbors.push([x, y - 1]);
    if (x !== 1) {
      neighbors.push([x - 1, y - 1]);
    }
  }

  if (y !== 20) {
    neighbors.push([x, y + 1]);
  }

  if (x !== 20 && y !== 1) {
    neighbors.push([x + 1, y - 1]);
  }

  return neighbors;
};

export const isAlive = (coord, cells) => {
  const x = coord[0];
  const y = coord[1];

  return cells.find(c => c.coord.x === x && c.coord.y === y).alive;
};

export const willCellLive = (cell, numberOfLivingNeighbors) => {
  if (cell.alive === true) {
    if (numberOfLivingNeighbors < 2 || numberOfLivingNeighbors > 3) {
      return false;
    } else {
      return true;
    }
  } else {
    if (numberOfLivingNeighbors === 3) {
      return true;
    } else {
      return false;
    }
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
