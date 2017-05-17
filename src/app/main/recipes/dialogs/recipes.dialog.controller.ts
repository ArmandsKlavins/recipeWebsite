import { RecipeModel } from '../recipes.model'
export interface IRecipesDialogScope extends ng.IScope {
    recipe: RecipeModel;
    close: () => void;
}
export class RecipesDialogController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesDialogScope,
        private $mdDialog: ng.material.IDialogService,
        private $q: ng.IQService,
        private currentObject: RecipeModel
    ) {
        // Init
        if (currentObject) {
            $scope.recipe = angular.copy(currentObject);
        }
        else {
            $scope.recipe = new RecipeModel();
        }
        $scope.close = () => {
            $mdDialog.cancel();
        };
    }
}