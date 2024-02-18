var url = "https://42d2-105-172-196-233.ngrok-free.app";
var user = null
var apiProvincia = null
pessoalClinico = []


function guardarUser(user) {
  userConvertido = JSON.stringify(user);
  localStorage.setItem("user", userConvertido);
}

function getAllExames() {
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
      retorno = data.exames;
      $("#paiExames").empty();
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

function getAllConsulta() {
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
      retorno = data.consultas;
      $("#paiExames").empty();
      for (cont = 0; cont < retorno.length; cont++) {
        tr = document.createElement('tr');
        tdNome = document.createElement('td');
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

function getAllEspecialidade() {
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
      retorno = data.especialidades;
      $("#paiEspecialidade").empty();
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

function getMyMedico() {
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
      if (retorno) {
        $("#paiTbody").empty();
        for (cont = 0; cont < retorno.length; cont++) {

          let tr = document.createElement('tr');
          let tdImagem = document.createElement('td');
          let imagem = document.createElement('img');
          let tdNome = document.createElement('td');
          let tdEspecialidade = document.createElement('td');
          let tdNumero = document.createElement('td');
          let tdOpcoes = document.createElement('td');
          let dropdownDiv = document.createElement('div');
          let dropdownToggle = document.createElement('a');
          let dropdownMenu = document.createElement('div');
          let visualizarLink = document.createElement('a');
          let editarLink = document.createElement('a');
          let desabilitarLink = document.createElement('a');

          // Configurar atributos e conteúdo dos elementos
          imagem.src = url + "/api/imagem/" + retorno[cont].imagem;
          imagem.alt = 'imagem';
          imagem.width = 50;
          tdNome.textContent = retorno[cont].nome;
          tdEspecialidade.textContent = retorno[cont].pclinico.especialidade.nome;
          tdNumero.textContent = retorno[cont].contacto.telefone_principal;

          dropdownToggle.className = 'dropdown-toggle';
          dropdownToggle.setAttribute('id', 'consultasDropdown');
          dropdownToggle.setAttribute('role', 'button');
          dropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
          dropdownToggle.setAttribute('aria-haspopup', 'true');
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownToggle.innerHTML = '<i></i><span>Opções</span>';
          dropdownMenu.className = 'dropdown-menu';
          dropdownMenu.setAttribute('aria-labelledby', 'consultasDropdown');
          visualizarLink.className = 'dropdown-item';
          visualizarLink.href = '#';
          visualizarLink.innerHTML = '<i></i> Visualizar';
          editarLink.className = 'dropdown-item';
          editarLink.href = '#';
          editarLink.innerHTML = '<i></i> Editar';
          desabilitarLink.className = 'dropdown-item';
          desabilitarLink.href = '#';
          desabilitarLink.innerHTML = '<i></i> Desabilitar';

          // Adicionar elementos à árvore DOM
          dropdownMenu.appendChild(visualizarLink);
          dropdownMenu.appendChild(editarLink);
          dropdownMenu.appendChild(desabilitarLink);
          dropdownDiv.appendChild(dropdownToggle);
          dropdownDiv.appendChild(dropdownMenu);
          tdOpcoes.appendChild(dropdownDiv);

          tr.appendChild(tdImagem);
          tr.appendChild(tdNome);
          tr.appendChild(tdEspecialidade);
          tr.appendChild(tdNumero);
          tr.appendChild(tdOpcoes);
          document.getElementById('paiTbody').appendChild(tr);

          //document.getElementById("paiMeusMedicos").appendChild(criarCardMedico(retorno[cont].id,retorno[cont].nome,retorno[cont].pclinico.especialidade.nome,retorno[cont].contacto.telefone_principal,retorno[cont].imagem))
        }
      } else {
        console.log("vazio")
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

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

function getMyMedicoForEscala() {
  user = JSON.parse(localStorage.getItem("user"))
  iuser = user.user[0].admin.instituicao_id
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
      retorno = data.users;
      if (retorno) {
        for (cont = 0; cont < retorno.length; cont++) {
          adicionarLinhaMedico(retorno[cont].pclinico.id, retorno[cont].nome, retorno[cont].pclinico.especialidade.nome, retorno[cont].contacto.telefone_principal, retorno[cont].imagem)
          adicionarLinhaTabela(retorno[cont].imagem, retorno[cont].nome, retorno[cont].pclinico.especialidade.nome, retorno[cont].pclinico.id)
        }
      } else {
        console.log("vazio")
      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });
}

function adicionarLinhaTabela(imagem, nome, especialidade, id) {
  $("#TabelasMedicosEscala").empty();
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
  selectEscala.className = "form-control";

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

function pegarTodasEspecialidade() {
  $('#loadingSpinnerContainer').show();
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
      $('#loadingSpinnerContainer').hide();
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
          option.setAttribute("id",retorno[cont].instituicaos[0].preco + " Kz");
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
      document.location.href = "../pages/dist/index.html"
    })
    .catch(error => {
      $('#loadingModal').modal('hide');
      $('#modalErro').modal('show');
      console.error('Erro na solicitação:', error.message);
    });
}

function cadastrarUser() {
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
  if (document.getElementById("categoria").value != "Utente") {
    formData.append('especialidade_id', document.getElementById("especialidade").value);
    user = JSON.parse(localStorage.getItem("user"))
    formData.append('instituicao_id', user.user[0].admin.instituicao_id);
  }
  const imagemInput = document.getElementById('inputFile');
  if (imagemInput.files.length > 0) {
    formData.append('imagem', imagemInput.files[0]);
  }

  //console.log(formData)

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
}

function cadastrarInstituicao() {
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  //$('#loadingModal').modal('show');
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

function createAdivInstituicao(nome,descricao,id,provincia,municipio,destrito,imagem) {
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
  img.src = url+"/api/imagem/"+imagem;
  img.alt = "";
  divImagem.appendChild(img);
  divInstituicao.appendChild(divImagem);

  // Cria um elemento div para o corpo
  var divBody = document.createElement("div");
  divBody.className = "body";
  var p = document.createElement("p");
  //p.style.textAlign="justify"
  p.innerHTML = "A "+nome+ " esta localizado na provincia de <b>"+provincia+"</b> no monicipio de <b> "+municipio+" </b> no distrito de <b> "+destrito+" </b> "+descricao;
  divBody.appendChild(p);
  divInstituicao.appendChild(divBody);

  // Cria um elemento div para o rodapé
  var divFooter = document.createElement("div");
  divFooter.className = "footer";
  var a = document.createElement("a");
  a.href = "perfilhospital.html?idHospital="+id;
  a.className = "btn btn_vermais";
  a.textContent = "Saber mais";
  divFooter.appendChild(a);
  divInstituicao.appendChild(divFooter);

  // Adiciona o elemento divInstituicao ao elemento body do documento
  return divInstituicao;

}

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
        document.getElementById("lista_instituicao").appendChild(createAdivInstituicao(dados[cont].nome,dados[cont].Descricao,dados[cont].id,dados[cont].distrito.municipio.provincia.nome,dados[cont].distrito.municipio.nome,dados[cont].distrito.nome,dados[cont].imagem))
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
  let popup=document.getElementById('popup')
  popup.classList.add('open-popup')
  //$('#efectuarServico').modal('show');
  document.getElementById("efectuarServicoBTN").addEventListener("click", function () {
    user = JSON.parse(localStorage.getItem("user"));
    idUser = user.user[0].id;

    const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
    //$('#loadingModal').modal('show');
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
        console.log(data)
      })
      .catch(error => {
        //$('#loadingModal').modal('hide');
        console.error('Erro na solicitação:', error.message);
      });
  });

}

function exameInstituicao(idInstituicao, idMedico, dataInicio, horaInicio) {
  document.getElementById("preco").textContent = "";
  document.getElementById("titulo").innerHTML = "Selecione o Tipo de Exame:"
  document.getElementById("idPreco").innerHTML = "Valor do exame:"
  pegarTodosExameSeclectDeumaInstituicao(idInstituicao);
  //$('#efectuarServico').modal('show');
  let popup=document.getElementById('popup')
  popup.classList.add('open-popup')

  document.getElementById("efectuarServicoBTN").addEventListener("click", function () {
    user = JSON.parse(localStorage.getItem("user"));
    idUser = user.user.id;

    const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
    //$('#loadingModal').modal('show');
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
        console.log(data)
      })
      .catch(error => {
        //$('#loadingModal').modal('hide');
        console.error('Erro na solicitação:', error.message);
      });
  });

}



