import { RouterConfig } from './cms.route';
import { CmsController } from './cms.controller';
import { CmsDialogService} from './cms.dialog.service';
import { CmsCategoryDialogService} from './cms.dialog.service';
import { CmsDialogController } from './dialogs/cms.dialog.controller';
import { CmsCategoryDialogController} from './dialogs/cms.category.dialog.controller'

angular.module('app.cms', [])
    .config(RouterConfig)
    .service('CmsDialogService', CmsDialogService)
    .service('CmsCategoryDialogService', CmsCategoryDialogService)
    .controller('CmsController', CmsController)
    .controller('CmsDialogController',CmsDialogController)
    .controller('CmsCategoryDialogController',CmsCategoryDialogController);