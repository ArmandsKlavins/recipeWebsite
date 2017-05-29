export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state({
            name: 'login',
            url: '/login',
            template: require('./login.html'),
            controller: 'LoginController as vm',
            resolve:{
                checkAuth : function(localStorageService: ng.local.storage.ILocalStorageService,
        $state: ng.ui.IStateService){
                    var token: any;
                    token = localStorageService.get('Profile');
                    if(token){
                        $state.go('cms');
                    }
                }
            }
        });
    }
}