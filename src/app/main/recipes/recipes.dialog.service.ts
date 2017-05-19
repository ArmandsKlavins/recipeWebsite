import { PublicRecipeModel } from './recipes.model';
import { IBaseDialogService } from './../../base.services'

export interface IRecipesDialogService extends IBaseDialogService<PublicRecipeModel> {
    //show: (evt: any, templatePrefix: string, current?: PublicRecipeModel) => ng.IPromise<PublicRecipeModel>;
}
export class RecipesDialogService implements IRecipesDialogService {
    /** @ngInject */
    constructor(
        private $mdDialog: ng.material.IDialogService,
        private $q: ng.IQService
    ) {
    }
    show = (evt: any, templatePrefix: string, object?: PublicRecipeModel) => {
        var defer = this.$q.defer();
        this.$mdDialog.show({
            controller: 'RecipesDialogController as vm',
            template: require('./dialogs/' + templatePrefix + '.recipes.html'),
            parent: angular.element(document.body),
            targetEvent: evt,
            clickOutsideToClose: true,
            locals: { currentObject: object }
        })
            .then((newObject: PublicRecipeModel) => {
                defer.resolve(newObject);
            }, (err: any) => {
                defer.reject();
            })
        return defer.promise;
    }
}