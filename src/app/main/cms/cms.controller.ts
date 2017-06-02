import { RecipeModel } from './cms.model';
import { ICmsDialogService } from './cms.dialog.service';
import { ICmsCategoryDialogService } from './cms.dialog.service';
import { CategoryModel} from './cms.model';

export interface ICmsScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipes: RecipeModel[];
    categories: CategoryModel[];
}

export class CmsController {
    removeInterval: { [s: string]: ng.IPromise<any>; } = {};
    /* @ngInject */
    constructor(
        private $scope: ICmsScope,
        private $http: ng.IHttpService,
        private CmsDialogService: ICmsDialogService,
        private CmsCategoryDialogService : ICmsCategoryDialogService,
        private $interval: ng.IIntervalService,
        private localStorageService: ng.local.storage.ILocalStorageService,
        private $state: ng.ui.IStateService
    ) {
        // Init
        this.$scope.recipes = new Array<RecipeModel>();
        this.$scope.categories = new Array<CategoryModel>();
        this.initValue();
    }
    initValue = () => {

        this.$http.get('http://localhost:63802/api/recipes/list').then((response: any) => {
            this.$scope.recipes = response.data;
            console.log(this.$scope.recipes);
        });
        this.$http.get('http://localhost:63802/api/categories/list').then((response: any) => {
            this.$scope.categories = response.data;
            console.log(this.$scope.categories);
        });

    }
//#region recipes
    addRecipe = (evt: Event) => {
        this.CmsDialogService.show(evt, 'add.recipe').then((modifiedRecipe: RecipeModel) => {
            this.$scope.recipes.push(modifiedRecipe);

        },
            (err: any) => {
                // Error
            });
    }

    editRecipe = (evt: Event, recipe: RecipeModel, index: number) => {
        this.CmsDialogService.show(evt, 'edit.recipe', recipe).then((modifiedRecipe: RecipeModel) => {
            // this.$scope.recipes.splice(index,1,modifiedRecipe)
            angular.copy(modifiedRecipe, recipe);
        },
            (err: any) => {
                // Error
            });
    }
    removeRecipe = (recipe: RecipeModel, index: number) => {
        recipe.isDeleted = true;
        this.removeInterval['' + recipe.id] = this.$interval(
            () => {

                this.$http.delete('http://localhost:63802/api/recipes/' + recipe.id).then(() => {
                    var objectIndex = this.IndexOfObjectInArray(this.$scope.recipes, 'id', recipe.id);
                this.$scope.recipes.splice(objectIndex, 1);
                });
                
                
            }
            // Interval is set to 5 seconds and to execute only once (1 time).
            , 5000, 1);

    }

    restoreRecipe = (recipe: RecipeModel) => {
        recipe.isDeleted = false;
        // Cancel interval that is responsible for object removing in array
        this.$interval.cancel(this.removeInterval['' + recipe.id]);
    }

    logout = () =>{
        this.localStorageService.remove('Profile');
        this.$state.go('login');
    }

    IndexOfObjectInArray = (array: any[], prop: string, val: any) => {
    return array.map((v, i, a) => {
        return v[prop];
    }).indexOf(val);};
//#endregion

    addCategory = (evt: Event) => {
        this.CmsCategoryDialogService.show(evt, 'add.category').then((modifiedCategory: CategoryModel) => {
            this.$scope.categories.push(modifiedCategory);

        },
            (err: any) => {
                // Error
            });
    }

    editCategory = (evt: Event, category: CategoryModel, index: number) => {
        this.CmsCategoryDialogService.show(evt, 'edit.category', category).then((modifiedCategory: CategoryModel) => {
            // this.$scope.recipes.splice(index,1,modifiedRecipe)
            angular.copy(modifiedCategory, category);
        },
            (err: any) => {
                // Error
            });
    }
    removeCategory = (category: CategoryModel, index: number) => {
        category.isDeleted = true;
        this.removeInterval['' + category.id] = this.$interval(
            () => {

                this.$http.delete('http://localhost:63802/api/categories/' + category.id).then(() => {
                    var objectIndex = this.IndexOfObjectInArray(this.$scope.categories, 'id', category.id);
                this.$scope.categories.splice(objectIndex, 1);
                });
                
                
            }
            // Interval is set to 5 seconds and to execute only once (1 time).
            , 5000, 1);

    }

    restoreCategory = (category: CategoryModel) => {
        category.isDeleted = false;
        // Cancel interval that is responsible for object removing in array
        this.$interval.cancel(this.removeInterval['' + category.id]);
    }


}