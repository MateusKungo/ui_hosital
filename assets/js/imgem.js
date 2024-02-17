function exibirImagem() {
    var input = document.getElementById('inputFile');
    var file = input.files[0];
    var imagem = document.getElementById('imagemExibida');
    
    if (file) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        // Define o atributo 'src' da imagem para a URL da imagem carregada
        imagem.src = e.target.result;
      }
      
      // Lê o conteúdo do arquivo como uma URL de dados
      reader.readAsDataURL(file);
    }}