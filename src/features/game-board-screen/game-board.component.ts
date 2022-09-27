import { HTMLElementBase } from '../../services/html-element-base';
import { Components, GameState, GameStatus, PlayerMark, PlayersList, Winner } from '../../model/model';
import { Renderer } from './renderer';
import { defineWinner } from '../../services/define-winner';
import { Modal, ModalType } from '../modal-window/modal';
import { state } from '../../services/state';
import { Router } from '../../services/router';

export class GameBoardChangeEvent extends CustomEvent<GameState> {
    public static type = 'game-board-change';
    constructor(payload: GameState) {
        super(GameBoardChangeEvent.type, {detail: payload, bubbles: true});
    }
}

export class GameBoardElement extends HTMLElementBase {

    // View variables
    private gameBoardItems?: HTMLUListElement;
    private restartButton?: HTMLAnchorElement;
    private turnCard?: HTMLDivElement;
    private scoreX?: HTMLDivElement;
    private scoreO?: HTMLDivElement;
    private boardFooter: HTMLDivElement;
    private xIconTemplate?: HTMLTemplateElement;
    private oIconTemplate?: HTMLTemplateElement;
    private xOutlineIconTemplate?: HTMLTemplateElement;
    private oOutlineIconTemplate?: HTMLTemplateElement;


    private state: GameState;
    private renderer: Renderer;
    private modal: Modal;

    private preProcessingActions = {
        winnerStateNextRoundClick: [
            this.resetMatrix,
            this.resetWinner,
            this.resetGameStatus,
            this.changeActivePlayerParameters,
        ],
        tieStateNextRoundClick: [
            this.resetMatrix,
            this.resetGameStatus,
            this.changeActivePlayerParameters,
        ],
        restartStateActions: [
            this.resetMatrix,
            this.resetGameStatus,
            this.resetScore,
            this.resetActiveMark,
            this.restoreActivePlayerOnTheBeginningOfTheGame,
            this.restoreActivePlayerOnRounStartOnTheBeginningOfTheGame,
            this.restorePlayersMarksOnTheBeginningOfTheGame,
        ],
    }

    constructor() {
        super({templateIdSelector: 'game-board-template'});
        this.state = state.store;
    }

    connectedCallback() {
        super.connectedCallback();
        this.defineUiElements();
        this.setListeners();

        this.modal = new Modal({
            xIconTemplate: this.xIconTemplate,
            oIconTemplate: this.oIconTemplate,
        });

        this.renderer = new Renderer(
            this.state,
            {
                gameBoardItems: this.gameBoardItems,
                turnCard: this.turnCard,
                scoreX: this.scoreX,
                scoreO: this.scoreO,
                boardFooter: this.boardFooter,
                xIconTemplate: this.xIconTemplate,
                oIconTemplate: this.oIconTemplate,
                xOutlineIconTemplate: this.xOutlineIconTemplate,
                oOutlineIconTemplate: this.oOutlineIconTemplate,
            }
        );
        this.restoreModalWindow();
        this.renderer.render();
    }

    disconnectedCallback() {
        this.modal.destroy();
    }

    private restoreModalWindow() {
        if (this.state.gameStatus === GameStatus.HAS_WINNER) {
            this.openModalByStatus(GameStatus.HAS_WINNER);
        } else if (this.state.gameStatus === GameStatus.HAS_TIE) {
            this.openModalByStatus(GameStatus.HAS_TIE);
        }
    }

    private defineUiElements() {
        this.gameBoardItems = this.querySelector('.game-board-items');
        this.restartButton = this.querySelector('.restart-button');
        this.turnCard = this.querySelector('.turn');
        this.scoreX = this.querySelector('.score-x');
        this.scoreO = this.querySelector('.score-o');
        this.boardFooter = this.querySelector('.board-footer');
        this.xIconTemplate = document.getElementById('x-icon-template') as HTMLTemplateElement;
        this.oIconTemplate = document.getElementById('o-icon-template') as HTMLTemplateElement;
        this.xOutlineIconTemplate = document.getElementById('x-outline-icon-template') as HTMLTemplateElement;
        this.oOutlineIconTemplate = document.getElementById('o-outline-icon-template') as HTMLTemplateElement;
    }

    private preProcessingStepsRunner(stepList: Array<() => void>) {
        for (const stepFunction of stepList) {
            stepFunction.call(this);
        }
    }

