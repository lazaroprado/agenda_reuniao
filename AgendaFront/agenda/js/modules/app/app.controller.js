(function () {
    angular
        .module('app')
        .controller('AppController', AppController)
        .config(AppConfig);

    AppConfig.inject = ['$http'];

    function AppConfig($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    //AppController.$inject = [];

    function AppController() {
        var $scope = this;

        $scope.onclickGetTemplate = onclickGetTemplate;
        $scope.onclickLogout = onclickLogout;
        start();

        function start() {
            onclickGetTemplate(1);
        }

        function onclickGetTemplate(item) {
            if (item === 1) {
                $scope.template = '../js/modules/reuniao/reuniao.html';
            } else if (item === 2) {
                $scope.template = '../js/modules/equipamento/equipamento.html';
            } else if (item === 3) {
                $scope.template = '../js/modules/sala/sala.html';
            } else if (item === 4) {
                $scope.template = '../js/modules/pessoa/pessoa.html';
            }
        }

        function onclickLogout() {
            window.location.href = '../index.html';
        }

    }
})();