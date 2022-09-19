"use strict";
(self["webpackChunktic_tac_toe"] = self["webpackChunktic_tac_toe"] || []).push([["index"],{

/***/ 466:
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 48:
/*!****************************************************************!*\
  !*** ./src/features/game-board-screen/game-board.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoardChangeEvent": () => (/* binding */ GameBoardChangeEvent),
/* harmony export */   "GameBoardElement": () => (/* binding */ GameBoardElement)
/* harmony export */ });
/* harmony import */ var _services_html_element_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/html-element-base */ 178);
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/model */ 891);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer */ 705);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 515);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 975);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 727);
/* harmony import */ var _services_define_winner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/define-winner */ 763);





class GameBoardChangeEvent extends CustomEvent {
    constructor(payload) {
        super(GameBoardChangeEvent.type, { detail: payload });
    }
}
GameBoardChangeEvent.type = 'game-board-change';
class GameBoardElement extends _services_html_element_base__WEBPACK_IMPORTED_MODULE_0__.HTMLElementBase {
    constructor() {
        super({ templateIdSelector: 'game-board-template' });
        this.isStateReady$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject(false);
        this.isStateReady = this.isStateReady$.asObservable();
    }
    connectedCallback() {
        super.connectedCallback();
        this.defineElements();
        this.setListeners();
        this.isStateReady.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(isReady => isReady), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(() => {
            this.renderer = new _renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer(this.state, {
                gameBoardItems: this.gameBoardItems,
                turnCard: this.turnCard,
                scoreX: this.scoreX,
                scoreO: this.scoreO,
                boardFooter: this.boardFooter,
                xIconTemplate: this.xIconTemplate,
                oIconTemplate: this.oIconTemplate,
                xOutlineIconTemplate: this.xOutlineIconTemplate,
                oOutlineIconTemplate: this.oOutlineIconTemplate,
            });
            this.renderer.render();
        });
    }
    setState(state) {
        this.state = state;
        this.isStateReady$.next(true);
    }
    defineElements() {
        this.gameBoardItems = this.querySelector('.game-board-items');
        this.restartButton = this.querySelector('.restart-button');
        this.turnCard = this.querySelector('.turn');
        this.scoreX = this.querySelector('.score-x');
        this.scoreO = this.querySelector('.score-o');
        this.boardFooter = this.querySelector('.board-footer');
        this.xIconTemplate = document.getElementById('x-icon-template');
        this.oIconTemplate = document.getElementById('o-icon-template');
        this.xOutlineIconTemplate = document.getElementById('x-outline-icon-template');
        this.oOutlineIconTemplate = document.getElementById('o-outline-icon-template');
    }
    setListeners() {
        this.gameBoardItems.addEventListener('click', (event) => {
            // If current game is already finished then stop execution
            if ([_model_model__WEBPACK_IMPORTED_MODULE_1__.GameStatus.HAS_TIE, _model_model__WEBPACK_IMPORTED_MODULE_1__.GameStatus.HAS_WINNER].includes(this.state.gameStatus)) {
                return;
            }
            const target = event.target;
            // Checks if either X or O is already set
            if (target.hasChildNodes() || target === event.currentTarget) {
                return;
            }
            const clickedItemPosition = this.getClickedElementBoardPosition(target);
            this.updateMatrix(clickedItemPosition);
            // check the winner
            const winner = (0,_services_define_winner__WEBPACK_IMPORTED_MODULE_3__.defineWinner)(this.state.currentBoardMatrix);
            if (winner) {
                this.updateGameStatus(_model_model__WEBPACK_IMPORTED_MODULE_1__.GameStatus.HAS_WINNER);
                this.updateWinner(winner);
                this.updateScore(this.state.activePlayer);
            }
            else if (this.areAllBoardElementAreasSet(this.state.currentBoardMatrix)) {
                // if no winner but all the fields are already filled either with X or O
                // then it's TIE situation
                this.updateGameStatus(_model_model__WEBPACK_IMPORTED_MODULE_1__.GameStatus.HAS_TIE);
                this.updateScore();
            }
            else {
                this.toggleActivePlayer();
                this.toggleActiveMark();
            }
            // send state to save it somewhere
            this.dispatchEvent(new GameBoardChangeEvent(this.state));
            this.renderer.render();
        });
        this.restartButton.addEventListener('click', (event) => {
            event.preventDefault();
            // show dialog
        });
    }
    updateMatrix(itemPosition) {
        const row = Math.ceil(itemPosition / 3);
        const column = itemPosition - (row - 1) * 3;
        this.state.currentBoardMatrix[row - 1][column - 1] = this.state.activeMark;
    }
    updateWinner(winner) {
        this.state.winner = winner;
    }
    updateGameStatus(status) {
        this.state.gameStatus = status;
    }
    updateScore(winner) {
        if (winner === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayersList.PLAYER1) {
            this.state.score.player1Score++;
        }
        else if (winner === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayersList.PLAYER2) {
            this.state.score.player2Score++;
        }
        else {
            this.state.score.ties++;
        }
    }
    toggleActivePlayer() {
        this.state.activePlayer = this.state.activePlayer === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayersList.PLAYER1 ? _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayersList.PLAYER2 : _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayersList.PLAYER1;
    }
    toggleActiveMark() {
        this.state.activeMark = this.state.activeMark === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.x ? _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.o : _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.x;
    }
    getClickedElementBoardPosition(target) {
        return +target.dataset['itemNumber'];
    }
    areAllBoardElementAreasSet(board) {
        for (const row of board) {
            for (const col of row) {
                if (!col) {
                    return false;
                }
            }
        }
        return true;
    }
}


/***/ }),

/***/ 705:
/*!****************************************************!*\
  !*** ./src/features/game-board-screen/renderer.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Renderer": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../model/model */ 891);

