import { RouterConfig } from './cms.route';
import { CmsController } from './cms.controller';

angular.module('app.cms', [])
    .config(RouterConfig)
    .controller('CmsController', CmsController)