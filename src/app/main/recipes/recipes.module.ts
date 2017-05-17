import { RouterConfig } from './recipes.route';
import { RecipesController } from './recipes.controller';
import { RecipesDialogService} from './recipes.dialog.service';
import { RecipesDialogController } from './dialogs/recipes.dialog.controller';

angular.module('app.recipes', [])
    .config(RouterConfig)
    .service('RecipesDialogService', RecipesDialogService)
    .controller('RecipesController', RecipesController)
    .controller('RecipesDialogController',RecipesDialogController);