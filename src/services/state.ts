import { 
    distinctUntilChanged,
    map,
    Observable,
    ReplaySubject,
    take 
} from "rxjs";

import { 
    PlayerType,
    PlayersList,
    PlayerMark,
    GameState,
    DialogContentType,
    GameStatus } 
from "../model/model";


class StoreBase<T> {

    private readonly store$ = new ReplaySubject<T>(1);

    constructor(initialState: T) {
        this.store$.next(initialState);
    }

    get store() {
        let currentStoreState: T;
        this.store$.asObservable().pipe(take(1)).subscribe((storeState: T) => {
            currentStoreState = storeState;
        });
        return currentStoreState;
    }

    protected select<K>(mapFn: (store: T) => K): Observable<K> {
        return this.store$.asObservable().pipe(
            map((store: T) => mapFn(store)),
            distinctUntilChanged(),
        );
    }

    setStore(newStore: Partial<T>) {
        this.store$.next({
            ...this.store,
            ...newStore
        })
    }

    getStore(): Observable<T> {
        return this.store$.asObservable();
    }
}


const initialState: GameState = {
    score: {
        player1Score: 0,
        player2Score: 0,
        ties: 0,
    },
    dialog: {
        isActive: false,
        type: DialogContentType.NONE
    },
    
    currentBoardMatrix: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    activePlayer: PlayersList.PLAYER1,
    activePlayerOnRoundStart: PlayersList.PLAYER1,
    activePlayerOnGameStart: PlayersList.PLAYER1,
    player1Mark: PlayerMark.x,
    player2Mark: PlayerMark.o,
    player1MarkOnGameStart: PlayerMark.x,
    player2MarkOnGameStart: PlayerMark.o,
    activeMark: PlayerMark.x,
    player2Type: PlayerType.player,
    winner: undefined,
    gameStatus: GameStatus.IN_PROGRESS,
}

class LocalStore extends StoreBase<GameState> {
    constructor() {
        super(initialState);
    }
}

export const state = new LocalStore();