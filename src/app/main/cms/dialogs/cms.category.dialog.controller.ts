import { CategoryModel } from '../cms.model'
export interface ICmsCategoryDialogScope extends ng.IScope {
    category: CategoryModel;
    close: () => void;
    save: (model:any) => void;
}
export class CmsCategoryDialogController {
    /* @ngInject */
    constructor(
        private $scope: ICmsCategoryDialogScope,
        private $mdDialog: ng.material.IDialogService,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private currentObject: CategoryModel
    ) {
        // Init
        if (currentObject) {
            $scope.category = angular.copy(currentObject);
            
        }
        else {
            $scope.category = new CategoryModel();
        }
        $scope.close = () => {
            $mdDialog.cancel();
        };
        $scope.save = (category: CategoryModel) => {
            
            // If we have currentObject, then we are editing this object
            if (currentObject) {
                // Send modified object to server to apply modified fields
                this.editCategory(category);
            } else {
                // Else we call method that will physicly add this object to database (Through server)
                this.addCategory(category);
            }
        };
    }

    addCategory = (category: CategoryModel) =>{
        this.$http.post('http://localhost:63802/api/categories', category).then((response: any) => {
            this.$mdDialog.hide(response.data);
        });
    };

    editCategory = (category: CategoryModel) =>{
        this.$http.put('http://localhost:63802/api/categories/'+category.id, category).then((response: any) => {
            this.$mdDialog.hide(response.data);
        });
    };
    
}