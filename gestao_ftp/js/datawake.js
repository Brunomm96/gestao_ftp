/**
 * 
 * VARIÁVEIS DE CONTROLE
 */

var username =
  username == undefined ? sessionStorage.getItem("username") : username;
var valInicial = 0;
var password =
  password == undefined ? sessionStorage.getItem("password") : password;
var permissoes = "";
var dadosfull;
var idSelec;
var idPage;
var nFields, formFields;
var $nameForm1;
var $nameForm2;
var $nameTitleForm = "";
// var server = "http://localhost:9325/api";//"https://datawake-api.paranoa.com.br:82/api/v1/"; //
// var logServer = 'http://localhost:9325/'//"https://datawake-api.paranoa.com.br:82/";  //
var server = "https://datawake-api.paranoa.com.br:82/api";//"https://datawake-api.paranoa.com.br:82/api/v1/"; //
var logServer = "https://datawake-api.paranoa.com.br:82/"; //"https://datawake-api.paranoa.com.br:82/";  //
var table;
var acao = acao == undefined ? sessionStorage.getItem("acao") : acao;
var $User =
  $User == undefined ? JSON.parse(sessionStorage.getItem("users")) : $User;
var functionValid;
var path;
var $idColumn;
var $token = $token == undefined ? sessionStorage.getItem("token") : $token;
var $permissoes =
  $permissoes == undefined
    ? JSON.parse(sessionStorage.getItem("permissoes"))
    : $permissoes;

const formActionsInputTypes = `input[type='text'], input[type='radio'], input[type='number'], input[type='month'], input[type='date'], select, input[type='checkbox'], input[type='password'], table`;


/**
 * FUNÇÃO DE PADRÃO DE CARGA DE FORMULÁRIO 
 */
function formDefault() {
  $("#pageContent").empty();
  estrutura = '    <div class="table-striped" id="modalList">';
  estrutura +=
    '    <table class="display responsive nowrap" style="width:100%" id="tabLista" name="tabLista">';
  estrutura += "        <thead>";
  estrutura += "        </thead>";
  estrutura += "    </table>";
  estrutura += "</div>";
  estrutura += '<div class="row">';

  estrutura +=
    ' <div class="col">   <button type="button" class="btn btn-success" id="addNew" >Adicionar novo</button>';
  estrutura +=
    '    <button type="button" class="btn btn-outline-dark" id="readView" disabled>Visualizar</button>';
  estrutura +=
    '    <button type="button" class="btn btn-outline-dark" id="editRec" disabled>Editar Registro</button>';
  estrutura +=
    '    <button type="button" class="btn btn-outline-dark" id="deleteRec" disabled>Excluir Registro</button>';
  //estrutura += '    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Fechar</button>';
  estrutura += "</div>";
  estrutura +=
    '    <div class="col alert alert-success" role="alert" id="alertRegSelec" name="alertRegSelec">';
  estrutura +=
    "        Selecione um registro para liberar o acesso as ações dos botões.";
  estrutura += "    </div>";
  estrutura += "</div>";
  estrutura += '<div class="modal" id="formulario">';
  estrutura +=
    '    <div class="modal-dialog modal-dialog modal-fullscreen modal-dialog-scrollable" id="modalGeral" aria-hidden="true" aria-labelledby="modalGeral" tabindex="-1">';

  estrutura += '        <div class="modal-content custom-form">';
  estrutura += '            <div class="modal-header">';
  estrutura +=
    '                <h5 class="modal-title" id="titleForm">Formulário</h5>';
  estrutura +=
    '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
  estrutura += "            </div>";
  estrutura += '            <div class="modal-body" id="formQuest">';
  estrutura += "            </div>";
  estrutura += '            <div class="modal-footer" id="buttonBarForm">';
  estrutura += "            </div>";
  estrutura += "        </div>";
  estrutura += "    </div>";
  estrutura += "</div>";
  estrutura += '<script src="js/datawakeFormsActions.js"></script>';
  estrutura + '<script>table = $("#tabLista").DataTable();</script>'
  /*estrutura += '<script>var tables = document.querySelectorAll("table"); ';
  estrutura += 'for(var nTables=0;nTables < tables.length;nTables++){';
  estrutura += 'if ($.fn.dataTable.isDataTable( "#"+tables[nTables].id ) ){'
  estrutura += '$("#"+tables[nTables].id).DataTable( {';
  estrutura += 'responsive: true,';
  estrutura += 'colReorder: true';
  estrutura += '} );';
  estrutura += '}';
  estrutura += '} </script>';*/
  $("#pageContent").append(estrutura);
};
/**
 * LIBERAÇÃO OU NÃO DE EDIÇÃO DO CAMPO DA GAIOLA
 */
function fWhen(combo, fieldBlock, validacao, mudaval) {
  var field = document.getElementById(fieldBlock);

  if (combo.value === validacao) {
    field.readOnly = false;

  } else {
    field.readOnly = true;

  }
  if (mudaval && valInicial != combo.value) {
    field.value = 0;
  }
}

/*
CARREGA O CONTEÚDO DA PÁGINA DENTRO DO COMPONENTE
*/
function loadPage(page, id, componente, link, iframe, titleHeader) {
  if (titleHeader != "ALTERACAO") {
    idSelec = null;
    idPage = null;
  }
  if (
    titleHeader != undefined &&
    titleHeader != "ALTERACAO" &&
    document.getElementById("cabecalhoTitulo") != undefined &&
    document.getElementById("cabecalhoTitulo") != null
  ) {
    document.getElementById("cabecalhoTitulo").innerHTML = titleHeader.replace(
      /-/g,
      " "
    );
  }
  if (id != null) {
    switch ((id.substring(id.lastIndexOf("/") + 1)).toUpperCase()) {
      case "DASH":
        $("#" + componente).empty();
        var iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.className = "responsive-iframe";

        document.getElementById(componente).appendChild(iframe);
        break;
      case "MANGUEIRAS":
        sessionStorage.setItem("acao", id);
        formDefault();
        formMangueira();
        break;
      case "TPO":
        sessionStorage.setItem("acao", id);
        formDefault();

        formTPO();
        break;
      case "GAIOLAS":
        sessionStorage.setItem("acao", id);
        formDefault();

        formGaiolas();
        break;
      case "APQP":
        sessionStorage.setItem("acao", id);
        formDefault();

        formAPQP();
        break;

      case "FORMAUDITESCDIG":
        sessionStorage.setItem("acao", id);
        formDefault();

        formAuditoriaEscalonadaDigital();
        break;

      case "FLUXOCAIXA":
        sessionStorage.setItem("acao", id);
        formDefault();

        formFluxoCaixa();
        break;
      case "CONSUMOENERGIAAGUA":
        sessionStorage.setItem("acao", id);
        formDefault();

        formConsumoEnergiaAgua();
        break;
      case "PPAP":
        sessionStorage.setItem("acao", id);
        formDefault();

        formPPAP();
        break;

      case "CONTROLERECLAMACOES":
        sessionStorage.setItem("acao", id);
        formDefault();

        formControleReclamacoes();
        break;

      case "LABFISICO":
        sessionStorage.setItem("acao", id);
        formDefault();

        formLabFisico();
        break;
      case "FTPTPO":
        sessionStorage.setItem("acao", id);
        formDefault();

        formFtpTpo();
        break;
      case "HIDRANTE":
        sessionStorage.setItem("acao", id);
        formDefault();

        formHidrante();
        break;
      case "PARADAS":
        sessionStorage.setItem("acao", id);
        formDefault();

        formParadas();
        break;
      case "FORMPU":
        sessionStorage.setItem("acao", id);
        formDefault();

        formPU();
        break;
      case "PERMISSÕES":
        sessionStorage.setItem("acao", id);
        formDefault();

        formPermissoes();
        break;
      case "UNIDADEPRODUCAO":
        sessionStorage.setItem("acao", id);
        formDefault();

        formUnidProd();
        break;
      case "USUÁRIOS":
        sessionStorage.setItem("acao", id);
        formDefault();

        formUsuarios();
        break;
      case "USUÁRIOS_V2":
        sessionStorage.setItem("acao", id);
        formDefault();

        formUsuariosV2();
        break;
      case "GPACESSO":
        sessionStorage.setItem("acao", id);
        formDefault();

        formGpAcessos();
        break;
      default:
        $("#" + componente).load(page);
    }
  }
}

/*
MODIFICA O VALOR DO COMPONENTE COM BASE NO COMPONENTE RANGE
*/
function showVal(newVal, idcomponente) {
  document.getElementById(
    idcomponente.substring(0, idcomponente.length - 6)
  ).value = newVal;
}

/*
MODIFICA O VALOR DO COMPONENTE COM BASE NO COMPONENTE CAMPO
*/
function fValRange(newVal, idComponente) {
  newVal = newVal === "" ? "0" : newVal;
  newVal = parseInt(newVal);

  document.getElementById(idComponente).value = newVal;
}

