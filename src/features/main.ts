import { NewGameElement } from "./new-game-screen/new-game.component";
import { GameBoardChangeEvent, GameBoardElement } from "./game-board-screen/game-board.component";
import { Route, Router } from "../services/router";
import { Components, GameState, GameStatus, PlayerMark, PlayersList } from "../model/model";
import { NewGameSelectionEvent } from "./new-game-screen/new-game.component";
import { state } from '../services/state';
import { saveData, getData } from "../services/browser-storage";
import { setConfig, BreakpointIds } from "../services/resizer";


export function bootstrap() {
    
    const container = document.body.querySelector('.app-container');

    const sessionData = getData();
    if (sessionData) {
        state.setStore(sessionData);
    }

    const routes: Route[] = [
        { path: '', redirectTo: Components.GAME_BOARD },
        { path: Components.GAME_BOARD, component: GameBoardElement},
        { path: Components.NEW_GAME, component: NewGameElement},
    ];

    const router = new Router(routes, container as HTMLElement);
    setResizer();
    container.addEventListener(GameBoardChangeEvent.type, (event: GameBoardChangeEvent) => {
        state.setStore(event.detail);
        saveData(event.detail);
    });
    

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
            storeUpdateData.score = {
                player1Score: 0,
                player2Score: 0,
                ties: 0,
            };
            storeUpdateData.currentBoardMatrix = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ];

            state.setStore(storeUpdateData);
            saveData(storeUpdateData);

            router.navigateTo(Components.GAME_BOARD);
            return;
        }
        const updatedData = {player1MarkSelectedOnNewGameScreen: userSelectionData.playerOneSelection};
        state.setStore(updatedData);
        saveData(updatedData);
    });
}


function setResizer() {
    setConfig([
        {
            id: BreakpointIds.MOBILE,
            uiReflection: [
                {
                    element: getLiveBoardElements,
                    properties: [
                        {propertyName: 'width', propertyValue: '40px'},
                        {propertyName: 'height', propertyValue: '40px'},
                    ]
                },
                {
                    element: getIconSvgsWithinTemplate,
                    properties: [
                        {propertyName: 'width', propertyValue: '40px'},
                        {propertyName: 'height', propertyValue: '40px'},
                    ]
                },
                {
                    element: getLiveModalWindowIcon,
                    properties: [
                        {propertyName: 'width', propertyValue: '30px'},
                        {propertyName: 'height', propertyValue: '30px'},
                    ]
                },
            ]
        },
        {
            id: BreakpointIds.DEFAULT,
            uiReflection: [
                {
                    element: getLiveBoardElements,
                    properties: [
                        {propertyName: 'width', propertyValue: '66px'},
                        {propertyName: 'height', propertyValue: '66px'},
                    ]
                },
                {
                    element: getIconSvgsWithinTemplate,
                    properties: [
                        {propertyName: 'width', propertyValue: '66px'},
                        {propertyName: 'height', propertyValue: '66px'},
                    ]
                },
                {
                    element: getLiveModalWindowIcon,
                    properties: [
                        {propertyName: 'width', propertyValue: '66px'},
                        {propertyName: 'height', propertyValue: '66px'},
                    ]
                },
            ]
        },
    ]);
}

function getLiveModalWindowIcon(): HTMLCollection {
    const modalBody = document.querySelector('.modal__body') as HTMLDivElement;
    if (!modalBody) {
        return;
    }
    return modalBody.getElementsByTagName('svg');
}

function getLiveBoardElements(): HTMLCollection {
    const boardList = document.querySelector('.game-board-items');
    if (!boardList) {
        return;
    }
    return boardList.getElementsByTagName('svg');
}

function getIconSvgsWithinTemplate(): Array<SVGElement> {
    return [
        (document.getElementById('x-icon-template') as HTMLTemplateElement).content.firstChild as SVGElement,
        (document.getElementById('o-icon-template') as HTMLTemplateElement).content.firstChild as SVGElement,
        (document.getElementById('x-outline-icon-template') as HTMLTemplateElement).content.firstChild as SVGElement,
        (document.getElementById('o-outline-icon-template') as HTMLTemplateElement).content.firstChild as SVGElement,
    ];
}