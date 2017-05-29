// Import scss files
require('./index.scss');

import { RouterConfig } from './index.route';
import './core/core.module';
import './main/recipes/recipes.module';
import './main/cms/cms.module';
import './main/login/login.module'

// Angular modules that get imported
var dependecies = [
  // Core
  'app.core',
  'app.recipes',
  'app.cms',
  'app.login'
]

angular.module('appDashboard', dependecies)

  .config(RouterConfig);
  //.component('myHeader',{template:require('./header/header.html')});