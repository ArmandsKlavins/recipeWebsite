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
    query: any;
    totalRecipes: number;
    totalCategories: number;
    query2: any;
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
        $scope.query = {
            filter: "",
            limit: 10,
            page: 1
        }
        $scope.query2 = {
            filter: "",
            limit: 10,
            page: 1
        }

        this.initValue();
    }
    initValue = () => {

        this.getCategories();
        this.getRecipes();
        

    }
    getRecipes = () =>{
        
        this.$http.post('http://localhost:63802/api/recipes/list',this.$scope.query).then((response: any) => {
            this.$scope.recipes = response.data;
            this.$scope.totalRecipes = response.headers('RecipesCount');
            
        });
        
    }
    getCategories = () =>{
        
        this.$http.post('http://localhost:63802/api/categories/list',this.$scope.query2).then((response: any) => {
            this.$scope.categories = response.data;
            this.$scope.totalCategories = response.headers('CategoryCount');
        });
    }

    onPaginateRecipes = (page: number, limit: number) => {
            // Extend transmits the new settings and page size in the query
            angular.extend(this.$scope.query, { page: page, limit: limit });
            this.getRecipes();
        };
        onPaginateCategories = (page: number, limit: number) => {
            // Extend transmits the new settings and page size in the query
            angular.extend(this.$scope.query2, { page: page, limit: limit });
            this.getCategories();
        };
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
//#region categories
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
//#endregion


}