export interface IRecipesScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    //recipe: Models.Recipe;
    recipe: string;
}

export class RecipesController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesScope
    ) {
        // Init
        $scope.recipe = "Cake";
        // $scope.recipe.servings = 2;
        // $scope.recipe.title = 'Cake';
    }
}