class Renderer {
    constructor(state, elements) {
        this.state = state;
        this.elements = elements;
        this.defineAdditionalElements();
    }
    render() {
        this.renderMarkTurn();
        this.changeActiveMarkClass();
        this.renderScoreInfo(); // should be rendered only once per game
        this.renderBoard();
        this.highLightWinnerPosition();
    }
    renderBoard() {
        const board = this.state.currentBoardMatrix;
        const liElements = this.elements.gameBoardItems.querySelectorAll('.board-item');
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const boardValue = board[row][col];
                const item = liElements.item(row * 3 + col);
                if (!boardValue || item.hasChildNodes()) {
                    continue;
                }
                item.appendChild(this.getPlayerImage(boardValue));
            }
        }
    }
    renderMarkTurn() {
        if (this.state.activeMark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
            this.elements.turnXsvg.classList.remove('hidden');
            this.elements.turnOsvg.classList.add('hidden');
        }
        else {
            this.elements.turnOsvg.classList.remove('hidden');
            this.elements.turnXsvg.classList.add('hidden');
        }
    }
    changeActiveMarkClass() {
        if ([_model_model__WEBPACK_IMPORTED_MODULE_0__.GameStatus.HAS_TIE, _model_model__WEBPACK_IMPORTED_MODULE_0__.GameStatus.HAS_WINNER].includes(this.state.gameStatus)) {
            this.elements.gameBoardItems.classList.remove('active-x', 'active-o');
            return;
        }
        if (this.state.activeMark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
            this.elements.gameBoardItems.classList.add('active-x');
            this.elements.gameBoardItems.classList.remove('active-o');
        }
        else {
            this.elements.gameBoardItems.classList.add('active-o');
            this.elements.gameBoardItems.classList.remove('active-x');
        }
    }
    renderScoreInfo() {
        if (this.state.player2Type === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerType.cpu) {
            if (this.state.player1Mark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
                [this.elements.xPlayerTypeTextElement.textContent,
                    this.elements.oPlayerTypeTextElement.textContent] = ['YOU', 'CPU'];
            }
            else {
                [this.elements.xPlayerTypeTextElement.textContent,
                    this.elements.oPlayerTypeTextElement.textContent] = ['CPU', 'YOU'];
            }
        }
        else if (this.state.player2Type === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerType.player) {
            if (this.state.player1Mark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
                [this.elements.xPlayerTypeTextElement.textContent,
                    this.elements.oPlayerTypeTextElement.textContent] = ['P1', 'P2'];
            }
            else {
                [this.elements.xPlayerTypeTextElement.textContent,
                    this.elements.oPlayerTypeTextElement.textContent] = ['P2', 'P1'];
            }
        }
        if (this.state.player1Mark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
            [this.elements.xScoreElement.textContent, this.elements.oScoreElement.textContent] =
                [this.state.score.player1Score.toString(), this.state.score.player2Score.toString()];
        }
        else {
            [this.elements.xScoreElement.textContent, this.elements.oScoreElement.textContent] =
                [this.state.score.player2Score.toString(), this.state.score.player1Score.toString()];
        }
        this.elements.tiesScoreElement.textContent = this.state.score.ties.toString();
    }
    highLightWinnerPosition() {
        if (!this.state.winner) {
            return;
        }
        const liElements = this.elements.gameBoardItems.querySelectorAll('.board-item');
        const winnerElements = [
            liElements.item(this.state.winner.position[0]),
            liElements.item(this.state.winner.position[1]),
            liElements.item(this.state.winner.position[2]),
        ];
        let winnerClass;
        let winnerTemplate;
        switch (this.state.activeMark) {
            case _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x:
                winnerClass = 'player-x-winner';
                winnerTemplate = this.elements.xOutlineIconTemplate;
                break;
            case _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.o:
                winnerClass = 'player-o-winner';
                winnerTemplate = this.elements.oOutlineIconTemplate;
                break;
            default:
                throw new Error('unknown player mark');
        }
        for (const winnerElement of winnerElements) {
            winnerElement.classList.add(winnerClass);
            winnerElement.replaceChildren(winnerTemplate.content.cloneNode(true));
        }
    }
    defineAdditionalElements() {
        this.elements.turnXsvg = this.elements.turnCard.querySelector('.player-option__imageX');
        this.elements.turnOsvg = this.elements.turnCard.querySelector('.player-option__imageO');
        // Score elements
        this.elements.xScoreCardElement = this.elements.boardFooter.querySelector('.score-x');
        this.elements.xScoreElement = this.elements.xScoreCardElement.querySelector('.score');
        this.elements.xPlayerTypeTextElement = this.elements.xScoreCardElement.querySelector('.score-description > span');
        this.elements.oScoreCardElement = this.elements.boardFooter.querySelector('.score-o');
        this.elements.oScoreElement = this.elements.oScoreCardElement.querySelector('.score');
        this.elements.oPlayerTypeTextElement = this.elements.oScoreCardElement.querySelector('.score-description > span');
        this.elements.tiesScoreElement = this.elements.boardFooter.querySelector('.score-ties > .score');
    }
    getPlayerImage(mark) {
        if (mark === _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x) {
            return this.elements.xIconTemplate.content.cloneNode(true);
        }
        return this.elements.oIconTemplate.content.cloneNode(true);
    }
}


/***/ }),

/***/ 722:
/*!******************************!*\
  !*** ./src/features/main.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bootstrap": () => (/* binding */ bootstrap)
/* harmony export */ });
/* harmony import */ var _services_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/state */ 677);

// import {NewGameSelectionEvent} from './new-game-screen/new-game.component';
// const state = new LocalState();
function bootstrap() {
    // define objects
    const localStore = new _services_state__WEBPACK_IMPORTED_MODULE_0__.LocalStore();
    const container = document.body.querySelector('.app-container');
    const board = document.createElement('game-board');
    board.setState(structuredClone(localStore.store));
    // board.setState()
    container.appendChild(board);
    // const newGame = document.createElement('new-game');
    // newGame.addEventListener(NewGameSelectionEvent.type, (data) => {
    //     console.log(data);
    // })
    // container.appendChild(newGame);
}
// const newGameCtor = customElements.get('new-game');


/***/ }),

/***/ 759:
/*!************************************************************!*\
  !*** ./src/features/new-game-screen/new-game.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewGameElement": () => (/* binding */ NewGameElement),
/* harmony export */   "NewGameSelectionEvent": () => (/* binding */ NewGameSelectionEvent)
/* harmony export */ });
/* harmony import */ var _services_html_element_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/html-element-base */ 178);
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/model */ 891);


class NewGameSelectionEvent extends CustomEvent {
    constructor(payload) {
        super(NewGameSelectionEvent.type, { detail: payload });
    }
}
NewGameSelectionEvent.type = 'game-selection-change';
/**
 * New Game Screen Controller
 */
class NewGameElement extends _services_html_element_base__WEBPACK_IMPORTED_MODULE_0__.HTMLElementBase {
    constructor() {
        super({ templateIdSelector: 'new-game-template' });
        // local state variables
        this.currentPlayerOnePick = _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.o;
        this.getPlayerAgainstEvent = (player) => {
            return new NewGameSelectionEvent({
                playerOneSelection: this.currentPlayerOnePick,
                playerType: player,
            });
        };
        this.getPlayerAgainstListenerHelper = player => {
            return (event) => {
                event.preventDefault();
                this.dispatchEvent(this.getPlayerAgainstEvent(player));
            };
        };
        this.pickPlayerOptionListenerHelper = () => {
            return (event) => {
                if (event.target === event.currentTarget) {
                    // prevents error when clicks on margin area
                    return;
                }
                event.preventDefault();
                if (!(event.target instanceof Element)) {
                    throw new Error('element should have type Element');
                }
                const playerElement = event.target.closest("[data-option]");
                this.currentPlayerOnePick = playerElement.dataset['option'];
                if (playerElement === this.playerXoption && !playerElement.classList.contains('active-player-option')) {
                    this.setActiveMarkTo(_model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.x);
                }
                if (playerElement === this.playerOoption && !playerElement.classList.contains('active-player-option')) {
                    this.setActiveMarkTo(_model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.o);
                }
                this.dispatchEvent(new NewGameSelectionEvent({
                    playerOneSelection: this.currentPlayerOnePick,
                }));
            };
        };
        // LISTENERS
        this.newGameVsCpuListener = this.getPlayerAgainstListenerHelper(_model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerType.cpu);
        this.newGameVsPlayerListener = this.getPlayerAgainstListenerHelper(_model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerType.player);
        this.pickPlayerOptionListener = this.pickPlayerOptionListenerHelper();
    }
    // HOOKS
    connectedCallback() {
        super.connectedCallback();
        this.defineElements();
        this.setDefaultActiveMark();
        this.setListeners();
    }
    // disconnectedCallback() {
    //     console.log('were disconnected');
    // }
    // INITIALIZATION METHODS
    defineElements() {
        this.newGameVsCpuButtonElement = this.querySelector('.new-game-cpu-button');
        this.newGameVsPlayerButtonElement = this.querySelector('.new-game-player-button');
        this.playerOptionsElement = this.querySelector('.player-options');
        this.playerXoption = this.querySelector('.player-x-option');
        this.playerOoption = this.querySelector('.player-o-option');
    }
    setListeners() {
        this.newGameVsCpuButtonElement.addEventListener('click', this.newGameVsCpuListener);
        this.newGameVsPlayerButtonElement.addEventListener('click', this.newGameVsPlayerListener);
        // User choose either X or O
        this.playerOptionsElement.addEventListener('click', this.pickPlayerOptionListener);
    }
    // HELPER METHODS
    setDefaultActiveMark() {
        if (this.currentPlayerOnePick === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.x) {
            this.playerXoption.classList.add('active-player-option');
        }
        else {
            this.playerOoption.classList.add('active-player-option');
        }
    }
    setActiveMarkTo(playerMark) {
        if (playerMark === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.x) {
            this.playerXoption.classList.add('active-player-option');
            this.playerOoption.classList.remove('active-player-option');
        }
        if (playerMark === _model_model__WEBPACK_IMPORTED_MODULE_1__.PlayerMark.o) {
            this.playerOoption.classList.add('active-player-option');
            this.playerXoption.classList.remove('active-player-option');
        }
    }
}


