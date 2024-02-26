continuar = document.getElementById("continuar");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nomeCompletoRegex = /^[a-zA-ZÀ-ú]+(\s[a-zA-ZÀ-ú]+)*\s[a-zA-ZÀ-ú]+$/;

function validarEmail(email){
    if(emailRegex.test(email)){
        document.getElementById("erro").innerHTML = "";
    }else{
        document.getElementById("erro").innerHTML = "Email Inválido";
    }
    return emailRegex.test(email);
}

function validarNomeCompleto(nome){
    if(nomeCompletoRegex.test(nome)){
        document.getElementById("erro").innerHTML = "";
    }else{
        document.getElementById("erro").innerHTML = "Nome inválido, precisamos de um nome completo";
    }
    return nomeCompletoRegex.test(nome)
}

function validarProvincia(){
    valor = document.getElementById("").value
}

function validarMonicipio(){
    valor = document.getElementById("").value
}

function validarDistrito(){
    valor = document.getElementById("").value
}