function pegarUmaisntituicao() {
  /*user= JSON.parse(localStorage.getItem("user"))
  idInstituicaoo=user.user[0].admin.instituicao_id;*/
  queryString= window.location.search;
  searchParams= new URLSearchParams(queryString);
  getUrl=Object.fromEntries(searchParams.entries());
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
          document.getElementById("numeroHospital").innerHTML =dados.contacto.telefone_principal + "/" + dados.contacto.telefone_alternativo;
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

function criarMedicos(id,nome,especialidade,contacto,imagem){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const img = document.createElement("img");
    img.src = url+"/api/imagem/"+imagem;
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
    queryString= window.location.search;
    searchParams= new URLSearchParams(queryString);
    getUrl=Object.fromEntries(searchParams.entries());
   
    btnConsulta.onclick = function() {
        agendarComMedicoApi(getUrl.idHospital,id,nome,"consulta")
    };
    td3.appendChild(btnConsulta);
    tr.appendChild(td3);
    const td4 = document.createElement("td");
    const btnExame = document.createElement("button");
    btnExame.className = "btnExame btn";
    btnExame.textContent = "Exame";
    btnExame.onclick = function() {
      agendarComMedicoApi( getUrl.idHospital,id,nome,"exame")
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
function menu(span) {
  texto = span.textContent;
  if (texto == "Instituições") {
    pegarTodasInstituicoes();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "block";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Especialidades") {
    getAllEspecialidade();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "block";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Médicos") {
    pegarTodasEspecialidade();
    getMyMedico();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "block";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Marcações") {
    criarMarcacoes();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "block";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Escala") {
    getMyMedicoForEscala();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "block";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Exame") {
    getAllExames();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "block";
    document.getElementById("consultaInstituicao").style.display = "none";
  } else if (texto == "Consulta") {
    getAllConsulta();
    document.getElementById("marcacao").style.display = "none";
    document.getElementById("ids").style.display = "none";
    document.getElementById("perfilInstituicao").style.display = "none";
    document.getElementById("medicos").style.display = "none";
    document.getElementById("especialidades").style.display = "none";
    document.getElementById("paiMarcacoes").style.display = "none";
    document.getElementById("escalasMedicas").style.display = "none";
    document.getElementById("examessHospitall").style.display = "none";
    document.getElementById("consultaInstituicao").style.display = "block";
  }
}

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
          criarCarocelMarcacao(retorno[cont].pclinico, retorno[cont].descricao, cont, retorno[cont].consulta.nome, retorno[cont].consulta.tipo, retorno[cont].data, (retorno[cont].estado) ? "Pendente" : "Confirmado", retorno[cont].preco, retorno[cont].tipo_servico, retorno[cont].hora, retorno[cont].user.nome, retorno[cont].user.id)
        } else {
          criarCarocelMarcacao(retorno[cont].pclinico, retorno[cont].descricao, cont, retorno[cont].exame.nome, retorno[cont].exame.tipo, retorno[cont].data, (retorno[cont].estado) ? "Pendente" : "Confirmado", retorno[cont].preco, retorno[cont].tipo_servico, retorno[cont].hora, retorno[cont].user.nome, retorno[cont].user.id)
        }

      }

    })
    .catch(error => {
      console.error('Erro na solicitação:', error.message);
    });

}

