export interface Route {
    path: string;
    redirectTo?: string;
    component?: typeof HTMLElement;
}

type PushStateParameters = Parameters<typeof history.pushState>;

interface PushState {
    data: PushStateParameters[0];
    url?: PushStateParameters[2];
}

class PushStateEvent extends CustomEvent<PushState> {
    public static type = 'pushstate';
    constructor(payload: PushState) {
        super(PushStateEvent.type, {detail: payload});
    }
}

// Pathes History API
const pushStateOriginal = history.pushState;
history.pushState = function() {
    window.dispatchEvent(
        new PushStateEvent({
            data: arguments[0],
            url: arguments[2],
        })
    );
    pushStateOriginal.call(this, ...arguments);
}

export class Router {
    routes: Route[];
    outletContainer: HTMLElement;

    public static router: Router; 

    constructor(routes: Route[], outletContainer: HTMLElement) {
        if (Router.router) {
            return Router.router;
        }
        Router.router = this;

        this.routes = routes;
        this.outletContainer = outletContainer;

        this.setup();

    }

    navigateTo(path: string): void {
        history.pushState('','', path);
    }

    private setup() {
        window.addEventListener(PushStateEvent.type, (event: PushStateEvent) => {
            const componentSelector = this.getComponentByPath(event.detail.url as string);
            const component = document.createElement(componentSelector)
            this.outletContainer.replaceChildren(component);
        });

        window.addEventListener('popstate', (event: PopStateEvent) => {
            const componentSelector = this.getComponentByPath(window.location.pathname);
            const component = document.createElement(componentSelector)
            this.outletContainer.replaceChildren(component);
        });
        const component = this.getComponentByPath(window.location.pathname);
        this.navigateTo(component);
    }


    // handle only one level path for this app
    private getComponentByPath(path: string): string {

        const pathArr = path.split('/');
        const cleanPath = pathArr.length > 1 ? pathArr[1] : path;

        return helper.call(this, cleanPath);

        function helper(path: string): string {
            const matchedRoute = this.routes.find((route: Route) => route.path === path);

            if (!matchedRoute) {
                throw new Error('cannot match route');
            }

            if (matchedRoute.hasOwnProperty('redirectTo')) {
                return helper.call(this, matchedRoute.redirectTo);
            }
            return matchedRoute.path;
        }
    }
}