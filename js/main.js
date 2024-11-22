document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('autorizado')) {
        window.location.href = 'index.html';
        return;
    }

    const atletasContainer = document.getElementById('atletas-container');
    const filtroInput = document.getElementById('filtro');
    const botoesElenco = document.querySelectorAll('.elenco-buttons button');
    const elencoSelect = document.getElementById('elenco-select');

    let atletasData = [];

    async function buscarAtletas(tipo = 'all') {
        try {
            const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${tipo}`);
            const data = await response.json();
            atletasData = data;
            renderizarAtletas(data);
        } catch (error) {
            atletasContainer.innerHTML = '<p class="erro">Erro ao carregar os atletas.</p>';
        }
    }

    function renderizarAtletas(atletas) {
        atletasContainer.innerHTML = atletas.map(atleta => `
            <div class="atleta-card" onclick="window.location.href='detalhes.html?id=${atleta.id}'">
                <img src="${atleta.imagem}" alt="${atleta.nome}">
                <div class="info">
                    <h3>${atleta.nome}</h3>
                    <p>${atleta.posicao}</p>
                </div>
            </div>
        `).join('');
    }

    function filtrarAtletas() {
        const termo = filtroInput.value.toLowerCase();
        const atletasFiltrados = atletasData.filter(atleta =>
            atleta.nome.toLowerCase().includes(termo) ||
            atleta.posicao.toLowerCase().includes(termo)
        );
        renderizarAtletas(atletasFiltrados);
    }

    // Eventos para desktop
    botoesElenco.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesElenco.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');
            buscarAtletas(botao.dataset.elenco);
        });
    });

    // Eventos para mobile
    elencoSelect.addEventListener('change', (e) => {
        buscarAtletas(e.target.value);
    });

    filtroInput.addEventListener('input', filtrarAtletas);

    // Carregar todos os atletas inicialmente
    buscarAtletas();
});

function logout() {
    // Limpar qualquer dado de sessão se necessário
    localStorage.removeItem('user'); // ou sessionStorage.removeItem('user')

    // Redirecionar para a página de login
    window.location.href = 'index.html';
}