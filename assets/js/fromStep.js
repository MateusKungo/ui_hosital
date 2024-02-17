(function() {
    let currentPage = 1;
    const voltarBtn = document.querySelector(".form .footer .voltar");
    const continuarBtn = document.querySelector(".form .footer .continuar");
    const paginationNumbers = document.querySelectorAll('.form .pagination .number');

    function movePage() {
        voltarBtn.disabled = false;
        continuarBtn.disabled = false;
        
        if (currentPage === 1) {
            voltarBtn.disabled = true;
        } else if (currentPage === paginationNumbers.length) {
            continuarBtn.disabled = true;
        }

        // Removendo a classe 'active' de todos os elementos de paginação
        document.querySelectorAll('.form .pagination .number').forEach(number => {
            number.classList.remove('active');
        });

        // Adicionando a classe 'active' ao número da página atual
        paginationNumbers[currentPage - 1].classList.add('active');

        const stepNode = document.querySelector('.form .steps .step');
        const width = ((currentPage - 1) * stepNode.offsetWidth * -1) + "px";
        stepNode.parentNode.style.marginLeft = width;
    }

    voltarBtn.addEventListener('click', function() {
        currentPage -= 1;
        movePage();
    });

    continuarBtn.addEventListener('click', function() {
        currentPage += 1;
        movePage();
    });

    // Inicializando a página
    movePage();
})();
