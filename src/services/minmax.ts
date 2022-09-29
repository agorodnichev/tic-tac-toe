import { PlayerMark } from "../model/model";
import { defineWinner } from './define-winner';

interface BoardAddress {
    row: number;
    column: number;
}

const MAX_DEPTH = 3;

export function getNextStep(board: Array<string[]>, maximazing: boolean = true): BoardAddress {

    const movesMap = new Map<number, Array<BoardAddress>>();
    const bestNextMoveCost = helper(board, maximazing);
    const bestMove = movesMap.get(bestNextMoveCost);

    if (bestMove.length > 1) {
        return bestMove[Math.floor(Math.random() * bestMove.length)];
    } else {
        return bestMove[0];
    }

    function helper(board: Array<string[]>, maximazing: boolean = true, depth = 0): number {

        if (depth === 0) {
            movesMap.clear();
        }

        const moves = getAvailableMoves(board);
        const winner = defineWinner(board);

        if (winner) {
            const playerMark = board[winner.fullCellAddress[0].row][winner.fullCellAddress[0].column];
            if (playerMark === PlayerMark.x) {
                return 100 - depth;
            } else if (playerMark === PlayerMark.o) {
                return -100 + depth;
            }
        } else if (moves.length === 0 || depth === MAX_DEPTH) {
            return 0;
        }


        if (maximazing) {
            let best = -100;
            for (const move of moves) {
                const boardCopy = structuredClone(board);
                boardCopy[move.row][move.column] = PlayerMark.x;
                const nodeValue = helper(boardCopy, false, depth + 1);
                best = Math.max(best, nodeValue);

                if (depth > 0) {
                    continue;
                }
                if (movesMap.has(nodeValue)) {
                    (movesMap.get(nodeValue)).push(move);
                } else {
                    movesMap.set(nodeValue, [move]);
                }
            }
            return best;
        } else if (!maximazing) {
            let best = 100;
            for (const move of moves) {
                const boardCopy = structuredClone(board);
                boardCopy[move.row][move.column] = PlayerMark.o;
                const nodeValue = helper(boardCopy, true, depth + 1);
                best = Math.min(best, nodeValue);

                if (depth > 0) {
                    continue;
                }
                if (movesMap.has(nodeValue)) {
                    (movesMap.get(nodeValue)).push(move);
                } else {
                    movesMap.set(nodeValue, [move]);
                }
            }
            return best;
        }
    }
}


function getAvailableMoves(board: Array<string[]>): Array<BoardAddress> {
    const moves = [];
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length; column++) {
            if (!board[row][column]) {
                moves.push({row, column});
            }
        }
    }
    return moves;
}