import { RecipeModel } from './recipes.model';
import {RecipesDialogService} from './recipes.dialog.service'

export interface IRecipesScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipe: RecipeModel;
    recipes: RecipeModel[];
    recipes2: RecipeModel[];
    recipes3: RecipeModel[];
    recipes4: RecipeModel[];
    infiniteScroll: boolean;
    infiniteScrollCount:number;
}

export class RecipesController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesScope,
        private RecipesDialogService: RecipesDialogService
    ) {
        // Init
        this.$scope.infiniteScroll = false;
        this.$scope.infiniteScrollCount = 0;
        this.$scope.recipes = new Array<RecipeModel>();
        this.$scope.recipes2 = new Array<RecipeModel>();
        this.$scope.recipes3 = new Array<RecipeModel>();
        this.$scope.recipes4 = new Array<RecipeModel>();
        this.initValues();
    }
    initValues = () =>{
        this.$scope.infiniteScroll = true;
        var names: string[] = ['Cake','Fish','Chicken','Candy','Rice','Stake','Beef','Vegetables','Salmon','Turkey'];
        var ingredients: string[] = ['Salt', 'Pepers', 'Eggs','Suger','Thyme','Chicken','Apple','Orange','Pumpkin','Starch']
        var desc: string[] = ['This is a normal description','This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen', 'Tastes great', 'Somewhere in the middle, normal length probably'];
        var urls: string[] = ['https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx','https://previews.123rf.com/images/vladi59/vladi591407/vladi59140700009/30114436-Cooked-fish-sea-bream-fish-with-lemon-parsley-garlic-Stock-Photo.jpg','http://wishfulchef.com/wp-content/uploads/2011/09/ChickenRoastedInBeer1.jpg','http://www.ohnuts.com/blog/homemade-candy-bars-13.jpg','http://assets.epicurious.com/photos/568eb0bf7dc604b44b5355ee/2:1/w_1260%2Ch_630/rice.jpg','http://www.omahasteaks.com/gifs/990x594/fi004.jpg','http://www.foodinaminute.co.nz/var/fiam/storage/images/recipes/slow-cooked-beef-and-mushroom-with-parsley-dumplings/7970016-8-eng-US/Slow-Cooked-Beef-and-Mushroom-with-Parsley-Dumplings_recipeimage.jpg','http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg','http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/7/26/1/CN1B01_oven-baked-salmon_s4x3.jpg.rend.hgtvcom.616.462.jpeg','http://media.dish.allrecipes.com/wp-content/uploads/2014/04/101975681-Roast-Turkey-and-Vegetables-on-Serving-Platter-Photo-by-Meredith-resized.jpg']
        var recipe: RecipeModel;
        var recipeCount: number = 3;
        
        for(var i = 0; i<recipeCount; i++){
            recipe = new RecipeModel();
             recipe.ingredients = new Array<string>();
            recipe.title = names[Math.floor(Math.random() * names.length) + 0];
            recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
            recipe.servings = i;
            recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
            for(var j=0; j<3; j++){
                recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
            }
            this.$scope.recipes.push(recipe);
        }
        
        for(var i = 0; i<recipeCount; i++){
            recipe = new RecipeModel();
            recipe.ingredients = new Array<string>();
            recipe.title = names[Math.floor(Math.random() * names.length) + 0];
            recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
            recipe.servings = i;
            recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
            for(var j=0; j<3; j++){
                recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
            }
            this.$scope.recipes2.push(recipe);
        }
        
        for(var i = 0; i<recipeCount; i++){
            recipe = new RecipeModel();
             recipe.ingredients = new Array<string>();
            recipe.title = names[Math.floor(Math.random() * names.length) + 0];
            recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
            recipe.servings = i;
            recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
            for(var j=0; j<3; j++){
                recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
            }
            this.$scope.recipes3.push(recipe);
        }
        
        for(var i = 0; i<recipeCount; i++){
            recipe = new RecipeModel();
             recipe.ingredients = new Array<string>();
            recipe.title = names[Math.floor(Math.random() * names.length) + 0];
            recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
            recipe.servings = i;
            recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
            for(var j=0; j<3; j++){
                recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
            }
            this.$scope.recipes4.push(recipe);
        }
        
        if(++this.$scope.infiniteScrollCount<=2){
            this.$scope.infiniteScroll = false;
        }
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