/*
    ENVIA DADOS DE CADASTRO PARA REST
*/
function submitdata(nCont) {
  var $formulario = $($nameForm1);
  var $formCiclosTemp;

  var dados = getFormData($formulario, "PUT");
  var data = "";
  var ret;
  if ($nameForm2 != "" && permissoes === "") {
    $formCiclosTemp = $($nameForm2);
    dados[$nameForm2.substring(1, $nameForm2.length)] = getFormData(
      $formCiclosTemp,
      "PUT"
    );
  }
  if (permissoes != "") {
    dados[$nameForm2.substring(1, $nameForm2.length)] = $permissoes;
  }
  data = JSON.stringify(dados);
  acao = sessionStorage.getItem("acao");
  $.ajax({
    type: "PUT",
    data: data,
    url: server + path,
    dataType: "json",
    async: false,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + $token,
    },
    success: function (data) {
      alert("Alteração realizada com Sucesso!");
      $("#formulario").modal("hide");
      loadPage("forms.html", acao, "pageContent", "", "", "ALTERACAO");
    },
    error: function (response) {
      if (nCont > 3 || response.status != 403) {
        alert(
          "ocorreu um erro ao tentar salvar o formulário, favor enviar o erro para o IC. " +
          response.status
        );
        ret = false;
      } else {
        if (response.status == 403) {
          ret = response.status;
        }
      }
    },
  });
  if (ret === 403) {
    fvalidUsertoken(
      "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
    );
    submitdata(nCont++);
  }
}

/*
FUNÇÃO QUE LÊ O FORMULÁRIO E RETORNA OS VALORES DE TODOS OS COMPONENTES
EM FORMATO DE JSON.
*/
function getFormData(form, evento) {
  var unindexed_array = form.serializeArray();
  var indexed_array = {};

  var subarray = {};

  var camposDiff =
    " modoAquecimento / controleAlturaBalao / controleFornoInferior ";

  var camposString =
    "observacao \
    / geralEmbalagemTipo \
    / responsavel \
    / cliente \
    / unidade_Negocio \
    / tipo_Projeto \
    / tipo_Evento \
    / status_Projeto \
    / tipo_Desvio \
    / tamanho \
    / fechamento \
    / planta \
    / pino \
    / tierline \
    / customer \
    / business \
    / level_current \
    / mes \
    / analista_Responsavel \
    / reclamacao_oficial \
    / reincidencia \
    / contratacao_Empresaterceira \
    / procede \
    / gp12 \
    / classificacao_Reclamacao \
    / solicitacao_Cs1_U_Cs2 \
    / itens_Seguranca \
    / savType \
    / responsible \
    / prolongEndDate \
    ";

  if (form[0].id === "permission" || form[0].id === "gpAccess") {
    indexed_array = [];
  }
  $.map(unindexed_array, function (n, i) {
    if (
      n["value"] != "" &&
      document.getElementsByName(n["name"])[0].id.substring(0, 1) != "8"
    ) {
      if (
        document.getElementsByName(n["name"])[0].className === "form-select"
      ) {
        if (camposDiff.indexOf(n["name"]) > -1) {
          indexed_array[n["name"]] = parseInt(n["value"]);
        } else if (camposString.indexOf(n["name"]) > -1) {
          indexed_array[n["name"]] = n["value"];
        } else {
          indexed_array[n["name"]] = n["value"] === "1" ? true : false;
        }
      } else if (document.getElementsByName(n["name"])[0].type === "checkbox") {
        if (indexed_array.valueOf.length === 0) subarray.id = n["value"];
        indexed_array.push(subarray);

        subarray = {};
      } else if (n["name"].indexOf('_length') >= 0) {
        registros = $('#' + n["name"].substr(0, n["name"].indexOf('_length'))).DataTable().rows().data().length;
        for (var nReg = 0; nReg < registros; nReg++) {
          subarray = $('#' + n["name"].substr(0, n["name"].indexOf('_length'))).DataTable().row(nReg).data();
          indexed_array.push(subarray);
        }
      } else if (document.getElementsByName(n["name"])[0].type === "number") {
        if (parseFloat(n["value"]) === n["value"]) {
          indexed_array[n["name"]] = n["value"];
        } else {
          indexed_array[n["name"]] = parseFloat(n["value"]);
        }
      } else {
        indexed_array[n["name"]] = n["value"];
      }
    }
  });
  if (evento === "POST") {
    delete indexed_array["id"];
  }

  return indexed_array;
}
/*
    FUNÇÃO DE INICIALIZAÇÃO DA TABELA DE GRID
*/
function fInitTbl(thedata, tipTable) {
  var data;

  $("#tabLista > thead").empty();
  $("#tabLista > tbody").empty();

  $("#tabLista thead").append("<tr>");
  switch (tipTable) {
    case "GAIOLA":
      $("#tabLista thead tr").append("<th>Tag</th>");
      $("#tabLista thead tr").append("<th>Observacao</th>");
      $("#tabLista thead tr").append("<th>Tara</th>");
      aStruct = [
        {
          data: "tag",
        },
        {
          data: "observacao",
        },
        {
          data: "tara",
        },
      ];
      break;
    case "TPO":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Cód. Cli 01</th>");
      $("#tabLista thead tr").append("<th>Cód. Cli 02</th>");
      $("#tabLista thead tr").append("<th>Cód. Cli 03</th>");
      $("#tabLista thead tr").append("<th>Cliente</th>");
      $("#tabLista thead tr").append("<th>Produto 01</th>");
      $("#tabLista thead tr").append("<th>Produto 02</th>");
      $("#tabLista thead tr").append("<th>Produto 03</th>");
      $("#tabLista thead tr").append("<th>Projeto</th>");
      aStruct = [
        {
          data: "id",
        },
        {
          data: "cliente01",
        },
        {
          data: "cliente02",
        },
        {
          data: "cliente03",
        },
        {
          data: "cliente",
        },
        {
          data: "produto01",
        },
        {
          data: "produto02",
        },
        {
          data: "produto03",
        },
        {
          data: "projeto",
        },
      ];
      break;
    case "MANG":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Pi</th>");
      $("#tabLista thead tr").append("<th>Ferr. Malhadeira TP Agulha</th>");
      $("#tabLista thead tr").append("<th>Tipo Embalagem</th>")
      $("#tabLista thead tr").append("<th>Tubo Cód Compost</th>");
      $("#tabLista thead tr").append("<th>Malhadeira TP Fio</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "pi",
        },
        {
          data: "ferramentaMalhadeiraTipoAgulha",
        },
        {
          data: "geralEmbalagemTipo",
        },
        {
          data: "tuboCodigoComposto",
        },
        {
          data: "malhadeiraTipoFio",
        },
      ];
      break;
    case "PERMISSOES":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Descrição</th>");
      $("#tabLista thead tr").append("<th>Descr. Menu</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "description",
        },
        {
          data: "descriptionMenu",
        },
      ];
      break;
    case "USERS":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Nome</th>");
      $("#tabLista thead tr").append("<th>email</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "name",
        },
        {
          data: "email",
        },
      ];
      break;
    case "GPACESSO":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Nome do Grupo</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "description",
        },
      ];
      break;
    case "PARADAS":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Descrição da Parada</th>");

      aStruct = [
        {
          data: "cod_parada",
        },
        {
          data: "desc_parada",
        },
      ];
      break;
    case "FORMPU":
      $("#tabLista thead tr").append("<th>Produto</th>");
      $("#tabLista thead tr").append("<th>Nro Molde</th>");
      $("#tabLista thead tr").append("<th>Tamanho</th>");
      $("#tabLista thead tr").append("<th>Pino</th>");
      $("#tabLista thead tr").append("<th>Fechamento</th>");

      aStruct = [
        {
          data: "produto",
        },
        {
          data: "nro_molde",
        },
        {
          data: "tamanho",
        },
        {
          data: "pino",
        },
        {
          data: "fechamento",
        },
      ];
      break;
    case "FORMAPQP":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Responsavel</th>");
      $("#tabLista thead tr").append("<th>Código Paranoá</th>");
      $("#tabLista thead tr").append("<th>Cliente</th>");
      $("#tabLista thead tr").append("<th>Código Cliente</th>");
      $("#tabLista thead tr").append("<th>Nome do Projeto</th>");
      $("#tabLista thead tr").append("<th>Unidade de Negócio</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "responsavel",
        },
        {
          data: "codigo_Paranoa",
        },
        {
          data: "cliente",
        },
        {
          data: "codigo_Cliente",
        },
        {
          data: "nome_Projeto",
        },
        {
          data: "unidade_Negocio",
        },
      ];
      break;

    case "FORMAUDITESCDIG":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Data</th>");
      $("#tabLista thead tr").append("<th>Nome do Auditor</th>");
      $("#tabLista thead tr").append("<th>Nome do Auditado</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "dataa",
        },
        {
          data: "nomeAuditor",
        },
        {
          data: "nomeAuditado",
        },
      ];
      break;

    case "FLUXOCAIXA":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Tipo de SAV</th>");
      $("#tabLista thead tr").append("<th>Responsável</th>");
      $("#tabLista thead tr").append("<th>SAV</th>");
      $("#tabLista thead tr").append("<th>Título do Projeto</th>");
      $("#tabLista thead tr").append("<th>Cliente</th>");
      $("#tabLista thead tr").append("<th>Mês/Ano</th>");
      $("#tabLista thead tr").append("<th>Projeção de gastos</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: 'savType'
        },
        {
          data: "responsible",
        },
        {
          data: "sav",
        },
        {
          data: "projectTitle",
        },
        {
          data: "client",
        },
        {
          data: "monthYear",
        },
        {
          data: "expenditureProjection",
        },
      ];
      break;

    case "CONSUMOENERGIAAGUA":
      $("#tabLista thead tr").append("<th>Mês/Ano</th>");
      $("#tabLista thead tr").append("<th>Qtd de Multas</th>");
      aStruct = [
        {
          data: 'mesAno'
        },
        {
          data: "qtdMulta",
        },

      ];
      break;

    case "FORMPPAP":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>CLIENTE</th>");
      $("#tabLista thead tr").append("<th>NOME DO PROJETO</th>");
      $("#tabLista thead tr").append("<th>SETOR</th>");
      $("#tabLista thead tr").append("<th>CÓDIGO DO CLIENTE</th>");
      $("#tabLista thead tr").append("<th>CÓDIGO PARANOÁ</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "customer",
        },
        {
          data: "project_Name",
        },
        {
          data: "business",
        },
        {
          data: "customer_Code",
        },
        {
          data: "paranoa_Code",
        },

      ];
      break;

    case "FORMCONTROLE":
      $("#tabLista thead tr").append("<th>Item</th>");
      $("#tabLista thead tr").append("<th>Mês</th>");
      $("#tabLista thead tr").append("<th>Analista Responsável</th>");
      $("#tabLista thead tr").append("<th>Cliente</th>");
      $("#tabLista thead tr").append("<th>Código da Peça Cliente</th>");
      $("#tabLista thead tr").append("<th>Código da Peça Paranoá</th>");

      aStruct = [
        {
          data: "item",
        },
        {
          data: "mes",
        },
        {
          data: "analista_Responsavel",
        },
        {
          data: "cliente",
        },
        {
          data: "codigo_Peca_Cliente",
        },
        {
          data: "codigo_Peca_Paranoa",
        },

      ];
      break;

    case "FORMLAB":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Nome Norma</th>");
      $("#tabLista thead tr").append("<th>Revisão Norma</th>");
      $("#tabLista thead tr").append("<th>Cliente</th>");
      $("#tabLista thead tr").append("<th>Temperatura Liquido</th>");
      $("#tabLista thead tr").append("<th>Temperatura Camara</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "nomeNorma",
        },
        {
          data: "revisaoNorma",
        },
        {
          data: "nomeCliente",
        },
        {
          data: "temperaturaLiquido",
        },
        {
          data: "temperaturaCamara",
        },
      ];
      break;

    case "FORMHIDRANTE":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Responsável</th>");
      $("#tabLista thead tr").append("<th>Hidrante Nº</th>");
      $("#tabLista thead tr").append("<th>Localização</th>");
      $("#tabLista thead tr").append("<th>Validade</th>");
      $("#tabLista thead tr").append("<th>Dia da Vistoria</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "responsavel",
        },
        {
          data: "hidrante_N",
        },
        {
          data: "localizacao",
        },
        {
          data: "validade",
        },
        {
          data: "dia_Vistoria",
        },
      ];
      break;
    case "UNIDPROD":
      $("#tabLista thead tr").append("<th>ID</th>");
      $("#tabLista thead tr").append("<th>Id Pai</th>");
      $("#tabLista thead tr").append("<th>Codigo</th>");
      $("#tabLista thead tr").append("<th>Nome</th>");
      $("#tabLista thead tr").append("<th>Abreviação</th>");
      $("#tabLista thead tr").append("<th>Descrição</th>");

      aStruct = [
        {
          data: "id",
        },
        {
          data: "idOver",
        },
        {
          data: "code",
        },
        {
          data: "name",
        },
        {
          data: "abbreviation",
        },
        {
          data: "description",
        },
      ];
      break;
    case "FTPTPO":
      $("#tabLista thead tr").append("<th>Produto</th>");
      $("#tabLista thead tr").append("<th>Programa Injetora Peça Inteira</th>");

      aStruct = [
        {
          data: "smt_produto",
        },
        {
          data: "smt_programa_injetora",
        },
      ];
      break;
  }

  table = $("#tabLista").DataTable({
    colReorder: true,
    responsive: true,
    data: thedata,
    columnDefs: [
      {
        defaultContent: " ",
        targets: "_all",
      },
    ],
    columns: aStruct,
    select: true,
  });
  dadosfull = thedata;

  if (idPage != "" && idPage != undefined) {
    table.page(idPage).draw(false);
  }
  if (idSelec != "" && idSelec != undefined) {
    table.row(idSelec).select();
    document.getElementById("alertRegSelec").style.display = "none";
    data = table.row(this).data();

    document.getElementById("editRec").disabled = false;
    document.getElementById("editRec").className = "btn btn-primary";
    document.getElementById("deleteRec").disabled = false;
    document.getElementById("deleteRec").className = "btn btn-danger";
    document.getElementById("readView").disabled = false;
    document.getElementById("readView").className = "btn btn-warning";
  }
  table.on("deselect", function (e, dt, type, indexes) {
    document.getElementById("alertRegSelec").style.display = "block";

    table[type](indexes).nodes().to$().removeClass(".selected");
    document.getElementById("editRec").disabled = true;
    document.getElementById("editRec").className = "btn btn-outline-dark";
    document.getElementById("deleteRec").disabled = true;
    document.getElementById("deleteRec").className = "btn btn-outline-dark";
    document.getElementById("readView").disabled = true;
    document.getElementById("readView").className = "btn btn-outline-dark";

  });
  table.on("select", function (e, dt, type, indexes) {
    document.getElementById("alertRegSelec").style.display = "none";
    data = table.row(indexes).data()

    document.getElementById("editRec").disabled = false;
    document.getElementById("editRec").className = "btn btn-primary";
    document.getElementById("deleteRec").disabled = false;
    document.getElementById("deleteRec").className = "btn btn-danger";
    document.getElementById("readView").disabled = false;
    document.getElementById("readView").className = "btn btn-warning";
  });
}

