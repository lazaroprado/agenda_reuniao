(function () {
    angular
        .module('sala')
        .controller('SalaController', SalaController);

    SalaController.$inject = ['SalaModel', 'EquipamentoModel', 'VisualService', '$timeout', 'LxDialogService', 'LxNotificationService'];

    function SalaController(SalaModel, EquipamentoModel, VisualService, $timeout, LxDialogService, LxNotificationService) {
        var $scope = this;

        $scope.onclickAddRoom = onclickAddRoom;
        $scope.onclickEditRoom = onclickEditRoom;
        $scope.onclickOpenEditModal = onclickOpenEditModal;
        $scope.onclickOpenAddModal = onclickOpenAddModal;
        $scope.onclickDeleteRoom = onclickDeleteRoom;
        start();

        function start() {
            $scope.loading = true;
            getAll();
            getAllEquipment();
        }

        function getAll() {
            SalaModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.roomList = VisualService.orderList(list, 'nome');
                    $scope.loading = false;
                });
            }

            function error() {
                $scope.loading = false;
                LxNotificationService.error("Não foi possível obter as salas!");
            }
        }

        function getAllEquipment() {
            EquipamentoModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.equipmentList = VisualService.orderList(list, 'nome');
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível obter as salas!");
            }
        }

        function insertRoom(object) {
            SalaModel.add(object, success, error);

            function success(Response) {
                $timeout(function() {
                    $scope.roomList = null;
                    $scope.loading = true;
                    getAll();
                    LxDialogService.close('modalRoom');
                    LxNotificationService.success("Sala inserida com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível cadastrar a sala!");
            }
        }

        function editRoom(objectId, object) {
            SalaModel.edit(objectId, object, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.roomList.length; x < lenX; x++) {
                        if ($scope.roomList[x].idSala === objectId) {
                            $scope.roomList[x] = Response;
                            $scope.roomList[x].idSala = objectId;
                            break;
                        }
                    }
                    $scope.roomList = VisualService.orderList($scope.roomList, 'nome');
                    LxDialogService.close('modalRoom');
                    LxNotificationService.success("Sala editada com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível editar a sala!");
            }
        }

        function removeRoom(objectId) {
            SalaModel.remove(objectId, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.roomList.length; x < lenX; x++) {
                        if ($scope.roomList[x].idSala === objectId) {
                            $scope.roomList.splice(x, 1);
                            break;
                        }
                    }
                    LxDialogService.close('modalRoom');
                    LxNotificationService.success("Sala removida com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível remover a sala!");
            }
        }

        function objectEmpty() {
            $scope.object = {
                nome: "",
                observacao: "",
                equipamentos: [],
                horarioInicio: "",
                horarioFim: "",
                capacidade: null
            };
            $scope.selectedEquipment = [];
        }

        function validObject() {
            var x, lenX, dateComplete, capacidade,
                date, hours, minuts,
                today = new Date(),
                valid = true;

            $scope.object.equipamentos = [];
            for (x = 0, lenX = $scope.selectedEquipment.length; x < lenX; x++) {
                $scope.object.equipamentos.push({idEquipamento: $scope.selectedEquipment[x].idEquipamento});
            }

            capacidade = parseInt($scope.object.capacidade);
            if (isNaN(capacidade)) {
                $scope.object.capacidade = null;
            } else {
                $scope.object.capacidade = capacidade;
            }

            if ($scope.object.horarioInicio) {
                date = $scope.object.horarioInicio.split(":");
                if (date[0] && date[1]) {
                    dateComplete = new Date(today.getFullYear(), today.getMonth()+1, today.getDate(), date[0], date[1]);
                    if (isNaN(dateComplete)) {
                        $scope.object.horarioInicio = "";
                    } else {
                        $scope.object.horarioInicio = dateComplete.toJSON();
                    }
                } else {
                    $scope.object.horarioInicio = "";
                }
            }

            if ($scope.object.horarioFim) {
                date = $scope.object.horarioFim.split(":");
                if (date[0] && date[1]) {
                    dateComplete = new Date(today.getFullYear(), today.getMonth()+1, today.getDate(), date[0], date[1]);
                    if (isNaN(dateComplete)) {
                        $scope.object.horarioFim = "";
                    } else {
                        $scope.object.horarioFim = dateComplete.toJSON();
                    }
                } else {
                    $scope.object.horarioFim = "";
                }
            }

            if ($scope.object.nome === "") {
                valid = false;
            }

            if ($scope.object.equipamentos.length === 0) {
                valid = false;
            }

            return valid;
        }

        //events
        function onclickAddRoom() {
            if (validObject()) {
                $scope.modalLoading = true;
                insertRoom($scope.object);
            } else {
                LxNotificationService.warning("Por favor, preencha todos os campos obrigatórios!");
            }
        }

        function onclickEditRoom() {
            if (validObject()) {
                $scope.modalLoading = true;
                editRoom($scope.object.idSala, $scope.object);
            } else {
                LxNotificationService.warning("Por favor, preencha todos os campos obrigatórios!");
            }
        }

        function onclickDeleteRoom() {
            LxNotificationService.confirm('Deseja realmente excluir este ítem?', 'O ítem será removido da lista e não estará mais acessível.', { cancel:'Cancelar', ok:'Excluir' }, function(answer) {
                if (answer) {
                    $scope.modalLoading = true;
                    var id = $scope.object.idSala;
                    removeRoom(id);
                }
            });
        }

        function onclickOpenAddModal() {
            $scope.modalLoading = false;
            $scope.action = "Cadastrar";
            $scope.isEdit = false;
            objectEmpty();
            LxDialogService.open('modalRoom');
        }

        function onclickOpenEditModal(room) {
            $scope.modalLoading = false;
            objectEmpty();
            $scope.object = VisualService.clone(room);

            var x, lenX, y, lenY, equi = [], date, minuts, hours;

            for (x = 0,lenX = $scope.object.equipamentos.length; x < lenX; x++) {
                for (y = 0,lenY = $scope.equipmentList.length; y < lenY; y++) {
                    if ($scope.object.equipamentos[x].idEquipamento === $scope.equipmentList[y].idEquipamento) {
                        equi.push($scope.equipmentList[y]);
                    }
                }
            }

            if ($scope.object.horarioInicio) {
                date = new Date($scope.object.horarioInicio);
                hours = date.getHours().toString();
                if (hours.length === 1) {
                    hours = "0"+hours;
                }
                minuts = date.getMinutes().toString();
                if (minuts.length === 1) {
                    minuts = "0"+minuts;
                }
                $scope.object.horarioInicio = hours +":"+ minuts;
            }

            if ($scope.object.horarioFim) {
                date = new Date($scope.object.horarioFim);
                hours = date.getHours().toString();
                if (hours.length === 1) {
                    hours = "0"+hours;
                }
                minuts = date.getMinutes().toString();
                if (minuts.length === 1) {
                    minuts = "0"+minuts;
                }
                $scope.object.horarioFim = hours +":"+ minuts;
            }
            $scope.selectedEquipment = equi;

            $scope.action = "Editar";
            $scope.isEdit = true;
            LxDialogService.open('modalRoom');
        }
    }
})();