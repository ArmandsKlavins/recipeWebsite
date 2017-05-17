import { RecipeModel } from './recipes.model';
import { IBaseDialogService } from './../../base.services'

export interface IRecipesDialogService extends IBaseDialogService<RecipeModel> {
    //show: (evt: any, templatePrefix: string, current?: RecipeModel) => ng.IPromise<RecipeModel>;
}
export class RecipesDialogService implements IRecipesDialogService {
    /** @ngInject */
    constructor(
        private $mdDialog: ng.material.IDialogService,
        private $q: ng.IQService
    ) {
    }
    show = (evt: any, templatePrefix: string, object?: RecipeModel) => {
        var defer = this.$q.defer();
        this.$mdDialog.show({
            controller: 'RecipesDialogController as vm',
            template: require('./dialogs/' + templatePrefix + '.recipes.html'),
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