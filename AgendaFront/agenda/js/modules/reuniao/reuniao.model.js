(function () {
    angular
        .module('reuniao')
        .service('ReuniaoModel', ReuniaoModel);

    ReuniaoModel.$inject = ['$http'];
    var urlPath = "http://localhost:8080/AgendaAPI/api/reuniao/";

    function ReuniaoModel($http) {
        return {
            getAll: getAll,
            add: add,
            edit: edit,
            remove: remove
        };

        function getAll(success, error) {
            $http({
                method: 'get',
                url: urlPath + 'all'
            }).success(function(data) {
                success(data.reuniao);
            }).error(function(status) {
               error(status);
            });
        }

        function add(Object, success, error) {
            $http({
                method: 'post',
                url: urlPath,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: Object
            }).success(function(data, status, header, config) {
                success(config.data);
            }).error(function(data, status, header, config) {
                error(status);
            });
        }

        function edit(id, Object, success, error) {
            $http({
                method: 'put',
                url: urlPath + id,
                data: Object
            }).success(function(data, status, header, config) {
                success(config.data);
            }).error(function(data, status, header, config) {
                error(status);
            });
        }

        function remove(id, success, error) {
            $http({
                method: 'delete',
                url: urlPath + id
            }).success(function(data, status, header, config) {
                success(config.data);
            }).error(function(data, status, header, config) {
                error(status);
            });
        }
    }
})();