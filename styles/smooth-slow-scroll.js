
(function () {
    // --- Configurações ---
    const smoothness = 0.0.1; // Fator de suavização (0 a 1). Menor = mais suave/lento.
    const animationFrameLimit = 100; // Limite de frames para evitar loops infinitos

    // --- Variáveis de Estado ---
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isWheeling = false;
    let animationFrameId = null;
    let frameCount = 0;

    // --- Funções Principais ---

    function init() {
        if (!document.body) return;
        // Ouvinte para a roda do mouse
        window.addEventListener("wheel", handleWheel, { passive: false });
        // Ouvinte para toque (simplificado, pode precisar de ajustes)
        // window.addEventListener("touchmove", handleTouch, { passive: false }); 
    }

    function handleWheel(e) {
        e.preventDefault(); // Previne o scroll padrão
        // Calcula o delta normalizado (direção)
        const delta = Math.sign(e.deltaY);
        // Define o novo alvo baseado na direção e um passo fixo (ajustável se necessário)
        const scrollStep = 150; // Pixels "virtuais" por evento de roda
        targetScrollY += delta * scrollStep;

        // Limita o alvo aos limites da página
        targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight));

        isWheeling = true;
        frameCount = 0; // Reseta contador de frames

        // Inicia o loop de animação se não estiver rodando
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateScroll);
        }
    }

    // Função de loop para animação suave
    function updateScroll() {
        frameCount++;
        // Interpolação linear para suavizar o movimento
        // current = current + (target - current) * smoothness
        currentScrollY += (targetScrollY - currentScrollY) * smoothness;

        // Verifica se está perto o suficiente do alvo ou excedeu o limite de frames
        if (Math.abs(targetScrollY - currentScrollY) < 1 || frameCount >= animationFrameLimit) {
            currentScrollY = targetScrollY; // Vai direto para o alvo
            window.scrollTo(0, Math.round(currentScrollY));
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null; // Permite iniciar nova animação
            isWheeling = false;
        } else {
            window.scrollTo(0, Math.round(currentScrollY));
            // Continua o loop
            animationFrameId = requestAnimationFrame(updateScroll);
        }
    }

    // --- Inicialização ---
    if (document.readyState === "complete" || document.readyState === "interactive") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }

})();

