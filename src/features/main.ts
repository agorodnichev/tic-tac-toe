// import { LocalStore } from "../services/state";
import { NewGameElement } from "./new-game-screen/new-game.component";
import { GameBoardChangeEvent, GameBoardElement } from "./game-board-screen/game-board.component";
import { Route, Router } from "../services/router";
import { Components } from "../model/model";
// import { PushStateEvent } from "../services/router";



// window.addEventListener(PushStateEvent.type, event => {
//     console.log('this is new event');
//     console.log(event);
// });

// window.addEventListener('popstate', event => {
//     console.log(window.location.pathname);
// })


export function bootstrap() {
    
    const container = document.body.querySelector('.app-container');

    const routes: Route[] = [
        {path: '', redirectTo: Components.GAME_BOARD},
        { path: Components.GAME_BOARD, component: GameBoardElement},
        { path: Components.NEW_GAME, component: NewGameElement},
    ];
    const router = new Router(routes, container as HTMLElement);

    // const localStore = new LocalStore();

    // const board = document.createElement('game-board') as GameBoardElement;
    
    // board.addEventListener(GameBoardChangeEvent.type, event => {
    //     console.log(event);
    // });

    // board.setState(structuredClone(localStore.store));
    // board.setState()
    // container.appendChild(board);
    // const newGame = document.createElement('new-game');
    // newGame.addEventListener(NewGameSelectionEvent.type, (data) => {
    //     console.log(data);
    // })
    // container.appendChild(newGame);
}

// console.log(window.location);
// const newGameCtor = customElements.get('new-game');


// I DON'T NEED ALL THOSE EVENTS BECAUSE THOSE EVENTS ARE
// WAITING FOR THE SCRIPTS TO FINISH
// document.addEventListener('DOMContentLoaded', event => {
//     debugger;
//     console.log('DOMContentLoaded');
// });

// window.addEventListener('load', event => {
//     debugger;
//     console.log('load');
// });