export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider,
    ) {
        $stateProvider.state({
            name: 'recipes',
            url: '/recipes',
            template: require('./recipes.html'),
            controller: 'RecipesController as vm'
        });
    }
}