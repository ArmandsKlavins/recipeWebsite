export class RouterConfig {
    /* @ngInject */
    constructor(
        $stateProvider: ng.ui.IStateProvider
    ) {
        $stateProvider.state({
            name: 'cms',
            url: '/cms',
            template: require('./cms.html'),
            controller: 'CmsController as vm',
            resolve:{
                checkAuth : function(localStorageService: ng.local.storage.ILocalStorageService,
        $state: ng.ui.IStateService){
                    var token: any;
                    token = localStorageService.get('Profile');
                    
                    if(!token){
                        $state.go('login');
                    }
                }
            }
        });
    }
}