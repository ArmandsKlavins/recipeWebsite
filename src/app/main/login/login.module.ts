import { RouterConfig } from './login.route';
import { LoginController } from './login.controller';

angular.module('app.login', [])
    .config(RouterConfig)
    .controller('LoginController', LoginController);