function criarCarocelMarcacao(pclinico, descricao, cont, nome, tipo, data, estado, preco, servico, hora, userName, id) {
  // Criando o elemento div principal
  /* var marcacoesCarousel = document.createElement("div");
   marcacoesCarousel.id = "marcacoesCarousel";
   marcacoesCarousel.classList.add("carousel", "slide");
   marcacoesCarousel.setAttribute("data-ride", "carousel");
   marcacoesCarousel.setAttribute("data-interval", "3600000");
 
   // Criando o elemento div com a classe "carousel-inner"
   var carouselInner = document.createElement("div");
   carouselInner.classList.add("carousel-inner");*/

  // Criando o elemento div com a classe "carousel-item active"
  let carouselItem = document.createElement("div");
  if (cont == 0) {
    carouselItem.classList.add("carousel-item", "active");
  } else {
    carouselItem.classList.add("carousel-item");
  }


  // Criando o elemento div com a classe "card"
  let card = document.createElement("div");
  card.classList.add("card");

  // Criando o elemento div com a classe "card-body"
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Criando o elemento h5 com a classe "card-title"
  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = (cont + 1) + "º Marcação";

  // Informações da Marcação
  let infoData = createInfoDiv("Data:", data);
  let infoEstado = createInfoDiv("Estado:", estado);
  let infoPreco = createInfoDiv("Preço:", preco);
  let infoTipoServico = createInfoDiv("Tipo de Serviço:", servico);
  let infoHora = createInfoDiv("Hora:", hora);
  let infoDescricao = createInfoDiv("Descrição:", descricao);
  if (pclinico != null) {
    var medico = createInfoDiv("Pessoal clinico:", pclinico.user.nome);
    var expecialidade = createInfoDiv("Especialidade:", pclinico.especialidade.nome);
  }

  // Informações do Usuário
  let infoUsuario = document.createElement("div");
  infoUsuario.classList.add("mb-3");
  infoUsuario.innerHTML = "<strong>Usuário:</strong> <button type='button' class='btn btn-link' data-toggle='modal' data-target='#visualizarPerfilModal'>" + userName + "</button>";
  infoUsuario.addEventListener("click", function () {
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("visualizarPerfilModalLabel").innerHTML = "";
    document.getElementById("imagemMeuPerfil").src = ""
    document.getElementById("MeuNome").innerHTML = "";
    document.getElementById("MeuGenero").innerHTML = "";
    document.getElementById("MeuBi").innerHTML = "";
    document.getElementById("MeuEmail").innerHTML = "";
    document.getElementById("MeuNascimento").innerHTML = ""
    document.getElementById("MeuTelefone").innerHTML = "";
    verPerfilUser(id)
  })

  // Informações da Consulta
  let infoConsulta = createInfoDiv("Nome:", nome);
  let infoTipo = createInfoDiv("Tipo:", tipo);

  // Botões de Ação
  let btnConfirmar = createActionButton("Confirmar", "btn-success", "me-2");
  let btnCancel = createActionButton("Cancelar", "btn-danger", null, "modal", "#cancelarModal1");

  // Adicionando elementos filho apropriados
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(infoData);
  cardBody.appendChild(infoEstado);
  cardBody.appendChild(infoPreco);
  cardBody.appendChild(infoTipoServico);
  cardBody.appendChild(infoHora);
  cardBody.appendChild(infoDescricao);
  if (pclinico != null) {
    cardBody.appendChild(medico);
    cardBody.appendChild(expecialidade);
  }

  cardBody.appendChild(infoUsuario);
  cardBody.appendChild(infoConsulta);
  cardBody.appendChild(infoTipo);
  cardBody.appendChild(btnConfirmar);
  cardBody.appendChild(btnCancel);

  card.appendChild(cardBody);
  carouselItem.appendChild(card);

  /*
  carouselInner.appendChild(carouselItem);
  marcacoesCarousel.appendChild(carouselInner);*/

  // Botões de Navegação
  /*
  let prevButton = createNavigationButton("carousel-control-prev", "#marcacoesCarousel", "prev");
  let nextButton = createNavigationButton("carousel-control-next", "#marcacoesCarousel", "next");

  Adicionando os botões de navegação ao elemento principal
  document.getElementById("paiMarcacoes").appendChild(prevButton);
  document.getElementById("paiMarcacoes").appendChild(nextButton);
*/
  // Adicionando o elemento ao body ou a outro elemento pai desejado
  document.getElementById("marcacoes").appendChild(carouselItem);

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
      document.getElementById("loadingSpinner").style.display = "none";
      document.getElementById("visualizarPerfilModalLabel").innerHTML = "Perfil de " + user.nome;
      document.getElementById("imagemMeuPerfil").src = url + "/api/imagem/" + user.imagem
      document.getElementById("MeuNome").innerHTML = "<strong>Nome: </strong>" + user.nome;
      document.getElementById("MeuGenero").innerHTML = "<strong>Género: </strong>" + user.genero;
      document.getElementById("MeuBi").innerHTML = "<strong>BI: </strong>" + user.bi;
      document.getElementById("MeuEmail").innerHTML = "<strong>Email: </strong>" + user.email;
      document.getElementById("MeuNascimento").innerHTML = "<strong>Data de Nascimento: </strong>" + user.data_nascimento;
      document.getElementById("MeuTelefone").innerHTML = "<strong>Numero Telefonico: </strong>" + user.contacto.telefone_principal + "/" + user.telefone_alternativo;
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

function adicionarLinhaMedico(id, nome, especialidade, contacto, imagemSrc) {
  var tabela = document.getElementById("tabelaMedicos").getElementsByTagName('tbody')[0];
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
  colunaBotao.innerHTML = `<input type="checkbox" class="custom-checkbox" onclick="escalar(this, ${id})">`;
}

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

function addEscala(pessoalClinicos) {
  dataInicio = document.getElementById("dataInicio").value;
  dataFim = document.getElementById("dataFim").value;
  horaInicio = document.getElementById("horaInicio").value;
  horafim = document.getElementById("horaFim").value;
  const tokenCSRF = document.querySelector('meta[name="csrf-token"]').content;
  //$('#loadingModal').modal('show');
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