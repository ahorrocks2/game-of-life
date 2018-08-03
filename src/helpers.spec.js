import {
  areCoordinatesValid,
  findNeighbors,
  isAlive,
  willCellLive,
  getNumberOfLivingNeighbors
} from "../src/helpers";

test("should return neighbor coordinates if they're valid", () => {
  expect(areCoordinatesValid(0, 0)).toEqual(false);
  expect(areCoordinatesValid(0, 20)).toEqual(false);
  expect(areCoordinatesValid(-1, 4)).toEqual(false);
  expect(areCoordinatesValid(1, 21)).toEqual(false);
  expect(areCoordinatesValid(10, -1)).toEqual(false);
  expect(areCoordinatesValid(1, 20)).toEqual([1, 20]);
  expect(areCoordinatesValid(10, 10)).toEqual([10, 10]);
});

test("should find a cell's neighbors", () => {
  const neighborCases = [
    {
      x: 1,
      y: 1,
      expectedNeighbors: [[1, 2], [2, 1], [2, 2]]
    },
    {
      x: 20,
      y: 20,
      expectedNeighbors: [[19, 19], [19, 20], [20, 19]]
    },
    {
      x: 1,
      y: 20,
      expectedNeighbors: [[1, 19], [2, 19], [2, 20]]
    },
    {
      x: 20,
      y: 1,
      expectedNeighbors: [[19, 1], [19, 2], [20, 2]]
    },
    {
      x: 1,
      y: 5,
      expectedNeighbors: [[1, 4], [1, 6], [2, 4], [2, 5], [2, 6]]
    },
    {
      x: 5,
      y: 1,
      expectedNeighbors: [[4, 1], [4, 2], [5, 2], [6, 1], [6, 2]]
    },
    {
      x: 5,
      y: 5,
      expectedNeighbors: [
        [4, 4],
        [4, 5],
        [4, 6],
        [5, 4],
        [5, 6],
        [6, 4],
        [6, 5],
        [6, 6]
      ]
    }
  ];

  neighborCases.forEach(c => {
    const actualNeighbors = findNeighbors(c.x, c.y).sort();
    expect(actualNeighbors).toEqual(c.expectedNeighbors);
  });
});

test("should determine if a cell is alive by its coordinates", () => {
  const cells = [
    {
      coord: {
        x: 5,
        y: 10
      },
      alive: true
    },
    {
      coord: {
        x: 2,
        y: 3
      },
      alive: false
    }
  ];

  expect(isAlive([5, 10], cells)).toEqual(true);
  expect(isAlive([2, 3], cells)).toEqual(false);
});

test("should determine if a cell lives to the next generation", () => {
  const aliveCell = {
    alive: true
  };

  const deadCell = {
    alive: false
  };

  expect(willCellLive(aliveCell, 1)).toEqual(false);
  expect(willCellLive(aliveCell, 2)).toEqual(true);
  expect(willCellLive(aliveCell, 3)).toEqual(true);
  expect(willCellLive(aliveCell, 5)).toEqual(false);

  expect(willCellLive(deadCell, 5)).toEqual(false);
  expect(willCellLive(deadCell, 3)).toEqual(true);
  expect(willCellLive(deadCell, 2)).toEqual(false);
});