/** 
 * Função principal de consulta de dados e apresentação no grid principal dos formulários
*/
function fRetRegs(size, nCont) {
  var thedata;
  var ret;
  var url = server + path;
  if (size != null && size != "" && size != undefined) {
    url += "?size=" + size.toString();
  }
  fvalidUsertoken(
    "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
  );
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    async: false,
    contentType: "application/json",

    headers: {
      Authorization: "Bearer " + $token,
    },
    success: function (data) {
      thedata = data;
      ret = thedata;
    },
    cache: false,
    error: function (response) {
      if (nCont > 3) {
        alert(
          "Ocorreu um problema na sua aplicação, tente novamente e caso o problema persista, favor contactar a equipe do IC."
        );
        ret = false;
      } else {
        if (response.status == 403) {
          ret = response.status;
        }
      }
    },
  });

  return ret;
}
/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE GRUPO DE ACESSO
 */
function formGpAcessos() {
  modalGeneralista = document.getElementById("modalGeral");
  modalGeneralista.className = " modal-dialog modal-xl modal-dialog-scrollable"; //modal-dialog-centered modal-dialog-scrollable
  $nameTitleForm = "Cadastro de Grupo de Acessos";
  path = "/v1/gpaccess";
  thedata = fRetRegs(null);
  $nameForm1 = "#formGpAcesso";
  $nameForm2 = "#permission";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "GPACESSO");
    }
    loadPage(getHost() + "/formGpAcessos.html", "1", "formQuest");
  }
}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE USUÁRIOS V1
 */
function formUsuarios() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Cadastro de usuarios";
  path = "/v1/users";
  thedata = fRetRegs(null);
  $nameForm1 = "#formUsuarios";
  $nameForm2 = "#permission";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "USERS");
    }
    loadPage(getHost() + "/formUsuarios.html", "1", "formQuest");
  }
}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE USUÁRIOS V2
 */
function formUsuariosV2() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Cadastro de usuarios";
  path = "/v2/users";
  thedata = fRetRegs(null);
  $nameForm1 = "#formUsuariosV2";
  $nameForm2 = "#gpAccess";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "USERS");
    }
    loadPage(getHost() + "/formUsuarios_v2.html", "1", "formQuest");
  }
}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE PERMISSÕES
 */