/***/ }),

/***/ 607:
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ 466);
/* harmony import */ var _assets_icon_x_outline_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/icon-x-outline.svg */ 915);
/* harmony import */ var _assets_icon_o_outline_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/icon-o-outline.svg */ 281);
/* harmony import */ var _features_game_board_screen_game_board_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./features/game-board-screen/game-board.component */ 48);
/* harmony import */ var _features_new_game_screen_new_game_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./features/new-game-screen/new-game.component */ 759);
/* harmony import */ var _features_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./features/main */ 722);






customElements.define('new-game', _features_new_game_screen_new_game_component__WEBPACK_IMPORTED_MODULE_4__.NewGameElement);
customElements.define('game-board', _features_game_board_screen_game_board_component__WEBPACK_IMPORTED_MODULE_3__.GameBoardElement);
(0,_features_main__WEBPACK_IMPORTED_MODULE_5__.bootstrap)();


/***/ }),

/***/ 891:
/*!****************************!*\
  !*** ./src/model/model.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DialogContentType": () => (/* binding */ DialogContentType),
/* harmony export */   "GameStatus": () => (/* binding */ GameStatus),
/* harmony export */   "PlayerMark": () => (/* binding */ PlayerMark),
/* harmony export */   "PlayerType": () => (/* binding */ PlayerType),
/* harmony export */   "PlayersList": () => (/* binding */ PlayersList)
/* harmony export */ });
var PlayerType;
(function (PlayerType) {
    PlayerType["player"] = "PLAYER";
    PlayerType["cpu"] = "CPU";
})(PlayerType || (PlayerType = {}));
var PlayerMark;
(function (PlayerMark) {
    PlayerMark["x"] = "X";
    PlayerMark["o"] = "O";
    // none = 'none',
})(PlayerMark || (PlayerMark = {}));
var PlayersList;
(function (PlayersList) {
    PlayersList[PlayersList["PLAYER1"] = 0] = "PLAYER1";
    PlayersList[PlayersList["PLAYER2"] = 1] = "PLAYER2";
    // NONE,
})(PlayersList || (PlayersList = {}));
var DialogContentType;
(function (DialogContentType) {
    DialogContentType[DialogContentType["RESTART"] = 0] = "RESTART";
    DialogContentType[DialogContentType["WINNER"] = 1] = "WINNER";
    DialogContentType[DialogContentType["NONE"] = 2] = "NONE";
})(DialogContentType || (DialogContentType = {}));
var GameStatus;
(function (GameStatus) {
    GameStatus["IN_PROGRESS"] = "inprogress";
    GameStatus["HAS_TIE"] = "has_tie";
    GameStatus["HAS_WINNER"] = "has_winner";
})(GameStatus || (GameStatus = {}));


/***/ }),

/***/ 763:
/*!***************************************!*\
  !*** ./src/services/define-winner.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineWinner": () => (/* binding */ defineWinner)
/* harmony export */ });
const winnerPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function defineWinner(gameBoardMatrix) {
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
            };
        }
    }
    return;
}
function getAddressMatrix(address) {
    const row = Math.floor((address) / 3);
    const column = address - row * 3;
    return { row, column };
}


/***/ }),

/***/ 178:
/*!*******************************************!*\
  !*** ./src/services/html-element-base.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLElementBase": () => (/* binding */ HTMLElementBase)
/* harmony export */ });
class HTMLElementBase extends HTMLElement {
    constructor(options) {
        super();
        this.options = options;
    }
    connectedCallback() {
        const template = document.getElementById(this.options.templateIdSelector);
        if (!(template instanceof HTMLTemplateElement)) {
            throw new Error(`cannot find template with templateId ${this.options.templateIdSelector}`);
        }
        this.appendChild(template.content.cloneNode(true));
    }
}


/***/ }),

/***/ 677:
/*!*******************************!*\
  !*** ./src/services/state.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStore": () => (/* binding */ LocalStore)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 3);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 727);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 127);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 741);
/* harmony import */ var _model_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/model */ 891);


class StoreBase {
    constructor(initialState) {
        this.store$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(1);
        this.store$.next(initialState);
    }
    get store() {
        let currentStoreState;
        this.store$.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1)).subscribe((storeState) => {
            currentStoreState = storeState;
        });
        return currentStoreState;
    }
    select(mapFn) {
        return this.store$.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)((store) => mapFn(store)), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
    }
    setStore(newStore) {
        this.store$.next(Object.assign(Object.assign({}, this.store), newStore));
    }
    getStore() {
        return this.store$.asObservable();
    }
}
const initialState = {
    score: {
        player1Score: 0,
        player2Score: 0,
        ties: 0,
    },
    dialog: {
        isActive: false,
        type: _model_model__WEBPACK_IMPORTED_MODULE_0__.DialogContentType.NONE
    },
    currentBoardMatrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    activePlayer: _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayersList.PLAYER1,
    player1Mark: _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x,
    player2Mark: _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.o,
    activeMark: _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerMark.x,
    player2Type: _model_model__WEBPACK_IMPORTED_MODULE_0__.PlayerType.player,
    winner: undefined,
    gameStatus: _model_model__WEBPACK_IMPORTED_MODULE_0__.GameStatus.IN_PROGRESS,
};
class LocalStore extends StoreBase {
    constructor() {
        super(initialState);
    }
}


/***/ }),

/***/ 281:
/*!***************************************!*\
  !*** ./src/assets/icon-o-outline.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icon-o-outline.svg";

/***/ }),

