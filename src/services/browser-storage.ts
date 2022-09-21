import { GameState } from '../model/model';

const sessionToken = 'TICTACTOE_DATA';

export function saveData(data: Partial<GameState>) {
    sessionStorage.setItem(sessionToken, JSON.stringify(data))
}

export function getData(): GameState {
    return JSON.parse(sessionStorage.getItem(sessionToken));
}