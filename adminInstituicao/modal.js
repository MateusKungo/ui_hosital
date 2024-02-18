let popup=document.getElementById('popup')
let popupExame=document.getElementById('popupExame')
let h2=document.querySelector('.h2_title')
let valorConsult=document.getElementById('valorConsulta')


function openPopup(h2_title,valor){
    popup.classList.add('open-popup')
    h2.innerHTML=""+h2_title
    valorConsult.innerHTML=""+valor 
}

function closePopup(){
    popup.classList.remove('open-popup')
}