function formPermissoes() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Formulário de Cadastro de Permissões";
  path = "/v1/permissions";
  thedata = fRetRegs(null);
  $nameForm1 = "#permission";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";
  modalGeneralista.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";
  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "PERMISSOES");
    }
    loadPage(getHost() + "/formPermissoes.html", "1", "formQuest");
  }
}

function formUnidProd() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Formulário de Cadastro de Unidade de Produção";
  path = "/v1/ftpunidadeproducao";
  thedata = fRetRegs(null);
  $nameForm1 = "#formUnidProd";
  $nameForm2 = "";
  functionValid = "fValidUnidProd";
  $idColumn = "id";
  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "UNIDPROD");
    }
    loadPage(getHost() + "/formUnidadeProducao.html", "1", "formQuest");
  }
}
/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE GAIOLAS
 */
function formGaiolas() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Formulário Cadastro de Gaiolas/Caixas";
  path = "/v1/ftpgaiolas";
  thedata = fRetRegs(null);
  $nameForm1 = "#formGaiolas";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "tag";
  modalGeneralista.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";
  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "GAIOLA");
    }
    loadPage(getHost() + "/formGaiolas.html", "1", "formQuest");
  }
}
/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE PARADAS
 */
function formParadas() {
  modalGeneralista = document.getElementById("modalGeral");

  $nameTitleForm = "Cadastro de Paradas";
  path = "/v1/ftpparadas";
  thedata = fRetRegs(null);
  $nameForm1 = "#formParadas";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "cod_parada";
  modalGeneralista.className =
    "modal-dialog modal-dialog-centered modal-dialog-scrollable";
  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "PARADAS");
    }

    loadPage(getHost() + "/formParadas.html", "1", "formQuest");
  }
}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE MANGUEIRAS
 */
function formMangueira() {
  $nameTitleForm = "Formulário Cadastro de Mangueiras";
  path = "/v1/ftpmangueiraspec";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formSpecMangueira";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "MANG");
    }
  }

  loadPage(getHost() + "/formMang.html", "", "formQuest");
}

function formFtpTpo() {
  $nameTitleForm = "Formulário Cadastro do TPO";
  path = "/v1/ftptpo";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formFtpTpo";
  $nameForm2 = "";
  $idColumn = "smt_produto";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FTPTPO");
    }
  }

  loadPage(getHost() + "/formFtpTpo.html", "", "formQuest");
}

function formAPQP() {
  $nameTitleForm = "Formulário APQP";
  path = "/v1/ftpapqp";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formAPQP";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMAPQP");
    }
    loadPage(getHost() + "/formAPQP.html", "", "formQuest");
  }
}

function formAuditoriaEscalonadaDigital() {
  $nameTitleForm = "Formulário de Auditoria Escalonada Digital";
  path = "/v1/ftp_auditoria_escalonada_digital";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formAuditoriaEscalonadaDigital";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMAUDITESCDIG");
    }
    loadPage(getHost() + "/formAuditoriaEscalonadaDigital.html", "", "formQuest");
  }
}

function formFluxoCaixa() {
  $nameTitleForm = "Fluxo de Caixa";
  path = "/v1/ftpfluxodecaixa";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formFluxoCaixa";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FLUXOCAIXA");
    }
    loadPage(getHost() + "/formFluxoCaixa.html", "", "formQuest");
  }
}

function formConsumoEnergiaAgua() {
  $nameTitleForm = "Consumo de energia e Agua";
  path = "/v1/ftpconsumoenergiaagua";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formConsumoEnergiaAgua";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "CONSUMOENERGIAAGUA");
    }
    loadPage(getHost() + "/formConsumoEnergiaAgua.html", "", "formQuest");
  }
}
function formPPAP() {
  $nameTitleForm = "Formulário PPAP";
  path = "/v1/ftpppap";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formPPAP";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMPPAP");
    }
    loadPage(getHost() + "/formPPAP.html", "", "formQuest");
  }
}

function formLabFisico() {
  $nameTitleForm = "Laborátorio Fisico";
  path = "/v1/ftplabfisico";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formLabFisico";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMLAB");
    }
    loadPage(getHost() + "/formLabFisico.html", "", "formQuest");
  }
}

function formControleReclamacoes() {
  $nameTitleForm = "Controle Reclamações";
  path = "/v1/ftpcontrolereclamacoes";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formControleReclamacoes";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "item";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMCONTROLE");
    }
    loadPage(getHost() + "/formControleReclamacoes.html", "", "formQuest");
  }
}

function formHidrante() {
  $nameTitleForm = "Formulário Vistoria Hidrante/Mangueira";
  path = "/v1/ftphidrante";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formHidrante";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "id";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMHIDRANTE");
    }
    loadPage(getHost() + "/formHidrante.html", "", "formQuest");
  }
}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE PU
 */
function formPU() {
  $nameTitleForm = "Formulário de PU";
  path = "/v1/ftppu";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formPU";
  $nameForm2 = "";
  functionValid = "";
  $idColumn = "produto";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "FORMPU");
    }
    loadPage(getHost() + "/formPU.html", "", "formQuest");
  }
}

/**
 * TRECHO DE CHECAGEM E IDENTIFICAÇÃO DE CLIQUE NA LINHA DA TABELA
 */
if (
  document.getElementById("tabLista") != "undefined" &&
  document.getElementById("tabLista") != null
) {
  $("#tabLista tbody").on("click", "tr", function () {
    data = table.row(this).data();
  });

}

/**
 * FUNÇÕES ATRELADAS AOS FORMULÁRIOS FIXOS DE CADASTRO DE TPO
 */
function formTPO() {

  $nameTitleForm = "Formulário TermoFormadora TPO";
  path = "/v1/ftptpotermo";
  thedata = fRetRegs(null, 0);
  $nameForm1 = "#formTermoTPO";
  $nameForm2 = "#temposCiclo";
  functionValid = "";
  $idColumn = "id";
  // modalGeneralista.className = "modal-dialog  modal-fullscreen modal-dialog-scrollable";

  if (typeof thedata != "boolean") {
    thedata =
      thedata["totalElements"] > thedata["size"]
        ? fRetRegs(thedata["totalElements"])
        : thedata;
    if (typeof thedata != "boolean") {
      fInitTbl(thedata.content, "TPO");
    }

    loadPage(getHost() + "/formTpo.html", "1", "formQuest");
  }
}

/**
 * CARGA DE CHECKS NO CADASTRO DE USUARIO
 */
function fBuildingCheck(cIdPar, cIdImpar) {
  //CARREGA AS POSSÍVEIS PERMISSÕES
  fvalidUsertoken(
    "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
  );
  var theDtPermissions = fRetPermissions(null);
  itemPar = "";
  itemImpar = "";

  if (typeof theDtPermissions != "boolean") {
    theDtPermissions =
      theDtPermissions["totalElements"] > theDtPermissions["size"]
        ? fRetPermissions(theDtPermissions["totalElements"])
        : theDtPermissions;
  }

  if (theDtPermissions.content.length > 0) {
    for (
      nPermissions = 0;
      nPermissions < theDtPermissions.content.length;
      nPermissions++
    ) {
      if (nPermissions % 2 == 0) {
        itemPar += '<div class="form-check" >';
        itemPar +=
          '<input class="form-check-input" type="checkbox" value="' +
          theDtPermissions.content[nPermissions]["id"] +
          '" name="description" id="' +
          theDtPermissions.content[nPermissions]["description"] +
          '">';
        itemPar += '<label class="form-check-label" for="flexCheckDefault">';
        itemPar += theDtPermissions.content[nPermissions]["descriptionMenu"];
        itemPar += "</label>";
        itemPar += "</div>";
      } else {
        itemImpar += '<div class="form-check" >';
        itemImpar +=
          '<input class="form-check-input" type="checkbox" value="' +
          theDtPermissions.content[nPermissions]["id"] +
          '" name="' +
          theDtPermissions.content[nPermissions]["description"] +
          '" id="' +
          theDtPermissions.content[nPermissions]["description"] +
          '">';
        itemImpar += '<label class="form-check-label" for="flexCheckDefault">';
        itemImpar += theDtPermissions.content[nPermissions]["descriptionMenu"];
        itemImpar += "</label>";
        itemImpar += "</div>";
      }
    }
  }

  $("#" + cIdPar).html(itemPar);
  $("#" + cIdImpar).html(itemImpar);
}
/** 
 * RETORNA TODAS AS PERMISSÕES
*/
function fRetPermissions(nQuant) {
  var path2 = "";
  var dados;
  if (nQuant != null && nQuant != "" && nQuant != undefined) {
    path2 += "?size=" + nQuant.toString();
  }
  $.ajax({
    type: "GET",
    url: server + "/v1/permissions" + path2,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    cache: false,
    success: function (data) {
      dados = data;
    },
    error: function (response) {
      alert(
        "ocorreu um erro ao tentar carregar as permissões, favor enviar o erro para o IC. " +
        response.status
      );
      return (ret = false);
    },
  });
  return dados;
}

