(function () {
    angular
        .module('reuniao')
        .controller('ReuniaoController', ReuniaoController);

    ReuniaoController.$inject = ['PessoaModel', 'ReuniaoModel', 'VisualService', '$timeout', 'LxDialogService', 'LxNotificationService'];

    function ReuniaoController(PessoaModel, ReuniaoModel, VisualService, $timeout, LxDialogService, LxNotificationService) {
        var $scope = this;

        $scope.onclickAddMeeting = onclickAddMeeting;
        $scope.onclickEditMeeting = onclickEditMeeting;
        $scope.onclickOpenEditModal = onclickOpenEditModal;
        $scope.onclickOpenAddModal = onclickOpenAddModal;
        $scope.onclickDeleteMeeting = onclickDeleteMeeting;
        start();

        function start() {
            $scope.loading = true;
            getAll();
            getAllPeople();
        }

        function getAll() {
            ReuniaoModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.meetingList = VisualService.orderList(list, 'nome');
                    $scope.loading = false;
                });
            }

            function error() {
                $scope.loading = false;
                LxNotificationService.error("Não foi possível obter as reuniões!");
            }
        }

        function getAllPeople() {
            PessoaModel.getAll(success, error);

            function success(Response) {
                $timeout(function() {
                    var list = Response;
                    $scope.attendeesList = VisualService.orderList(list, 'nome');
                    $scope.requestersList = VisualService.orderList(list, 'nome');
                });
            }

            function error() {
                LxNotificationService.error("Não foi possível obter os usuários!");
            }
        }

        function insertMeeting(object) {
            ReuniaoModel.add(object, success, error);

            function success(Response) {
                $timeout(function() {
                    $scope.meetingList = null;
                    $scope.loading = true;
                    getAll();
                    LxDialogService.close('modalMeeting');
                    LxNotificationService.success("Reunião inserida com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível cadastrar a reunião!");
            }
        }

        function editMeeting(objectId, object) {
            ReuniaoModel.edit(objectId, object, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.meetingList.length; x < lenX; x++) {
                        if ($scope.meetingList[x].idReuniao === objectId) {
                            $scope.meetingList[x] = Response;
                            $scope.meetingList[x].idReuniao = objectId;
                            break;
                        }
                    }
                    $scope.meetingList = VisualService.orderList($scope.meetingList, 'nome');
                    LxDialogService.close('modalMeeting');
                    LxNotificationService.success("Reunião editada com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível editar a reunião!");
            }
        }

        function removeMeeting(objectId) {
            ReuniaoModel.remove(objectId, success, error);

            function success(Response) {
                $timeout(function() {
                    var x, lenX;
                    for (x = 0, lenX = $scope.meetingList.length; x < lenX; x++) {
                        if ($scope.meetingList[x].idReuniao === objectId) {
                            $scope.meetingList.splice(x, 1);
                            break;
                        }
                    }
                    LxDialogService.close('modalMeeting');
                    LxNotificationService.success("Reunião removida com sucesso!");
                });
            }

            function error() {
                $scope.modalLoading = false;
                LxNotificationService.error("Não foi possível remover a reunião!");
            }
        }

        function objectEmpty() {
            $scope.object = {
                assunto: "",
                inicio: "",
                fim: "",
                solicitante: "", 
                participantes: []
            };

            $scope.fimData = "";
            $scope.fimHora = "";
            $scope.inicioData = "";
            $scope.inicioHora = "";
            $scope.selectedAttendee = [];
            $scope.selectedRequester = null;
        }

        function validObject() {
            var x, lenX, date, hour, dateComplete,
                valid = true;

            if ($scope.selectedRequester) {
                $scope.object.solicitante = {idUsuario: $scope.selectedRequester.idUsuario};
            }

            $scope.object.participantes = [];
            if ($scope.selectedAttendee) {
                for (x = 0,lenX = $scope.selectedAttendee.length; x < lenX; x++) {
                    $scope.object.participantes.push({idUsuario: $scope.selectedAttendee[x].idUsuario});
                }
            }

            if ($scope.inicioData && $scope.inicioHora) {
                date = $scope.inicioData.split("/");
                hour = $scope.inicioHora.split(":");
                if (date[0] && date[1] && date[2] && hour[0] && hour[1]) {
                    dateComplete = new Date(date[2], date[1], date[0], date[0], date[1], hour[0], hour[1]);
                    if (isNaN(dateComplete)) {
                        $scope.object.inicio = "";
                    } else {
                        $scope.object.inicio = dateComplete.toJSON();
                    }
                } else {
                    $scope.object.inicio = "";
                }
            }

            if ($scope.fimData && $scope.fimHora) {
                date = $scope.fimData.split("/");
                hour = $scope.fimHora.split(":");
                if (date[0] && date[1] && date[2] && hour[0] && hour[1]) {
                    dateComplete = new Date(date[2], date[1], date[0], date[0], date[1], hour[0], hour[1]);
                    if (isNaN(dateComplete)) {
                        $scope.object.fim = "";
                    } else {
                        $scope.object.fim = dateComplete.toJSON();
                    }
                } else {
                    $scope.object.fim = "";
                }
            }

            if ($scope.object.assunto === "") {
                valid = false;
            }

            if ($scope.object.solicitante === "") {
                valid = false;
            }

            if ($scope.object.participantes.length === 0) {
                valid = false;
            }

            return valid;
        }

        //events
        function onclickAddMeeting() {
            if (validObject()) {
                $scope.modalLoading = true;
                insertMeeting($scope.object);
            } else {
                LxNotificationService.warning("Por favor, informe os campos obrigatórios!");
            }
        }

        function onclickEditMeeting() {
            if (validObject()) {
                $scope.modalLoading = true;
                editMeeting($scope.object.idReuniao, $scope.object);
            } else {
                LxNotificationService.warning("Por favor, informe os campos obrigatórios!");
            }
        }

        function onclickDeleteMeeting(item) {
            LxNotificationService.confirm('Deseja realmente excluir este ítem?', 'O ítem será removido da lista e não estará mais acessível.', { cancel:'Cancelar', ok:'Excluir' }, function(answer) {
                if (answer) {
                    $scope.modalLoading = true;
                    var id = $scope.object.idReuniao;
                    removeMeeting(id);
                }
            });
        }

        function onclickOpenAddModal() {
            $scope.modalLoading = false;
            $scope.action = "Cadastrar";
            $scope.isEdit = false;
            objectEmpty();
            LxDialogService.open('modalMeeting');
        }

        function onclickOpenEditModal(meeting) {
            $scope.modalLoading = false;
            objectEmpty();
            $scope.object = VisualService.clone(meeting);

            var x, lenX, y, lenY, equi = [], date, minuts, hours, day, month;
            for (x = 0,lenX = $scope.object.participantes.length; x < lenX; x++) {
                for (y = 0,lenY = $scope.attendeesList.length; y < lenY; y++) {
                    if ($scope.object.participantes[x].idUsuario === $scope.attendeesList[y].idUsuario) {
                        equi.push($scope.attendeesList[y]);
                    }
                }
            }
            $scope.selectedAttendee = equi;

            for (x = 0,lenX = $scope.requestersList.length; x < lenX; x++) {
                if ($scope.object.solicitante.idUsuario === $scope.requestersList[x].idUsuario) {
                    $scope.selectedRequester = $scope.attendeesList[x];
                    break;
                }
            }

            if ($scope.object.inicio) {
                date = new Date($scope.object.inicio);
                hours = date.getHours().toString();
                if (hours.length === 1) {
                    hours = "0"+hours;
                }
                minuts = date.getMinutes().toString();
                if (minuts.length === 1) {
                    minuts = "0"+minuts;
                }
                day = date.getDate().toString();
                if (day.length === 1) {
                    day = "0"+day;
                }
                month = (date.getMonth()+1).toString();
                if (month.length === 1) {
                    month = "0"+month;
                }
                $scope.inicioData = day +"/"+ month + "/" + date.getFullYear();
                $scope.inicioHora = hours +":"+ minuts;
            }

            if ($scope.object.fim) {
                date = new Date($scope.object.fim);
                hours = date.getHours().toString();
                if (hours.length === 1) {
                    hours = "0"+hours;
                }
                minuts = date.getMinutes().toString();
                if (minuts.length === 1) {
                    minuts = "0"+minuts;
                }
                day = date.getDate().toString();
                if (day.length === 1) {
                    day = "0"+day;
                }
                month = (date.getMonth()+1).toString();
                if (month.length === 1) {
                    month = "0"+month;
                }
                $scope.fimData = day +"/"+ month + "/" + date.getFullYear();
                $scope.fimHora = hours +":"+ minuts;
            }

            $scope.action = "Editar";
            $scope.isEdit = true;
            LxDialogService.open('modalMeeting');
        }
    }
})();