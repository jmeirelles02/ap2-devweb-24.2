document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const senhaCorreta = '7f8f4ad44c7c71a3d8618a2f944592a284bcb1f5ca4cd53b7c2639d325e782f9';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const senha = document.getElementById('senha').value;
        const senhaHash = hex_sha256(senha);

        console.log('Hash gerado:', senhaHash);

        if (senhaHash === senhaCorreta) {
            localStorage.setItem('autorizado', 'true');
            window.location.href = 'main.html';
        } else {
            document.getElementById('erro-msg').textContent = 'Senha incorreta!';
        }
    });
});