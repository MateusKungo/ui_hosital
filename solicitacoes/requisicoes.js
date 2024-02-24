var url = "https://daec-102-214-36-58.ngrok-free.app";
var user = null
var apiProvincia = null
pessoalClinico = []
idMedico = null


function minhaImagem() {
  document.getElementById("minhaImagem").src = url + "/api/imagem/" + JSON.parse(localStorage.getItem("user")).user[0].imagem
}

//usei
function guardarUser(user) {
  userConvertido = JSON.stringify(user);
  localStorage.setItem("user", userConvertido);
  localStorage.setItem("token", user.token);
}


//usei
function getAllExames() {
  //$('#loadingSpinnerContainer').show();
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id

  fetch(url + "/api/exame/pegarExamesPorInstituicao/" + iuser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //$('#loadingSpinnerContainer').hide();
      retorno = data.exames;
      // $("#paiExames").empty();
      for (cont = 0; cont < retorno.length; cont++) {
        tr = document.createElement('tr');
        tdNome = document.createElement('td');
        tdId = document.createElement('td');
        tdPreco = document.createElement('td');
        tdId.textContent = retorno[cont].id;
        tdPreco.textAlign = "center";
        tdPreco.textContent = retorno[cont].instituicaos[0].preco;
        tdNome.textContent = retorno[cont].nome;
        tdNome.style.textAlign = "center";
        tdNome.classList.add('text-truncate');
        tdId.classList.add('text-truncate');
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdPreco);
        document.getElementById('paiExames').appendChild(tr);
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


//usei
function getAllMedicamentos() {

  fetch(url + "/api/medicamento/pegarTodosMedicamentos", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //$('#loadingSpinnerContainer').hide();
      retorno = data.medicamentos;
      // $("#paiExames").empty();
      for (cont = 0; cont < retorno.length; cont++) {
        tr = document.createElement('tr');
        tdNome = document.createElement('td');
        tdId = document.createElement('td');
        tdPreco = document.createElement('td');
        tdId.textContent = retorno[cont].id;
        tdPreco.textAlign = "center";
        tdNome.textContent = retorno[cont].nome;
        tdNome.style.textAlign = "center";
        tdNome.classList.add('text-truncate');
        tdId.classList.add('text-truncate');
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        document.getElementById('paiMedicamentos').appendChild(tr);
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


//usei
function getAllConsulta() {
  // $('#loadingSpinnerContainer').show();
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id

  fetch(url + "/api/consulta/pegarConsultasPorInstituicao/" + iuser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.consultas;
      //$("#paiConsulta").empty();
      for (cont = 0; cont < retorno.length; cont++) {
        tr = document.createElement('tr');

        tdNome = document.createElement('td');
        tdNome.style.textAlign = "center"
        tdId = document.createElement('td');
        tdPreco = document.createElement('td');
        tdTipo = document.createElement('td');
        tdId.textContent = retorno[cont].id;
        tdPreco.textAlign = "center";
        tdTipo.textAlign = "center";
        tdPreco.textContent = retorno[cont].instituicaos[0].preco;
        tdTipo.textContent = retorno[cont].tipo;
        tdNome.textContent = retorno[cont].nome;
        tdNome.style.textAlign = "center";
        tdNome.classList.add('text-truncate');
        tdId.classList.add('text-truncate');
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdPreco);
        tr.appendChild(tdTipo);
        document.getElementById('paiConsulta').appendChild(tr);
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function getAllEspecialidade() {
  fetch(url + "/api/especialidade/getAll", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.especialidades;
      for (cont = 0; cont < retorno.length; cont++) {
        tr = document.createElement('tr');
        tdNome = document.createElement('td');

        tdId = document.createElement('td');
        tdId.textContent = retorno[cont].id;
        tdNome.textContent = retorno[cont].nome;
        tdNome.style.textAlign = "center";
        tdNome.classList.add('text-truncate');
        tdId.classList.add('text-truncate');
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        document.getElementById('paiEspecialidade').appendChild(tr);
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


//usei
function criarMeusMedicos(imagem, nome, email, especialidade, contacto) {
  var row = document.createElement("tr");
  var cellNome = document.createElement("td");
  var img = document.createElement("img");
  img.src = url + "/api/imagem/" + imagem
  img.alt = "Paciente";
  var paragraph = document.createElement("p");
  paragraph.textContent = nome;
  cellNome.appendChild(img);
  cellNome.appendChild(paragraph);
  row.appendChild(cellNome);

  var cellEmail = document.createElement("td");
  cellEmail.textContent = email;
  row.appendChild(cellEmail);

  var cellEspecialidade = document.createElement("td");
  cellEspecialidade.textContent = especialidade;
  row.appendChild(cellEspecialidade);

  var cellTelefone = document.createElement("td");
  var span = document.createElement("span");
  span.className = "status completed";
  span.textContent = contacto;
  cellTelefone.appendChild(span);
  row.appendChild(cellTelefone);
  document.getElementById("tableMedico").appendChild(row)
}


//usei
function getMyMedico() {
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id

  fetch(url + "/api/user/pegarPessoalClinicosPorInstituicao/" + iuser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.users;
      console.log(retorno)
      if (retorno) {
        for (cont = 0; cont < retorno.length; cont++) {
          criarMeusMedicos(retorno[cont].imagem, retorno[cont].nome, retorno[cont].email, retorno[cont].pclinico.especialidade.nome, retorno[cont].contacto.telefone_principal)
        }
      } else {
        console.log("vazio")
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function addExame() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  // $('#loadingModal').modal('show');
  const formData = new FormData();
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id

  formData.append('nome', document.getElementById("nomeExame").value);
  formData.append('preco', document.getElementById("PrecoExame").value);
  formData.append('instituicao_id', iuser);

  fetch(url + "/api/exame/create", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: formData,
  })
    .then(response => {
      //$('#loadingModal').modal('hide');
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      //$('#loadingModal').modal('hide');
      console.error('Erro na solicitação:', error.message);
    });

}

function addEspecialidade() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;

  const formData = new FormData();
  formData.append('nome', document.getElementById("nome").value);

  fetch(url + "/api/especialidade/create", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: formData,
  })
    .then(response => {
      //$('#loadingModal').modal('hide');
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      //$('#loadingModal').modal('hide');
      console.error('Erro na solicitação:', error.message);
    });

}


//usei
function addConsulta() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  // $('#loadingModal').modal('show');
  const formData = new FormData();
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id

  formData.append('nome', document.getElementById("nomeConsulta").value);
  formData.append('preco', document.getElementById("PrecoConsulta").value);
  formData.append('tipo', document.getElementById("tipoConsulta").value);
  formData.append('instituicao_id', iuser);

  fetch(url + "/api/consulta/create", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: formData,
  })
    .then(response => {
      //$('#loadingModal').modal('hide');
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      //$('#loadingModal').modal('hide');
      console.error('Erro na solicitação:', error.message);
    });

}


//usei
function addMedicamento() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  const formData = new FormData();
  formData.append('nome', document.getElementById("nome").value);

  fetch(url + "/api/medicamento/criar", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}


function getMyMedicoForEscala() {
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id
  fetch(url + "/api/user/pegarPessoalClinicosPorInstituicao/" + iuser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.users;
      try {
        if (retorno) {
          for (cont = 0; cont < retorno.length; cont++) {
            adicionarLinhaMedico(retorno[cont].pclinico.id, retorno[cont].nome, retorno[cont].pclinico.especialidade.nome, retorno[cont].contacto.telefone_principal, retorno[cont].imagem)
            adicionarLinhaTabela(retorno[cont].imagem, retorno[cont].nome, retorno[cont].pclinico.especialidade.nome, retorno[cont].pclinico.id)
          }
        } else {
          console.log("vazio")
        }
      } catch (error) {
        console.log(error)
      }


    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


//usei
function adicionarLinhaTabela(imagem, nome, especialidade, id) {
  //$("#TabelasMedicosEscala").empty();
  var tabelaBody = document.getElementById("TabelasMedicosEscala");

  var novaLinha = document.createElement("tr");

  var cellImagem = document.createElement("td");
  var imagemMedico = document.createElement("img");
  imagemMedico.src = url + "/api/imagem/" + imagem;
  imagemMedico.className = "img-thumbnail img-round";
  imagemMedico.alt = "Imagem Médico";
  cellImagem.appendChild(imagemMedico);
  novaLinha.appendChild(cellImagem);

  var cellNome = document.createElement("td");
  cellNome.textContent = nome;
  novaLinha.appendChild(cellNome);

  var cellEspecialidade = document.createElement("td");
  cellEspecialidade.textContent = especialidade;
  novaLinha.appendChild(cellEspecialidade);

  var cellEscala = document.createElement("td");
  var selectEscala = document.createElement("select");
  selectEscala.style.width = "18rem"
  selectEscala.className = "form-control";

  fetch(url + "/api/escala/pegarEscalaPorPessoalClinicoParaInstituicao/" + id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.escalas;
      console.log(retorno)
      for (var i = 0; i < retorno.length; i++) {
        var opcao = document.createElement("option");
        opcao.textContent = retorno[i].data_inicio + "-" + retorno[i].data_fim + " " + retorno[i].hora_inicio + "-" + retorno[i].hora_fim;
        selectEscala.appendChild(opcao);
      }
      // Adiciona a célula da escala à linha após criar as opções
      cellEscala.appendChild(selectEscala);
      novaLinha.appendChild(cellEscala);
      // Adiciona a nova linha ao corpo da tabela
      tabelaBody.appendChild(novaLinha);
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function getAllProvincia() {
  fetch(url + "/api/provincias", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      provincias = data.provincias;
      apiProvincia = data;
      select = document.getElementById("provincias");
      for (cont = 0; cont < provincias.length; cont++) {
        option = document.createElement("option");
        option.setAttribute("value", provincias[cont].id);
        option.textContent = provincias[cont].nome;
        select.appendChild(option);
      }
      select = document.getElementById("monicipio");
      for (cont = 0; cont < provincias.length; cont++) {
        vector = provincias[cont].municipios
        for (a = 0; a < vector.length; a++) {
          option = document.createElement("option");
          option.setAttribute("value", vector[a].id);
          option.textContent = vector[a].nome;
          select.appendChild(option);
        }
      }
      select = document.getElementById("distrito");
      for (cont = 0; cont < provincias.length; cont++) {
        vector = provincias[cont].municipios
        for (a = 0; a < vector.length; a++) {
          array = vector[a].distritos
          for (b = 0; b < array.length; b++) {
            option = document.createElement("option");
            option.setAttribute("value", array[b].id);
            option.textContent = array[b].nome;
            select.appendChild(option);
          }
        }
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function pegarTodasEspecialidade() {
  //$('#loadingSpinnerContainer').show();
  select = document.getElementById("especialidade");

  fetch(url + "/api/especialidade/getAll", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      retorno = data.especialidades;
      for (cont = 0; cont < retorno.length; cont++) {
        option = document.createElement("option");
        option.setAttribute("value", retorno[cont].id);
        option.textContent = retorno[cont].nome;
        select.appendChild(option);
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function pegarTodosExameSeclectDeumaInstituicao(idInstituicao) {

  select = document.getElementById("tipoServico");

  fetch(url + "/api/exame/pegarExamesPorInstituicao/" + idInstituicao, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {


      retorno = data.exames;
      $('#tipoServico').empty();
      option = document.createElement("option");
      option.textContent = "Selecione";
      select.appendChild(option);
      for (cont = 0; cont < retorno.length; cont++) {
        option = document.createElement("option");
        option.setAttribute("value", retorno[cont].id);
        option.setAttribute("id", +retorno[cont].instituicaos[0].preco + " Kz");
        option.textContent = retorno[cont].nome + "-" + retorno[cont].tipo;
        select.appendChild(option);
        select.addEventListener("change", function () {
          var selectedOption = this.options[this.selectedIndex];
          document.getElementById("preco").textContent = selectedOption.id
        })
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function pegarTodosConsultaSeclectDeumaInstituicao(idInstituicao) {


  select = document.getElementById("tipoServico");

  fetch(url + "/api/consulta/pegarConsultasPorInstituicao/" + idInstituicao, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {


      retorno = data.consultas;

      $('#tipoServico').empty();
      option = document.createElement("option");
      option.textContent = "Selecione";
      select.appendChild(option);
      for (cont = 0; cont < retorno.length; cont++) {
        option = document.createElement("option");
        option.setAttribute("value", retorno[cont].id);
        option.setAttribute("id", retorno[cont].instituicaos[0].preco + " Kz");
        option.textContent = retorno[cont].nome + "-" + retorno[cont].tipo;
        select.appendChild(option);
        select.addEventListener("change", function () {
          var selectedOption = this.options[this.selectedIndex];
          document.getElementById("preco").textContent = selectedOption.getAttribute("id");
        })
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function criarTabelaHistorico(data, nomeDoeca, tipDoenca, estado, receita, resultado, hospital, medico) {

  if (estado == 0) {
    estado = "Curado";
  } else if (estado == 1) {
    estado = "Doente";
  }
  const tbody = document.querySelector("#myTable tbody");

  // Cria uma nova linha
  const novaLinha = document.createElement("tr");

  // Cria as células da linha e define seus textos
  const colDataHora = document.createElement("td");
  colDataHora.textContent = data;
  novaLinha.appendChild(colDataHora);

  const colNomeDoenca = document.createElement("td");
  colNomeDoenca.textContent = nomeDoeca;
  novaLinha.appendChild(colNomeDoenca);

  const colTipoDoenca = document.createElement("td");
  colTipoDoenca.textContent = tipDoenca;
  novaLinha.appendChild(colTipoDoenca);

  const colEstado = document.createElement("td");
  colEstado.textContent = estado;
  novaLinha.appendChild(colEstado);

  const colResultado = document.createElement("td");
  colResultado.textContent = resultado;
  novaLinha.appendChild(colResultado);

  // Cria um botão para "Ver Receita"
  const btnVerReceita = document.createElement("button");
  btnVerReceita.textContent = "Ver Receita";
  btnVerReceita.classList.add("btn", "btn-primary");
  btnVerReceita.addEventListener("click", function () {
    listarReceita(receita);
  })

  // Adiciona classes Bootstrap
  btnVerReceita.setAttribute("data-bs-toggle", "modal"); // Define o atributo data-bs-toggle para abrir a modal
  btnVerReceita.setAttribute("data-bs-target", "#receitaModal");

  // Define o ID da modal alvo


  const colHospital = document.createElement("td");
  colHospital.textContent = hospital;
  novaLinha.appendChild(colHospital);

  const colMedico = document.createElement("td");
  colMedico.textContent = medico;
  novaLinha.appendChild(colMedico);

  const colVerReceita = document.createElement("td");
  colVerReceita.appendChild(btnVerReceita);
  novaLinha.appendChild(colVerReceita);
  tbody.appendChild(novaLinha);

}

//usei
function listarReceita(receita) {
  // Seleciona o elemento tbody onde as linhas serão adicionadas
  for (cont = 0; cont < receita.medicamentos.length; cont++) {
    listarMedicosDaReceita(receita.medicamentos[cont].nome, receita.medicamentos[cont].quantidade, receita.medicamentos[cont].numero_vezes_dia, receita.medicamentos[cont].horas)
  }
  $("#receitaModal").modal("show")
}


//usei
function listarMedicosDaReceita(nome, quantidade, numeroVezes, horas) {
  var tbody = document.getElementById("receitaContent");
  // Cria uma nova linha na tabela
  var row = document.createElement("tr");
  // Adiciona células à linha
  var cell1 = document.createElement("td");
  cell1.textContent = nome;
  row.appendChild(cell1);
  var cell2 = document.createElement("td");
  cell2.textContent = quantidade;
  row.appendChild(cell2);
  var cell3 = document.createElement("td");
  cell3.textContent = numeroVezes;
  row.appendChild(cell3);
  var cell4 = document.createElement("td");
  cell4.textContent = horas;
  row.appendChild(cell4);
  // Adiciona a linha ao tbody
  tbody.appendChild(row);
}


//usei
function pegarMeuHistorico() {
  user = JSON.parse(localStorage.getItem("user"));

  fetch(url + "/api/user/pegarHistoricoUser/" + user.user[0].id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.diagnosticos;
      try {
        if (retorno.length > 0) {
          for (cont = 0; cont < retorno.length; cont++) {
            criarTabelaHistorico(retorno[cont].data, retorno[cont].nome_doenca, retorno[cont].tipo_doenca, retorno[cont].estado, retorno[cont].receita, retorno[cont].receita.descricao, retorno[cont].pclinico.instituicao.nome, retorno[cont].pclinico.user.nome)
          }
        }
      } catch (error) {
        console.log(error)
      }

      try {
        retorno = data.marcacoes
        console.log(retorno)
        if (retorno.length > 0) {
          for (coont = 0; cont < retorno.length; cont++) {
            criarTabelaHistorico(retorno[cont].data_escolhida, retorno[cont].descricao, (retorno[cont].receita == null) ? "Aguarde" : retorno[cont].receita.descricao, "", (retorno[cont].receita != null) ? retorno[cont].receita : 0, (retorno[cont].receita != null) ? retorno[cont].receita.descricao : "Aguarde", retorno[cont].instituicao.nome, (retorno[cont].pclinico != null) ? retorno[cont].pclinico.user.nome : "Aguarde")
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function pegarMarcacoesParaUmMedico() {
  user = JSON.parse(localStorage.getItem("user"));
  id = user.user[0].pclinico.id
  fetch(url + "/api/marcacao_user/pegarMarcacoesUsersPorPessoalClinico/" + id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.marcacoes_users;
      try {
        if (retorno.length > 0) {
          for (cont = 0; cont < retorno.length; cont++) {
            if (retorno[cont].tipo_servico == "consulta") {
              pegarMarcacoesMedicoElistar(retorno[cont].user.imagem, retorno[cont].user.nome, retorno[cont].consulta.nome + " " + retorno[cont].consulta.nome, retorno[cont].tipo_servico, retorno[cont].descricao, retorno[cont].data_escolhida + " " + retorno[cont].hora_escolhida)
            } else {
              pegarMarcacoesMedicoElistar(retorno[cont].user.imagem, retorno[cont].user.nome, retorno[cont].exame.nome, retorno[cont].tipo_servico, retorno[cont].descricao, retorno[cont].data_escolhida + " " + retorno[cont].hora_escolhida)
            }

          }
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function listarMinhasAgenda(dataStart,dataFim,horaInicio,HoraFim) {
  var novaLinha = document.createElement("tr");

  // Adicione as células à linha
  var celulaDataInicio = document.createElement("td");
  celulaDataInicio.textContent = dataStart;
  novaLinha.appendChild(celulaDataInicio);

  var celulaHoraInicio = document.createElement("td");
  celulaHoraInicio.textContent = horaInicio;
  novaLinha.appendChild(celulaHoraInicio);

  var celulaDataFim = document.createElement("td");
  celulaDataFim.textContent = dataFim
  novaLinha.appendChild(celulaDataFim);

  var celulaHoraFim = document.createElement("td");
  celulaHoraFim.textContent = HoraFim;
  novaLinha.appendChild(celulaHoraFim);

  // Adicione a nova linha ao tbody
  document.getElementById("paiEscalas").appendChild(novaLinha);
}

function pegarMinhasAgendas() {
  user = JSON.parse(localStorage.getItem("user"));
  id = user.user[0].pclinico.id
  fetch(url + "/api/escala/pegarEscalaPorPessoalClinico/" + id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.escalas;
      try {
        if (retorno.length > 0) {
          for (cont = 0; cont < retorno.length; cont++) {
              listarMinhasAgenda(retorno[cont].data_inicio,retorno[cont].data_fim,retorno[cont].hora_inicio,retorno[cont].hora_fim)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}


//usei
function pegarMarcacoesMedicoElistar(imagem, nomePaciente, nomeServico, tipoServico, descricao, dataHora) {
  // Criação do elemento <tr>
  var tr = document.createElement("tr");

  // Criação do elemento <td> para a imagem
  var tdImg = document.createElement("td");

  // Criação da imagem e atribuição dos atributos src e alt
  var img = document.createElement("img");
  img.src = url + "/api/imagem/" + imagem;
  img.alt = "Paciente";

  // Criação do parágrafo para o nome do paciente
  var namePara = document.createElement("p");
  namePara.textContent = nomePaciente;

  // Adiciona a imagem e o parágrafo ao <td>
  tdImg.appendChild(img);
  tdImg.appendChild(namePara);

  // Adiciona o <td> à <tr>
  tr.appendChild(tdImg);

  // Criação do segundo <td> para o tipo sanguíneo
  var tdBloodType = document.createElement("td");
  var bloodTypePara = document.createElement("p");
  bloodTypePara.textContent = nomeServico;
  tdBloodType.appendChild(bloodTypePara);
  tr.appendChild(tdBloodType);

  // Criação do terceiro <td> para o tipo de exame
  var tdExam = document.createElement("td");
  var examPara = document.createElement("p");
  examPara.textContent = tipoServico;
  tdExam.appendChild(examPara);
  tr.appendChild(tdExam);


  var descricaoTd = document.createElement("td");
  descricaoTd.textContent = descricao;
  tr.appendChild(descricaoTd);
  // Criação do quarto <td> para a data e hora
  var tdDateTime = document.createElement("td");
  tdDateTime.textContent = dataHora;
  tr.appendChild(tdDateTime);

  // Adiciona a <tr> à tabela
  document.querySelector("#paiMarcaoes").appendChild(tr);

}


//usei
function fazerLogin() {
  const senha = document.getElementById("senha").value;
  const nAcesso = document.getElementById("nAcesso").value;
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;

  $('#loadingModal').modal('show');

  const dadosEnviar = {
    login: nAcesso,
    password: senha
  };

  fetch(url + "/api/user/login", {  // Adicionado o prefixo 'user'
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: JSON.stringify(dadosEnviar)
  })
    .then(response => {
      if (!response.ok) {
        $('#modalErro').modal('show');
        $('#loadingModal').modal('hide');
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      user = data
      guardarUser(user)
      $('#loadingModal').modal('hide');
      if (user.user[0].categoria == "Utente") {
        document.location.href = "admin/instituicao.html"
      } else if (user.user[0].categoria == "pessoalclinico") {
        document.location.href = "pessoalClinico/pessoalClinico.html"
      } else {
        document.location.href = "adminInstituicao/agendamento.html"
      }
      //document.location.href = "../pages/dist/index.html"
    })
    .catch(error => {
      $('#loadingModal').modal('hide');
      $('#modalErro').modal('show');
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function cadastrarOuEditar(valor) {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  const formData = new FormData();

  formData.append('nome', document.getElementById("nome").value);
  formData.append('email', document.getElementById("email").value);
  formData.append('password', document.getElementById("password").value);
  formData.append('bi', document.getElementById("bi").value);
  formData.append('passaporte', document.getElementById("passaporte").value);
  formData.append('data_nascimento', document.getElementById("data_nascimento").value);
  formData.append('categoria', document.getElementById("categoria").value);
  formData.append('genero', document.getElementById("genero").value);
  formData.append('telefone_principal', document.getElementById("telefone_principal").value);
  //formData.append('login', document.getElementById("login").value);
  formData.append('password_confirmation', document.getElementById("password_confirmation").value);
  formData.append('telefone_alternativo', document.getElementById("telefone_alternativo").value);
  formData.append('codigo_postal', document.getElementById("codigo_postal").value);
  if (document.getElementById("categoria").value != "utente") {
    formData.append('especialidade_id', document.getElementById("especialidade").value);
    user = JSON.parse(localStorage.getItem("user"))
    formData.append('instituicao_id', user.user[0].admin.instituicao_id);
  }
  const imagemInput = document.getElementById('inputFile');
  if (imagemInput.files.length > 0) {
    formData.append('imagem', imagemInput.files[0]);
  }

  if (valor == 1) {
    fetch(url + "/api/user/register", {
      method: 'POST',
      headers: {
        "ngrok-skip-browser-warning": "69420",
        'X-CSRF-TOKEN': tokenCSRF
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          alert(response.status)
          throw new Error(`Erro na resposta da API: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        alert(error.message)
        console.error('Erro na solicitação:', error.message);
      });
  } else {
    user = JSON.parse(localStorage.getItem("user"))
    idUser = user.user[0].id;
    formData.append('user_id', idUser);
    token = user.token

    fetch(url + "/api/user/update", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
        'X-CSRF-TOKEN': tokenCSRF
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        data.user.token = JSON.parse(localStorage.getItem("user")).token
        guardarUser(data.user)
      })
      .catch(error => {

        console.error('Erro na solicitação:', error.message);
      });
  }
  //console.log(formData)


}

function cadastrarInstituicao() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  const formData = new FormData();
  formData.append('nome', document.getElementById("nome").value);
  formData.append('email', document.getElementById("email").value);
  formData.append('password', document.getElementById("password").value);
  formData.append('descricao', document.getElementById("descricao").value);
  formData.append('telefone_principal', document.getElementById("telefone_principal").value);
  formData.append('password_confirmation', document.getElementById("password_confirmation").value);
  formData.append('telefone_alternativo', document.getElementById("telefone_alternativo").value);
  formData.append('codigo_postal', document.getElementById("codigo_postal").value);
  formData.append('distrito_id', document.getElementById("distrito").value);
  //formData.append('login', document.getElementById("login").value);
  const imagemInput = document.getElementById('inputFile');
  if (imagemInput.files.length > 0) {
    formData.append('imagem', imagemInput.files[0]);
  }
  fetch(url + "/api/instituicao/create", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: formData,
  })
    .then(response => {
      $('#loadingModal').modal('hide');
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      $('#loadingModal').modal('hide');
      console.error('Erro na solicitação:', error.message);
    });
}

function TipoDeCategoria() {
  categoria = document.getElementById("categoria").value;
  especie = document.getElementById("especie");
  if (categoria == "pessoalclinico") {
    especie.style.display = "block";
  } else {
    especie.style.display = "none";
  }
}

function pegarTodosUtentes() {

  fetch(url + "/api/user/getAllUtentes", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

function createAdivInstituicao(nome, descricao, id, provincia, municipio, destrito, imagem) {
  // Cria um elemento div

  var divInstituicao = document.createElement("div");
  divInstituicao.className = "instituicao";

  // Cria um elemento div para o cabeçalho
  var divHeader = document.createElement("div");
  divHeader.className = "header";
  var h2 = document.createElement("h2");
  h2.textContent = nome;
  divHeader.appendChild(h2);
  divInstituicao.appendChild(divHeader);

  // Cria um elemento div para a imagem da instituição
  var divImagem = document.createElement("div");
  divImagem.className = "imge_instituicoa";
  var img = document.createElement("img");
  img.src = url + "/api/imagem/" + imagem;
  img.alt = "";
  divImagem.appendChild(img);
  divInstituicao.appendChild(divImagem);

  // Cria um elemento div para o corpo
  var divBody = document.createElement("div");
  divBody.className = "body";
  var p = document.createElement("p");
  //p.style.textAlign="justify"
  p.innerHTML = "A " + nome + " esta localizado na provincia de <b>" + provincia + "</b> no monicipio de <b> " + municipio + " </b> no distrito de <b> " + destrito + " </b> " + descricao;
  divBody.appendChild(p);
  divInstituicao.appendChild(divBody);

  // Cria um elemento div para o rodapé
  var divFooter = document.createElement("div");
  divFooter.className = "footer";
  var a = document.createElement("a");
  a.href = "perfilhospital.html?idHospital=" + id;
  a.className = "btn btn_vermais";
  a.textContent = "Saber mais";
  divFooter.appendChild(a);
  divInstituicao.appendChild(divFooter);

  // Adiciona o elemento divInstituicao ao elemento body do documento
  return divInstituicao;

}


//usei
function pegarTodasInstituicoes() {
  fetch(url + "/api/instituicao/pegarTodos", {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      //$("#pai").empty();
      divPai = document.getElementById("pai");
      dados = data.instituicoes
      for (let cont = 0; cont < dados.length; cont++) {
        document.getElementById("lista_instituicao").appendChild(createAdivInstituicao(dados[cont].nome, dados[cont].Descricao, dados[cont].id, dados[cont].distrito.municipio.provincia.nome, dados[cont].distrito.municipio.nome, dados[cont].distrito.nome, dados[cont].imagem))
      }


    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

/*
  function perfilIntituicao(tag) {
    pegarUmaisntituicao(tag.name)
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "block";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
  }
*/

function ConsultaInstituicao(idInstituicao, idMedico, dataInicio, horaInicio) {
  document.getElementById("preco").textContent = "";
  document.getElementById("titulo").innerHTML = " Selecione o Tipo de Consulta:"
  document.getElementById("idPreco").innerHTML = "Valor da consulta:"
  pegarTodosConsultaSeclectDeumaInstituicao(idInstituicao);
  let popup = document.getElementById('popup')
  popup.classList.add('open-popup')
  document.getElementById("efectuarServicoBTN").addEventListener("click", function () {
    user = JSON.parse(localStorage.getItem("user"));
    idUser = user.user[0].id;
    const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
    data = new Date();
    if (idMedico == 0) {
      var jsonData = {
        tipo_servico: 'consulta',
        data: `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`,
        user_id: idUser,
        hora: `${data.getHours()}:${data.getMinutes()}`,
        instituicao_id: idInstituicao,
        consulta_id: document.getElementById("tipoServico").value,
        descricao: document.getElementById("descricaoSentindo").value
      };
    } else {
      var jsonData = {
        tipo_servico: 'consulta',
        data: `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`,
        user_id: idUser,
        hora: `${data.getHours()}:${data.getMinutes()}`,
        instituicao_id: idInstituicao,
        consulta_id: document.getElementById("tipoServico").value,
        descricao: document.getElementById("descricaoSentindo").value,
        pessoalclinico_id: idMedico,
        data_escolhida: dataInicio,
        hora_escolhida: horaInicio
      };
    }


    fetch(url + "/api/marcacao_user/create", {
      method: 'POST',
      headers: {
        "ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': tokenCSRF
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => {
        //$('#loadingModal').modal('hide');
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        $('#loadingModal').modal('hide');
        console.log(data)
      })
      .catch(error => {
        //$('#loadingModal').modal('hide');
        $('#loadingModal').modal('hide');
        console.error('Erro na solicitação:', error.message);
      });
  });

}

function exameInstituicao(idInstituicao, idMedico, dataInicio, horaInicio) {
  document.getElementById("preco").textContent = "";
  document.getElementById("titulo").innerHTML = "Selecione o Tipo de Exame:"
  document.getElementById("idPreco").innerHTML = "Valor do exame:"
  pegarTodosExameSeclectDeumaInstituicao(idInstituicao);

  let popup = document.getElementById('popup')
  popup.classList.add('open-popup')

  document.getElementById("efectuarServicoBTN").addEventListener("click", function () {
    user = JSON.parse(localStorage.getItem("user"));
    idUser = user.user[0].id;
    $('#loadingModal').modal('show');

    const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
    data = new Date();
    if (idMedico == 0) {

      var jsonData = {
        tipo_servico: 'exame',
        data: `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`,
        user_id: idUser,
        hora: `${data.getHours()}:${data.getMinutes()}`,
        instituicao_id: idInstituicao,
        exame_id: document.getElementById("tipoServico").value,
        descricao: document.getElementById("descricaoSentindo").value
      };
    } else {
      var jsonData = {
        tipo_servico: 'exame',
        data: `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`,
        user_id: idUser,
        hora: `${data.getHours()}:${data.getMinutes()}`,
        instituicao_id: idInstituicao,
        exame_id: document.getElementById("tipoServico").value,
        descricao: document.getElementById("descricaoSentindo").value,
        pessoalclinico_id: idMedico,
        data_escolhida: dataInicio,
        hora_escolhida: horaInicio
      };

    }
    fetch(url + "/api/marcacao_user/create", {
      method: 'POST',
      headers: {
        "ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': tokenCSRF
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => {
        //$('#loadingModal').modal('hide');
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        $('#loadingModal').modal('hide');
        console.log(data)
      })
      .catch(error => {
        //$('#loadingModal').modal('hide');
        $('#loadingModal').modal('hide');
        console.error('Erro na solicitação:', error.message);
      });
  });

}



function pegarUmaisntituicao() {
  /*user= JSON.parse(localStorage.getItem("user"))
  idInstituicaoo=user.user[0].admin.instituicao_id;*/
  queryString = window.location.search;
  searchParams = new URLSearchParams(queryString);
  getUrl = Object.fromEntries(searchParams.entries());
  fetch(url + "/api/instituicao/pegarInstituicao/" + getUrl.idHospital, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //divPai = document.getElementById("pai");
      dados = data.instituicao
      document.getElementById("imagemInstituicao").src = url + "/api/imagem/" + dados.imagem
      document.getElementById("nomeHospital").innerHTML = dados.nome;
      document.getElementById("emailHospital").innerHTML = dados.email;
      document.getElementById("descricaoHospital").innerHTML = dados.Descricao;
      document.getElementById("numeroHospital").innerHTML = dados.contacto.telefone_principal + "/" + dados.contacto.telefone_alternativo;
      document.getElementById("ConsultaIntituicao").addEventListener("click", function () {
        ConsultaInstituicao(getUrl.idHospital, 0, null, null);
      })
      document.getElementById("exameInstituicao").addEventListener("click", function () {
        exameInstituicao(getUrl.idHospital, 0, null, null);
      })


      if (dados.pclinicos.length > 0) {
        dados = dados.pclinicos;
        // console.log(dados)
        //$("paiMedicos").empty();
        paiMedicos = document.getElementById("paiMedicos")
        for (cont = 0; cont < dados.length; cont++) {
          paiMedicos.appendChild(criarMedicos(dados[cont].id, dados[cont].user.nome, dados[cont].especialidade.nome, dados[cont].user.contacto.telefone_principal, dados[cont].user.imagem));
        }
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

function criarMedicos(id, nome, especialidade, contacto, imagem) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const img = document.createElement("img");
  img.src = url + "/api/imagem/" + imagem;
  img.alt = "Paciente";
  const p = document.createElement("p");
  p.textContent = nome;
  td1.appendChild(img);
  td1.appendChild(p);
  tr.appendChild(td1);
  const td2 = document.createElement("td");
  td2.textContent = especialidade;
  tr.appendChild(td2);
  const td3 = document.createElement("td");
  const btnConsulta = document.createElement("button");
  btnConsulta.className = "btnConsulata btn";
  btnConsulta.textContent = "Consulta";
  queryString = window.location.search;
  searchParams = new URLSearchParams(queryString);
  getUrl = Object.fromEntries(searchParams.entries());

  btnConsulta.onclick = function () {
    agendarComMedicoApi(getUrl.idHospital, id, nome, "consulta")
  };
  td3.appendChild(btnConsulta);
  tr.appendChild(td3);
  const td4 = document.createElement("td");
  const btnExame = document.createElement("button");
  btnExame.className = "btnExame btn";
  btnExame.textContent = "Exame";
  btnExame.onclick = function () {
    agendarComMedicoApi(getUrl.idHospital, id, nome, "exame")
  };
  td4.appendChild(btnExame);
  tr.appendChild(td4);
  const td5 = document.createElement("td");
  const span = document.createElement("span");
  span.className = "status completed";
  span.textContent = contacto;
  td5.appendChild(span);
  tr.appendChild(td5);
  // Adicionando a linha à tabela
  return tr
}



//usei
function criarTabelaRcu(nome, status) {
  var tr = document.createElement("tr");

  var tdNome = document.createElement("td");
  var pNome = document.createElement("p");
  pNome.textContent = nome;
  tdNome.appendChild(pNome);

  var tdStatus = document.createElement("td");
  var spanStatus = document.createElement("span");
  spanStatus.textContent = status;
  spanStatus.className = "status completed"; // Adicione a classe "status" e "completed"
  tdStatus.appendChild(spanStatus);

  tr.appendChild(tdNome);
  tr.appendChild(tdStatus);

  return tr;
  //document.getElementById("agendandoComMedico").appendChild(tr);

}


//usei
function getMyRCU() {
  user = JSON.parse(localStorage.getItem("user"));
  idUser = user.user[0].id;

  fetch(url + "/api/rcu/pegarPorID_USER/" + idUser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.rcu;
      if (retorno.estado == 0) {
        estado = "Saudável"
      } else if (retorno.estado == 1) {
        estado = "doente"
      } else {
        estado = "falecido"
      }
      document.getElementById("tableRCU").appendChild(criarTabelaRcu(retorno.grupo_sanguineo, estado))
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


//usei
function tragaOsMeusDados() {
  user = JSON.parse(localStorage.getItem("user"));
  idUser = user.user[0].id;
  document.getElementById("imagemExibida").src = url + "/api/imagem/" + user.user[0].imagem
  document.getElementById("nome").value = user.user[0].nome
  document.getElementById("email").value = user.user[0].email
  document.getElementById("password").value = user.user[0].password
  document.getElementById("bi").value = user.user[0].bi
  document.getElementById("passaporte").value = user.user[0].passaporte
  document.getElementById("data_nascimento").value = user.user[0].data_nascimento
  document.getElementById("genero").value = user.user[0].genero
  document.getElementById("telefone_principal").value = user.user[0].contacto.telefone_principal
  document.getElementById("telefone_alternativo").value = user.user[0].contacto.telefone_alternativo
  document.getElementById("codigo_postal").value = user.user[0].contacto.codigo_postal
  //document.getElementById("especialidade").value=user.user[0].*;
}

//usei
function getMyAgendamento() {
  user = JSON.parse(localStorage.getItem("user"));
  idUser = user.user[0].id;

  fetch(url + "/api/marcacao_user/pegarHistoricoMarcacoesUser/" + idUser, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.marcacoes;

      for (let a = 0; a < retorno.length; a++) {
        try {
          document.getElementById("tabelaAgendamento").appendChild(ListarMinhaAgenda(retorno[a].tipo_servico, retorno[a].pclinico.especialidade.nome, retorno[a].data, retorno[a].hora, retorno[a].pclinico.user.nome, retorno[a].instituicao.nome, retorno[a].estado, (retorno[a].data_escolhida == null) ? "Aguarde" : retorno[a].data_escolhida, (retorno[a].hora_escolhida == null) ? "Aguarde" : retorno[a].hora_escolhidaa))
        } catch (error) {
          document.getElementById("tabelaAgendamento").appendChild(ListarMinhaAgenda(retorno[a].tipo_servico, "Aguarde", retorno[a].data, retorno[a].hora, "Aguarde", retorno[a].instituicao.nome, retorno[a].estado, (retorno[a].data_escolhida == null) ? "Aguarde" : retorno[a].data_escolhida, (retorno[a].hora_escolhida == null) ? "Aguarde" : retorno[a].hora_escolhida))
        }

      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

//usei
function ListarMinhaAgenda(servico, especialidade, data, hora, clinico, hospital, estado, data1, hora1) {
  // Crie um elemento tr (linha da tabela)
  var tr = document.createElement("tr");
  tr.style.display = "table-row"
  // Crie um elemento td para o tipo de serviço (Exame)
  var tdTipoServico = document.createElement("td");
  var pTipoServico = document.createElement("p");
  pTipoServico.textContent = servico;
  tdTipoServico.appendChild(pTipoServico);

  var tdEspecialidade = document.createElement("td");
  var pEspecialidade = document.createElement("p");
  pEspecialidade.textContent = especialidade;
  tdEspecialidade.appendChild(pEspecialidade);

  // Crie um elemento td para a data e hora
  var tdDataHora = document.createElement("td");
  tdDataHora.textContent = data + " " + hora;
  var tdDataHora1 = document.createElement("td");
  if (data1 == "Aguarde") {
    tdDataHora1.textContent = data1
  } else {
    tdDataHora1.textContent = data1 + " " + hora1;
  }

  // Crie elementos td para os nomes dos médicos
  var tdMedico1 = document.createElement("td");
  tdMedico1.textContent = clinico;
  var tdMedico2 = document.createElement("td");
  tdMedico2.textContent = hospital;
  // Crie um elemento td para o status
  var tdStatus = document.createElement("td");
  var spanStatus = document.createElement("span");

  if (estado == 0) {
    spanStatus.textContent = "marcado";
  } else if (estado == 1) {
    spanStatus.textContent = "confirmado pela instituição";
  } else {
    spanStatus.textContent = "atendido";
  }


  //spanStatus.className = "status completed"; // Adicione a classe "status" e "completed"
  tdStatus.appendChild(spanStatus);

  // Adicione os elementos td à linha tr
  tr.appendChild(tdTipoServico);
  tr.appendChild(tdEspecialidade);
  tr.appendChild(tdDataHora);
  tr.appendChild(tdMedico1);
  tr.appendChild(tdMedico2);
  tr.appendChild(tdDataHora1);
  tr.appendChild(tdStatus);

  return tr;

}

/*
  function criarCardMedico(idInstituicao, id, nome, especialidade, contacto, imagemSrc) {
    // Criar elementos HTML
    let divCol = document.createElement('div');
    divCol.className = 'col-md-3';
    divCol.style.width = "40%";


    let divCard = document.createElement('div');
    divCard.className = 'card mb-4';

    let img = document.createElement('img');
    img.src = url + "/api/imagem/" + imagemSrc;
    img.alt = nome;
    img.className = 'card-img-top';

    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';

    let h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = 'Dr. ' + nome;

    let pEspecialidade = document.createElement('p');
    pEspecialidade.className = 'card-text';
    pEspecialidade.textContent = 'Especialidade: ' + especialidade;

    let pContacto = document.createElement('p');
    pContacto.className = 'card-text';
    pContacto.textContent = 'Contacto: ' + contacto;

    // Dropdown para Consulta e Exame
    let divDropdown = document.createElement('div');
    divDropdown.className = 'nav-button dropdown';
    divDropdown.style.zIndex = '200';

    let aDropdown = document.createElement('a');
    aDropdown.className = 'dropdown-toggle';
    aDropdown.id = 'consultasDropdown';
    aDropdown.role = 'button';
    aDropdown.setAttribute('data-bs-toggle', 'dropdown');
    aDropdown.setAttribute('aria-haspopup', 'true');
    aDropdown.setAttribute('aria-expanded', 'false');
    aDropdown.innerHTML = '<i></i><span>Agendar</span>';

    let divDropdownMenu = document.createElement('div');
    divDropdownMenu.className = 'dropdown-menu';
    divDropdownMenu.setAttribute('aria-labelledby', 'consultasDropdown');

    let aConsulta = document.createElement('a');
    aConsulta.className = 'dropdown-item';
    //aConsulta.href = 'consulta/'+id;
    aConsulta.addEventListener("click", function () {
      //alert(id)
      agendarComMedicoApi(idInstituicao, id, nome, "consulta")
      //alert(id)
    })

    aConsulta.innerHTML = '<i class="fas fa-flask"></i> Consulta';

    let aExame = document.createElement('a');
    aExame.className = 'dropdown-item';
    aExame.setAttribute("name", id);
    aExame.addEventListener("click", function () {
      agendarComMedicoApi(idInstituicao, id, nome, "exame")
    })

    aExame.innerHTML = '<i class="fas fa-user-md"></i> Exame';

    // Adicionar os elementos ao DOM
    divDropdownMenu.appendChild(aConsulta);
    divDropdownMenu.appendChild(aExame);

    divDropdown.appendChild(aDropdown);
    divDropdown.appendChild(divDropdownMenu);

    divCardBody.appendChild(h5);
    divCardBody.appendChild(pEspecialidade);
    divCardBody.appendChild(pContacto);
    divCardBody.appendChild(divDropdown);

    divCard.appendChild(img);
    divCard.appendChild(divCardBody);

    divCol.appendChild(divCard);

    return divCol;
  }
*/



function criarElemento(tag, classe, conteudo) {
  const elemento = document.createElement(tag);
  elemento.setAttribute("class", classe);
  if (conteudo) {
    elemento.innerHTML = conteudo;
  }
  document.body.appendChild(elemento);
  return elemento;
}

function createInfoDiv(label, value) {
  var infoDiv = document.createElement("div");
  infoDiv.classList.add("mb-3");
  infoDiv.innerHTML = "<strong>" + label + "</strong> " + value;
  return infoDiv;
}

function createActionButton(text, btnClass, extraClass, dataToggle, dataTarget) {
  var button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", btnClass);
  if (extraClass) button.classList.add(extraClass);
  if (dataToggle) button.setAttribute("data-toggle", dataToggle);
  if (dataTarget) button.setAttribute("data-target", dataTarget);
  button.textContent = text;
  return button;
}

function createNavigationButton(className, href, dataSlide) {
  var button = document.createElement("a");
  button.classList.add(className);
  button.href = href;
  button.role = "button";
  button.setAttribute("data-slide", dataSlide);

  var spanIcon = document.createElement("span");
  spanIcon.classList.add("carousel-control-prev-icon");
  spanIcon.setAttribute("aria-hidden", "true");

  var spanText = document.createElement("span");
  spanText.classList.add("sr-only");
  spanText.textContent = (dataSlide === "prev") ? "Anterior" : "Próximo";

  button.appendChild(spanIcon);
  button.appendChild(spanText);

  return button;
}

function criarMarcacoes() {
  $('#loadingSpinnerContainer').hide();
  div = document.getElementById("marcacoes");
  user = JSON.parse(localStorage.getItem("user"))
  idInstituicao = user.user[0].admin.instituicao_id
  fetch(url + "/api/marcacao_user/pegarMarcacoesUsersPorInstituicao/" + idInstituicao, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      retorno = data.marcacoes;
      for (cont = 0; cont < retorno.length; cont++) {
        if (retorno[cont].tipo_servico == "consulta") {
          listarMarcacoes(retorno[cont].id, data.escalas, retorno[cont].user.imagem, retorno[cont].pclinico, retorno[cont].descricao, retorno[cont].consulta.nome, retorno[cont].consulta.tipo, retorno[cont].data, (retorno[cont].estado) ? "Pendente" : "Confirmado", retorno[cont].preco, retorno[cont].tipo_servico, retorno[cont].hora, retorno[cont].user.nome, retorno[cont].user.id)
        } else {
          listarMarcacoes(retorno[cont].id, data.escalas, retorno[cont].user.imagem, retorno[cont].pclinico, retorno[cont].descricao, retorno[cont].exame.nome, retorno[cont].exame.tipo, retorno[cont].data, (retorno[cont].estado) ? "Pendente" : "Confirmado", retorno[cont].preco, retorno[cont].tipo_servico, retorno[cont].hora, retorno[cont].user.nome, retorno[cont].user.id)
        }

      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function listarMarcacoes(id, escalas, imagemUtente, pclinico, descricao, nome, tipo, data, estado, preco, servico, hora, userName, id) {
  // Criação dos elementos
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var img = document.createElement("img");
  var p = document.createElement("p");
  var td2 = document.createElement("td");
  var tdNome = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var button = document.createElement("button");

  // Atributos e conteúdo dos elementos
  img.src = url + "/api/imagem/" + imagemUtente;
  img.alt = "Paciente";
  p.textContent = userName;
  td1.appendChild(img);
  td1.appendChild(p);
  tdNome.textContent = nome
  td2.textContent = servico;
  td3.textContent = preco;
  button.textContent = "detalhes";
  button.className = "btn btn-primary";

  if (pclinico == null) {
    for (cont == 0; cont < escalas.length; cont++) {
      adicionarMedicoNaMarcacao(escalas[cont].pclinico.id, escalas[cont].pclinico.user.nome, escalas[cont].pclinico.especialidade.nome, "", escalas[cont].pclinico.user.imagem)
    }
  } else {
    document.getElementById("medicos").style.display = "none"
  }


  // Adiciona o evento de clique ao botão
  button.addEventListener("click", function () {
    limpatela();
    verPerfilUser(id)
    document.getElementById("data").innerHTML = "Data: " + data;
    document.getElementById("hora").innerHTML = "Hora: " + hora;
    document.getElementById("Estado").innerHTML = "Estado: " + estado;
    document.getElementById("descricao").innerHTML = "Descrição: " + descricao;
    document.getElementById("servico").innerHTML = "Tipo: " + tipo;
    if (pclinico != null) {
      idMedico = pclinico.id
      document.getElementById("medicoAtender").style.display = "block"
      document.getElementById("nomeMedico").innerHTML = "Nome do Médico: " + pclinico.user.nome;
      document.getElementById("especialidade").innerHTML = "Especialidade: " + pclinico.especialidade.nome;
    } else {
      document.getElementById("medicos").style.display = "block"
      document.getElementById("medicoAtender").style.display = "none"
    }

    $("#myModal").modal("show");

    document.getElementById("aprovar").addEventListener("click", function () {
      aprovarMarcacao(id, idMedico)
    })
  });

  //document.getElementById("loadingSpinner").style.display = "block";
  td4.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(tdNome);
  tr.appendChild(td3);
  tr.appendChild(td4);
  document.getElementById("todasAsMarcacoes").appendChild(tr);
}



function adicionarMedicoNaMarcacao(id, nome, especialidade, contacto, imagemSrc) {
  var tabela = document.getElementById("medicosMarcacao");
  var novaLinha = tabela.insertRow(tabela.rows.length);
  var colunaImagem = novaLinha.insertCell(0);
  var colunaNome = novaLinha.insertCell(1);
  var colunaEspecialidade = novaLinha.insertCell(2);
  //var colunaContacto = novaLinha.insertCell(3);
  var colunaBotao = novaLinha.insertCell(3);
  colunaImagem.innerHTML = '<img src="' + url + '/api/imagem/' + imagemSrc + '" alt="Imagem do Médico" class="img-thumbnail img-round">';
  colunaNome.innerHTML = nome;
  colunaEspecialidade.innerHTML = especialidade;
  //colunaContacto.innerHTML = contacto;
  colunaBotao.innerHTML = `<input type="checkbox" class="custom-checkbox" id="checkbox1" onclick="guardarMedico(${id})">`;
  return true;
}


function aprovarMarcacao(idMarcacao, idMedico) {
  if (idMedico != null) {
    user = JSON.parse(localStorage.getItem("user"))
    idUser = user.user[0].id;
    token = user.token

    fetch(url + "/api/marcacao_user/confirmarMarcacao/" + idMarcacao + "/" + idMedico, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {

        console.error('Erro na solicitação:', error.message);
      });
  } else {
    alert("medico nao selecionado")
  }

}

function guardarMedico(id) {
  idMedico = id
}

function limpatela() {
  ps = document.querySelectorAll("#ps p")
  for (let cont = 0; cont < ps.length; cont++) {
    ps[cont].innerHTML = "";
  }
  return true
}


function verPerfilUser(id) {
  fetch(url + "/api/user/show/" + id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      user = data.user;
      // document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("imagemMeuPerfil").src = url + "/api/imagem/" + user.imagem
      document.getElementById("MeuNome").innerHTML = "Nome: " + user.nome;
      document.getElementById("MeuGenero").innerHTML = "Gênero: " + user.genero;
      document.getElementById("MeuBi").innerHTML = "BI: " + user.bi;
      document.getElementById("MeuEmail").innerHTML = "Email: " + user.email;
      document.getElementById("MeuNascimento").innerHTML = "Data de Nascimento: " + user.data_nascimento;
      document.getElementById("MeuTelefone").innerHTML = "Contato: " + user.contacto.telefone_principal + "/" + user.telefone_alternativo;
    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}


function adicionarMedico(imagem, nome, especialidade) {
  var tabela = document.getElementById("tabelaMedicos").getElementsByTagName('tbody')[0];
  var novaLinha = tabela.insertRow(tabela.rows.length);

  var celulaImagem = novaLinha.insertCell(0);
  var celulaNome = novaLinha.insertCell(1);
  var celulaEspecialidade = novaLinha.insertCell(2);
  var celulaBotao = novaLinha.insertCell(3);

  celulaImagem.innerHTML = '<img src="' + imagem + '" alt="Imagem do Médico" class="rounded-circle" width="50">';
  celulaNome.innerHTML = nome;
  celulaEspecialidade.innerHTML = especialidade;
  celulaBotao.innerHTML = '<button class="btn btn-success">Confirmar</button>';

}

//usei
function adicionarLinhaMedico(id, nome, especialidade, contacto, imagemSrc) {
  var tabela = document.getElementById("tabelaMedicosEscalar");
  var novaLinha = tabela.insertRow(tabela.rows.length);
  var colunaImagem = novaLinha.insertCell(0);
  var colunaNome = novaLinha.insertCell(1);
  var colunaEspecialidade = novaLinha.insertCell(2);
  var colunaContacto = novaLinha.insertCell(3);
  var colunaBotao = novaLinha.insertCell(4);
  colunaImagem.innerHTML = '<img src="' + url + '/api/imagem/' + imagemSrc + '" alt="Imagem do Médico" class="img-thumbnail img-round">';
  colunaNome.innerHTML = nome;
  colunaEspecialidade.innerHTML = especialidade;
  colunaContacto.innerHTML = contacto;
  colunaBotao.innerHTML = `<input type="checkbox" class="custom-checkbox" id="checkbox1" onclick="escalar(this, ${id})">`;
}

//usei
function escalar(input, id) {
  if (input == null && id == 0) {
    addEscala(pessoalClinico);
  } else {
    if (input.checked) {
      pessoalClinico.push(id);
    } else {
      indice = pessoalClinico.indexOf(id);
      if (indice !== -1) {
        pessoalClinico.splice(indice, 1);
      }
    }
  }
}
//usei
function addEscala(pessoalClinicos) {
  dataInicio = document.getElementById("dataInicio").value.split("T")[0];
  dataFim = document.getElementById("dataFim").value.split("T")[0];;
  horaInicio = document.getElementById("dataInicio").value.split("T")[1];
  horafim = document.getElementById("dataFim").value.split("T")[1];
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  data = new Date();
  user = JSON.parse(localStorage.getItem("user"))
  idInstituicao = user.user[0].admin.instituicao_id

  const jsonData = {
    data_inicio: dataInicio,
    data_fim: dataFim,
    hora_inicio: horaInicio,
    hora_fim: horafim,
    pessoalclinicosIds: pessoalClinicos,
    instituicao_id: idInstituicao
  };

  console.log(jsonData);

  fetch(url + "/api/escala/create", {
    method: 'POST',
    headers: {
      "ngrok-skip-browser-warning": "69420",
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': tokenCSRF
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      //$('#loadingModal').modal('hide');
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      //$('#loadingModal').modal('hide');
      console.error('Erro na solicitação:', error.message);
    });

}

function agendarComMedicoApi(idInstituicao, id, nome, servico) {
  $("#agendandoComMedico").empty();
  $("#modalAgendar").modal('show');
  fetch(url + "/api/escala/pegarEscalaPorPessoalClinico/" + id, {
    method: 'GET',
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      retorno = data.escalas;
      for (var i = 0; i < retorno.length; i++) {
        agendarComMedico(idInstituicao, servico, nome, id, retorno[i].data_inicio, retorno[i].data_fim, retorno[i].hora_inicio, retorno[i].hora_fim)
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

function agendarComMedico(idInstituicao, servico, nome, id, dataInicio, dataFim, horaInicio, horaFim) {

  document.getElementById("modalAgendarLabel").innerHTML = "Escala disponivel de " + servico + " do medico " + nome
  var tr = document.createElement('tr');
  var tdDataInicio = document.createElement('td');
  var tdDataFim = document.createElement('td');
  var tdHoraInicio = document.createElement('td');
  var tdHoraFim = document.createElement('td');
  var tdBotao = document.createElement('td');
  var btnAgendar = document.createElement('button');

  btnAgendar.className = 'btn btn-success';

  tdDataInicio.textContent = dataInicio;
  tdDataFim.textContent = dataFim;
  tdHoraInicio.textContent = horaInicio;
  tdHoraFim.textContent = horaFim;
  btnAgendar.textContent = 'Agendar';

  // Adicione os elementos à linha
  tdBotao.appendChild(btnAgendar);
  tr.appendChild(tdDataInicio);
  tr.appendChild(tdDataFim);
  tr.appendChild(tdHoraInicio);
  tr.appendChild(tdHoraFim);
  tr.appendChild(tdBotao);

  // Adicione a linha à tabela (substitua 'tableId' pelo ID da sua tabela)
  document.getElementById('agendandoComMedico').appendChild(tr);
  btnAgendar.addEventListener("click", function () {
    $("#modalAgendar").modal('hide');
    if (servico == 'exame') {
      exameInstituicao(idInstituicao, id, dataInicio, horaInicio)
    } else {
      ConsultaInstituicao(idInstituicao, id, dataInicio, horaInicio)
    }
  });
} 