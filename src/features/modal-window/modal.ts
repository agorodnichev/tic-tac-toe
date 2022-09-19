import { filter, Observable, Subject, take } from "rxjs";
import { GameState, PlayerMark, PlayersList, PlayerType } from '../../model/model';


export enum ModalType {
    RESTART,
    ROUND_ENDS_NATURALY,
}

interface IconTemplates {
    xIconTemplate: HTMLTemplateElement;
    oIconTemplate: HTMLTemplateElement;
}

interface ModalElements {
    modal: HTMLDialogElement;
    modalTitle: HTMLDivElement;
    modalBody: HTMLDivElement;
    modalButtons: HTMLDivElement;
    buttonCancel: HTMLButtonElement;
    buttonAccept: HTMLButtonElement;
}

export class Modal {
    
    private static modalSingelton: Modal;
    
    private modalCloseObserver$ = new Subject<boolean>();
    private modalCloseObserver = this.modalCloseObserver$.asObservable();

    private state: GameState;
    private iconTemplates: IconTemplates;

    // Elements
    private modal: HTMLDialogElement;
    private modalTitle: HTMLDivElement;
    private modalBody: HTMLDivElement;
    private modalButtons: HTMLDivElement;
    private buttonCancel: HTMLButtonElement;
    private buttonAccept: HTMLButtonElement;
    
    constructor(state: GameState, icons: IconTemplates) {
        if (Modal.modalSingelton) {
            return Modal.modalSingelton;
        }
        Modal.modalSingelton = this;
        this.state = state;
        this.iconTemplates = icons;
        this.saveElementsToInstanceVariables(createModalDialogElements());
        this.addModalEventListeners();
        this.attachModalDialogToTheDOM();
    }

    open(type: ModalType): Observable<boolean> {
        // clear UI from prev run
        this.clearUI()

        switch (type) {
            case ModalType.RESTART:
                this.setRestartUI();
                break;
            case ModalType.ROUND_ENDS_NATURALY:
                if (this.state.winner) {
                    this.setWinnerUI()
                    break;
                }
                this.setTieUI();
                break;
            default:
                throw new Error(`There is no modal type = ${type}`);
        }
        // this.modal.close('accept');
        this.modal.showModal();
        return this.modalCloseObserver.pipe(
            filter((close: boolean) => close !== undefined), 
            take(1)
        );
    }

    private saveElementsToInstanceVariables(elements: ModalElements) {
        ({
            modal: this.modal,
            modalTitle: this.modalTitle,
            modalBody: this.modalBody,
            modalButtons: this.modalButtons,
            buttonCancel: this.buttonCancel,
            buttonAccept: this.buttonAccept,

        } = elements);
    }

    private addModalEventListeners() {

        // disables "ESC" button to close model
        this.modal.addEventListener('cancel', event => {
            event.preventDefault();
        });

        // console.log((event.target as HTMLDialogElement).returnValue);
        // this.modal.addEventListener('close', event => {
        //     this.modalCloseObserver$.next(true);
        //     this.modal.close();
        //   });

        this.buttonCancel.addEventListener('click', () => {
            this.modalCloseObserver$.next(false);
            this.modal.close();
        });

        this.buttonAccept.addEventListener('click', () => {
            this.modalCloseObserver$.next(true);
            this.modal.close();
        });
    }

    private attachModalDialogToTheDOM() {
        document.body.appendChild(this.modal);
    }

    private setWinnerUI() {
        this.modalTitle.style.display = 'block';

        const modalBodyContent = document.createDocumentFragment();

        modalBodyContent.appendChild(
            this.state.activeMark === PlayerMark.x ?
                this.iconTemplates.xIconTemplate.content.cloneNode(true) :
                this.iconTemplates.oIconTemplate.content.cloneNode(true)
        );
        modalBodyContent.appendChild(
            document.createTextNode('TAKES THE ROUND')
        );

        this.buttonCancel.textContent = 'QUIT';
        this.buttonAccept.textContent = 'NEXT ROUND';

        this.modalBody.appendChild(modalBodyContent);
        // if opponent is player
        if (this.state.player2Type === PlayerType.player) {
            this.modalTitle.textContent = `PLAYER ${this.state.activePlayer} WINS!`;
            return;
        }
        // otherwise cpu is opponent
        this.modalTitle.textContent =
            this.state.activePlayer === PlayersList.PLAYER1 ?
                'YOU WON' :
                'OH NO, YOU LOST';
    }


    private setTieUI() {
        this.modalTitle.style.display = 'none';
        this.modalBody.textContent = 'ROUND TIED';
        this.modalBody.classList.add('modal__body--grey');
        this.buttonCancel.textContent = 'QUIT';
        this.buttonAccept.textContent = 'NEXT ROUND';
    }

    private setRestartUI() {
        this.modalTitle.style.display = 'none';
        this.modalBody.textContent = 'RESTART GAME?';
        this.buttonCancel.textContent = 'NO, CANCEL';
        this.buttonAccept.textContent = 'YES, RESTART';
        this.modalBody.classList.add('modal__body--grey');
    }

    private clearUI() {
        this.modalBody.replaceChildren();
        this.modalBody.classList.remove('modal__body--grey');
    }
}
/**
 * Creates following Dialog element:
 * 
 *  <dialog class="modal">
 *    <div class="modal-grid-wrapper">
 *      <div class="modal__content>"
 *          <div class="modal__title"></div>
 *          <div class="modal__body"></div>
 *          <div class="modal__buttons buttons">
 *              <button class="buttons__cancel button"></button>
 *              <button class="buttons__accept button"></button>
 *          </div>
 *      </div>
 *    </div>
 *  </dialog>
 */
function createModalDialogElements(): ModalElements {
    const modal = document.createElement('dialog');
    const contentGridWrapper = document.createElement('div');
    const content = document.createElement('div');
    const modalTitle = document.createElement('div');
    const modalBody = document.createElement('div');
    const modalButtons = document.createElement('div');
    const buttonCancel = document.createElement('button');
    const buttonAccept = document.createElement('button');

    // enrich elements by classes
    modal.classList.add('modal');
    contentGridWrapper.classList.add('modal-grid-wrapper');
    content.classList.add('modal__content');
    modalTitle.classList.add('modal__title');
    modalBody.classList.add('modal__body');
    modalButtons.classList.add('modal__buttons', 'buttons');
    buttonCancel.classList.add('buttons__cancel', 'modal__button');
    buttonAccept.classList.add('buttons__accept', 'modal__button');

    // nest elements
    modalButtons.appendChild(buttonCancel);
    modalButtons.appendChild(buttonAccept);
    content.appendChild(modalTitle);
    content.appendChild(modalBody);
    content.appendChild(modalButtons);
    contentGridWrapper.appendChild(content);
    modal.appendChild(contentGridWrapper);

    return {
        modal,
        modalTitle,
        modalBody,
        modalButtons,
        buttonCancel,
        buttonAccept,
    };
}

