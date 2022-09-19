import './styles.scss';
import './assets/icon-x-outline.svg';
import './assets/icon-o-outline.svg';
import {GameBoardElement} from './features/game-board-screen/game-board.component';
import {NewGameElement} from './features/new-game-screen/new-game.component';
import {bootstrap} from './features/main';
import {Components} from './model/model';


customElements.define(Components.NEW_GAME, NewGameElement);
customElements.define(Components.GAME_BOARD, GameBoardElement);

bootstrap();