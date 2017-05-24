import { RecipeModel } from '../cms.model'
export interface ICmsDialogScope extends ng.IScope {
    recipe: RecipeModel;
    close: () => void;
}
export class CmsDialogController {
    /* @ngInject */
    constructor(
        private $scope: ICmsDialogScope,
        private $mdDialog: ng.material.IDialogService,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private currentObject: RecipeModel
    ) {
        // Init
        if (currentObject) {
            $scope.recipe = angular.copy(currentObject);
        }
        else {
            $scope.recipe = new RecipeModel();
            $scope.recipe.ingredientsList = new Array<string>();
            $scope.recipe.directionsList = new Array<string>();
        }
        $scope.close = () => {
            $mdDialog.cancel();
        };
        $scope.save = (recipe: RecipeModel) => {
            console.log(recipe);
            // If we have currentObject, then we are editing this object
            if (currentObject) {
                // Send modified object to server to apply modified fields
                // this.editSample(recipe);
            } else {
                // Else we call method that will physicly add this object to database (Through server)
                this.addRecipe(recipe);
            }
        };
    }
    addIngredient = () => {
        if (this.$scope.recipe.ingredients) {
            this.$scope.recipe.ingredientsList.push(this.$scope.recipe.ingredients);
        }

    }
    removeIngredient = (index: number) => {
        this.$scope.recipe.ingredientsList.splice(index, 1);
    }
    addDirection = () => {
        if (this.$scope.recipe.directions) {
            this.$scope.recipe.directionsList.push(this.$scope.recipe.directions);
        }

    }
    removeDirection = (index: number) => {
        this.$scope.recipe.directionsList.splice(index, 1);
    }
    addRecipe = (recipe: RecipeModel) => {
        recipe.ingredients = '';
        recipe.directions = '';
        for (var i = 0; i < recipe.ingredientsList.length - 1; i++) {
            recipe.ingredients += recipe.ingredientsList[i] + ';';
        }
        recipe.ingredients += recipe.ingredientsList[recipe.ingredientsList.length-1];

        for (var i = 0; i < recipe.directionsList.length - 1; i++) {
            recipe.directions += recipe.directionsList[i] + ';';
        }
        recipe.directions += recipe.directionsList[recipe.directionsList.length-1];

        this.$http.post('http://localhost:63802/api/recipes', recipe).then((response: any) => {
            console.log(response);
        });
    }
}