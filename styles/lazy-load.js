'''javascript
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os elementos que devem ser carregados preguiçosamente
    // Procure por elementos com a classe "lazy"
    const lazyElements = document.querySelectorAll(".lazy");

    // Verifica se a API IntersectionObserver é suportada pelo navegador
    if ("IntersectionObserver" in window) {
        // Cria um observador de interseção
        // rootMargin: adiciona uma margem ao redor do viewport. Elementos entrarão
        // na área de observação um pouco antes de ficarem visíveis (200px neste caso).
        // threshold: 0.01 significa que o callback será chamado assim que 1% do elemento estiver visível.
        let lazyObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                // Verifica se o elemento está intersectando o viewport (ou a margem definida)
                if (entry.isIntersecting) {
                    let lazyElement = entry.target;

                    // Carrega a imagem/iframe trocando data-src por src
                    if (lazyElement.dataset.src) {
                        lazyElement.src = lazyElement.dataset.src;
                    }

                    // Carrega imagem de fundo trocando data-bg por style background-image
                    if (lazyElement.dataset.bg) {
                        lazyElement.style.backgroundImage = `url(${lazyElement.dataset.bg})`;
                    }

                    // Remove a classe "lazy" para indicar que já foi carregado
                    // e para evitar que o observador processe novamente
                    lazyElement.classList.remove("lazy");
                    lazyElement.classList.add("lazy-loaded"); // Opcional: adicionar classe para estilização pós-carregamento

                    // Para de observar o elemento que já foi carregado
                    observer.unobserve(lazyElement);
                }
            });
        }, { rootMargin: "0px 0px 200px 0px", threshold: 0.01 });

        // Começa a observar cada elemento "lazy"
        lazyElements.forEach(function (lazyElement) {
            lazyObserver.observe(lazyElement);
        });

    } else {
        // Fallback para navegadores que não suportam IntersectionObserver 
        // (Carrega tudo de uma vez - menos ideal, mas garante a exibição)
        // Ou implemente uma solução baseada em eventos de scroll (mais complexa e menos performática)
        console.warn("IntersectionObserver não suportado. Carregando todos os elementos.");
        lazyElements.forEach(function (lazyElement) {
            if (lazyElement.dataset.src) {
                lazyElement.src = lazyElement.dataset.src;
            }
            if (lazyElement.dataset.bg) {
                lazyElement.style.backgroundImage = `url(${lazyElement.dataset.bg})`;
            }
            lazyElement.classList.remove("lazy");
            lazyElement.classList.add("lazy-loaded");
        });
    }
});
'''
