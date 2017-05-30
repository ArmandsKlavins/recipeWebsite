import { RecipeModel } from './cms.model';
import { ICmsDialogService } from './cms.dialog.service';

export interface ICmsScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipes: RecipeModel[];
}

export class CmsController {
    removeInterval: { [s: string]: ng.IPromise<any>; } = {};
    /* @ngInject */
    constructor(
        private $scope: ICmsScope,
        private $http: ng.IHttpService,
        private CmsDialogService: ICmsDialogService,
        private $interval: ng.IIntervalService,
        private localStorageService: ng.local.storage.ILocalStorageService,
        private $state: ng.ui.IStateService
    ) {
        // Init
        this.$scope.recipes = new Array<RecipeModel>();
        this.initValue();
    }
    initValue = () => {
        // var names: string[] = ['Cake','Fish','Chicken','Candy','Rice','Stake','Beef','Vegetables','Salmon','Turkey'];
        // var ingredients: string[] = ['Salt', 'Pepers', 'Eggs','Suger','Thyme','Chicken','Apple','Orange','Pumpkin','Starch']
        // var desc: string[] = ['This is a normal description','This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen', 'Tastes great', 'Somewhere in the middle, normal length probably'];
        // var urls: string[] = ['https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx','https://previews.123rf.com/images/vladi59/vladi591407/vladi59140700009/30114436-Cooked-fish-sea-bream-fish-with-lemon-parsley-garlic-Stock-Photo.jpg','http://wishfulchef.com/wp-content/uploads/2011/09/ChickenRoastedInBeer1.jpg','http://www.ohnuts.com/blog/homemade-candy-bars-13.jpg','http://assets.epicurious.com/photos/568eb0bf7dc604b44b5355ee/2:1/w_1260%2Ch_630/rice.jpg','http://www.omahasteaks.com/gifs/990x594/fi004.jpg','http://www.foodinaminute.co.nz/var/fiam/storage/images/recipes/slow-cooked-beef-and-mushroom-with-parsley-dumplings/7970016-8-eng-US/Slow-Cooked-Beef-and-Mushroom-with-Parsley-Dumplings_recipeimage.jpg','http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg','http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/7/26/1/CN1B01_oven-baked-salmon_s4x3.jpg.rend.hgtvcom.616.462.jpeg','http://media.dish.allrecipes.com/wp-content/uploads/2014/04/101975681-Roast-Turkey-and-Vegetables-on-Serving-Platter-Photo-by-Meredith-resized.jpg']
        // var recipe: RecipeModel;
        // var recipeCount: number = 5;

        // for(var i = 0; i<recipeCount; i++){
        //     recipe = new RecipeModel();
        //      recipe.ingredients = new Array<string>();
        //     recipe.title = names[Math.floor(Math.random() * names.length) + 0];
        //     recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
        //     recipe.servings = i;
        //     recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
        //     for(var j=0; j<3; j++){
        //         recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
        //     }
        //     this.$scope.recipes.push(recipe);
        // }
        this.$http.get('http://localhost:63802/api/recipes/list').then((response: any) => {
            this.$scope.recipes = response.data;
            console.log(this.$scope.recipes);
        });
    }
    addRecipe = (evt: Event) => {
        this.CmsDialogService.show(evt, 'add').then((modifiedRecipe: RecipeModel) => {
            this.$scope.recipes.push(modifiedRecipe);

        },
            (err: any) => {
                // Error
            });
    }

    editRecipe = (evt: Event, recipe: RecipeModel, index: number) => {
        this.CmsDialogService.show(evt, 'edit', recipe).then((modifiedRecipe: RecipeModel) => {
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
    }).indexOf(val);
};

}