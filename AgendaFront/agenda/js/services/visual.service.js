(function () {
    angular
        .module('visual')
        .service('VisualService', VisualService);

    VisualService.$inject = ['$filter', '$location'];

    function VisualService($filter, $location) {
        var visual =  {
            clone: clone,
            orderList: orderList,
            groupList: groupList,
            filterList: filterList,
            returnArray: returnArray,
            formatDateHour: formatDateHour,
            removeHashKey: removeHashKey,
            returnLocalUrl: returnLocalUrl
        };

        return visual;

        function clone(object) {
            return JSON.parse(JSON.stringify(object));
        }

        function orderList(list, fields, order) {
            return $filter('orderBy')(list, fields, order);
        }

        function groupList(list, field, array) {
            return $filter('groupBy')(list, field, array);
        }

        function filterList(list, fields) {
            return $filter('filter')(list, fields);
        }

        function returnArray(list) {
            return $filter('toArray')(list);
        }

        function formatDateHour(value, format) {
            return $filter('date')(value, format);
        }

        function removeHashKey(item) {
            delete item['$$hashKey'];
            return item;
        }

        function returnLocalUrl() {
            var url = $location.url();
            url = url.split("/");
            return url;
        }

    }
})();