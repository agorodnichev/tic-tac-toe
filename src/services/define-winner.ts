import { Winner } from "../model/model";

const winnerPositions: Array<[number, number, number]> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export function defineWinner(gameBoardMatrix: Array<string[]>): Winner {

    for (const position of winnerPositions) {
        const itemAddress1 = getAddressMatrix(position[0]);
        const itemAddress2 = getAddressMatrix(position[1]);
        const itemAddress3 = getAddressMatrix(position[2]);

        const item1 = gameBoardMatrix[itemAddress1.row][itemAddress1.column];
        const item2 = gameBoardMatrix[itemAddress2.row][itemAddress2.column];
        const item3 = gameBoardMatrix[itemAddress3.row][itemAddress3.column];

        if (item1 === item2 && item2 === item3 && !!item1) {
            return {
                position
            }
        }
    }
    return;
}


function getAddressMatrix(address: number): {row: number, column: number} {
    const row = Math.floor((address) / 3);
    const column = address - row * 3;
    return {row, column}
}
