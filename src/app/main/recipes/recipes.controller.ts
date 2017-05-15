import { RecipeModel } from './recipes.model';

export interface IRecipesScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipe: RecipeModel;
}

export class RecipesController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesScope
    ) {
        // Init
        $scope.recipe = new RecipeModel;
        $scope.recipe.servings = 2;
        $scope.recipe.title = 'Cake';
    }
}