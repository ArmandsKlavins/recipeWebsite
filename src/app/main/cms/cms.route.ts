export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider,
    ) {
        $stateProvider.state({
            name: 'cms',
            url: '/cms',
            template: require('./cms.html'),
            controller: 'CmsController as vm'
        });
    }
}