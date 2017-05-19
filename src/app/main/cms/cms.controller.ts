import { RecipeModel } from './cms.model';

export interface ICmsScope extends ng.IScope {
    /**
     * Sample text on $scope
     */

}

export class CmsController {
    /* @ngInject */
    constructor(
        private $scope: ICmsScope,
    ) {
        // Init
        console.log("CMS");
    }
    
}