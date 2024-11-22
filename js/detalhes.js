document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('autorizado')) {
        window.location.href = 'index.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const detalhesContainer = document.getElementById('atleta-detalhes');

    if (!id) {
        detalhesContainer.innerHTML = '<p class="erro">ID do atleta não fornecido.</p>';
        return;
    }

    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        if (!response.ok) throw new Error('Atleta não encontrado');

        const atleta = await response.json();

        detalhesContainer.innerHTML = `
            <div class="atleta-info">
                <img src="${atleta.imagem}" alt="${atleta.nome}">
                <div class="info-container">
                    <h1>${atleta.nome}</h1>
                    <p><strong>Posição:</strong> ${atleta.posicao}</p>
                    <p><strong>Nome completo:</strong> ${atleta.nome_completo}</p>
                    <p><strong>Nascimento:</strong> ${atleta.nascimento}</p>
                    <p><strong>Altura:</strong> ${atleta.altura}</p>
                    ${atleta.descricao ? `<p class="descricao">${atleta.descricao}</p>` : ''}
                </div>
            </div>
        `;
    } catch (error) {
        detalhesContainer.innerHTML = '<p class="erro">Erro ao carregar os dados do atleta.</p>';
    }
});