/*
    Rotina que realiza a operação de visualização do registro posicionado
*/
$('#readView').on('click', function () {
    
    var $formulario = document.getElementById($nameForm1.substring(1, $nameForm1.length));
    
    var formCiclosTemp;

    var data = '';

    table = $('#tabLista').DataTable();
        
    idSelec = table.row('.selected').index();
    idPage = table.page();
    
    data = table.row(idSelec).data();

    if ($nameForm2 != '') {

        formCiclosTemp = document.getElementById($nameForm2.substring(1, $nameForm2.length));

    }

    
    if ($formulario != null) {
        dados = data;
        if ($nameForm1 === "#formUsuariosV2"){
            dados = fViewmGroup(dados['id']);
        }
        if ($nameForm1 === "#formUsuarios"){
            dados = fViewDataUser(dados['id']);
        }
        if ($nameForm1 === "#formGpAcesso"){
            dados = fViewPermGroup(dados['id']);
        }

        document.getElementById("titleForm").innerHTML = $nameTitleForm;
        formFields = $formulario.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");
        fPreencheForm(nFields, formFields, dados, true)
        if ($nameForm2 != '') {
            formFields = formCiclosTemp.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");
            fPreencheForm(nFields, formFields, dados[$nameForm2.substring(1, $nameForm2.length)], true);
        }
        $('#buttonBarForm ').empty();
        $('#buttonBarForm ').append('<button class="btn btn-danger" data-bs-toggle="modal" data-bs-dismiss="modal" id="fecharView" onclick="javascript:fcancEdit(this.id)">Fechar</button>');


        $('#formulario').modal('show');


    }


});

/*
    Rotina que realiza a operação de edição do registro posicionado
*/

$('#editRec').on('click', function () {
    
    var $formulario = document.getElementById($nameForm1.substring(1, $nameForm1.length));
    var $formCiclosTemp;
    
    table = $('#tabLista').DataTable();
    idSelec = table.row('.selected').index();
    data = table.row(idSelec).data();
    idPage = table.page();
    if ($nameForm2 != '') {
        $formCiclosTemp = document.getElementById($nameForm2.substring(1, $nameForm2.length));
    }
    
    if ($formulario != null) {
        dados = data;
        if ($nameForm1 === "#formUsuariosV2"){
            dados = fViewmGroup(dados['id']);
            
        }
        if ($nameForm1 === "#formUsuarios"){
            dados = fViewDataUser(dados['id']);
        }

        document.getElementById("titleForm").innerHTML = $nameTitleForm;

        formFields = $formulario.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");
        
        fPreencheForm(nFields, formFields, dados, false)
        
        if ($nameForm1 === "#formGpAcesso"){
            dados = fViewPermGroup(dados['id']);
        }

        if ($nameForm2 != '') {
            formFields = $formCiclosTemp.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");
            fPreencheForm(nFields, formFields, dados[$nameForm2.substring(1, $nameForm2.length)], false);
        }

        $('#buttonBarForm ').empty();
        $('#buttonBarForm ').append('<button class="btn btn-primary" data-bs-toggle="modal"  onclick="javascript:submitdata()">Confirmar</button>');
        $('#buttonBarForm ').append('<button class="btn btn-danger" data-bs-toggle="modal"  id="cancEdit" onclick="javascript:fcancEdit()">Cancelar</button>');


        $('#formulario').modal('show');

    }

    if ($formulario.name = 'fGaiTable') {
        fValidGaiolas()

    }
});

