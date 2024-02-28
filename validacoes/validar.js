continuar = document.getElementById("continuar");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nomeCompletoRegex = /^[a-zA-ZÀ-ú]+(\s[a-zA-ZÀ-ú]+)*\s[a-zA-ZÀ-ú]+$/;
const regexBI = /^[0-9]{9}[A-Za-z]{2}[0-9]{3}$/;
const regexTelefonico = /^(91|92|93|94|95|99)\d{7}$/;
const regexPassaporte = /^[A-Za-z]\d{7}$/;
const regexPostal = /^[0-9]{5}$/;
const regexsenha = /^(?=.*[a-zA-Z])(?=.*[@$!%?&])(?=.*\d).{8,}$/
const regexNomeEmpresa = /^[a-zA-Z0-9\s]{1,100}$/;


function validarTudoUtente() {
    if (validarDataNascimento() && validarEmail() && validarNomeCompleto() && validarBI() && validarNumeroTelefonicoP() && validarNumeroTelefonicoS() && validarPassaporte() && validarPostal() && validarSenha() && validarConfirmacao()) {
        return true
    } else {
        return false;
    }
}

function validarTudoHospital() {
    if ( validarMonicipio && validarProvincia() && validarDistrito() && validarEmail() && validarNomeEmpresa() && validarNumeroTelefonicoP() && validarNumeroTelefonicoS() && validarPostal() && validarSenha() && validarConfirmacao()) {
        return true
       
    } else {
        return false;
    }
}


function validarNomeEmpresa(){
    nome = document.getElementById("nome").value;
    if (regexNomeEmpresa.test(nome)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Precisamos de um nome válido";
    }
    return regexNomeEmpresa.test(nome)
}

function validarDataNascimento() {
    valor = document.getElementById("data_nascimento").value
    if (valor == '' || valor == "" || valor == null) {
        document.getElementById("erro").innerHTML = "Informe a sua data de nascimento";
    } else {
        document.getElementById("erro").innerHTML = "";
        return true
    }
    return false
}

function validarEmail() {
    email = document.getElementById("email").value;
    if (emailRegex.test(email)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Email Inválido";
    }
    return emailRegex.test(email);
}

function validarNomeCompleto() {
    nome = document.getElementById("nome").value;
    if (nomeCompletoRegex.test(nome)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Precisamos de um nome válido";
    }
    return nomeCompletoRegex.test(nome)
}

function validarProvincia() {
    valor = document.getElementById("provincias").value
    if (valor == '' || valor == null || valor == "") {
        document.getElementById("erro").innerHTML = "Selecione a provincia";
        return false
    } else {
        document.getElementById("erro").innerHTML = "";
        return true
    }
}

function validarMonicipio() {
    valor = document.getElementById("monicipio").value
    if (valor == '' || valor == null || valor == "") {
        document.getElementById("erro").innerHTML = "Selecione o municipio";
        return false
    } else {
        document.getElementById("erro").innerHTML = "";
        return true
    }
}

function validarDistrito() {
    valor = document.getElementById("distrito").value
    if (valor == '' || valor == null || valor == "") {
        document.getElementById("erro").innerHTML = "Selecione o municipio";
        return false
    } else {
        document.getElementById("erro").innerHTML = "";
        return true
    }
}

function validarBI() {
    valor = document.getElementById("bi").value
    if (regexBI.test(valor)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Número do bilhete inválido";
    }
    return regexBI.test(valor);
}


function validarNumeroTelefonicoP() {
    numero = document.getElementById("telefone_principal").value
    if (regexTelefonico.test(numero)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Número Angola inválido";
    }
    return regexTelefonico.test(numero)
}

function validarNumeroTelefonicoS() {
    numero = document.getElementById("telefone_alternativo").value
    if (numero == '' || numero == "" || numero == null) {
        document.getElementById("erro").innerHTML = "";
        return true
    } else if (regexTelefonico.test(numero)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Número Angola inválido";
    }
    return regexTelefonico.test(numero)
}


function validarPassaporte() {
    valor = document.getElementById("passaporte").value
    if (valor == '' || valor == null || valor == "" || regexPassaporte.test(valor)) {
        document.getElementById("erro").innerHTML = "";
        return true
    } else {
        document.getElementById("erro").innerHTML = "Passaporte inválido";
    }

    return regexPassaporte.test(valor)
}
function validarPostal() {
    valor = document.getElementById("codigo_postal").value
    if (valor == '' || valor == null || valor == "" || regexPostal.test(valor)) {
        document.getElementById("erro").innerHTML = "";
        return true
    } else {
        document.getElementById("erro").innerHTML = "Codigo postal inválido";
    }
}

function validarSenha() {
    senha = document.getElementById("password").value;
    if (regexsenha.test(senha)) {
        document.getElementById("erro").innerHTML = "";
    } else {
        document.getElementById("erro").innerHTML = "Deve conter no minino 8 digitos um numero um caracter expecial uma letra";
    }
    return regexsenha.test(senha);
}

function validarConfirmacao() {
    valor = document.getElementById("password_confirmation").value
    senha = document.getElementById("password").value
    if (valor != senha) {
        document.getElementById("erro").innerHTML = "Senhas não conscidem";
    } else {
        document.getElementById("erro").innerHTML = "";
        return true;
    }
    return false;
}