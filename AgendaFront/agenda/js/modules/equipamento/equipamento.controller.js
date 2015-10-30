(function () {
    angular
        .module('equipamento')
        .controller('EquipamentoController', EquipamentoController);

    EquipamentoController.$inject = ['EquipamentoModel', 'VisualService', '$timeout', 'LxDialogService', 'LxNotificationService'];

    function EquipamentoController(EquipamentoModel, VisualService, $timeout, LxDialogService, LxNotificationService) {
        var $scope = this;

        $scope.onclickAddEquipment = onclickAddEquipment;
        $scope.onclickEditEquipment = onclickEditEquipment;
        $scope.onclickOpenEditModal = onclickOpenEditModal;
        $scope.onclickOpenAddModal = onclickOpenAddModal;
        $scope.onclickDeleteEquipment = onclickDeleteEquipment;
        start();

        function start() {
            $scope.loading = true;
            getAll();
        }

        function getAll() {
            EquipamentoModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.equipmentList = VisualService.orderList(list, 'nome');
                    $scope.loading = false;
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível obter os equipamentos!");
            }
        }

        function insertEquipment(object) {
            EquipamentoModel.add(object, success, error);

            function success(Response) {
                $timeout(function() {
                    $scope.equipmentList = null;
                    $scope.loading = true;
                    getAll();
                    LxDialogService.close('modalEquipment');
                    LxNotificationService.success("Equipamento inserido com sucesso!");
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível cadastrar o equipamento!");
            }
        }

        function editEquipment(objectId, object) {
            EquipamentoModel.edit(objectId, object, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.equipmentList.length; x < lenX; x++) {
                        if ($scope.equipmentList[x].idEquipamento === objectId) {
                            $scope.equipmentList[x] = Response;
                            $scope.equipmentList[x].idEquipamento = objectId;
                            break;
                        }
                    }
                    $scope.equipmentList = VisualService.orderList($scope.equipmentList, 'nome');
                    LxDialogService.close('modalEquipment');
                    LxNotificationService.success("Equipamento editado com sucesso!");
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível editar o equipamento!");
            }
        }

        function removeEquipment(objectId) {
            EquipamentoModel.remove(objectId, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.equipmentList.length; x < lenX; x++) {
                        if ($scope.equipmentList[x].idEquipamento === objectId) {
                            $scope.equipmentList.splice(x, 1);
                            break;
                        }
                    }
                    LxDialogService.close('modalEquipment');
                    LxNotificationService.success("Equipamento removido com sucesso!");
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível remover o equipamento!");
            }
        }

        function objectEmpty() {
            $scope.object = {
                nome: "",
                descricao: ""
            };
        }

        function validObject() {
            var valid = true;
            if ($scope.object.nome === "") {
                valid = false;
            }

            return valid;
        }

        //events
        function onclickAddEquipment() {
            if (validObject()) {
                $scope.modalLoading = true;
                insertEquipment($scope.object);
            } else {
                LxNotificationService.warning("Por favor, preencha os campos obrigatórios!");
            }
        }

        function onclickEditEquipment() {
            if (validObject()) {
                $scope.modalLoading = true;
                editEquipment($scope.object.idEquipamento, $scope.object);
            } else {
                LxNotificationService.warning("Por favor, preencha os campos obrigatórios!");
            }
        }

        function onclickDeleteEquipment() {
            LxNotificationService.confirm('Deseja realmente excluir este ítem?', 'O ítem será removido da lista e não estará mais acessível.', { cancel:'Cancelar', ok:'Excluir' }, function(answer) {
                if (answer) {
                    $scope.modalLoading = true;
                    var id = $scope.object.idEquipamento;
                    removeEquipment(id);
                }
            });
        }

        function onclickOpenAddModal() {
            $scope.modalLoading = false;
            $scope.action = "Cadastrar";
            $scope.isEdit = false;
            objectEmpty();
            LxDialogService.open('modalEquipment');
        }

        function onclickOpenEditModal(equipment) {
            $scope.modalLoading = false;
            objectEmpty();
            $scope.object = VisualService.clone(equipment);
            $scope.action = "Editar";
            $scope.isEdit = true;
            LxDialogService.open('modalEquipment');
        }

    }
})();