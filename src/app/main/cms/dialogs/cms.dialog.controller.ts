import { RecipeModel } from '../cms.model'
export interface ICmsDialogScope extends ng.IScope {
    recipe: RecipeModel;
    close: () => void;
    save: (model:any) => void;
}
export class CmsDialogController {
    /* @ngInject */
    constructor(
        private $scope: ICmsDialogScope,
        private $mdDialog: ng.material.IDialogService,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private currentObject: RecipeModel,
        private localStorageService: ng.local.storage.ILocalStorageService
    ) {
        // Init
        if (currentObject) {
            $scope.recipe = angular.copy(currentObject);
            $scope.recipe.ingredientsList = new Array<string>();
            $scope.recipe.directionsList = new Array<string>();

            $scope.recipe.ingredientsList = $scope.recipe.ingredients.split(';');
            $scope.recipe.directionsList = $scope.recipe.directions.split(';');
            $scope.recipe.ingredients = null;
            $scope.recipe.directions = null;
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
                 this.editRecipe(recipe);
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

        this.convertListToString(recipe);   
        var profile = this.localStorageService.get('Profile');
        recipe.createdBy = String(profile);
        if(recipe.url == '' || !recipe.url){
            recipe.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAHlBMVEX////r6+vz8/Pp6enu7u77+/v39/fy8vLt7e38/Pzwxt+PAAADxUlEQVR4nO2c7ZKjIBAAo1HU93/hi5e7BVnjDOxmGFLdv60UHYbvgdsNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPLGFZZ2uWZewtS5mNfM06Fjm1kWtY1H67YytC1uDtgKfTK2LW06ZYIeKJSH6pLNAnYsFh6Gv7qa8Ch89autCF1EhOAytC11CqDIMrYtdwFpl2FF3WtPP7PQzfavpZ3b6CdO6IB2GtXXBtdT1Mzteh8RtPrCVTtgiy5z9VGu1nccKsFpI5rF6bOw3vtHuPy0da0eFQtZmzdOiAp80qkY7wUaKloJNFI3a4Bf2A8c7x4gzzKfl9fOWWqzj1LoKzbcArFvhjm1LtO1In9iGaf3kuh7bMG0gaLx6vLdQ7MBwGsODcamLced1mB0TbhXLSteG01k/GAqr0rHh9Gp9pz5CdW54tX4tmfx5NZRGMf3eqlNDeSKinh75NNTssGgj1aWhbgtJOY33aKjdI9PVokPDvA3OYZnWYZ2+5wipFP0ZZr1oSCcx+RRA06O6MzwWKOSTtPXo2KHhPW2E29kk9LC3pOhtvBmmMfqq+GlzlCdw3gyT0r+un1nzkVPDpAq3i8+SnxQ7G2eGSe1cLQSTtihWoi/DpOTX886kR5WWxL4MY8GvYvRYbClMfRnGIJXKHf8LKUx9GcYvhQ/TcvdkGHtSecYZq1toiK4MY+jJE85R+61TQ3nPUF3frgxj5ImCScE/1TD2Sp9qeP94w97rULFU7tIw9qWyYJ89Tcl4GEcLYW/YlWHJnEY9droyjIURlhZDuhkgfOjKMCm2tP8Sq7uvtUUMPSlMZ/WXvgyTNf51JS7aD70ZJmF63RLjT3a2T5Puv1xFX/KZeI7ozDAtzusxMRGUO11nhoeDpxeK9/TaqHwU7M3wkMF0HqjpnyBXoT/Dw+HaSV7JdDhEVOSduDPMToCz/KDsAFFzROrPME95nb/y2aYxO/9WxKhLw5Pk8+38upYqx82hoTq/XpfE59FQqajMUnRpqFE8PQHvx1DOqdHn7nk1vF+n7hVcivZqOFxl7xXdvHFsmOfO/GP7lmPTr+Ge5p23x7n40r5vw51pDH81tzmMNdn6/g1/jKlhC0HbOrS/nGd9x7L2bY+fYPuQlP0VUvNHM+wFrR8+sQ9T63vAqlX5b2L/do11S2zw5IDtRdkmj7lZjoltngFTL857FbyZdajCIvqtFK7w6mj3AM/T8d0dzukFW1sey71lfA9L8PHaFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAr/IHU9kuz0wEwN8AAAAASUVORK5CYII='
        }
        this.$http.post('http://localhost:63802/api/recipes', recipe).then((response: any) => {
            this.$mdDialog.hide(response.data);
        });
    }

    editRecipe = (recipe: RecipeModel) =>{
        
        this.convertListToString(recipe);
        if(recipe.url == ''){
            recipe.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAHlBMVEX////r6+vz8/Pp6enu7u77+/v39/fy8vLt7e38/Pzwxt+PAAADxUlEQVR4nO2c7ZKjIBAAo1HU93/hi5e7BVnjDOxmGFLdv60UHYbvgdsNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPLGFZZ2uWZewtS5mNfM06Fjm1kWtY1H67YytC1uDtgKfTK2LW06ZYIeKJSH6pLNAnYsFh6Gv7qa8Ch89autCF1EhOAytC11CqDIMrYtdwFpl2FF3WtPP7PQzfavpZ3b6CdO6IB2GtXXBtdT1Mzteh8RtPrCVTtgiy5z9VGu1nccKsFpI5rF6bOw3vtHuPy0da0eFQtZmzdOiAp80qkY7wUaKloJNFI3a4Bf2A8c7x4gzzKfl9fOWWqzj1LoKzbcArFvhjm1LtO1In9iGaf3kuh7bMG0gaLx6vLdQ7MBwGsODcamLced1mB0TbhXLSteG01k/GAqr0rHh9Gp9pz5CdW54tX4tmfx5NZRGMf3eqlNDeSKinh75NNTssGgj1aWhbgtJOY33aKjdI9PVokPDvA3OYZnWYZ2+5wipFP0ZZr1oSCcx+RRA06O6MzwWKOSTtPXo2KHhPW2E29kk9LC3pOhtvBmmMfqq+GlzlCdw3gyT0r+un1nzkVPDpAq3i8+SnxQ7G2eGSe1cLQSTtihWoi/DpOTX886kR5WWxL4MY8GvYvRYbClMfRnGIJXKHf8LKUx9GcYvhQ/TcvdkGHtSecYZq1toiK4MY+jJE85R+61TQ3nPUF3frgxj5ImCScE/1TD2Sp9qeP94w97rULFU7tIw9qWyYJ89Tcl4GEcLYW/YlWHJnEY9droyjIURlhZDuhkgfOjKMCm2tP8Sq7uvtUUMPSlMZ/WXvgyTNf51JS7aD70ZJmF63RLjT3a2T5Puv1xFX/KZeI7ozDAtzusxMRGUO11nhoeDpxeK9/TaqHwU7M3wkMF0HqjpnyBXoT/Dw+HaSV7JdDhEVOSduDPMToCz/KDsAFFzROrPME95nb/y2aYxO/9WxKhLw5Pk8+38upYqx82hoTq/XpfE59FQqajMUnRpqFE8PQHvx1DOqdHn7nk1vF+n7hVcivZqOFxl7xXdvHFsmOfO/GP7lmPTr+Ge5p23x7n40r5vw51pDH81tzmMNdn6/g1/jKlhC0HbOrS/nGd9x7L2bY+fYPuQlP0VUvNHM+wFrR8+sQ9T63vAqlX5b2L/do11S2zw5IDtRdkmj7lZjoltngFTL857FbyZdajCIvqtFK7w6mj3AM/T8d0dzukFW1sey71lfA9L8PHaFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAr/IHU9kuz0wEwN8AAAAASUVORK5CYII='
        }
        this.$http.put('http://localhost:63802/api/recipes/'+recipe.id, recipe).then((response: any) => {
            this.$mdDialog.hide(response.data);
        });
    }

    convertListToString = (recipe: RecipeModel) =>{
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
    }
}