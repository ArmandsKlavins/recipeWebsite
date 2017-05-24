import { RecipeModel } from './cms.model';
import { IBaseDialogService } from './../../base.services'

export interface ICmsDialogService extends IBaseDialogService<RecipeModel> {
    
}
export class CmsDialogService implements ICmsDialogService {
    /** @ngInject */
    constructor(
        private $mdDialog: ng.material.IDialogService,
        private $q: ng.IQService
    ) {
    }
    show = (evt: any, templatePrefix: string, object?: RecipeModel) => {
        var defer = this.$q.defer();
        this.$mdDialog.show({
            controller: 'CmsDialogController as vm',
            template: require('./dialogs/' + templatePrefix + '.cms.html'),
            parent: angular.element(document.body),
            targetEvent: evt,
            clickOutsideToClose: true,
            locals: { currentObject: object }
        })
            .then((newObject: RecipeModel) => {
                defer.resolve(newObject);
            }, (err: any) => {
                defer.reject();
            })
        return defer.promise;
    }
}