/** 
 * RETORNA TODOS OS GRUPOS
*/
function fRetGroups(nQuant) {
  var path2 = "";
  var dados;
  if (nQuant != null && nQuant != "" && nQuant != undefined) {
    path2 += "?size=" + nQuant.toString();
  }
  $.ajax({
    type: "GET",
    url: server + "/v1/gpaccess" + path2,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    cache: false,
    success: function (data) {
      dados = data;
    },
    error: function (response) {
      alert(
        "ocorreu um erro ao tentar carregar as permissões, favor enviar o erro para o IC. " +
        response.status
      );
      return (ret = false);
    },
  });
  return dados;
}

/** 
 * FUNÇÃO GENÉRICA DE CARREGAMENTO E PREENCHIMENTO DOS CAMPOS NOS FORMULÁRIOS
*/
function fPreencheForm(nFields, formFields, data, lDisabled) {

  for (nFields = 0; nFields < formFields.length; nFields++) {
    if (data != undefined) {
      if (typeof data[formFields[nFields].id] === "boolean") {
        formFields[nFields].value =
          data[formFields[nFields].id] === true ? 1 : 0;
      } else if (
        formFields[nFields].className === "form-select" &&
        data[formFields[nFields].id] != null
      ) {
        formFields[nFields].value = data[formFields[nFields].id];
      } else if (
        formFields[nFields].className === "form-check-input" &&
        data[formFields[nFields].id] == undefined
      ) {
        if (data != undefined) {

          filteredObj = checkPermission(
            data,
            formFields[nFields].id
          );
          if (filteredObj != undefined) {
            formFields[nFields].checked = true;
          } else {
            formFields[nFields].checked = false;
          }
        }
      } else if (
        formFields[nFields].className.search("display") >= 0 &&
        formFields[nFields].id != null
      ) {

        if (formFields[nFields].id === "tabpermission") {
          var dados = data;
          var aStruct = [
            {
              data: "id",
            },
            {
              data: "description",
            },
            {
              data: "descriptionMenu",
            },
          ];
          if ($.fn.dataTable.isDataTable('#tabpermission')) {
            $('#tabpermission').DataTable().destroy();
          }
          table = $("#" + formFields[nFields].id).DataTable({
            data: dados,
            responsive: true,
            colReorder: true,
            /*columnDefs: [
              {
                defaultContent: " ",
                targets: "_all",
              },
            ],*/
            columns: aStruct,
            select: true,
          });

        }
        else if (formFields[nFields].id === "tabgroup") {
          var dados = data;
          var aStruct = [
            {
              data: "id",
            },
            {
              data: "description",
            },
          ];
          if ($.fn.dataTable.isDataTable('#tabgroup')) {
            $('#tabgroup').DataTable().destroy();
          }
          table = $("#tabgroup").DataTable({
            colReorder: true,
            responsive: true,
            data: dados,
            /*columnDefs: [
              {
                defaultContent: " ",
                targets: "_all",
              },
            ],*/
            columns: aStruct,
            select: true,
          });

        }
      } else if (formFields[nFields].className === "form-control" && data[formFields[nFields].id] != undefined) {

        formFields[nFields].value = data[formFields[nFields].id];

      }
    }

    formFields[nFields].disabled = lDisabled;
  }
}
/**
 * MARCA OS CHECKBOXES COM BASE NO JSON DO USUARIO EDITADO
 */
function checkPermission(json, permissao) {

  var filteredObj = json.find(function (item, i) {
    if (item.description === permissao) {
      index = i;
      return item;
    }
  });
  return filteredObj;
}

/*
    VALIDAÇÃO ESPECÍFICA PARA FORMULÁRIO DE GAIOLAS
*/
function fValidGaiolas() {
  var testData = document.getElementById("observacao");
  if (testData != null) {
    valInicial = testData.value;
    fWhen(testData, "tara", "GAIOLA", false);
  }
}
/**
 * FUNÇÃO DE EXCLUSÃO DE REGISTRO SELECIONADO
 */
function fExcluiRegs(idRegs, nCont) {
  acao = sessionStorage.getItem("acao");
  var ret;
  $.ajax({
    type: "DELETE",
    url: server + path + "/" + idRegs,
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },

    success: function (data) {
      alert("Exclusão realizada com Sucesso");
      loadPage("forms.html", acao, "pageContent", "", "", "ALTERACAO");
    },
    cache: false,
    error: function (response) {
      if (response.status == 500 && acao.indexOf("PERMISSIONS", 1) > 0) {
        alert(
          "ocorreu um erro ao tentar excluir a permissão, favor verificar se nenhum usuário esteja com esta permissão ativada"
        );
        ret = false;
      } else if (nCont > 3 || response.status != 403) {
        alert(
          "ocorreu um erro ao tentar excluir o registro, favor enviar o erro para o IC. " +
          response.status + " " + response.responseText
        );
        ret = false;
      } else {
        if (response.status == 403) {
          ret = response.status;
        }
      }
    },
  });
  if (ret === 403) {
    fvalidUsertoken(
      "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
    );
    fExcluiRegs(idRegs, nCont++);
  }
}

/**
 * FUNÇÃO DE NOVO CADASTRO  
 */
function fCadastrarform(nCont) {
  var $formulario = $($nameForm1);
  var $formCiclosTemp;
  var dados = getFormData($formulario, "POST");
  var ret;

  fvalidUsertoken(
    "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
  );
  acao = sessionStorage.getItem("acao");
  if ($nameForm2 != "") {
    $formCiclosTemp = $($nameForm2);
    dados[$nameForm2.substring(1, $nameForm2.length)] = getFormData(
      $formCiclosTemp,
      "POST"
    );
  }
  cData = JSON.stringify(dados);

  $.ajax({
    type: "POST",
    data: cData,
    url: server + path,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    cache: false,
    success: function (data) {
      alert("Inclusão realizada com Sucesso");
      idSelec = idSelec + 1;

      loadPage("forms.html", acao, "pageContent", "", "", "ALTERACAO");
    },
    error: function (response) {
      alert(
        "ocorreu um erro ao tentar salvar o formulário, favor enviar o erro para o IC. " +
        response.status
      );
      return (ret = false);
    },
  });
}
/*
  CANCELAMENTO DE EDIÇÃO DE REGISTRO
*/
function fcancEdit(id) {
  acao = sessionStorage.getItem("acao");
  if (id == "fecharView") {
    c = true;
  } else {
    var c = confirm("Deseja cancelar a operação?");
  }


  if (c) {
    $("#listaFtps").modal("show");
    loadPage("forms.html", acao, "pageContent", "", "", "ALTERACAO");
  }
}

/*
  VALIDAÇÃO DO CAMPO DE E-MAIL
*/
function emailCheck(cMail) {
  var email = "";

  if (cMail === undefined) {
    email = document.formLogin.email.value;
  } else {
    email = cMail;
  }

  if (email == "") {
    return false;
  } else {
    var regMail =
      /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    if (regMail.test(email) == false) {
      return false;
    } else {
      return true;
    }
  }
}

/*
 VALIDA E AUTENTICA USUÁRIO
 */
