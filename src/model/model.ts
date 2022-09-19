export enum PlayerType {
    player = 'PLAYER',
    cpu = 'CPU',
}

export enum PlayerMark {
    x = 'X',
    o = 'O',
}

export enum PlayersList {
    PLAYER1 = 1,
    PLAYER2 = 2,
}

export enum DialogContentType {
    RESTART,
    WINNER,
    NONE,
}

export enum GameStatus {
    IN_PROGRESS = 'inprogress',
    HAS_TIE = 'has_tie',
    HAS_WINNER = 'has_winner',
}

export enum Components {
    GAME_BOARD = 'game-board',
    NEW_GAME = 'new-game',
}

interface Score {
    player1Score: number;
    player2Score: number;
    ties: number;
}

interface Dialog {
    isActive: boolean;
    type: DialogContentType;
}

export interface Winner {
    position: [number, number, number];
}

export interface GameState {
    score: Score,
    dialog: Dialog;
    currentBoardMatrix: Array<string[]>;
    player1MarkSelectedOnNewGameScreen: PlayerMark;
    player1Mark: PlayerMark;
    player2Mark: PlayerMark;
    player1MarkOnGameStart: PlayerMark;
    player2MarkOnGameStart: PlayerMark;
    activeMark: PlayerMark;
    activePlayer: PlayersList;
    activePlayerOnRoundStart: PlayersList;
    activePlayerOnGameStart: PlayersList;
    player2Type: PlayerType, // only player 2 can be cpu or another player
    winner?: Winner;
    gameStatus: GameStatus;
}

export interface IRenderer {
    render(): void;
}