    private setListeners() {
        this.gameBoardItems.addEventListener('click', (event: MouseEvent) => {

            // If current game is already finished then stop execution
            if ([GameStatus.HAS_TIE, GameStatus.HAS_WINNER].includes(this.state.gameStatus)) {
                return;
            }
            
            const target = event.target as HTMLElement;
            
            // Checks if either X or O is already set
            if (target.hasChildNodes() || target === event.currentTarget) {
                return;
            }

            const clickedItemPosition = this.getClickedElementBoardPosition(target);
            this.fillElementInTheMatrix(clickedItemPosition);

            // check the winner
            const winner = defineWinner(this.state.currentBoardMatrix);

            if (winner) {
                this.updateGameStatus(GameStatus.HAS_WINNER);
                this.updateWinner(winner);
                this.updateScore(this.state.activePlayer);
                this.dispatchEvent(new GameBoardChangeEvent(this.state));
                this.openModalByStatus(GameStatus.HAS_WINNER);
            } else if (this.areAllBoardElementAreasSet(this.state.currentBoardMatrix)) {
                // if no winner but all the fields are already filled either with X or O
                // then it's a TIE situation
                this.updateGameStatus(GameStatus.HAS_TIE);
                this.updateScore();
                this.dispatchEvent(new GameBoardChangeEvent(this.state));
                this.openModalByStatus(GameStatus.HAS_TIE);
            } else {
                this.toggleActivePlayer();
                this.toggleActiveMark();
            }

            this.dispatchEvent(new GameBoardChangeEvent(this.state));

            this.renderer.render();
        });

        this.restartButton.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            this.modal.open(ModalType.RESTART).subscribe(isRestartButtonWasClicked => {
                if (isRestartButtonWasClicked) {
                    this.preProcessingStepsRunner(this.preProcessingActions.restartStateActions);
                    this.dispatchEvent(new GameBoardChangeEvent(this.state));
                    this.renderer.render();
                }
            });
        });
    }

    private openModalByStatus(status: GameStatus) {
        if (status === GameStatus.HAS_TIE) {
            this.modal.open(ModalType.ROUND_ENDS_NATURALY).subscribe(isNextRoundButtonWasClicked => {
                if (isNextRoundButtonWasClicked) {
                    this.preProcessingStepsRunner(this.preProcessingActions.tieStateNextRoundClick);
                    this.dispatchEvent(new GameBoardChangeEvent(this.state));
                    this.renderer.render();
                } else {
                    Router.router.navigateTo(Components.NEW_GAME);
                }
            });
        } else if (status === GameStatus.HAS_WINNER) {
            this.modal.open(ModalType.ROUND_ENDS_NATURALY).subscribe(isNextRoundButtonWasClicked => {
                if (isNextRoundButtonWasClicked) {
                    this.preProcessingStepsRunner(this.preProcessingActions.winnerStateNextRoundClick);
                    this.dispatchEvent(new GameBoardChangeEvent(this.state));
                    this.renderer.render();
                } else {
                    Router.router.navigateTo(Components.NEW_GAME);
                }
            });
        }
    }

    private fillElementInTheMatrix(itemPosition: number) {
        const row = Math.ceil(itemPosition / 3);
        const column = itemPosition - (row - 1) * 3;
        this.state.currentBoardMatrix[row - 1][column - 1] = this.state.activeMark;
    }

    private resetMatrix() {
        this.state.currentBoardMatrix = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }

    private resetScore() {
        this.state.score = {
            player1Score: 0,
            player2Score: 0,
            ties: 0,
        }
    }

    private resetWinner() {
        this.state.winner = undefined;
    }

    private resetGameStatus() {
        this.state.gameStatus = GameStatus.IN_PROGRESS;
    }

    private changeActivePlayerParameters() {
        this.resetActiveMark();
        const nextRoundFirstMovePlayer = this.toggleActivePlayerOnRoundStart();
        this.setActivePlayer(nextRoundFirstMovePlayer);
        this.togglePlayersMarks();
    }

    // According to the rules X always goes first in every dound
    private resetActiveMark() {
        this.state.activeMark = PlayerMark.x;
    }

    private restoreActivePlayerOnTheBeginningOfTheGame() {
        this.setActivePlayer(this.state.activePlayerOnGameStart);
    }

    private restoreActivePlayerOnRounStartOnTheBeginningOfTheGame() {
        this.setActivePlayerOnRoundStart(this.state.activePlayerOnGameStart);
    }

    private restorePlayersMarksOnTheBeginningOfTheGame() {
        this.state.player1Mark = this.state.player1MarkOnGameStart;
        this.state.player2Mark = this.state.player2MarkOnGameStart;
    }

    private setActivePlayer(player: PlayersList) {
        this.state.activePlayer = player;
    }

    private setActivePlayerOnRoundStart(player: PlayersList) {
        this.state.activePlayerOnRoundStart = player;
    }

    private updateWinner(winner: Winner) {
        this.state.winner = winner;
    }

    private toggleActivePlayerOnRoundStart(): PlayersList {
        this.state.activePlayerOnRoundStart = 
            this.state.activePlayerOnRoundStart === PlayersList.PLAYER1 ?
                PlayersList.PLAYER2 :
                PlayersList.PLAYER1;
        return this.state.activePlayerOnRoundStart;
    }

    private togglePlayersMarks() {
        [this.state.player1Mark, this.state.player2Mark] = 
            [this.state.player2Mark, this.state.player1Mark];
    }

    private updateGameStatus(status: GameStatus) {
        this.state.gameStatus = status;
    }

    private updateScore(winner?: PlayersList) {
        if (winner === PlayersList.PLAYER1) {
            this.state.score.player1Score++;
        } else if (winner === PlayersList.PLAYER2) {
            this.state.score.player2Score++;
        } else {
            this.state.score.ties++;
        }
    }

    private toggleActivePlayer() {
        this.state.activePlayer = this.state.activePlayer === PlayersList.PLAYER1 ? PlayersList.PLAYER2 : PlayersList.PLAYER1;
    }

    private toggleActiveMark() {
        this.state.activeMark = this.state.activeMark === PlayerMark.x ? PlayerMark.o : PlayerMark.x;
    }

    private getClickedElementBoardPosition(target: HTMLElement): number {
        return Number(target.dataset['itemNumber']);
    }

    private areAllBoardElementAreasSet(board: Array<string[]>): boolean {
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