export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider,
    ) {
        $stateProvider.state({
            name: 'recipes',
            url: '/',
            template: require('./recipes.html'),
            controller: 'RecipesController as vm'
        });
    }
}