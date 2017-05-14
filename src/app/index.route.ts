export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) {
        // (!!!) Uncomment when server with html5 support is set up    
        //$locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');
    }
}