import { RouterConfig } from './recipes.route'
import { RecipesController } from './recipes.controller'

angular.module('app.recipes', [])
    .config(RouterConfig)
    .controller('RecipesController', RecipesController);