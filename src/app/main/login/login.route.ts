export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider,
    ) {
        $stateProvider.state({
            name: 'login',
            url: '/login',
            template: require('./login.html'),
            controller: 'LoginController as vm'
        });
    }
}