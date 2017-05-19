import { PublicRecipeModel } from '../recipes.model'
export interface IRecipesDialogScope extends ng.IScope {
    recipe: PublicRecipeModel;
    close: () => void;
}
export class RecipesDialogController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesDialogScope,
        private $mdDialog: ng.material.IDialogService,
        private $q: ng.IQService,
        private currentObject: PublicRecipeModel
    ) {
        // Init
        if (currentObject) {
            $scope.recipe = angular.copy(currentObject);
        }
        else {
            $scope.recipe = new PublicRecipeModel();
        }
        $scope.close = () => {
            $mdDialog.cancel();
        };
    }
}