function validationLogin() {
  var retorno;

  if (
    document.formLogin.email.value == "" ||
    document.formLogin.password.value == ""
  ) {
    $("#cpmail").html("");
    $("#cpass").html(
      '<span class="text-danger" style="color:#FDB913;">Verifique se todos os campos estão preenchidos</span>'
    );

    return false;
  } else if (emailCheck()) {
    $("#cpmail, #cpass").html("");

    username = document.formLogin.email.value;
    password = document.formLogin.password.value;
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    messageErro =
      "Não foi possível realizar realizar o login, com as informações solicitadas";

    retorno = fvalidUsertoken(messageErro);
    if (retorno == undefined || (typeof retorno == "boolean" && !retorno)) {
      $("#cpass").html(
        '<span class="text-danger" style="color:#FDB913;">Verifique se todos os campos estão preenchidos corretamente.</span>'
      );
      return false;
    } else {

      $permissoes = fBuscaPermissoesNew(0); //fBuscaPermissoes(0);
      dados = fViewDtByMail(username);

      if (dados != undefined && (dados.firstAccess === null || dados.firstAccess === "")) {
        document.formUsuarios.id.value = dados.id;
        document.formUsuarios.email.value = dados.email;
        document.formUsuarios.name.value = dados.name;

        document.formUsuarios.firstAccess.value = dados.firstAccess;

        $("#modal-senha").modal("show");
      } else {
        $("#modal-senha").modal("hide");

        $User = fUsers(0);

        if ($permissoes != undefined && typeof $permissoes != "boolean") {
          jCall("ptAdmin.html");
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    $("#cpass").html("");
    $("#cpmail").html(
      '<span class="text-danger" style="color:#FDB913;">Verifique se o e-mail está preenchido corretamente.</span>'
    );
    return false;
  }
}

function fvalidUsertoken(messageErro) {
  var SendInfo;

  var dados;
  SendInfo = {
    email: username,
    password: password,
  };

  //var uri = logServer+path;
  $.ajaxSetup({
    url: "ping.php",
  });
  $.ajax({
    type: "POST",
    data: JSON.stringify(SendInfo),
    contentType: "application/json",
    url: logServer + "login",
    async: false,

    success: function (data) {
      dados = data;
    },
    cache: false,
    error: function (response) {
      alert(messageErro);

      return false;
    },
  });
  $token = dados;
  sessionStorage.setItem("token", $token);
  return $token;
}

function jCall(cUrl) {
  window.location = getHost() + "/" + cUrl;
}

function getHost() {
  var cHost = "";

  cHost = $(location).attr("pathname");
  cHost = "/" + cHost.substring(1, cHost.indexOf("/", 1));

  return cHost;
}

function fUsers(nCont) {
  var messageErro =
    "Não foi possível realizar a busca das permissões de menu do usuário, solicite ao administrador incluir permissões em seu usuário";
  var dados;
  path = "/v1/users/byEmail/" + username;

  $.ajax({
    type: "GET",
    url: server + path,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    success: function (data) {
      dados = data;
    },
    cache: false,
    error: function (response) {
      if (nCont > 3) {
        alert(messageErro);
        dados = false;
      } else {
        if (response.status == 403) {
          fvalidUsertoken();
          fUsers(nCont++);
        } else {
          dados = false;
        }
      }
    },
  });
  $Users = dados;
  sessionStorage.setItem("users", JSON.stringify($Users));

  return dados;
}
function fBuscaPermissoes(nCont) {
  var messageErro =
    "Não foi possível realizar a busca das permissões de menu do usuário, solicite ao administrador incluir permissões em seu usuário";
  var dados;
  path = "/v1/users/permissionsByEmail/" + username;

  $.ajax({
    type: "GET",
    url: server + path,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    success: function (data) {
      dados = data;
    },
    cache: false,
    error: function (response) {
      if (nCont > 3) {
        alert(messageErro);
        dados = false;
      } else {
        if (response.status == 403) {
          fvalidUsertoken();
          fBuscaPermissoes(nCont++);
        } else {
          dados = false;
        }
      }
    },
  });
  $permissoes = dados;
  sessionStorage.setItem("permissoes", JSON.stringify($permissoes));

  return dados;
}
function fBuscaPermissoesNew(nCont) {
  var messageErro =
    "Não foi possível realizar a busca das permissões de menu do usuário, solicite ao administrador incluir permissões em seu usuário";
  var dados = [];
  path = "/v2/users/groupsByEmail/" + username;

  $.ajax({
    type: "GET",
    url: server + path,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    success: function (data) {
      data.forEach(function (gps) {

        var permissoes = gps.permission;

        permissoes.forEach(function (permissao) {
          if (permissao != null)
            dados.push(permissao);
        });
      });
      //dados = data;

    },
    cache: false,
    error: function (response) {
      if (nCont > 3) {
        alert(messageErro);
        dados = false;
      } else {
        if (response.status == 403) {
          fvalidUsertoken();

          fBuscaPermissoesNew(nCont++);
        } else {
          dados = false;
        }
      }
    },
  });
  $permissoes = dados;
  sessionStorage.setItem("permissoes", JSON.stringify($permissoes));

  return dados;
}
function OrdenaMenu(lista, chave, ordem) {


  return lista.sort(function (a, b) {
    var x = a[chave];
    var y = b[chave];
    if (ordem === "ASC") {
      return x < y ? -1 : x > y ? 1 : 0;
    }
    if (ordem === "DESC") {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}

function ListaMenu(json) {
  var itemAntes = "";
  var li = "";
  var menuTarget = "";
  var menuPai = "";

  $("#menuVertical").html("");

  for (var ind in json) {
    if (json[ind]["description"].indexOf("FTP") >= 0) {
      menuTarget = "FTP";
      menuPai = "Formulários FTP";
    } else if (json[ind]["description"].indexOf("CADASTROS") >= 0) {
      menuTarget = "CADASTROS";
      menuPai = "Gestão de Acessos";
    } else if (json[ind]["description"].indexOf("POWERBI") >= 0) {
      menuTarget = "POWERBI";
      menuPai = "Dashboards";
    }

    if (menuPai != itemAntes && itemAntes != "") {
      li += "</div>";
      li += "</li>";
      $("#menuVertical").append(li);
      li = "";
    }

    if (menuPai != itemAntes) {
      li += '<li class="mb-1">';
      li +=
        '<button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="' +
        "#" +
        menuTarget +
        '" aria-expanded="false">';
      li += menuPai;
      li += "</button>";
      li += '<div class="collapse" id=' + menuTarget + ">";
    }

    li += '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">';
    if (json[ind]["description"].indexOf("POWERBI") > 0) {
      cLinkHref =
        "loadPage('dash.html','DASH','pageContent','" +
        json[ind]["linkPage"] +
        "','frameDash','" +
        json[ind]["descriptionMenu"].replace(/ /g, "-") +
        "');";
    } else if (
      json[ind]["description"].indexOf("FTP") > 0 ||
      json[ind]["description"].indexOf("CADASTROS") > 0
    ) {
      cLinkHref =
        "loadPage('forms.html','" +
        json[ind]["description"] +
        "','pageContent','" +
        json[ind]["descriptionMenu"].trim().replace(/ /g, "-") +
        "','','" +
        json[ind]["descriptionMenu"].trim().replace(/ /g, "-") +
        "');";
    } else {
      cLinkHref =
        "loadPage(" +
        json[ind]["description"] +
        ",'','pageContent','" +
        json[ind]["descriptionMenu"] +
        "');";
    }

    li +=
      '<li class="nav-item"><a href=javascript:' +
      cLinkHref +
      ' id="' +
      json[ind]["description"] +
      '"  class="link-white rounded">' +
      json[ind]["descriptionMenu"] +
      "</a></li>";
    li += "</ul>";

    itemAntes = menuPai;

    if (ind == json.length - 1) {
      li += "</div>";
      li += "</li>";
      $("#menuVertical").append(li);
      li = "";
    }
  }
}
if ($permissoes != undefined && typeof $permissoes != "boolean") {
  OrdenaMenu($permissoes, "description", "ASC");
  $newMenu = reestruturaMenu($permissoes);
  //ListaMenu($permissoes);
  $("#menuVertical").html("");
  cMenu = ListaMenu2($newMenu);
  $("#menuVertical").html(cMenu);
  if (document.getElementById("nameUser") != null) {
    document.getElementById("nameUser").innerHTML = $User.name;
  }
}

function ListaMenu2(array, idMenuPai) {
  var li = "";
  var arrayAux = [];
  var ind, indMenu, indMenus;
  var menuPai;
  if (!array.hasOwnProperty("conteudo")) {
    if (array.length > 0) {
      for (var ind = 0; ind < array.length; ind++) {
        if (array[ind].menu != menuPai) {
          if (!array[ind].hasOwnProperty("conteudo")) {
            menuPai =
              array[ind].menu === undefined ? array.menu : array[ind].menu;
            li += '<li class="mb-1">';
            li +=
              '<button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="' +
              "#" + menuPai + ind.toString() +
              '" aria-expanded="false">';
            li += menuPai.replace(/-/g, " ");
            li += "</button>";
            li += '<div class="collapse" id=' + menuPai + ind.toString() + ">";
            li +=
              '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">';
          }
          arrayAux = array[ind].subMenu;

          if (arrayAux != undefined && arrayAux.length > 0) {
            for (var indMenus = 0; indMenus < arrayAux.length; indMenus++) {
              if (menuPai != arrayAux[indMenus].menu)
                li += ListaMenu2(arrayAux[indMenus], menuPai);
            }
          }
          li += "</ul>";
          li += "</div>";
          li += "</li>";
        }
      }
    } else {
      arrayAux = array.subMenu;
      menuPai = array.menu;
      li += '<li class="mb-1">';
      li +=
        '<button class="btn btn-toggle align-items-center rounded collapsed submenu" data-bs-toggle="collapse" data-bs-target="' +
        "#" +
        idMenuPai + "_" + menuPai +
        '" aria-expanded="false">';
      li += menuPai;
      li += "</button>";
      li += '<div class="collapse" id=' + idMenuPai + "_" + menuPai + ">";
      li += '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">';
      if (arrayAux != undefined && arrayAux.length > 0) {
        for (var indMenus = 0; indMenus < arrayAux.length; indMenus++) {
          if (menuPai != arrayAux[indMenus].menu)
            li += ListaMenu2(arrayAux[indMenus], menuPai);
        }
      }
      li += "</ul>";
      li += "</div>";
      li += "</li>";
    }
  }

  if (array.hasOwnProperty("conteudo")) {
    li += '<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ">';

    if (
      array.conteudo["description"].indexOf("POWERBI") >= 0 ||
      (array.conteudo["linkPage"] != "" && array.conteudo["linkPage"] != null)
    ) {
      cLinkHref =
        "loadPage('dash.html','DASH','pageContent','" +
        array.conteudo["linkPage"] +
        "','frameDash','" +
        array.conteudo["descriptionMenu"].replace(/ /g, "-") +
        "');";
    } else if (
      array.conteudo["description"].indexOf("FORMULÁRIOS") >= 0 ||
      array.conteudo["description"].toUpperCase().indexOf("ACESSO") >= 0
    ) {
      cLinkHref =
        "loadPage('forms.html','" +
        array.conteudo["description"].trim().replace(/ /g, "-") +
        "','pageContent','" +
        array.conteudo["descriptionMenu"].trim().replace(/ /g, "-") +
        "','','" +
        array.conteudo["descriptionMenu"].trim().replace(/ /g, "-") +
        "');";
    } else {
      cLinkHref =
        "loadPage(" +
        array.conteudo["description"].trim().replace(/ /g, "-") +
        ",'','pageContent','" +
        array.conteudo["descriptionMenu"].trim().replace(/ /g, "-") +
        "');";
    }

    li +=
      '<li class="nav-item"><a href=javascript:' +
      cLinkHref +
      ' id="' +
      array.conteudo["description"] +
      '"  class="link-white rounded">' +
      array.conteudo["descriptionMenu"] +
      "</a></li>";
    li += "</ul>";
  }

  return li;
}

function reestruturaMenu(arrayPermissao) {
  var newMenu = [];
  var estrutura;
  var valorRaiz = "";
  for (var nContPerm in arrayPermissao) {
    estrutura = arrayPermissao[nContPerm].description
      .replace(/ /g, "-")
      .split("/");
    for (var nContVar in estrutura) {
      valorAnterior = nContVar - 1 >= 0 ? estrutura[nContVar - 1] : "";
      if (valorRaiz != "" && valorRaiz === estrutura[nContVar]) {
        valorAnterior = valorRaiz;
      }
      if (
        valorAnterior === "" &&
        valorRaiz != "" &&
        valorRaiz != estrutura[0]
      ) {
        valorRaiz = "";
      }
      if (valorRaiz != "" && valorRaiz != estrutura[0]) {
        valorRaiz = estrutura[0];
      }

      if (valorRaiz == "" || valorRaiz != estrutura[nContVar]) {
        aux = incluiItemMenu(
          estrutura[nContVar],
          newMenu,
          valorAnterior,
          arrayPermissao[nContPerm],
          parseInt(nContVar, 10) + 1 === estrutura.length,
          true,
          newMenu.length,
          valorRaiz
        );
        newMenu = aux[0];
      }

      valorRaiz = estrutura[0];
    }
  }
  return newMenu;
}


function incluiItemMenu(
  valor,
  newMenu,
  itemMenuAnterior,
  jsonStruct,
  lUltRec,
  lChamad,
  nTamMenu,
  valorRaiz
) {
  var newAux = [];
  var contItem = 0;
  var lEncontrou = false;
  var a, i;
  const lastIndexOfMenu = Menu => {
    let index = [...newMenu].reverse().findIndex(menu => menu.menu == Menu);

    return index >= 0 ? newMenu.length - 1 - index : index;
  }
  const lastIndexOfSubMenu = Menu => {
    let index = [...newMenu][a]["subMenu"].reverse().findIndex(menu => menu.menu == Menu);

    return index >= 0 ? newMenu.length - 1 - index : index;
  }
  if (nTamMenu == 0) {
    newAux["menu"] = valor;
    newAux["subMenu"] = [];
    if (lUltRec) newAux["conteudo"] = jsonStruct;
    newMenu.push(newAux);
  } else {
    if (valor != "") a = newMenu.findIndex((menu) => menu.menu === valor);//a = lastIndexOfMenu(valor); 

    if (a < 0 && itemMenuAnterior != "")
      a = newMenu.findIndex((menu) => menu.menu === itemMenuAnterior);//lastIndexOfMenu(itemMenuAnterior); //

    if (a >= 0)
      i = newMenu[a]["subMenu"].findIndex((menu) => menu.menu === valor);//lastIndexOfSubMenu(valor); 

    if ((a === undefined || a < 0) && newMenu.length > 0) {

      while (newMenu.length > 0 && contItem < newMenu.length && !lEncontrou) {
        if (
          newMenu[contItem]["subMenu"] != undefined &&
          newMenu[contItem]["subMenu"].length >= 0
        ) {
          if (valorRaiz != undefined && valorRaiz.length != 0)
            contItem = lastIndexOfMenu(valorRaiz);

          auxCheck = incluiItemMenu(
            valor,
            newMenu[contItem]["subMenu"],
            itemMenuAnterior,
            jsonStruct,
            lUltRec,
            false,
            nTamMenu
          );
          if (auxCheck != undefined && auxCheck.length > 0 && auxCheck[1]) {
            newMenu[contItem]["subMenu"] = auxCheck[0];
            lEncontrou = auxCheck[1];
            lChamad = lChamad ? false : false;
          }
        }
        contItem = contItem + 1;
      }
    }

    if ((!lEncontrou && lChamad) || (lEncontrou && lChamad) || a >= 0) {
      if (a === undefined || a < 0) {
        newAux["menu"] = valor;
        newAux["subMenu"] = [];
        if (lUltRec) newAux["conteudo"] = jsonStruct;
        newMenu.push(newAux);
        lEncontrou = true;
      } else {
        newAux["menu"] = valor;
        newAux["subMenu"] = [];
        if (lUltRec) {
          newAux["conteudo"] = jsonStruct;
        }
        if (i < 0) newMenu[a]["subMenu"].push(newAux);
        else newMenu[a]["subMenu"][i]["subMenu"].push(newAux);

        lEncontrou = true;
      }
    }
  }
  return [newMenu, lEncontrou];
}
/**
 * EFETUA A LIMPEZA DAS VÁRIAVEIS ARMAZENAS
 */
function logout() {
  sessionStorage.clear();
  jCall("login.html");
}

/**
 * ENVIO DOS DADOS DE USUÁRIO
 */
function fEnviDds() {
  var $formulario = $($nameForm1);
  var $formCiclosTemp;

  var data = "";

  if ($nameForm2 != "") {
    $formCiclosTemp = $($nameForm1);
    dados[$nameForm2.substring(1, $nameForm2.length)] = getFormData(
      $formCiclosTemp,
      "PUT"
    );
  }
  data = JSON.stringify(dados);
}
/**
 * CHECAGEM DOS DADOS DE USUÁRIO E PREENCHE ELEMENTOS EM TELA
 */
function fUDados() {
  var dados = "";
  dados = fViewDtByMail(username);

  if (
    dados != null &&
    dados != undefined &&
    document.getElementById("id") != null
  ) {
    document.getElementById("id").value = dados.id;
    document.getElementById("email").value = dados.id;
    document.getElementById("nome").value = dados.nome;
    document.getElementById("password").value = dados.password;
  } else {
    alert(
      "Não foi possível realizar o processamento desta operação, tente mais tarde."
    );
  }
}

/**
 * FUNÇÃO DE RETORNO DOS DADOS COM BASE NO E-MAIL DO USUÁRIO
 */
function fViewDtByMail(email) {
  var dados;
  fvalidUsertoken(
    "Não foi possível restaurar a conexão com o servidor, efetue o logout e volte a acessar o painel."
  );

  $.ajax({
    type: "GET",
    url: server + "/v1/users/byEmail/" + email,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    cache: false,
    success: function (data) {
      dados = data;
    },
    error: function (response) {
      alert(
        "ocorreu um erro ao tentar carregar os dados do usuário, favor tentar mais tarde."
      );
      return (ret = false);
    },
  });
  return dados;
}

/**
 * FUNÇÃO DE CONTROLE DO CHECKBOX
 */
function fMarkAll() {
  var formFields = document
    .getElementById("permission")
    .querySelectorAll("input[type='checkbox']");

  for (var i = 0; i < formFields.length; i++) {
    if (formFields[i].type === "checkbox") {
      if (formFields[i].checked) {
        formFields[i].checked = false;
      } else {
        formFields[i].checked = true;
      }
    }
  }
}
/** 
 * FUNÇÃO RESPONSÁVEL POR ALTERAR AS INFORMAÇÕES DE USUÁRIOS ATRAVÉS DO FORMULÁRIO MEUS DADOS
*/
function fAlteraDados(newPass) {
  $nameForm1 = "#formUsuarios";
  $nameForm2 = "#permission";
  functionValid = "";
  if (
    document.getElementById("passwordConfirm").value !=
    document.formUsuarios.password.value
  ) {
    $("#cpmail").html("");
    $("#cpassConfirm").html(
      '<span class="text-danger" style="color:#FDB913;">As senhas são diferentes, favor corrigí-las</span>'
    );
  } else if (!emailCheck(document.formUsuarios.email.value)) {
    $("#cpmail").html(
      '<span class="text-danger" style="color:#FDB913;">Verificar o campo de e-mail, pois o mesmo não pode ser vazio ou inválido</span>'
    );
    $("#cpassConfirm").html("");

    return false;
  } else {
    $("#cpmail, #cpassConfirm").html("");
    permissoes = '"permissoes" : ' + JSON.stringify($permissoes);
    path = "/v1/users";

    document.formUsuarios.firstAccess.value = 1;

    submitdata(0);
    document.formUsuarios.firstAccess.value = 1;
    if (newPass != undefined) {
      sessionStorage.setItem("password", newPass);
      document.formLogin.password.value = newPass;
    }
    permissoes = "";
  }
}

/**
 * RETORNA AS UNIDADES DE PRODUÇÕES QUE PREENCHEM O SELECT NO CADASTRO DO FORMULÁRIO TPO
 */
function fRetUnidProd(nQuant) {
  var path2 = "";
  var dados;
  if (nQuant != null && nQuant != "" && nQuant != undefined) {
    path2 += "?size=" + nQuant.toString();
  }
  $.ajax({
    type: "GET",
    url: server + "/v1/ftpunidadeproducao" + path2,
    contentType: "application/json",
    dataType: "json",
    async: false,

    headers: {
      Authorization: "Bearer " + $token,
    },
    cache: false,
    success: function (data) {
      dados = data;

    },
    error: function (response) {
      alert(
        "ocorreu um erro ao tentar carregar as permissões, favor enviar o erro para o IC. " +
        response.status
      );
      return (ret = false);
    },
  });

  if (typeof dados != "boolean") {
    dados =
      dados["totalElements"] > dados["size"]
        ? fRetUnidProd(dados["totalElements"])
        : dados;
  }

  //PREENCHE O CAMPO SELECT COM AS INFORMAÇÕES DE UNIDADE DE PRODUÇÃO;
  for (var nX = 0; nX < dados.content.length; nX++) {
    $('#temposCiclo #idUnidadeProducao').append($('<option>', {
      value: dados.content[nX]['id'],
      text: dados.content[nX]['name']
    }));
    $('#formTermoTPO #idUnidadeProducao').append($('<option>', {
      value: dados.content[nX]['id'],
      text: dados.content[nX]['name']
    }));
  }
  return dados;
}

/**
 * FUNÇÕES DE OPERAÇÃO DOS GRUPOS DE ACESSO ATRELADOS AOS USUÁRIOS
 */
function fMdlUnidProd() {
  var theDtGroups = $('#tabLista').DataTable().data();;

  if (document.getElementById('name').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  if (typeof theDtGroups != "boolean") {
    if ($.fn.dataTable.isDataTable('#tblGroup')) {
      $('#tblGroup').DataTable().destroy();
    }

    var aStruct = [
      {
        data: "id",
      },
      {
        data: "description",
      },
      {
        data: "code",
      },
      {
        data: "name",
      },
      {
        data: "abbreviation",
      },
      {
        data: "description",
      },
    ];

    table = $("#tblUnidProd").DataTable({
      data: theDtGroups,
      colReorder: true,
      responsive: true,

      columns: aStruct,
      select: true,
    });
    $('#mdlUnidProd').modal('show');
  }


}
function fAddUnid() {

  tblUnidProd = $('#tblUnidProd').DataTable();


  if (document.getElementById('name').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  ddsUnid = tblUnidProd.row('.selected').select().data();

  document.getElementById("idOver").value = ddsUnid.id;
  $('#mdlUnidProd').modal('hide');



}

/**
 * FUNÇÕES DE OPERAÇÃO DAS PERMISSÕES ATRELADAS AO GRUPO DE ACESSO
 */
function fMdlPermission() {
  var theDtPermissions = fRetPermissions(null);

  if (document.getElementById('description').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  if (typeof theDtPermissions != "boolean") {
    if ($.fn.dataTable.isDataTable('#tblpermission')) {
      $('#tblpermission').DataTable().destroy();
    }
    theDtPermissions =
      theDtPermissions["totalElements"] > theDtPermissions["size"]
        ? fRetPermissions(theDtPermissions["totalElements"])
        : theDtPermissions;
    var aStruct = [
      {
        data: "id",
      },
      {
        data: "description",
      },
      {
        data: "descriptionMenu",
      },
    ];

    table = $("#tblpermission").DataTable({
      data: theDtPermissions.content,
      colReorder: true,
      responsive: true,
      /*columnDefs: [
        {
          defaultContent: " ",
          targets: "_all",
        },
      ],*/
      columns: aStruct,
      select: true,
    });
    $('#mdlPermissoes').modal('show');
  }


}
function fAddPermission() {
  var t = $('#tabpermission').DataTable();
  tblPerm = $('#tblpermission').DataTable();
  idPermissao = tblPerm.row('.selected').index();

  if (document.getElementById('description').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  ddsPermission = tblPerm.row('.selected').select().data();
  if (t.column(0).data().indexOf(ddsPermission.id) < 0) {
    t.row.add(ddsPermission).draw(false);
    $('#mdlPermissoes').modal('hide');
  } else {
    alert('Permissão já atribuída a este grupo.')
  }

}

function fDelPermission() {
  var tblPerm = $('#tabpermission').DataTable();
  var idPermissao = tblPerm.row('.selected').index();
  if (document.getElementById('description').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada!')

    return false;
  }

  if (idPermissao <= 0 || idPermissao === undefined) {
    alert('Para excluir uma permissão, é necessário selecioná-la primeiro.')
  } else {
    tblPerm.row('.selected').remove().draw(false);
  }
}

/**
 * FUNÇÕES DE OPERAÇÃO DOS GRUPOS DE ACESSO ATRELADOS AOS USUÁRIOS
 */
function fMdlGroup() {
  var theDtGroups = fRetGroups(null);

  if (document.getElementById('name').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  if (typeof theDtGroups != "boolean") {
    if ($.fn.dataTable.isDataTable('#tblGroup')) {
      $('#tblGroup').DataTable().destroy();
    }
    theDtGroups =
      theDtGroups["totalElements"] > theDtGroups["size"]
        ? fRetGroups(theDtGroups["totalElements"])
        : theDtGroups;
    var aStruct = [
      {
        data: "id",
      },
      {
        data: "description",
      }
    ];

    table = $("#tblGroup").DataTable({
      data: theDtGroups.content,
      colReorder: true,
      responsive: true,
      /*columnDefs: [
        {
          defaultContent: " ",
          targets: "_all",
        },
      ],*/
      columns: aStruct,
      select: true,
    });
    $('#mdlGroup').modal('show');
  }


}
function fAddGroup() {
  var t = $('#tabgroup').DataTable();
  tblGroup = $('#tblGroup').DataTable();
  idPermissao = tblGroup.row('.selected').index();

  if (document.getElementById('name').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada neste modo!')

    return false;
  }
  ddsPermission = tblGroup.row('.selected').select().data();
  if (t.column(0).data().indexOf(ddsPermission.id) < 0) {
    t.row.add(ddsPermission).draw(false);
    $('#mdlGroup').modal('hide');
  } else {
    alert('Grupo já atribuída a este grupo.')
  }

}

function fDelGroup() {
  var tblGroup = $('#tabgroup').DataTable();
  var idGroup = tblGroup.row('.selected').index();
  if (document.getElementById('name').disabled) {
    alert('Entre no modo edição, não é permitida a operação desejada!')

    return false;
  }

  if (idGroup < 0 || idGroup === undefined) {
    alert('Para excluir uma permissão, é necessário selecioná-la primeiro.')
  } else {
    tblGroup.row('.selected').remove().draw(false);
  }
}

function fValidForms(rotina) {
  var lRet = true;

  if (functionValid != undefined && functionValid != "") {
    if ((lRet = eval(functionValid + "()")) === false) {
      return lRet
    }
  }
  if (lRet) {
    if (rotina === 1) {
      lRet = fCadastrarform();
    } else {
      lRet = submitdata();
    }
  }
  return lRet;
}


// FORMATAÇÃO PARA MOSTRAR NO FORMATO DE DINHEIRO (CURRENCY)
function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") { return; }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "R$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "R$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}




// VERIFICA SE O FORM POSSUI O INPUT DE TIPO CURRENCY E TRATA DO ENVIO DELE
$(document).on('mousedown', '#confirmButton', function () {
  $("input[data-type='currency']").each(function () {
    const getOnlyNumbers = /[^0-9.]/g
    const formattedString = $(this).val().replaceAll(getOnlyNumbers, '');

    $(this).val(formattedString);
  });
})