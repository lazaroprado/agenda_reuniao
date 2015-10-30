(function () {
    angular
        .module('login')
        .controller('LoginController', LoginController);

    //LoginController.$inject = [];

    function LoginController() {
        var $scope = this;

        $scope.onclickLogin = onclickLogin;
        start();

        function start() {

        }

        function onclickLogin() {
            window.location.href = 'app/app.html';
        }

    }
})();