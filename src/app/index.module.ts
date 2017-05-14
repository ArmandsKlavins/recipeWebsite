// Import scss files
require ('./index.scss');

import {RouterConfig} from './index.route';
import './core/core.module';
import './main/recipes/recipes.module'

var dependecies = [
  // Core
  'app.core',
  'app.recipes'
]

angular.module('appDashboard', dependecies)

.config(RouterConfig);