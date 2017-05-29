import { LoginModel } from './login.model';

export interface ILoginScope extends ng.IScope {
    login: LoginModel;
}

export class LoginController {
    /* @ngInject */
    constructor(
        private $scope: ILoginScope,
        private $http: ng.IHttpService,
        private localStorageService: ng.local.storage.ILocalStorageService,
        private $state: ng.ui.IStateService
    ) {
        // Init
        $scope.login = new LoginModel();
    }
    login = (login: LoginModel) =>{
        
        this.$http.post('http://localhost:63802/api/login/auth',login).then((response:any)=>{

            this.localStorageService.set("Profile",response.data.fullName);

            this.$state.go('cms');
        },
                (err: any) => {
                    // Error
                });
        
    }
}