var dadosAngola = {
    "Bengo": {
      "Municipios": ["Ambriz", "Bula Atumba", "Dande", "Nambuangongo", "Pango Aluquém", "Dembos", "Quibaxe", "Úcua"],
      "Destrictos": {
        "Ambriz": ["Ambriz", "Kiabo"],
        "Bula Atumba": ["Bula Atumba", "Quiage"],
        "Dande": ["Caxito", "Mabubas"],
        "Nambuangongo": ["Nambuangongo", "Banga"],
        "Pango Aluquém": ["Pango Aluquém", "Caucau"],
        "Dembos": ["Caxito", "Mabubas"],
        "Quibaxe": ["Quibaxe", "Kicabo"],
        "Úcua": ["Úcua", "Kibaxe"]
      }
    },
    // Adicione os dados das outras províncias aqui
  };
  

var selectMunicipios = document.getElementById("municipios");
var selectDistritos = document.getElementById("distritos");
var paragrafoDetalhes = document.getElementById("detalhes");

function mostrarMunicipios() {
  var selectProvincia = document.getElementById("provincias");
  var provinciaSelecionada = selectProvincia.value;
  selectMunicipios.disabled = false;
  selectMunicipios.innerHTML = "<option value=''>Selecione...</option>";
  selectDistritos.disabled = true;
  selectDistritos.innerHTML = "<option value=''>Selecione...</option>";

  if (provinciaSelecionada !== "") {
    dadosAngola[provinciaSelecionada].Municipios.forEach(function(municipio) {
      var option = document.createElement("option");
      option.value = municipio;
      option.textContent = municipio;
      selectMunicipios.appendChild(option);
    });
  }
}

function mostrarDistritos() {
  var provinciaSelecionada = document.getElementById("provincias").value;
  var municipioSelecionado = selectMunicipios.value;
  selectDistritos.disabled = false;
  selectDistritos.innerHTML = "<option value=''>Selecione...</option>";

  if (municipioSelecionado !== "") {
    dadosAngola[provinciaSelecionada].Destrictos[municipioSelecionado].forEach(function(distrito) {
      var option = document.createElement("option");
      option.value = distrito;
      option.textContent = distrito;
      selectDistritos.appendChild(option);
    });
  }
}

function mostrarDetalhes() {
  var provinciaSelecionada = document.getElementById("provincias").value;
  var municipioSelecionado = selectMunicipios.value;
  var distritoSelecionado = selectDistritos.value;

  if (distritoSelecionado !== "") {
    paragrafoDetalhes.textContent = "Província: " + provinciaSelecionada + ", Município: " + municipioSelecionado + ", Distrito: " + distritoSelecionado;
  }
}