/*
    Rotina que realiza a operação de adicionar novos registros baseados no registro posicionado
*/
$('#addNew').on('click', function () {
    
    var $formulario = document.getElementById($nameForm1.substring(1, $nameForm1.length));
    
    var $formCiclosTemp;

    table = $('#tabLista').DataTable();
    idSelec = table.row('.selected').index();
    data = table.row(idSelec).data();
    idPage = table.page();
    if ($nameForm2 != '') {
        $formCiclosTemp = document.getElementById($nameForm2.substring(1, $nameForm2.length));

    }
    if ($formulario != null) {
        dados = data;
        if ($nameForm1 === "#formUsuariosV2"){
            dados = fViewmGroup(dados['id']);

        }
        if ($nameForm1 === "#formUsuarios"){
            dados = fViewDataUser(dados['id']);
        }
        document.getElementById("titleForm").innerHTML = $nameTitleForm;
        formFields = $formulario.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");

        fPreencheForm(nFields, formFields, dados, false)
        
        if ($nameForm1 === "#formGpAcesso"){
            dados = fViewPermGroup(dados['id']);
        }

        if ($nameForm2 != '') {
            formFields = $formCiclosTemp.querySelectorAll("input[type='text'] ,input[type='number'],select,input[type='checkbox'],input[type='password'],table");
            fPreencheForm(nFields, formFields, dados[$nameForm2.substring(1, $nameForm2.length)], false);
        }

        $('#buttonBarForm ').empty();
        $('#buttonBarForm ').append('<button class="btn btn-primary" data-bs-toggle="modal"  onclick="javascript:fCadastrarform()">Confirmar</button>');
        $('#buttonBarForm ').append('<button class="btn btn-danger" data-bs-toggle="modal"  id="cancEdit" onclick="javascript:fcancEdit()">Cancelar</button>');


        $('#formulario').modal('show');


    }



});

/*
    Rotina que realiza a operação de exclusão do registro selecionado
*/
$('#deleteRec').on('click', function () {
    table = $('#tabLista').DataTable();
    idSelec = table.row('.selected').index();
    data = table.row(idSelec).data();

    idPage = table.page();

    var c = confirm("Deseja excluir o registro " + data[$idColumn] + "?");

    if (c) {

        fExcluiRegs(data[$idColumn]);
        idSelec = null;

    }
});

/*
    Limpeza de itens selecionados no grid principal
*/
$("#closeModal").on('click', function () {
    idSelec = null;
    idPage = null;
})

/*
Função que carrega os dados do fomulário de usuários v1
*/
function fViewDataUser(idUser){
    var dados;
    fvalidUsertoken("Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel.");
    
    $.ajax({
        type: "GET",
        url: server + '/v1/users/byId/'+idUser,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        
        headers: {
            'Authorization': 'Bearer ' + $token
            },
            cache: false,
        success: function(data) {
            dados = data;  
            
        },
        error: function(response) {
            alert('ocorreu um erro ao tentar carregar os dados do usuário, favor tentar mais tarde.');
            return   ret = false;
        }
    });
    return dados;
}
/*
Função de Carregamento de Grupos
*/
function fViewPermGroup(idGroup){
    var dados;
    fvalidUsertoken("Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel.");
    
    $.ajax({
        type: "GET",
        url: server + '/v1/gpaccess/'+idGroup,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        
        headers: {
            'Authorization': 'Bearer ' + $token
            },
            cache: false,
        success: function(data) {
            dados = data;  
            
        },
        error: function(response) {
            alert('ocorreu um erro ao tentar carregar os dados do usuário, favor tentar mais tarde.');
            return   ret = false;
        }
    });
    
    return dados;
}
/*
Função de Carregamento de Grupos com base no usuário posicionado
*/
function fViewmGroup(idUser){
    var dados;
    fvalidUsertoken("Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel.");
    
    $.ajax({
        type: "GET",
        url: server + '/v2/users/byId/'+idUser,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        
        headers: {
            'Authorization': 'Bearer ' + $token
            },
            cache: false,
        success: function(data) {
            dados = data;  
            
        },
        error: function(response) {
            alert('ocorreu um erro ao tentar carregar os dados do usuário, favor tentar mais tarde.');
            return   ret = false;
        }
    });
    
    return dados;
}