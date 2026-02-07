/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');

    /**
     * Obtém o tema inicial baseado no localStorage ou preferência do sistema
     */
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    /**
     * Aplica o tema ao documento e atualiza o estado do botão
     */
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Atualiza o aria-label para acessibilidade
        const label = theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
        toggleButton.setAttribute('aria-label', label);
    };

    // Inicializa o tema ao carregar a página
    setTheme(getInitialTheme());

    // Evento de clique para alternar o tema
    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Observa mudanças nas configurações de tema do sistema operacional
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
