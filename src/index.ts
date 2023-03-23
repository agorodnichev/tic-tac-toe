import './styles.scss';
import './assets/icon-x-outline.svg';
import './assets/icon-o-outline.svg';
import {GameBoardElement} from './features/game-board-screen/game-board.component';
import {NewGameElement} from './features/new-game-screen/new-game.component';
import {bootstrap} from './features/main';
import {Components} from './model/model';


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }


customElements.define(Components.NEW_GAME, NewGameElement);
customElements.define(Components.GAME_BOARD, GameBoardElement);

bootstrap();