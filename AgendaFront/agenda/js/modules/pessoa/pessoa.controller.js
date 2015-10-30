(function () {
    angular
        .module('pessoa')
        .controller('PessoaController', PessoaController);

    PessoaController.$inject = ['PessoaModel', 'VisualService', '$timeout', 'LxDialogService', 'LxNotificationService'];

    function PessoaController(PessoaModel, VisualService, $timeout, LxDialogService, LxNotificationService) {
        var $scope = this;

        $scope.onclickAddUser = onclickAddUser;
        $scope.onclickEditUser = onclickEditUser;
        $scope.onclickOpenEditModal = onclickOpenEditModal;
        $scope.onclickOpenAddModal = onclickOpenAddModal;
        $scope.onclickDeleteUser = onclickDeleteUser;
        start();

        function start() {
            $scope.loading = true;
            getAll();
        }

        function getAll() {
            PessoaModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.userList = VisualService.orderList(list, 'nome');
                    $scope.loading = false;
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível obter os usuários!");
                $scope.loading = false;
            }
        }

        function insertUser(object) {
            PessoaModel.add(object, success, error);

            function success(Response) {
                $timeout(function() {
                    $scope.userList = null;
                    $scope.loading = true;
                    getAll();
                    LxDialogService.close('modalUser');
                    LxNotificationService.success("Usuario inserido com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível cadastrar o usuário!");
            }
        }

        function editUser(objectId, object) {
            PessoaModel.edit(objectId, object, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.userList.length; x < lenX; x++) {
                        if ($scope.userList[x].idUsuario === objectId) {
                            $scope.userList[x] = Response;
                            $scope.userList[x].idUsuario = objectId;
                            break;
                        }
                    }
                    $scope.userList = VisualService.orderList($scope.userList, 'nome');
                    LxDialogService.close('modalUser');
                    LxNotificationService.success("Usuario editado com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível editar o usuário!");
            }
        }

        function removeUser(objectId) {
            PessoaModel.remove(objectId, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.userList.length; x < lenX; x++) {
                        if ($scope.userList[x].idUsuario === objectId) {
                            $scope.userList.splice(x, 1);
                            break;
                        }
                    }
                    LxDialogService.close('modalUser');
                    LxNotificationService.success("Usuário removido com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível remover o usuário!");
            }
        }

        function objectEmpty() {
            $scope.object = {
                nome: "",
                login: "",
                senha: "",
                ativo: false,
                permissao: ""
            }
        }

        function validObject() {
            var valid = true;

            if (!$scope.object.ativo) {
                $scope.object.ativo = false;
            }

            if ($scope.object.nome === "") {
                valid = false;
            }

            if ($scope.object.login === "") {
                valid = false;
            }

            if ($scope.object.senha === "") {
                valid = false;
            }

            return valid;
        }

        //events
        function onclickAddUser() {
            if (validObject()) {
                $scope.modalLoading = true;
                insertUser($scope.object);
            } else {
                LxNotificationService.warning("Por favor, informe os campos obrigatórios!");
            }
        }

        function onclickEditUser() {
            if (validObject()) {
                $scope.modalLoading = true;
                editUser($scope.object.idUsuario, $scope.object);
            } else {
                LxNotificationService.warning("Por favor, informe os campos obrigatórios!");
            }
        }

        function onclickDeleteUser() {
            LxNotificationService.confirm('Deseja realmente excluir este ítem?', 'O ítem será removido da lista e não estará mais acessível.', { cancel:'Cancelar', ok:'Excluir' }, function(answer) {
                if (answer) {
                    $scope.modalLoading = true;
                    var id = $scope.object.idUsuario;
                    removeUser(id);
                }
            });
        }

        function onclickOpenAddModal() {
            $scope.modalLoading = false;
            $scope.action = "Cadastrar";
            $scope.isEdit = false;
            objectEmpty();
            LxDialogService.open('modalUser');
        }

        function onclickOpenEditModal(user) {
            $scope.modalLoading = false;
            objectEmpty();
            $scope.object = VisualService.clone(user);
            $scope.action = "Editar";
            $scope.isEdit = true;
            LxDialogService.open('modalUser');
        }
    }
})();