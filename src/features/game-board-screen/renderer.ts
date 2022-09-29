import { GameState, GameStatus, IRenderer, PlayerMark, PlayerType } from "../../model/model";

interface ScoreCardElements {
    xScoreCardElement?: HTMLDivElement;
    xScoreElement?: HTMLDivElement;
    xPlayerTypeTextElement?: HTMLSpanElement;
    oScoreCardElement?: HTMLDivElement;
    oScoreElement?: HTMLDivElement;
    oPlayerTypeTextElement?: HTMLSpanElement;
    tiesScoreElement?: HTMLDivElement;
}

interface AdditionalElements extends ScoreCardElements {
    turnXsvg?: SVGAElement;
    turnOsvg?: SVGAElement;
    liveBoardSvg?: HTMLCollectionOf<SVGSVGElement>;
    iconBoardTemplates?: NodeListOf<HTMLTemplateElement>;
}

interface Templates {
    xIconTemplate: HTMLTemplateElement;
    oIconTemplate: HTMLTemplateElement;
    xOutlineIconTemplate: HTMLTemplateElement;
    oOutlineIconTemplate: HTMLTemplateElement;
}

interface GameBoardElements extends AdditionalElements, Templates {
    gameBoardItems: HTMLUListElement;
    turnCard: HTMLDivElement;
    scoreX: HTMLDivElement;
    scoreO: HTMLDivElement;
    boardFooter: HTMLDivElement;
}

export class Renderer implements IRenderer{
    state: GameState;
    elements: GameBoardElements;

    constructor(state: GameState, elements: GameBoardElements) {
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

    private renderBoard() {
        const board = this.state.currentBoardMatrix;
        const liElements = this.elements.gameBoardItems.querySelectorAll('.board-item');
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const boardValue = board[row][col];
                const item = liElements.item(row * 3 + col) as HTMLLIElement;

                if (!boardValue && item.hasChildNodes()) {
                    item.replaceChildren();
                    continue;
                }

                if (boardValue) {
                    item.replaceChildren(
                        this.getPlayerImage(boardValue as PlayerMark)
                    );
                }
            }
        }
    }

    private renderMarkTurn() {
        if (this.state.activeMark === PlayerMark.x) {
            this.elements.turnXsvg.classList.remove('hidden');
            this.elements.turnOsvg.classList.add('hidden');            
        } else {
            this.elements.turnOsvg.classList.remove('hidden');
            this.elements.turnXsvg.classList.add('hidden');            
        }
    }

    private changeActiveMarkClass() {
        if ([GameStatus.HAS_TIE, GameStatus.HAS_WINNER].includes(this.state.gameStatus)) {
            this.elements.gameBoardItems.classList.remove('active-x', 'active-o');
            return;
        }
        if (this.state.activeMark === PlayerMark.x) {
            this.elements.gameBoardItems.classList.add('active-x');           
            this.elements.gameBoardItems.classList.remove('active-o');
        } else {
            this.elements.gameBoardItems.classList.add('active-o');           
            this.elements.gameBoardItems.classList.remove('active-x');
        }
        
    }

    private renderScoreInfo() {
        if (this.state.player2Type === PlayerType.cpu) {
            if (this.state.player1Mark === PlayerMark.x) {
                [ this.elements.xPlayerTypeTextElement.textContent, 
                  this.elements.oPlayerTypeTextElement.textContent ] = ['YOU', 'CPU'];
            } else {
                [ this.elements.xPlayerTypeTextElement.textContent,
                  this.elements.oPlayerTypeTextElement.textContent ] = ['CPU', 'YOU'];
            }
        } else if (this.state.player2Type === PlayerType.player) {
            if (this.state.player1Mark === PlayerMark.x) {
                [ this.elements.xPlayerTypeTextElement.textContent,
                  this.elements.oPlayerTypeTextElement.textContent ] = ['P1', 'P2'];
            } else {
                [ this.elements.xPlayerTypeTextElement.textContent,
                  this.elements.oPlayerTypeTextElement.textContent ] = ['P2', 'P1'];
            }
        }

        if (this.state.player1Mark === PlayerMark.x) {
            [this.elements.xScoreElement.textContent, this.elements.oScoreElement.textContent] = 
                [this.state.score.player1Score.toString(), this.state.score.player2Score.toString()]
        } else {
            [this.elements.xScoreElement.textContent, this.elements.oScoreElement.textContent] = 
                [this.state.score.player2Score.toString(), this.state.score.player1Score.toString()]
        }

        this.elements.tiesScoreElement.textContent = this.state.score.ties.toString();
    }

    private highLightWinnerPosition() {
        if (!this.state.winner) {
            this.clearWinnerClasses();
            return;
        }

        const liElements = this.elements.gameBoardItems.querySelectorAll('.board-item');
        const winnerElements: [HTMLLIElement, HTMLLIElement, HTMLLIElement] = [
            liElements.item(this.state.winner.position[0]) as HTMLLIElement,
            liElements.item(this.state.winner.position[1]) as HTMLLIElement,
            liElements.item(this.state.winner.position[2]) as HTMLLIElement,
        ];

        let winnerClass: string;
        let winnerTemplate: HTMLTemplateElement;

        switch (this.state.activeMark) {
            case PlayerMark.x:
                winnerClass = 'player-x-winner';
                winnerTemplate = this.elements.xOutlineIconTemplate;
                break;
            case PlayerMark.o:
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

    private clearWinnerClasses() {
        const highlightedElements = this.elements.gameBoardItems.querySelectorAll('.player-x-winner, .player-o-winner');
        if (highlightedElements) {
            for (const element of highlightedElements) {
                element.classList.remove('player-x-winner', 'player-o-winner');
            }
        }
    }

    private defineAdditionalElements() {
        this.elements.turnXsvg = this.elements.turnCard.querySelector('.player-option__imageX') as SVGAElement;
        this.elements.turnOsvg = this.elements.turnCard.querySelector('.player-option__imageO') as SVGAElement;
        // Score elements
        this.elements.xScoreCardElement = this.elements.boardFooter.querySelector('.score-x') as HTMLDivElement;
        this.elements.xScoreElement = this.elements.xScoreCardElement.querySelector('.score');
        this.elements.xPlayerTypeTextElement = this.elements.xScoreCardElement.querySelector('.score-description > span');
        this.elements.oScoreCardElement = this.elements.boardFooter.querySelector('.score-o') as HTMLDivElement;
        this.elements.oScoreElement = this.elements.oScoreCardElement.querySelector('.score');
        this.elements.oPlayerTypeTextElement = this.elements.oScoreCardElement.querySelector('.score-description > span');
        this.elements.tiesScoreElement = this.elements.boardFooter.querySelector('.score-ties > .score') as HTMLDivElement;
        this.elements.liveBoardSvg = this.elements.gameBoardItems.getElementsByTagName('svg');
        this.elements.iconBoardTemplates = document.querySelectorAll('.board-icon');
    }

    private getPlayerImage(mark: PlayerMark): SVGAElement {
        let playerSvg: SVGAElement;
        if (mark === PlayerMark.x) {
            playerSvg = this.elements.xIconTemplate.content.cloneNode(true).firstChild as SVGAElement;
        } else {
            playerSvg = this.elements.oIconTemplate.content.cloneNode(true).firstChild as SVGAElement;
        }
        return playerSvg;
    }
}
