import {HTMLElementBase} from '../../services/html-element-base';
import {PlayerType, PlayerMark} from '../../model/model';

export interface NewGameEventPayload {
    playerOneSelection?: PlayerMark;
    playerType?: PlayerType
}

export class NewGameSelectionEvent extends CustomEvent<NewGameEventPayload>  {
    public static type = 'game-selection-change';
    
    constructor(payload: NewGameEventPayload)  {
        super(NewGameSelectionEvent.type, {detail: payload});
    }
}

/**
 * New Game Screen Controller
 */
export class NewGameElement extends HTMLElementBase {

    // View variables
    private newGameVsCpuButtonElement?: HTMLAnchorElement;
    private newGameVsPlayerButtonElement?: HTMLAnchorElement;
    private playerOptionsElement?: HTMLDivElement;
    private playerXoption?: HTMLDivElement;
    private playerOoption?: HTMLDivElement;

    // local state variables
    private currentPlayerOnePick = PlayerMark.o;

    constructor() {
        super({templateIdSelector: 'new-game-template'});
    }

    // HOOKS
    override connectedCallback() {
        super.connectedCallback();
        this.defineElements();
        this.setDefaultActiveMark();
        this.setListeners();
    }

    // disconnectedCallback() {
    //     console.log('were disconnected');
    // }

    // INITIALIZATION METHODS
    private defineElements() {
        this.newGameVsCpuButtonElement = this.querySelector('.new-game-cpu-button');
        this.newGameVsPlayerButtonElement = this.querySelector('.new-game-player-button');
        this.playerOptionsElement = this.querySelector('.player-options');
        this.playerXoption = this.querySelector('.player-x-option');
        this.playerOoption = this.querySelector('.player-o-option');
    }

    private setListeners() {
        this.newGameVsCpuButtonElement.addEventListener('click', this.newGameVsCpuListener);
        this.newGameVsPlayerButtonElement.addEventListener('click', this.newGameVsPlayerListener);
        // User choose either X or O
        this.playerOptionsElement.addEventListener('click', this.pickPlayerOptionListener);
    }

    // HELPER METHODS
    private setDefaultActiveMark() {
        if (this.currentPlayerOnePick === PlayerMark.x) {
            this.playerXoption.classList.add('active-player-option');
        } else {
            this.playerOoption.classList.add('active-player-option');
        }
    }

    private getPlayerAgainstEvent = (player: PlayerType): NewGameSelectionEvent => {
        return new NewGameSelectionEvent({
            playerOneSelection: this.currentPlayerOnePick,
            playerType: player,
        })
    };

    private getPlayerAgainstListenerHelper: (player: PlayerType) => (event: MouseEvent) => void = 
        player => {
            return (event: MouseEvent) => {
                event.preventDefault();
                this.dispatchEvent(
                    this.getPlayerAgainstEvent(player)
                );
            }
        };
    
    private pickPlayerOptionListenerHelper = () => {
        return (event: MouseEvent) => {

            if (event.target === event.currentTarget) {
                // prevents error when clicks on margin area
                return;
            }

            event.preventDefault();
            if (!(event.target instanceof Element)) {
                throw new Error('element should have type Element');
            }
    
            const playerElement = event.target.closest("[data-option]") as HTMLElement;
            this.currentPlayerOnePick = playerElement.dataset['option'] as PlayerMark;
    
            if (playerElement === this.playerXoption && !playerElement.classList.contains('active-player-option')) {
                this.setActiveMarkTo(PlayerMark.x);
            } 
            if (playerElement === this.playerOoption && !playerElement.classList.contains('active-player-option')) {
                this.setActiveMarkTo(PlayerMark.o);
            }
    
            this.dispatchEvent(
                new NewGameSelectionEvent({
                    playerOneSelection: this.currentPlayerOnePick,
                })
            );
        }
    }
    
    private setActiveMarkTo(playerMark: PlayerMark) {
        if (playerMark === PlayerMark.x) {
            this.playerXoption.classList.add('active-player-option');
            this.playerOoption.classList.remove('active-player-option');
        }
        if (playerMark === PlayerMark.o) {
            this.playerOoption.classList.add('active-player-option');
            this.playerXoption.classList.remove('active-player-option');
        }
    }

    // LISTENERS
    private newGameVsCpuListener = this.getPlayerAgainstListenerHelper(PlayerType.cpu);
    private newGameVsPlayerListener = this.getPlayerAgainstListenerHelper(PlayerType.player);
    private pickPlayerOptionListener = this.pickPlayerOptionListenerHelper();
}