import { NewGameElement } from "./new-game-screen/new-game.component";
import { GameBoardChangeEvent, GameBoardElement } from "./game-board-screen/game-board.component";
import { Route, Router } from "../services/router";
import { Components, GameState, GameStatus, PlayerMark, PlayersList, PlayerType } from "../model/model";
import { NewGameSelectionEvent } from "./new-game-screen/new-game.component";
import { state } from '../services/state';

export function bootstrap() {
    
    const container = document.body.querySelector('.app-container');

    const routes: Route[] = [
        { path: '', redirectTo: Components.GAME_BOARD },
        { path: Components.GAME_BOARD, component: GameBoardElement},
        { path: Components.NEW_GAME, component: NewGameElement},
    ];

    const router = new Router(routes, container as HTMLElement);

    

    container.addEventListener(NewGameSelectionEvent.type, (event: NewGameSelectionEvent) => {
        const userSelectionData = event.detail;

        if (event.detail.playerType) {
            let storeUpdateData: Partial<GameState> = {};
            storeUpdateData.player2Type = userSelectionData.playerType;
            storeUpdateData.player1Mark = userSelectionData.playerOneSelection;
            storeUpdateData.player1MarkSelectedOnNewGameScreen = storeUpdateData.player1Mark;
            storeUpdateData.player2Mark = storeUpdateData.player1Mark === PlayerMark.x ? PlayerMark.o : PlayerMark.x
            storeUpdateData.player1MarkOnGameStart = storeUpdateData.player1Mark;
            storeUpdateData.player2MarkOnGameStart = storeUpdateData.player2Mark;
            storeUpdateData.activeMark = PlayerMark.x;
            storeUpdateData.activePlayer = storeUpdateData.player1Mark === PlayerMark.x ? PlayersList.PLAYER1 : PlayersList.PLAYER2;
            storeUpdateData.activePlayerOnRoundStart = storeUpdateData.activePlayer;
            storeUpdateData.activePlayerOnGameStart = storeUpdateData.activePlayer;
            storeUpdateData.gameStatus = GameStatus.IN_PROGRESS;
            storeUpdateData.winner = undefined;

            state.setStore(storeUpdateData);

            router.navigateTo(Components.GAME_BOARD);
            return;
        }
        state.setStore({player1MarkSelectedOnNewGameScreen: userSelectionData.playerOneSelection})
    });
}