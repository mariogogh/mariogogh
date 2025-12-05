document.addEventListener("DOMContentLoaded", function () {
    // ---- DOM do overlay ----
    const loadingScreen = document.createElement("div");
    loadingScreen.id = "loading-screen";

    const loadingImagesContainer = document.createElement("div");
    loadingImagesContainer.id = "loading-images";

    const loadingPercentage = document.createElement("h1");
    loadingPercentage.id = "loading-percentage";
    loadingPercentage.textContent = "0%";

    loadingScreen.appendChild(loadingImagesContainer);
    loadingScreen.appendChild(loadingPercentage);
    document.body.appendChild(loadingScreen);
    document.body.classList.add("loading-overlay-active");

    // ---- Fontes / elementos a pré-carregar ----
    const imageUrls = [
        "images/all/img_loading.gif",
        "images/all/img_loading2.gif",
        "images/all/img_loading3.gif",
    ];
    const allElements = Array.from(document.querySelectorAll(".All"));

    // ---- Estado ----
    let loadedElements = 0;
    let imagesLoaded = 0;
    const totalImages = imageUrls.length;
    const totalElements = allElements.length;
    let finished = false;
    let startTime = Date.now();

    // ---- Percentual animado (mais lento) ----
    let currentPercent = 0;
    let targetPercent = 0;
    let isAnimating = false;
    let rafId = null;

    function startAnimateIfNeeded() {
        if (isAnimating) return;
        isAnimating = true;

        function step() {
            if (currentPercent < targetPercent) {
                const diff = targetPercent - currentPercent;
                // Animação mais lenta: incremento menor
                const inc = Math.max(0.5, Math.ceil(diff / 15));
                currentPercent += inc;
                if (currentPercent > targetPercent) currentPercent = targetPercent;
                loadingPercentage.textContent = `${Math.floor(currentPercent)}%`;
                rafId = requestAnimationFrame(step);
            } else {
                isAnimating = false;
                if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
                if (currentPercent >= 100 && loadedElements >= totalElements && imagesLoaded >= totalImages) {
                    // Aguarda pelo menos 1.5 segundos antes de remover
                    const elapsedTime = Date.now() - startTime;
                    const minLoadTime = 1500; // 1.5 segundos
                    const remainingTime = Math.max(0, minLoadTime - elapsedTime);
                    setTimeout(removeLoadingScreen, remainingTime + 300);
                }
            }
        }

        rafId = requestAnimationFrame(step);
    }

    function updateLoadingPercentage() {
        // Calcula percentual baseado nas imagens carregadas primeiro (0-60%)
        // e depois nos elementos restantes (60-100%)
        let percent = 0;

        if (imagesLoaded < totalImages) {
            // Primeiros 60% para as imagens
            percent = (imagesLoaded / totalImages) * 60;
        } else {
            // 60% base das imagens + 40% dos elementos restantes
            percent = 60 + (loadedElements / Math.max(1, totalElements)) * 40;
        }

        targetPercent = Math.round(percent);
        if (targetPercent < currentPercent) targetPercent = currentPercent;

        // Adiciona delay para tornar mais lento
        setTimeout(() => {
            startAnimateIfNeeded();
        }, 100);
    }

    // ---- Remover overlay ----
    function removeLoadingScreen() {
        if (finished) return;
        finished = true;
        document.body.classList.remove("loading-overlay-active");
        loadingScreen.style.opacity = "0";
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; isAnimating = false; }
        if (fallbackTimeout) { clearTimeout(fallbackTimeout); fallbackTimeout = null; }
        setTimeout(() => {
            if (loadingScreen.parentNode) loadingScreen.remove();
        }, 500);
    }

    // ---- Fallback (aumentado para 10 segundos) ----
    let fallbackTimeout = setTimeout(() => {
        targetPercent = 100;
        startAnimateIfNeeded();
        setTimeout(removeLoadingScreen, 2000);
    }, 10000);

    // ---- Função de pré-load para imagens de loading ----
    function preloadLoadingImage(url, index, onLoad) {
        const img = new window.Image();
        let isLoaded = false;

        function done() {
            if (isLoaded) return;
            isLoaded = true;
            imagesLoaded++;
            updateLoadingPercentage();
            if (onLoad) try { onLoad(); } catch (e) { }
            checkIfDone();
        }

        img.onload = done;
        img.onerror = done;
        img.src = url;
    }

    // ---- Função de pré-load para elementos da página ----
    function preloadMedia(element, onLoad) {
        let isLoaded = false;
        function done() {
            if (isLoaded) return;
            isLoaded = true;
            loadedElements++;
            updateLoadingPercentage();
            if (onLoad) try { onLoad(); } catch (e) { }
            checkIfDone();
        }

        const tag = (element && element.tagName) ? element.tagName.toUpperCase() : "";

        if (tag === "IMG") {
            if (element.complete && element.naturalWidth !== 0) {
                setTimeout(done, 200); // Adiciona delay mesmo para imagens já carregadas
            } else {
                element.addEventListener("load", () => setTimeout(done, 200), { once: true });
                element.addEventListener("error", () => setTimeout(done, 200), { once: true });
            }
        } else if (tag === "VIDEO") {
            if (element.readyState >= 2) {
                setTimeout(done, 200);
            } else {
                element.addEventListener("loadeddata", () => setTimeout(done, 200), { once: true });
                element.addEventListener("error", () => setTimeout(done, 200), { once: true });
            }
        } else {
            setTimeout(done, 100);
        }
    }

    // ---- PRIMEIRO: Pré-carrega as imagens de loading ----
    imageUrls.forEach((url, index) => {
        const img = document.createElement("img");
        img.className = "loading-image";
        img.alt = "loading";
        loadingImagesContainer.appendChild(img);

        // Pré-carrega a imagem primeiro
        preloadLoadingImage(url, index, () => {
            // Só mostra a imagem após ela estar carregada
            img.src = url;
            setTimeout(() => {
                img.classList.add("visible");
                setTimeout(() => img.classList.remove("visible"), 600);
            }, index * 400); // Animação mais lenta entre imagens
        });
    });

    // ---- DEPOIS: Pré-carrega elementos da página ----
    // Aguarda um pouco antes de começar a carregar os elementos da página
    setTimeout(() => {
        allElements.forEach(el => preloadMedia(el));
    }, 800);

    // ---- Verifica término ----
    function checkIfDone() {
        if (loadedElements >= totalElements && imagesLoaded >= totalImages) {
            clearTimeout(fallbackTimeout);
            fallbackTimeout = null;
            targetPercent = 100;
            startAnimateIfNeeded();
        }
    }

    // ---- Inicialização ----
    if (totalImages === 0 && totalElements === 0) {
        targetPercent = 100;
        startAnimateIfNeeded();
        setTimeout(removeLoadingScreen, 1500);
    } else {
        updateLoadingPercentage();
    }

    // ---- Limpeza ----
    window.addEventListener("beforeunload", () => {
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        if (rafId) cancelAnimationFrame(rafId);
    });
});

