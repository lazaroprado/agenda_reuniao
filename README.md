# agenda_reuniao
Trabalho de conclusão de módulo da pós web e mobile 2015

OBS: O retorno em Json das consultas na minha máquina, retornam o nome do Objeto na frente. Ex.: 

{
    "usuario": [
        {
            "idUsuario": "2",
            "nome": "Fulano",
            "login": "fulano_updated",
            "senha": "2e6f9b0d5885b6010f9167787445617f553a735f",
            "email": "fulano@gmail.com",
            "ativo": "true",
            "permissao": "ROLE_ADMIN"
        }
    ]
}

Caso na sua máquina o nome do Objeto, neste caso "usuario", não venha na frente, esses arquivo devem ser alterados:

equipamento.model.js
reuniao.model.js
sala.model.js
usuario.model.js

O método que deve ser alterado é o getAll, em sua resposta. Exemplo com sala.model.js:

//Versão com o nome do Objeto:

function getAll(success, error) {
    $http({
        method: 'get',
        url: urlPath + 'all'
    }).success(function(data) {
        success(data);
    }).error(function(status) {
       error(status);
    });
}

//Versão com o nome do objeto:

function getAll(success, error) {
    $http({
        method: 'get',
        url: urlPath + 'all'
    }).success(function(data) {
        success(data.sala);
    }).error(function(status) {
       error(status);
    });
}