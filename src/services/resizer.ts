import { Observable, Subject } from "rxjs";

interface Property {
    propertyName: string;
    propertyValue: string;
}

interface BreakpointConfig {
    id: BreakpointIds,
    uiReflection: Array<{
        element: () => Element | HTMLCollection | Array<Element>, 
        properties: Property[]
    }>
}

export enum BreakpointIds {
    MOBILE = 'mobile',
    DEFAULT = 'default',
}
const METHOD = 'max-width';
const BREAKPOINTS: {[K in Exclude<BreakpointIds, BreakpointIds.DEFAULT>]: string} = {
    [BreakpointIds.MOBILE]: '40em',
};
const notifier = new Subject<BreakpointIds>();


let configResolver: (value: unknown) => void;
let stylesConfig: BreakpointConfig[];
const configSet = new Promise((resolve, reject) => {
    configResolver = resolve;
});

configSet.then(value => {
    const listener = listenForMediaChanges(BREAKPOINTS);
    // resize on init load
    for (const [breakpointId, media] of listener.matchMedias) {
        if (media.matches) {
            resizeElements(breakpointId, stylesConfig);
        }
    }

    listener.observer.subscribe(
        breakpointId => {
            resizeElements(breakpointId, stylesConfig);
        }
    )
});

export function setConfig(config: BreakpointConfig[]) {
    if (!configResolver) {
        throw new Error('Resolver should be defined');
    }
    stylesConfig = config;
    configResolver(true);
}


function resizeElements(breakpointId: BreakpointIds,config: BreakpointConfig[]) {
    const breakpointConfig = findStyleByBreakpointId(breakpointId, config);
    if (!breakpointConfig) {
        throw new Error(`Can't find a config with id = ${breakpointId}`);
    }
    applyStyles(breakpointConfig);
}

function applyStyles(breakpointConfig: BreakpointConfig) {
    const listOfElementsData = breakpointConfig.uiReflection;
    for (const elementData of listOfElementsData) {
        applyStylesToListOfElements(elementData);
    }
}

function applyStylesToListOfElements(data: {element: () => Element | HTMLCollection | Array<Element>, properties: Property[]}) {
    const element = data.element();
    if (!element) return;
    if (element instanceof HTMLCollection || Array.isArray(element)) {
        for (const singleElement of element) {
            applyStylesToElement(singleElement, data.properties);
        }
        return;
    }
    applyStylesToElement(element, data.properties);
}

function applyStylesToElement(element: Element, styles: Property[]) {
    for (const style of styles) {
        element.setAttribute(style.propertyName, style.propertyValue);
    }
}

function findStyleByBreakpointId(breakpointId: BreakpointIds, config: BreakpointConfig[]): BreakpointConfig {
    return config.find(breakpoint => breakpoint.id === breakpointId)
}

function listenForMediaChanges(breakpoints: typeof BREAKPOINTS): {
    observer: Observable<BreakpointIds>,
    matchMedias: Map<BreakpointIds, MediaQueryList>
 } {
    const matchMedias = createMediaQueryListFromBreakpoints(breakpoints);
    addListenersForBreakpoints(breakpoints, matchMedias, notifier);
    return {
        observer: notifier.asObservable(),
        matchMedias
    };
}

function addListenersForBreakpoints(
    breakpoints: typeof BREAKPOINTS, 
    matchMedias: Map<BreakpointIds, MediaQueryList>,
    notifier: Subject<BreakpointIds>
    ): void {
        for (const breakpoint of Object.keys(breakpoints)) {
            const media = matchMedias.get(breakpoint as BreakpointIds);
            media.addEventListener('change', event => {
                // TODO: If need to have more than 1 breakpoint
                // then manage case where all the media matches
                // are false so that "default" values should 
                // be applied
                if (event.matches) {
                    notifier.next(breakpoint as BreakpointIds);
                    return;
                }
                notifier.next(BreakpointIds.DEFAULT);
            });
        }
    }

function createMediaQueryListFromBreakpoints(breakpoints: typeof BREAKPOINTS): Map<BreakpointIds, MediaQueryList> {
    const medias: Map<BreakpointIds, MediaQueryList> = new Map();
    for (const [breakpointLabel, breakpointValue] of Object.entries(breakpoints)) {
        medias.set(
            breakpointLabel as BreakpointIds,
            window.matchMedia(`(${METHOD}: ${breakpointValue})`)
        );

    }
    return medias;
}
