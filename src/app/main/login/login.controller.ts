import { LoginModel } from './login.model';

export interface ILoginScope extends ng.IScope {
    /**
     * Sample text on $scope
     */
}

export class LoginController {
    /* @ngInject */
    constructor(
        private $scope: ILoginScope,
        private $http: ng.IHttpService,
    ) {
        // Init
        console.log("LOGIN");
    }
}