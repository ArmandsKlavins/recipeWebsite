import { RouterConfig } from './cms.route';
import { CmsController } from './cms.controller';
import { CmsDialogService} from './cms.dialog.service';
import { CmsDialogController } from './dialogs/cms.dialog.controller';

angular.module('app.cms', [])
    .config(RouterConfig)
    .service('CmsDialogService', CmsDialogService)
    .controller('CmsController', CmsController)
    .controller('CmsDialogController',CmsDialogController);