import { RecipeModel } from './recipes.model';
import {RecipesDialogService} from './recipes.dialog.service'

export interface IRecipesScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipe: RecipeModel;
    recipes: RecipeModel[];
    recipes2: RecipeModel[];
}

export class RecipesController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesScope,
        private RecipesDialogService: RecipesDialogService
    ) {
        // Init
        $scope.recipe = new RecipeModel;
        $scope.recipe.servings = 2;
        $scope.recipe.title = 'Cake';
        this.initValues();
    }
    initValues = () =>{
        var names: string[] = ['Cake','Fish','Chicken','Candy','Rice','Stake','Beef','Vegetables','Salmon','Turkey'];
        var desc: string[] = ['This is a description','This is also a descriptin but a bit longer', 'Short one', 'Somewhere in the middle heh'];
        var urls: string[] = ['https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx','https://previews.123rf.com/images/vladi59/vladi591407/vladi59140700009/30114436-Cooked-fish-sea-bream-fish-with-lemon-parsley-garlic-Stock-Photo.jpg','http://wishfulchef.com/wp-content/uploads/2011/09/ChickenRoastedInBeer1.jpg','http://www.ohnuts.com/blog/homemade-candy-bars-13.jpg','http://assets.epicurious.com/photos/568eb0bf7dc604b44b5355ee/2:1/w_1260%2Ch_630/rice.jpg','http://www.omahasteaks.com/gifs/990x594/fi004.jpg','http://www.foodinaminute.co.nz/var/fiam/storage/images/recipes/slow-cooked-beef-and-mushroom-with-parsley-dumplings/7970016-8-eng-US/Slow-Cooked-Beef-and-Mushroom-with-Parsley-Dumplings_recipeimage.jpg','http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg','http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/7/26/1/CN1B01_oven-baked-salmon_s4x3.jpg.rend.hgtvcom.616.462.jpeg','http://media.dish.allrecipes.com/wp-content/uploads/2014/04/101975681-Roast-Turkey-and-Vegetables-on-Serving-Platter-Photo-by-Meredith-resized.jpg']
        var recipe: RecipeModel;

        this.$scope.recipes = new Array<RecipeModel>();
        for(var i = 0; i<names.length; i++){
            recipe = new RecipeModel();
            recipe.title = names[i];
            recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
            recipe.servings = i;
            recipe.url = urls[i];
            this.$scope.recipes.push(recipe);
        }
        this.$scope.recipes2 = angular.copy(this.$scope.recipes);
        this.$scope.recipes2.reverse();

    }
    showDetails = (recipe: RecipeModel, evt: Event) =>{
        this.RecipesDialogService.show(evt,'details',recipe).then((modifiedSample: RecipeModel) => {
                console.log('We have to change this somewhere, for example, in array with appropriate index: ');
                console.log(modifiedSample);
               
            },
                (err: any) => {
                    // Error
                });
    }
}