import { PublicRecipeModel } from './recipes.model';
import { RecipesDialogService } from './recipes.dialog.service'
import { CategoryModel } from '../cms/cms.model';

export interface IRecipesScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
    recipe: PublicRecipeModel;
    data: PublicRecipeModel[];
    categories: CategoryModel[];
    recipes: PublicRecipeModel[];
    recipes2: PublicRecipeModel[];
    recipes3: PublicRecipeModel[];
    recipes4: PublicRecipeModel[];
    infiniteScroll: boolean;
    infiniteScrollMax: number;
    query: any;
    query2: any;
}

export class RecipesController {
    /* @ngInject */
    constructor(
        private $scope: IRecipesScope,
        private $http: ng.IHttpService,
        private RecipesDialogService: RecipesDialogService
    ) {
        // Init
        this.$scope.infiniteScroll = false;
        this.$scope.recipes = new Array<PublicRecipeModel>();
        this.$scope.recipes2 = new Array<PublicRecipeModel>();
        this.$scope.recipes3 = new Array<PublicRecipeModel>();
        this.$scope.recipes4 = new Array<PublicRecipeModel>();
        $scope.query = {
            filter: "",
            limit: 16,
            page: 1,
            category: ""
        }
        $scope.query2 = {
            filter: "",
            limit: 0,
            page: 1
        }
        this.initValues();
    }
    getRecipes = (name?: string) => {
        this.$scope.query.page = 1;
        this.$scope.infiniteScroll = true;
        if (name) {
            if (name == 'all') {
                this.$scope.query.category = '';
            }
            else {
                this.$scope.query.category = name;
            }
        }

        var arrayNumber: number;
        
            this.$scope.recipes = new Array<PublicRecipeModel>();
            this.$scope.recipes2 = new Array<PublicRecipeModel>();
            this.$scope.recipes3 = new Array<PublicRecipeModel>();
            this.$scope.recipes4 = new Array<PublicRecipeModel>();
        
        this.$http.post('http://localhost:63802/api/recipes/list', this.$scope.query).then((response: any) => {
            this.$scope.infiniteScrollMax = Math.floor(response.headers('RecipesCount')/16)+1;
            this.$scope.query.page++;
            this.$scope.data = response.data;
            for (var i = 0; i < this.$scope.data.length; i++) {
                this.$scope.data[i].ingredientsList = this.$scope.data[i].ingredients.split(';');
                this.$scope.data[i].directionsList = this.$scope.data[i].directions.split(';');
                var hours = Math.floor(this.$scope.data[i].time / 60);
                var minutes = this.$scope.data[i].time % 60;
                if (hours < 1) {
                    this.$scope.data[i].timeInString = minutes + ' m';
                }
                else {
                    this.$scope.data[i].timeInString = hours + ' h ' + minutes + ' m';
                }
                arrayNumber = (i + 1) % 4;
                switch (arrayNumber) {
                    case 1:
                        this.$scope.recipes.push(this.$scope.data[i]);
                        break;
                    case 2:
                        this.$scope.recipes2.push(this.$scope.data[i]);
                        break;
                    case 3:
                        this.$scope.recipes3.push(this.$scope.data[i]);
                        break;
                    case 0:
                        this.$scope.recipes4.push(this.$scope.data[i]);
                        break;

                }
                this.$scope.infiniteScroll = false;
            }
        });


    }
    getRecipesInfinite = () => {
        this.$scope.infiniteScroll = true;
        var arrayNumber: number;
        if(this.$scope.query.page == 1){
            this.$scope.recipes = new Array<PublicRecipeModel>();
            this.$scope.recipes2 = new Array<PublicRecipeModel>();
            this.$scope.recipes3 = new Array<PublicRecipeModel>();
            this.$scope.recipes4 = new Array<PublicRecipeModel>();
            this.$scope.infiniteScrollMax = 1;
        }
        if(this.$scope.query.page<= this.$scope.infiniteScrollMax){
        this.$http.post('http://localhost:63802/api/recipes/list', this.$scope.query).then((response: any) => {
            this.$scope.query.page++;
            this.$scope.infiniteScrollMax = Math.floor(response.headers('RecipesCount')/16)+1;
            this.$scope.data = response.data;
            for (var i = 0; i < this.$scope.data.length; i++) {
                this.$scope.data[i].ingredientsList = this.$scope.data[i].ingredients.split(';');
                this.$scope.data[i].directionsList = this.$scope.data[i].directions.split(';');
                var hours = Math.floor(this.$scope.data[i].time / 60);
                var minutes = this.$scope.data[i].time % 60;
                if (hours < 1) {
                    this.$scope.data[i].timeInString = minutes + ' m';
                }
                else {
                    this.$scope.data[i].timeInString = hours + ' h ' + minutes + ' m';
                }
                arrayNumber = (i + 1) % 4;
                switch (arrayNumber) {
                    case 1:
                        this.$scope.recipes.push(this.$scope.data[i]);
                        break;
                    case 2:
                        this.$scope.recipes2.push(this.$scope.data[i]);
                        break;
                    case 3:
                        this.$scope.recipes3.push(this.$scope.data[i]);
                        break;
                    case 0:
                        this.$scope.recipes4.push(this.$scope.data[i]);
                        break;

                }

                if(this.$scope.query.page <= this.$scope.infiniteScrollMax){
                    this.$scope.infiniteScroll = false;
                }
            }
        });
        }
    }
    initValues = () => {

        // this.getRecipes();
        this.$http.post('http://localhost:63802/api/categories/list', this.$scope.query2).then((response: any) => {
            this.$scope.categories = response.data;
            this.$scope.totalCategories = response.headers('CategoryCount');
        });
        //     for(var i = 0; i<3; i++){
        //     this.$scope.recipes.push(this.$scope.data[i]);
        // }
        // for(var i = 3; i<6; i++){
        //     this.$scope.recipes2.push(this.$scope.data[i]);
        // }
        // for(var i = 6; i<9; i++){
        //     this.$scope.recipes3.push(this.$scope.data[i]);
        // }
        // for(var i = 9; i<12; i++){
        //     this.$scope.recipes4.push(this.$scope.data[i]);
        // }


        // this.$scope.infiniteScroll = true;
        // var names: string[] = ['Cake','Fish','Chicken','Candy','Rice','Stake','Beef','Vegetables','Salmon','Turkey'];
        // var ingredients: string[] = ['Salt', 'Pepers', 'Eggs','Suger','Thyme','Chicken','Apple','Orange','Pumpkin','Starch']
        // var desc: string[] = ['This is a normal description','This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen This is also a descriptin but a bit longer but this might happen', 'Tastes great', 'Somewhere in the middle, normal length probably'];
        // var urls: string[] = ['https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx','https://previews.123rf.com/images/vladi59/vladi591407/vladi59140700009/30114436-Cooked-fish-sea-bream-fish-with-lemon-parsley-garlic-Stock-Photo.jpg','http://wishfulchef.com/wp-content/uploads/2011/09/ChickenRoastedInBeer1.jpg','http://www.ohnuts.com/blog/homemade-candy-bars-13.jpg','http://assets.epicurious.com/photos/568eb0bf7dc604b44b5355ee/2:1/w_1260%2Ch_630/rice.jpg','http://www.omahasteaks.com/gifs/990x594/fi004.jpg','http://www.foodinaminute.co.nz/var/fiam/storage/images/recipes/slow-cooked-beef-and-mushroom-with-parsley-dumplings/7970016-8-eng-US/Slow-Cooked-Beef-and-Mushroom-with-Parsley-Dumplings_recipeimage.jpg','http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg','http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/7/26/1/CN1B01_oven-baked-salmon_s4x3.jpg.rend.hgtvcom.616.462.jpeg','http://media.dish.allrecipes.com/wp-content/uploads/2014/04/101975681-Roast-Turkey-and-Vegetables-on-Serving-Platter-Photo-by-Meredith-resized.jpg']
        // var recipe: PublicRecipeModel;
        // var recipeCount: number = 3;

        // for(var i = 0; i<recipeCount; i++){
        //     recipe = new PublicRecipeModel();
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

        // for(var i = 0; i<recipeCount; i++){
        //     recipe = new PublicRecipeModel();
        //     recipe.ingredients = new Array<string>();
        //     recipe.title = names[Math.floor(Math.random() * names.length) + 0];
        //     recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
        //     recipe.servings = i;
        //     recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
        //     for(var j=0; j<3; j++){
        //         recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
        //     }
        //     this.$scope.recipes2.push(recipe);
        // }

        // for(var i = 0; i<recipeCount; i++){
        //     recipe = new PublicRecipeModel();
        //      recipe.ingredients = new Array<string>();
        //     recipe.title = names[Math.floor(Math.random() * names.length) + 0];
        //     recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
        //     recipe.servings = i;
        //     recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
        //     for(var j=0; j<3; j++){
        //         recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
        //     }
        //     this.$scope.recipes3.push(recipe);
        // }

        // for(var i = 0; i<recipeCount; i++){
        //     recipe = new PublicRecipeModel();
        //      recipe.ingredients = new Array<string>();
        //     recipe.title = names[Math.floor(Math.random() * names.length) + 0];
        //     recipe.description = desc[Math.floor(Math.random() * desc.length) + 0]
        //     recipe.servings = i;
        //     recipe.url = urls[Math.floor(Math.random() * urls.length) + 0];
        //     for(var j=0; j<3; j++){
        //         recipe.ingredients.push(ingredients[Math.floor(Math.random() * ingredients.length) + 0])
        //     }
        //     this.$scope.recipes4.push(recipe);
        // }

        // if(++this.$scope.infiniteScrollCount<=2){
        //     this.$scope.infiniteScroll = false;
        // }
    }
    showDetails = (recipe: PublicRecipeModel, evt: Event) => {
        this.RecipesDialogService.show(evt, 'details', recipe).then((modifiedSample: PublicRecipeModel) => {
            

        },
            (err: any) => {
                // Error
            });
    }
}