/***/ 915:
/*!***************************************!*\
  !*** ./src/assets/icon-x-outline.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icon-x-outline.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(607)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxjQUFjLGdFQUFzQjtBQUNwQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2REFBbUI7QUFDckMsaUJBQWlCLHNEQUFZO0FBQzdCLGlCQUFpQixzREFBWTtBQUM3QixnQkFBZ0Isc0RBQVk7QUFDNUIsaUJBQWlCLDJEQUFpQjtBQUNsQztBQUNBLGdCQUFnQixnRUFBc0I7QUFDdEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvc3R5bGVzLnNjc3M/MDc2NCIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9mZWF0dXJlcy9nYW1lLWJvYXJkLXNjcmVlbi9nYW1lLWJvYXJkLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9mZWF0dXJlcy9nYW1lLWJvYXJkLXNjcmVlbi9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9mZWF0dXJlcy9tYWluLnRzIiwid2VicGFjazovL3RpYy10YWMtdG9lLy4vc3JjL2ZlYXR1cmVzL25ldy1nYW1lLXNjcmVlbi9uZXctZ2FtZS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvbW9kZWwvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvc2VydmljZXMvZGVmaW5lLXdpbm5lci50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9zZXJ2aWNlcy9odG1sLWVsZW1lbnQtYmFzZS50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9zZXJ2aWNlcy9zdGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBIVE1MRWxlbWVudEJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9odG1sLWVsZW1lbnQtYmFzZSc7XG5pbXBvcnQgeyBHYW1lU3RhdHVzLCBQbGF5ZXJNYXJrLCBQbGF5ZXJzTGlzdCB9IGZyb20gJy4uLy4uL21vZGVsL21vZGVsJztcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXJlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVmaW5lV2lubmVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGVmaW5lLXdpbm5lcic7XG5leHBvcnQgY2xhc3MgR2FtZUJvYXJkQ2hhbmdlRXZlbnQgZXh0ZW5kcyBDdXN0b21FdmVudCB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBzdXBlcihHYW1lQm9hcmRDaGFuZ2VFdmVudC50eXBlLCB7IGRldGFpbDogcGF5bG9hZCB9KTtcbiAgICB9XG59XG5HYW1lQm9hcmRDaGFuZ2VFdmVudC50eXBlID0gJ2dhbWUtYm9hcmQtY2hhbmdlJztcbmV4cG9ydCBjbGFzcyBHYW1lQm9hcmRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnRCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoeyB0ZW1wbGF0ZUlkU2VsZWN0b3I6ICdnYW1lLWJvYXJkLXRlbXBsYXRlJyB9KTtcbiAgICAgICAgdGhpcy5pc1N0YXRlUmVhZHkkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gICAgICAgIHRoaXMuaXNTdGF0ZVJlYWR5ID0gdGhpcy5pc1N0YXRlUmVhZHkkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgICAgdGhpcy5kZWZpbmVFbGVtZW50cygpO1xuICAgICAgICB0aGlzLnNldExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmlzU3RhdGVSZWFkeS5waXBlKGZpbHRlcihpc1JlYWR5ID0+IGlzUmVhZHkpLCB0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzLnN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZ2FtZUJvYXJkSXRlbXM6IHRoaXMuZ2FtZUJvYXJkSXRlbXMsXG4gICAgICAgICAgICAgICAgdHVybkNhcmQ6IHRoaXMudHVybkNhcmQsXG4gICAgICAgICAgICAgICAgc2NvcmVYOiB0aGlzLnNjb3JlWCxcbiAgICAgICAgICAgICAgICBzY29yZU86IHRoaXMuc2NvcmVPLFxuICAgICAgICAgICAgICAgIGJvYXJkRm9vdGVyOiB0aGlzLmJvYXJkRm9vdGVyLFxuICAgICAgICAgICAgICAgIHhJY29uVGVtcGxhdGU6IHRoaXMueEljb25UZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBvSWNvblRlbXBsYXRlOiB0aGlzLm9JY29uVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgeE91dGxpbmVJY29uVGVtcGxhdGU6IHRoaXMueE91dGxpbmVJY29uVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgb091dGxpbmVJY29uVGVtcGxhdGU6IHRoaXMub091dGxpbmVJY29uVGVtcGxhdGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuaXNTdGF0ZVJlYWR5JC5uZXh0KHRydWUpO1xuICAgIH1cbiAgICBkZWZpbmVFbGVtZW50cygpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmRJdGVtcyA9IHRoaXMucXVlcnlTZWxlY3RvcignLmdhbWUtYm9hcmQtaXRlbXMnKTtcbiAgICAgICAgdGhpcy5yZXN0YXJ0QnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcucmVzdGFydC1idXR0b24nKTtcbiAgICAgICAgdGhpcy50dXJuQ2FyZCA9IHRoaXMucXVlcnlTZWxlY3RvcignLnR1cm4nKTtcbiAgICAgICAgdGhpcy5zY29yZVggPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS14Jyk7XG4gICAgICAgIHRoaXMuc2NvcmVPID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtbycpO1xuICAgICAgICB0aGlzLmJvYXJkRm9vdGVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtZm9vdGVyJyk7XG4gICAgICAgIHRoaXMueEljb25UZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4LWljb24tdGVtcGxhdGUnKTtcbiAgICAgICAgdGhpcy5vSWNvblRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ28taWNvbi10ZW1wbGF0ZScpO1xuICAgICAgICB0aGlzLnhPdXRsaW5lSWNvblRlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3gtb3V0bGluZS1pY29uLXRlbXBsYXRlJyk7XG4gICAgICAgIHRoaXMub091dGxpbmVJY29uVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnby1vdXRsaW5lLWljb24tdGVtcGxhdGUnKTtcbiAgICB9XG4gICAgc2V0TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZEl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBjdXJyZW50IGdhbWUgaXMgYWxyZWFkeSBmaW5pc2hlZCB0aGVuIHN0b3AgZXhlY3V0aW9uXG4gICAgICAgICAgICBpZiAoW0dhbWVTdGF0dXMuSEFTX1RJRSwgR2FtZVN0YXR1cy5IQVNfV0lOTkVSXS5pbmNsdWRlcyh0aGlzLnN0YXRlLmdhbWVTdGF0dXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgLy8gQ2hlY2tzIGlmIGVpdGhlciBYIG9yIE8gaXMgYWxyZWFkeSBzZXRcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpIHx8IHRhcmdldCA9PT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRJdGVtUG9zaXRpb24gPSB0aGlzLmdldENsaWNrZWRFbGVtZW50Qm9hcmRQb3NpdGlvbih0YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoY2xpY2tlZEl0ZW1Qb3NpdGlvbik7XG4gICAgICAgICAgICAvLyBjaGVjayB0aGUgd2lubmVyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXIgPSBkZWZpbmVXaW5uZXIodGhpcy5zdGF0ZS5jdXJyZW50Qm9hcmRNYXRyaXgpO1xuICAgICAgICAgICAgaWYgKHdpbm5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXR1cyhHYW1lU3RhdHVzLkhBU19XSU5ORVIpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlV2lubmVyKHdpbm5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZSh0aGlzLnN0YXRlLmFjdGl2ZVBsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFyZUFsbEJvYXJkRWxlbWVudEFyZWFzU2V0KHRoaXMuc3RhdGUuY3VycmVudEJvYXJkTWF0cml4KSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIG5vIHdpbm5lciBidXQgYWxsIHRoZSBmaWVsZHMgYXJlIGFscmVhZHkgZmlsbGVkIGVpdGhlciB3aXRoIFggb3IgT1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gaXQncyBUSUUgc2l0dWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lU3RhdHVzKEdhbWVTdGF0dXMuSEFTX1RJRSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZU1hcmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNlbmQgc3RhdGUgdG8gc2F2ZSBpdCBzb21ld2hlcmVcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgR2FtZUJvYXJkQ2hhbmdlRXZlbnQodGhpcy5zdGF0ZSkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIHNob3cgZGlhbG9nXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVNYXRyaXgoaXRlbVBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguY2VpbChpdGVtUG9zaXRpb24gLyAzKTtcbiAgICAgICAgY29uc3QgY29sdW1uID0gaXRlbVBvc2l0aW9uIC0gKHJvdyAtIDEpICogMztcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50Qm9hcmRNYXRyaXhbcm93IC0gMV1bY29sdW1uIC0gMV0gPSB0aGlzLnN0YXRlLmFjdGl2ZU1hcms7XG4gICAgfVxuICAgIHVwZGF0ZVdpbm5lcih3aW5uZXIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS53aW5uZXIgPSB3aW5uZXI7XG4gICAgfVxuICAgIHVwZGF0ZUdhbWVTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuZ2FtZVN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gICAgdXBkYXRlU2NvcmUod2lubmVyKSB7XG4gICAgICAgIGlmICh3aW5uZXIgPT09IFBsYXllcnNMaXN0LlBMQVlFUjEpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc2NvcmUucGxheWVyMVNjb3JlKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod2lubmVyID09PSBQbGF5ZXJzTGlzdC5QTEFZRVIyKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNjb3JlLnBsYXllcjJTY29yZSsrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zY29yZS50aWVzKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9nZ2xlQWN0aXZlUGxheWVyKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVBsYXllciA9IHRoaXMuc3RhdGUuYWN0aXZlUGxheWVyID09PSBQbGF5ZXJzTGlzdC5QTEFZRVIxID8gUGxheWVyc0xpc3QuUExBWUVSMiA6IFBsYXllcnNMaXN0LlBMQVlFUjE7XG4gICAgfVxuICAgIHRvZ2dsZUFjdGl2ZU1hcmsoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlTWFyayA9IHRoaXMuc3RhdGUuYWN0aXZlTWFyayA9PT0gUGxheWVyTWFyay54ID8gUGxheWVyTWFyay5vIDogUGxheWVyTWFyay54O1xuICAgIH1cbiAgICBnZXRDbGlja2VkRWxlbWVudEJvYXJkUG9zaXRpb24odGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiArdGFyZ2V0LmRhdGFzZXRbJ2l0ZW1OdW1iZXInXTtcbiAgICB9XG4gICAgYXJlQWxsQm9hcmRFbGVtZW50QXJlYXNTZXQoYm9hcmQpIHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYm9hcmQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sIG9mIHJvdykge1xuICAgICAgICAgICAgICAgIGlmICghY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR2FtZVN0YXR1cywgUGxheWVyTWFyaywgUGxheWVyVHlwZSB9IGZyb20gXCIuLi8uLi9tb2RlbC9tb2RlbFwiO1xuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSwgZWxlbWVudHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG4gICAgICAgIHRoaXMuZGVmaW5lQWRkaXRpb25hbEVsZW1lbnRzKCk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJNYXJrVHVybigpO1xuICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZU1hcmtDbGFzcygpO1xuICAgICAgICB0aGlzLnJlbmRlclNjb3JlSW5mbygpOyAvLyBzaG91bGQgYmUgcmVuZGVyZWQgb25seSBvbmNlIHBlciBnYW1lXG4gICAgICAgIHRoaXMucmVuZGVyQm9hcmQoKTtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHRXaW5uZXJQb3NpdGlvbigpO1xuICAgIH1cbiAgICByZW5kZXJCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLnN0YXRlLmN1cnJlbnRCb2FyZE1hdHJpeDtcbiAgICAgICAgY29uc3QgbGlFbGVtZW50cyA9IHRoaXMuZWxlbWVudHMuZ2FtZUJvYXJkSXRlbXMucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWl0ZW0nKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgYm9hcmQubGVuZ3RoOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgYm9hcmRbcm93XS5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9hcmRWYWx1ZSA9IGJvYXJkW3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gbGlFbGVtZW50cy5pdGVtKHJvdyAqIDMgKyBjb2wpO1xuICAgICAgICAgICAgICAgIGlmICghYm9hcmRWYWx1ZSB8fCBpdGVtLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbS5hcHBlbmRDaGlsZCh0aGlzLmdldFBsYXllckltYWdlKGJvYXJkVmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJNYXJrVHVybigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlTWFyayA9PT0gUGxheWVyTWFyay54KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnR1cm5Yc3ZnLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy50dXJuT3N2Zy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMudHVybk9zdmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnR1cm5Yc3ZnLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZUFjdGl2ZU1hcmtDbGFzcygpIHtcbiAgICAgICAgaWYgKFtHYW1lU3RhdHVzLkhBU19USUUsIEdhbWVTdGF0dXMuSEFTX1dJTk5FUl0uaW5jbHVkZXModGhpcy5zdGF0ZS5nYW1lU3RhdHVzKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5nYW1lQm9hcmRJdGVtcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUteCcsICdhY3RpdmUtbycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZU1hcmsgPT09IFBsYXllck1hcmsueCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5nYW1lQm9hcmRJdGVtcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUteCcpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5nYW1lQm9hcmRJdGVtcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtbycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5nYW1lQm9hcmRJdGVtcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtbycpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5nYW1lQm9hcmRJdGVtcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUteCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlclNjb3JlSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGxheWVyMlR5cGUgPT09IFBsYXllclR5cGUuY3B1KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5wbGF5ZXIxTWFyayA9PT0gUGxheWVyTWFyay54KSB7XG4gICAgICAgICAgICAgICAgW3RoaXMuZWxlbWVudHMueFBsYXllclR5cGVUZXh0RWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5vUGxheWVyVHlwZVRleHRFbGVtZW50LnRleHRDb250ZW50XSA9IFsnWU9VJywgJ0NQVSddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgW3RoaXMuZWxlbWVudHMueFBsYXllclR5cGVUZXh0RWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5vUGxheWVyVHlwZVRleHRFbGVtZW50LnRleHRDb250ZW50XSA9IFsnQ1BVJywgJ1lPVSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUucGxheWVyMlR5cGUgPT09IFBsYXllclR5cGUucGxheWVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5wbGF5ZXIxTWFyayA9PT0gUGxheWVyTWFyay54KSB7XG4gICAgICAgICAgICAgICAgW3RoaXMuZWxlbWVudHMueFBsYXllclR5cGVUZXh0RWxlbWVudC50ZXh0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5vUGxheWVyVHlwZVRleHRFbGVtZW50LnRleHRDb250ZW50XSA9IFsnUDEnLCAnUDInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFt0aGlzLmVsZW1lbnRzLnhQbGF5ZXJUeXBlVGV4dEVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMub1BsYXllclR5cGVUZXh0RWxlbWVudC50ZXh0Q29udGVudF0gPSBbJ1AyJywgJ1AxJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGxheWVyMU1hcmsgPT09IFBsYXllck1hcmsueCkge1xuICAgICAgICAgICAgW3RoaXMuZWxlbWVudHMueFNjb3JlRWxlbWVudC50ZXh0Q29udGVudCwgdGhpcy5lbGVtZW50cy5vU2NvcmVFbGVtZW50LnRleHRDb250ZW50XSA9XG4gICAgICAgICAgICAgICAgW3RoaXMuc3RhdGUuc2NvcmUucGxheWVyMVNjb3JlLnRvU3RyaW5nKCksIHRoaXMuc3RhdGUuc2NvcmUucGxheWVyMlNjb3JlLnRvU3RyaW5nKCldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgW3RoaXMuZWxlbWVudHMueFNjb3JlRWxlbWVudC50ZXh0Q29udGVudCwgdGhpcy5lbGVtZW50cy5vU2NvcmVFbGVtZW50LnRleHRDb250ZW50XSA9XG4gICAgICAgICAgICAgICAgW3RoaXMuc3RhdGUuc2NvcmUucGxheWVyMlNjb3JlLnRvU3RyaW5nKCksIHRoaXMuc3RhdGUuc2NvcmUucGxheWVyMVNjb3JlLnRvU3RyaW5nKCldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudHMudGllc1Njb3JlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuc3RhdGUuc2NvcmUudGllcy50b1N0cmluZygpO1xuICAgIH1cbiAgICBoaWdoTGlnaHRXaW5uZXJQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLndpbm5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpRWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzLmdhbWVCb2FyZEl0ZW1zLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IHdpbm5lckVsZW1lbnRzID0gW1xuICAgICAgICAgICAgbGlFbGVtZW50cy5pdGVtKHRoaXMuc3RhdGUud2lubmVyLnBvc2l0aW9uWzBdKSxcbiAgICAgICAgICAgIGxpRWxlbWVudHMuaXRlbSh0aGlzLnN0YXRlLndpbm5lci5wb3NpdGlvblsxXSksXG4gICAgICAgICAgICBsaUVsZW1lbnRzLml0ZW0odGhpcy5zdGF0ZS53aW5uZXIucG9zaXRpb25bMl0pLFxuICAgICAgICBdO1xuICAgICAgICBsZXQgd2lubmVyQ2xhc3M7XG4gICAgICAgIGxldCB3aW5uZXJUZW1wbGF0ZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLmFjdGl2ZU1hcmspIHtcbiAgICAgICAgICAgIGNhc2UgUGxheWVyTWFyay54OlxuICAgICAgICAgICAgICAgIHdpbm5lckNsYXNzID0gJ3BsYXllci14LXdpbm5lcic7XG4gICAgICAgICAgICAgICAgd2lubmVyVGVtcGxhdGUgPSB0aGlzLmVsZW1lbnRzLnhPdXRsaW5lSWNvblRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJNYXJrLm86XG4gICAgICAgICAgICAgICAgd2lubmVyQ2xhc3MgPSAncGxheWVyLW8td2lubmVyJztcbiAgICAgICAgICAgICAgICB3aW5uZXJUZW1wbGF0ZSA9IHRoaXMuZWxlbWVudHMub091dGxpbmVJY29uVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBwbGF5ZXIgbWFyaycpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgd2lubmVyRWxlbWVudCBvZiB3aW5uZXJFbGVtZW50cykge1xuICAgICAgICAgICAgd2lubmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHdpbm5lckNsYXNzKTtcbiAgICAgICAgICAgIHdpbm5lckVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKHdpbm5lclRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWZpbmVBZGRpdGlvbmFsRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMudHVyblhzdmcgPSB0aGlzLmVsZW1lbnRzLnR1cm5DYXJkLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItb3B0aW9uX19pbWFnZVgnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy50dXJuT3N2ZyA9IHRoaXMuZWxlbWVudHMudHVybkNhcmQucXVlcnlTZWxlY3RvcignLnBsYXllci1vcHRpb25fX2ltYWdlTycpO1xuICAgICAgICAvLyBTY29yZSBlbGVtZW50c1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnhTY29yZUNhcmRFbGVtZW50ID0gdGhpcy5lbGVtZW50cy5ib2FyZEZvb3Rlci5xdWVyeVNlbGVjdG9yKCcuc2NvcmUteCcpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnhTY29yZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzLnhTY29yZUNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnhQbGF5ZXJUeXBlVGV4dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzLnhTY29yZUNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS1kZXNjcmlwdGlvbiA+IHNwYW4nKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5vU2NvcmVDYXJkRWxlbWVudCA9IHRoaXMuZWxlbWVudHMuYm9hcmRGb290ZXIucXVlcnlTZWxlY3RvcignLnNjb3JlLW8nKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5vU2NvcmVFbGVtZW50ID0gdGhpcy5lbGVtZW50cy5vU2NvcmVDYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5vUGxheWVyVHlwZVRleHRFbGVtZW50ID0gdGhpcy5lbGVtZW50cy5vU2NvcmVDYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtZGVzY3JpcHRpb24gPiBzcGFuJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMudGllc1Njb3JlRWxlbWVudCA9IHRoaXMuZWxlbWVudHMuYm9hcmRGb290ZXIucXVlcnlTZWxlY3RvcignLnNjb3JlLXRpZXMgPiAuc2NvcmUnKTtcbiAgICB9XG4gICAgZ2V0UGxheWVySW1hZ2UobWFyaykge1xuICAgICAgICBpZiAobWFyayA9PT0gUGxheWVyTWFyay54KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy54SWNvblRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLm9JY29uVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9jYWxTdG9yZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9zdGF0ZVwiO1xuLy8gaW1wb3J0IHtOZXdHYW1lU2VsZWN0aW9uRXZlbnR9IGZyb20gJy4vbmV3LWdhbWUtc2NyZWVuL25ldy1nYW1lLmNvbXBvbmVudCc7XG4vLyBjb25zdCBzdGF0ZSA9IG5ldyBMb2NhbFN0YXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAgIC8vIGRlZmluZSBvYmplY3RzXG4gICAgY29uc3QgbG9jYWxTdG9yZSA9IG5ldyBMb2NhbFN0b3JlKCk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcuYXBwLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZ2FtZS1ib2FyZCcpO1xuICAgIGJvYXJkLnNldFN0YXRlKHN0cnVjdHVyZWRDbG9uZShsb2NhbFN0b3JlLnN0b3JlKSk7XG4gICAgLy8gYm9hcmQuc2V0U3RhdGUoKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgLy8gY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25ldy1nYW1lJyk7XG4gICAgLy8gbmV3R2FtZS5hZGRFdmVudExpc3RlbmVyKE5ld0dhbWVTZWxlY3Rpb25FdmVudC50eXBlLCAoZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyB9KVxuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdHYW1lKTtcbn1cbi8vIGNvbnN0IG5ld0dhbWVDdG9yID0gY3VzdG9tRWxlbWVudHMuZ2V0KCduZXctZ2FtZScpO1xuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnRCYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvaHRtbC1lbGVtZW50LWJhc2UnO1xuaW1wb3J0IHsgUGxheWVyVHlwZSwgUGxheWVyTWFyayB9IGZyb20gJy4uLy4uL21vZGVsL21vZGVsJztcbmV4cG9ydCBjbGFzcyBOZXdHYW1lU2VsZWN0aW9uRXZlbnQgZXh0ZW5kcyBDdXN0b21FdmVudCB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBzdXBlcihOZXdHYW1lU2VsZWN0aW9uRXZlbnQudHlwZSwgeyBkZXRhaWw6IHBheWxvYWQgfSk7XG4gICAgfVxufVxuTmV3R2FtZVNlbGVjdGlvbkV2ZW50LnR5cGUgPSAnZ2FtZS1zZWxlY3Rpb24tY2hhbmdlJztcbi8qKlxuICogTmV3IEdhbWUgU2NyZWVuIENvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IGNsYXNzIE5ld0dhbWVFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnRCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoeyB0ZW1wbGF0ZUlkU2VsZWN0b3I6ICduZXctZ2FtZS10ZW1wbGF0ZScgfSk7XG4gICAgICAgIC8vIGxvY2FsIHN0YXRlIHZhcmlhYmxlc1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJPbmVQaWNrID0gUGxheWVyTWFyay5vO1xuICAgICAgICB0aGlzLmdldFBsYXllckFnYWluc3RFdmVudCA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmV3R2FtZVNlbGVjdGlvbkV2ZW50KHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJPbmVTZWxlY3Rpb246IHRoaXMuY3VycmVudFBsYXllck9uZVBpY2ssXG4gICAgICAgICAgICAgICAgcGxheWVyVHlwZTogcGxheWVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0UGxheWVyQWdhaW5zdExpc3RlbmVySGVscGVyID0gcGxheWVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmdldFBsYXllckFnYWluc3RFdmVudChwbGF5ZXIpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGlja1BsYXllck9wdGlvbkxpc3RlbmVySGVscGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJldmVudHMgZXJyb3Igd2hlbiBjbGlja3Mgb24gbWFyZ2luIGFyZWFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICghKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudCBzaG91bGQgaGF2ZSB0eXBlIEVsZW1lbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGxheWVyRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtb3B0aW9uXVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJPbmVQaWNrID0gcGxheWVyRWxlbWVudC5kYXRhc2V0WydvcHRpb24nXTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyRWxlbWVudCA9PT0gdGhpcy5wbGF5ZXJYb3B0aW9uICYmICFwbGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlLXBsYXllci1vcHRpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU1hcmtUbyhQbGF5ZXJNYXJrLngpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyRWxlbWVudCA9PT0gdGhpcy5wbGF5ZXJPb3B0aW9uICYmICFwbGF5ZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlLXBsYXllci1vcHRpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU1hcmtUbyhQbGF5ZXJNYXJrLm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE5ld0dhbWVTZWxlY3Rpb25FdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllck9uZVNlbGVjdGlvbjogdGhpcy5jdXJyZW50UGxheWVyT25lUGljayxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICAvLyBMSVNURU5FUlNcbiAgICAgICAgdGhpcy5uZXdHYW1lVnNDcHVMaXN0ZW5lciA9IHRoaXMuZ2V0UGxheWVyQWdhaW5zdExpc3RlbmVySGVscGVyKFBsYXllclR5cGUuY3B1KTtcbiAgICAgICAgdGhpcy5uZXdHYW1lVnNQbGF5ZXJMaXN0ZW5lciA9IHRoaXMuZ2V0UGxheWVyQWdhaW5zdExpc3RlbmVySGVscGVyKFBsYXllclR5cGUucGxheWVyKTtcbiAgICAgICAgdGhpcy5waWNrUGxheWVyT3B0aW9uTGlzdGVuZXIgPSB0aGlzLnBpY2tQbGF5ZXJPcHRpb25MaXN0ZW5lckhlbHBlcigpO1xuICAgIH1cbiAgICAvLyBIT09LU1xuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgICB0aGlzLmRlZmluZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEFjdGl2ZU1hcmsoKTtcbiAgICAgICAgdGhpcy5zZXRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLy8gZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCd3ZXJlIGRpc2Nvbm5lY3RlZCcpO1xuICAgIC8vIH1cbiAgICAvLyBJTklUSUFMSVpBVElPTiBNRVRIT0RTXG4gICAgZGVmaW5lRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMubmV3R2FtZVZzQ3B1QnV0dG9uRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lLWNwdS1idXR0b24nKTtcbiAgICAgICAgdGhpcy5uZXdHYW1lVnNQbGF5ZXJCdXR0b25FbGVtZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubmV3LWdhbWUtcGxheWVyLWJ1dHRvbicpO1xuICAgICAgICB0aGlzLnBsYXllck9wdGlvbnNFbGVtZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcucGxheWVyLW9wdGlvbnMnKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJYb3B0aW9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXgtb3B0aW9uJyk7XG4gICAgICAgIHRoaXMucGxheWVyT29wdGlvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignLnBsYXllci1vLW9wdGlvbicpO1xuICAgIH1cbiAgICBzZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubmV3R2FtZVZzQ3B1QnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmV3R2FtZVZzQ3B1TGlzdGVuZXIpO1xuICAgICAgICB0aGlzLm5ld0dhbWVWc1BsYXllckJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm5ld0dhbWVWc1BsYXllckxpc3RlbmVyKTtcbiAgICAgICAgLy8gVXNlciBjaG9vc2UgZWl0aGVyIFggb3IgT1xuICAgICAgICB0aGlzLnBsYXllck9wdGlvbnNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5waWNrUGxheWVyT3B0aW9uTGlzdGVuZXIpO1xuICAgIH1cbiAgICAvLyBIRUxQRVIgTUVUSE9EU1xuICAgIHNldERlZmF1bHRBY3RpdmVNYXJrKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyT25lUGljayA9PT0gUGxheWVyTWFyay54KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllclhvcHRpb24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlLXBsYXllci1vcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyT29wdGlvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcGxheWVyLW9wdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEFjdGl2ZU1hcmtUbyhwbGF5ZXJNYXJrKSB7XG4gICAgICAgIGlmIChwbGF5ZXJNYXJrID09PSBQbGF5ZXJNYXJrLngpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyWG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcGxheWVyLW9wdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJPb3B0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wbGF5ZXItb3B0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllck1hcmsgPT09IFBsYXllck1hcmsubykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJPb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wbGF5ZXItb3B0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLnBsYXllclhvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLXBsYXllci1vcHRpb24nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAnLi9zdHlsZXMuc2Nzcyc7XG5pbXBvcnQgJy4vYXNzZXRzL2ljb24teC1vdXRsaW5lLnN2Zyc7XG5pbXBvcnQgJy4vYXNzZXRzL2ljb24tby1vdXRsaW5lLnN2Zyc7XG5pbXBvcnQgeyBHYW1lQm9hcmRFbGVtZW50IH0gZnJvbSAnLi9mZWF0dXJlcy9nYW1lLWJvYXJkLXNjcmVlbi9nYW1lLWJvYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZXdHYW1lRWxlbWVudCB9IGZyb20gJy4vZmVhdHVyZXMvbmV3LWdhbWUtc2NyZWVuL25ldy1nYW1lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICcuL2ZlYXR1cmVzL21haW4nO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCduZXctZ2FtZScsIE5ld0dhbWVFbGVtZW50KTtcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZ2FtZS1ib2FyZCcsIEdhbWVCb2FyZEVsZW1lbnQpO1xuYm9vdHN0cmFwKCk7XG4iLCJleHBvcnQgdmFyIFBsYXllclR5cGU7XG4oZnVuY3Rpb24gKFBsYXllclR5cGUpIHtcbiAgICBQbGF5ZXJUeXBlW1wicGxheWVyXCJdID0gXCJQTEFZRVJcIjtcbiAgICBQbGF5ZXJUeXBlW1wiY3B1XCJdID0gXCJDUFVcIjtcbn0pKFBsYXllclR5cGUgfHwgKFBsYXllclR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBQbGF5ZXJNYXJrO1xuKGZ1bmN0aW9uIChQbGF5ZXJNYXJrKSB7XG4gICAgUGxheWVyTWFya1tcInhcIl0gPSBcIlhcIjtcbiAgICBQbGF5ZXJNYXJrW1wib1wiXSA9IFwiT1wiO1xuICAgIC8vIG5vbmUgPSAnbm9uZScsXG59KShQbGF5ZXJNYXJrIHx8IChQbGF5ZXJNYXJrID0ge30pKTtcbmV4cG9ydCB2YXIgUGxheWVyc0xpc3Q7XG4oZnVuY3Rpb24gKFBsYXllcnNMaXN0KSB7XG4gICAgUGxheWVyc0xpc3RbUGxheWVyc0xpc3RbXCJQTEFZRVIxXCJdID0gMF0gPSBcIlBMQVlFUjFcIjtcbiAgICBQbGF5ZXJzTGlzdFtQbGF5ZXJzTGlzdFtcIlBMQVlFUjJcIl0gPSAxXSA9IFwiUExBWUVSMlwiO1xuICAgIC8vIE5PTkUsXG59KShQbGF5ZXJzTGlzdCB8fCAoUGxheWVyc0xpc3QgPSB7fSkpO1xuZXhwb3J0IHZhciBEaWFsb2dDb250ZW50VHlwZTtcbihmdW5jdGlvbiAoRGlhbG9nQ29udGVudFR5cGUpIHtcbiAgICBEaWFsb2dDb250ZW50VHlwZVtEaWFsb2dDb250ZW50VHlwZVtcIlJFU1RBUlRcIl0gPSAwXSA9IFwiUkVTVEFSVFwiO1xuICAgIERpYWxvZ0NvbnRlbnRUeXBlW0RpYWxvZ0NvbnRlbnRUeXBlW1wiV0lOTkVSXCJdID0gMV0gPSBcIldJTk5FUlwiO1xuICAgIERpYWxvZ0NvbnRlbnRUeXBlW0RpYWxvZ0NvbnRlbnRUeXBlW1wiTk9ORVwiXSA9IDJdID0gXCJOT05FXCI7XG59KShEaWFsb2dDb250ZW50VHlwZSB8fCAoRGlhbG9nQ29udGVudFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBHYW1lU3RhdHVzO1xuKGZ1bmN0aW9uIChHYW1lU3RhdHVzKSB7XG4gICAgR2FtZVN0YXR1c1tcIklOX1BST0dSRVNTXCJdID0gXCJpbnByb2dyZXNzXCI7XG4gICAgR2FtZVN0YXR1c1tcIkhBU19USUVcIl0gPSBcImhhc190aWVcIjtcbiAgICBHYW1lU3RhdHVzW1wiSEFTX1dJTk5FUlwiXSA9IFwiaGFzX3dpbm5lclwiO1xufSkoR2FtZVN0YXR1cyB8fCAoR2FtZVN0YXR1cyA9IHt9KSk7XG4iLCJjb25zdCB3aW5uZXJQb3NpdGlvbnMgPSBbXG4gICAgWzAsIDEsIDJdLFxuICAgIFszLCA0LCA1XSxcbiAgICBbNiwgNywgOF0sXG4gICAgWzAsIDMsIDZdLFxuICAgIFsxLCA0LCA3XSxcbiAgICBbMiwgNSwgOF0sXG4gICAgWzAsIDQsIDhdLFxuICAgIFsyLCA0LCA2XSxcbl07XG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lV2lubmVyKGdhbWVCb2FyZE1hdHJpeCkge1xuICAgIGZvciAoY29uc3QgcG9zaXRpb24gb2Ygd2lubmVyUG9zaXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1BZGRyZXNzMSA9IGdldEFkZHJlc3NNYXRyaXgocG9zaXRpb25bMF0pO1xuICAgICAgICBjb25zdCBpdGVtQWRkcmVzczIgPSBnZXRBZGRyZXNzTWF0cml4KHBvc2l0aW9uWzFdKTtcbiAgICAgICAgY29uc3QgaXRlbUFkZHJlc3MzID0gZ2V0QWRkcmVzc01hdHJpeChwb3NpdGlvblsyXSk7XG4gICAgICAgIGNvbnN0IGl0ZW0xID0gZ2FtZUJvYXJkTWF0cml4W2l0ZW1BZGRyZXNzMS5yb3ddW2l0ZW1BZGRyZXNzMS5jb2x1bW5dO1xuICAgICAgICBjb25zdCBpdGVtMiA9IGdhbWVCb2FyZE1hdHJpeFtpdGVtQWRkcmVzczIucm93XVtpdGVtQWRkcmVzczIuY29sdW1uXTtcbiAgICAgICAgY29uc3QgaXRlbTMgPSBnYW1lQm9hcmRNYXRyaXhbaXRlbUFkZHJlc3MzLnJvd11baXRlbUFkZHJlc3MzLmNvbHVtbl07XG4gICAgICAgIGlmIChpdGVtMSA9PT0gaXRlbTIgJiYgaXRlbTIgPT09IGl0ZW0zICYmICEhaXRlbTEpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gZ2V0QWRkcmVzc01hdHJpeChhZGRyZXNzKSB7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcigoYWRkcmVzcykgLyAzKTtcbiAgICBjb25zdCBjb2x1bW4gPSBhZGRyZXNzIC0gcm93ICogMztcbiAgICByZXR1cm4geyByb3csIGNvbHVtbiB9O1xufVxuIiwiZXhwb3J0IGNsYXNzIEhUTUxFbGVtZW50QmFzZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZUlkU2VsZWN0b3IpO1xuICAgICAgICBpZiAoISh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIHRlbXBsYXRlIHdpdGggdGVtcGxhdGVJZCAke3RoaXMub3B0aW9ucy50ZW1wbGF0ZUlkU2VsZWN0b3J9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgUmVwbGF5U3ViamVjdCwgdGFrZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBQbGF5ZXJUeXBlLCBQbGF5ZXJzTGlzdCwgUGxheWVyTWFyaywgRGlhbG9nQ29udGVudFR5cGUsIEdhbWVTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWwvbW9kZWxcIjtcbmNsYXNzIFN0b3JlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RvcmUkID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG4gICAgICAgIHRoaXMuc3RvcmUkLm5leHQoaW5pdGlhbFN0YXRlKTtcbiAgICB9XG4gICAgZ2V0IHN0b3JlKCkge1xuICAgICAgICBsZXQgY3VycmVudFN0b3JlU3RhdGU7XG4gICAgICAgIHRoaXMuc3RvcmUkLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChzdG9yZVN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50U3RvcmVTdGF0ZSA9IHN0b3JlU3RhdGU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3VycmVudFN0b3JlU3RhdGU7XG4gICAgfVxuICAgIHNlbGVjdChtYXBGbikge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZSQuYXNPYnNlcnZhYmxlKCkucGlwZShtYXAoKHN0b3JlKSA9PiBtYXBGbihzdG9yZSkpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICB9XG4gICAgc2V0U3RvcmUobmV3U3RvcmUpIHtcbiAgICAgICAgdGhpcy5zdG9yZSQubmV4dChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RvcmUpLCBuZXdTdG9yZSkpO1xuICAgIH1cbiAgICBnZXRTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBzY29yZToge1xuICAgICAgICBwbGF5ZXIxU2NvcmU6IDAsXG4gICAgICAgIHBsYXllcjJTY29yZTogMCxcbiAgICAgICAgdGllczogMCxcbiAgICB9LFxuICAgIGRpYWxvZzoge1xuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIHR5cGU6IERpYWxvZ0NvbnRlbnRUeXBlLk5PTkVcbiAgICB9LFxuICAgIGN1cnJlbnRCb2FyZE1hdHJpeDogW1xuICAgICAgICBbbnVsbCwgbnVsbCwgbnVsbF0sXG4gICAgICAgIFtudWxsLCBudWxsLCBudWxsXSxcbiAgICAgICAgW251bGwsIG51bGwsIG51bGxdLFxuICAgIF0sXG4gICAgYWN0aXZlUGxheWVyOiBQbGF5ZXJzTGlzdC5QTEFZRVIxLFxuICAgIHBsYXllcjFNYXJrOiBQbGF5ZXJNYXJrLngsXG4gICAgcGxheWVyMk1hcms6IFBsYXllck1hcmsubyxcbiAgICBhY3RpdmVNYXJrOiBQbGF5ZXJNYXJrLngsXG4gICAgcGxheWVyMlR5cGU6IFBsYXllclR5cGUucGxheWVyLFxuICAgIHdpbm5lcjogdW5kZWZpbmVkLFxuICAgIGdhbWVTdGF0dXM6IEdhbWVTdGF0dXMuSU5fUFJPR1JFU1MsXG59O1xuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmUgZXh0ZW5kcyBTdG9yZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihpbml0aWFsU3RhdGUpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==