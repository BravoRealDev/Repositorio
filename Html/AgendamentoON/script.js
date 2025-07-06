document.addEventListener('DOMContentLoaded', function() {
    
    //dom
    const elements = {
        loginBtn: document.getElementById('login-btn'),
        loginModal: document.getElementById('login-modal'),
        closeBtn: document.querySelector('.close'),
        loginForm: document.getElementById('login-form'),
        agendarSection: document.getElementById('agendar'),
        especialidadeSelect: document.getElementById('especialidade'),
        medicoSelect: document.getElementById('medico'),
        dataInput: document.getElementById('data'),
        horariosContainer: document.getElementById('horarios-disponiveis'),
        agendarBtn: document.getElementById('agendar-btn'),
        consultasLista: document.getElementById('consultas-lista'),
        especialidadesGrid: document.getElementById('especialidades-grid'),
        contactForm: document.getElementById('contact-form'),
        formFeedback: document.getElementById('form-feedback')
    };

    const state = {
        usuarioLogado: null,
        consultas: [],
        horarioSelecionado: null,
        medicos: {
            cardiologia: [{ id: '1', nome: 'Dr. Carlos Silva' }, { id: '2', nome: 'Dra. Ana Oliveira' }],
            dermatologia: [{ id: '3', nome: 'Dr. Marcos Souza' }, { id: '4', nome: 'Dra. Juliana Costa' }],
            pediatria: [{ id: '5', nome: 'Dra. Patrícia Lima' }, { id: '6', nome: 'Dr. Rafael Almeida' }],
            ortopedia: [{ id: '7', nome: 'Dr. Felipe Martins' }, { id: '8', nome: 'Dra. Beatriz Rocha' }],
            ginecologia: [{ id: '9', nome: 'Dra. Fernanda Dias' }, { id: '10', nome: 'Dr. André Mendes' }],
            oftalmologia: [{ id: '11', nome: 'Dr. Lucas Pereira' }, { id: '12', nome: 'Dra. Camila Santos' }],
            psiquiatria: [{ id: '13', nome: 'Dr. Eduardo Lima' }, { id: '14', nome: 'Dra. Mariana Ferreira' }],
            endocrinologia: [{ id: '15', nome: 'Dr. Tiago Martins' }, { id: '16', nome: 'Dra. Larissa Almeida' }],
            neurologia: [{ id: '17', nome: 'Dr. Gustavo Rocha' }, { id: '18', nome: 'Dra. Vanessa Costa' }],
            clinicoGeral: [{ id: '19', nome: 'Dr. João Silva' }, { id: '20', nome: 'Dra. Maria Oliveira' }]
        },
        especialidades: [
            { id: 'cardiologia', nome: 'Cardiologia', descricao: 'Trata do coração e sistema cardiovascular. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-abstrato-de-hipertensao_335657-4603.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'dermatologia', nome: 'Dermatologia', descricao: 'Trata da pele, cabelos e unhas. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-arte-de-uma-linha-desenhada-a-mao_23-2149281403.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'pediatria', nome: 'Pediatria', descricao: 'Dedicada à saúde de crianças e adolescentes. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/medico-e-paciente-tratamento-de-crianca-no-hospital-hmpv-ou-metapneumovirus-humano_40876-3811.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'ortopedia', nome: 'Ortopedia', descricao: 'Trata de problemas nos ossos e articulações. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/conjunto-de-icones-de-cor-de-ortopedia_1284-11320.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'ginecologia', nome: 'Ginecologia', descricao: 'Cuida da saúde da mulher. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-ginecologia_23-2148651431.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'oftalmologia', nome: 'Oftalmologia', descricao: 'Cuida da saúde dos olhos. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-premium/o-medico-esta-examinando-a-visao-do-olho-exame-olhos-pessoas-tratamento-de-correcao-de-foco-oftalmologia-optometrista-oftalmologista-pessoal-medico-com-oculos-teste-de-visao-apartamento_352905-153.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'psiquiatria', nome: 'Psiquiatria', descricao: 'Trata de doenças mentais. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/saude-mental-entender-o-vetor-do-cerebro_53876-79082.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'endocrinologia', nome: 'Endocrinologia', descricao: 'Cuida de doenças hormonais e metabólicas. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-tireoide-de-design-plano-desenhado-a-mao_23-2149312211.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' },
            { id: 'neurologia', nome: 'Neurologia', descricao: 'Cuida de doenças do sistema nervoso. <strong>Tempo máximo de consulta: 30 minutos.</strong>', imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-quimica-do-cerebro_114360-13526.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740' }
        ],
        //usuário genérico que criei para testes
        usuarios: [
            { id: 1, nome: 'Paciente Exemplo', email: 'paciente@exemplo.com', senha: '123456', tipo: 'paciente' }
        ]
    }; 

    //lógica global
    function checkLoginState() {
        const usuarioJSON = sessionStorage.getItem('usuarioLogado');
        if (usuarioJSON) {
            state.usuarioLogado = JSON.parse(usuarioJSON);
        }
        const consultasJSON = sessionStorage.getItem('consultasAgendadas');
        if (consultasJSON) {
            state.consultas = JSON.parse(consultasJSON);
        }
    }

    function initGlobal() {
        if (elements.loginBtn) elements.loginBtn.addEventListener('click', toggleLogin);
        if (elements.closeBtn) elements.closeBtn.addEventListener('click', closeModal);
        if (elements.loginForm) elements.loginForm.addEventListener('submit', handleLogin);
        window.addEventListener('click', closeModalOnOutsideClick);
        updateUI();
    }
    
    function toggleLogin() {
        if (state.usuarioLogado) {
            logout();
        } else {
            elements.loginModal.style.display = 'block';
        }
    }

    function closeModal() {
        elements.loginModal.style.display = 'none';
    }

    function closeModalOnOutsideClick(e) {
        if (e.target === elements.loginModal) {
            closeModal();
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = elements.loginForm.email.value;
        const senha = elements.loginForm.senha.value;
        const usuario = state.usuarios.find(u => u.email === email && u.senha === senha);
        if (usuario) {
            state.usuarioLogado = usuario;
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            closeModal();
            updateUI();
            showSuccess(`Bem-vindo, ${usuario.nome}!`);
        } else {
            showError('Credenciais inválidas. Utilize o usuário teste: paciente@exemplo.com / Senha: 123456');
        }
    }

    function logout() {
        if (confirm('Deseja realmente sair?')) {
            state.usuarioLogado = null;
            sessionStorage.removeItem('usuarioLogado');
            updateUI();
            showSuccess('Você saiu do sistema.');
        }
    }

    function saveConsultas() {
        sessionStorage.setItem('consultasAgendadas', JSON.stringify(state.consultas));
    }

    function updateUI() {
        if (elements.loginBtn) elements.loginBtn.textContent = state.usuarioLogado ? 'Logout' : 'Login';
        if (elements.especialidadesGrid) renderEspecialidades();
        if (elements.consultasLista) loadConsultas();
        if (elements.agendarSection && !state.usuarioLogado) resetAgendamentoForm(true);
    }

    function formatDateForDisplay(dateString) {
        const [y, m, d] = dateString.split('-');
        return `${d}/${m}/${y}`;
    }
    function formatDateForInput(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    function showSuccess(message) { alert(`✅ ${message}`); }
    function showError(message) { alert(`❌ ${message}`); }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                // Apenas executa se for um link para uma âncora na MESMA página
                if (targetElement) { 
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    //lógica da index (home)
    if (elements.especialidadesGrid) {
        function renderEspecialidades() {
            elements.especialidadesGrid.innerHTML = state.especialidades.map(esp => `
                <div class="especialidade-card">
                    <img src="${esp.imagem}" alt="Ilustração para a especialidade de ${esp.nome}" class="especialidade-img">
                    <div class="especialidade-content">
                        <h3>${esp.nome}</h3>
                        <p>${esp.descricao}</p>
                        <button class="especialidade-btn" data-especialidade="${esp.id}"
                            ${!state.usuarioLogado ? 'disabled title="Faça login para agendar"' : ''}>
                            Agendar Consulta
                        </button>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.especialidade-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    redirecionarParaAgendamento(this.dataset.especialidade);
                });
            });
        }
        function redirecionarParaAgendamento(especialidadeId) {
            window.location.href = `agendar.html?especialidade=${especialidadeId}`;
        }
        renderEspecialidades();
    }
    
    // lógica do agendamento
    if (elements.agendarSection) {
        function initAgendamento() {
            elements.especialidadeSelect.addEventListener('change', loadMedicos);
            elements.medicoSelect.addEventListener('change', enableDateInput);
            elements.dataInput.addEventListener('change', loadHorarios);
            elements.agendarBtn.addEventListener('click', agendarConsulta);
            setMinDate();
            const urlParams = new URLSearchParams(window.location.search);
            const especialidadeParam = urlParams.get('especialidade');
            if (especialidadeParam) {
                elements.especialidadeSelect.value = especialidadeParam;
                loadMedicos();
            }
        }
        
        function agendarConsulta(e) {
            e.preventDefault();
            if (!state.usuarioLogado) {
                showError('Faça login para agendar.');
                toggleLogin();
                return;
            }
            
            const especialidade = elements.especialidadeSelect.selectedOptions[0].text;
            const data = elements.dataInput.value;
            
            const conflitoHorario = state.consultas.some(c => 
                c.usuarioId === state.usuarioLogado.id &&
                c.data === data &&
                c.horario === state.horarioSelecionado
            );

            if (conflitoHorario) {
                showError(`Você já tem uma consulta agendada para ${state.horarioSelecionado} neste dia.`);
                return;
            }

            const conflitoEspecialidade = state.consultas.some(c => 
                c.usuarioId === state.usuarioLogado.id && 
                c.data === data &&
                c.especialidade === especialidade
            );
            
            if (conflitoEspecialidade) {
                showError(`Você já tem uma consulta agendada para a especialidade ${especialidade} neste dia.`);
                return;
            }            

            const novaConsulta = {
                id: Date.now().toString(),
                especialidade: especialidade,
                medicoId: elements.medicoSelect.value,
                medicoNome: elements.medicoSelect.selectedOptions[0].text,
                data: data,
                dataExibicao: formatDateForDisplay(data),
                horario: state.horarioSelecionado,
                status: 'Agendada',
                usuarioId: state.usuarioLogado.id
            };
            state.consultas.push(novaConsulta);
            saveConsultas();
            showSuccess('Consulta agendada com sucesso!');
            window.location.href = 'consultas.html';
        }

        function loadMedicos(){
            const espId = elements.especialidadeSelect.value;
            elements.medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
            elements.medicoSelect.disabled = !espId;
            if (espId && state.medicos[espId]) {
                state.medicos[espId].forEach(medico => {
                    const option = document.createElement('option');
                    option.value = medico.id;
                    option.textContent = medico.nome;
                    elements.medicoSelect.appendChild(option);
                });
            }
            resetAgendamentoForm();
        }

        function enableDateInput(){
            elements.dataInput.disabled = !elements.medicoSelect.value;
            if (!elements.medicoSelect.value) {
                elements.dataInput.value = '';
            }
            resetAgendamentoForm();
        }

        function setMinDate(){
            const amanha = new Date();
            amanha.setDate(amanha.getDate() + 1);
            elements.dataInput.min = formatDateForInput(amanha);
        }

        function loadHorarios(){
            if (!elements.dataInput.value) return;
            elements.horariosContainer.innerHTML = '<div class="loading">Carregando...</div>';
            setTimeout(() => {
                const horarios = generateHorariosDisponiveis();
                renderHorarios(horarios);
            }, 500);
        }

        function generateHorariosDisponiveis(){
            const medicoId = elements.medicoSelect.value;
            const dataSelecionada = elements.dataInput.value;
            const consultasNoDia = state.consultas.filter(c => c.medicoId === medicoId && c.data === dataSelecionada);
            const horariosDisponiveis = [];
            for (let hour = 7; hour <= 17; hour++) {
                ['00', '30'].forEach(minute => {
                    if (hour === 17 && minute === '30') return;
                    const horario = `${String(hour).padStart(2, '0')}:${minute}`;
                    if (!consultasNoDia.some(c => c.horario === horario)) {
                        horariosDisponiveis.push({ hora: horario, disponivel: true });
                    }
                });
            }
            return horariosDisponiveis;
        }

        function renderHorarios(horarios){
            elements.horariosContainer.innerHTML = '';
            if (horarios.length === 0) {
                elements.horariosContainer.innerHTML = '<div class="no-slots">Sem horários disponíveis.</div>';
                return;
            }
            horarios.forEach(h => {
                const btn = document.createElement('button');
                btn.className = 'horario-btn';
                btn.textContent = h.hora;
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    selectHorario(btn, h.hora);
                });
                elements.horariosContainer.appendChild(btn);
            });
        }

        function selectHorario(button, hora){
            document.querySelectorAll('.horario-btn.selecionado').forEach(b => b.classList.remove('selecionado'));
            button.classList.add('selecionado');
            state.horarioSelecionado = hora;
            elements.agendarBtn.disabled = false;
        }

        function resetAgendamentoForm(fullReset = false){
            if (fullReset) {
                elements.especialidadeSelect.value = '';
                elements.medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
                elements.medicoSelect.disabled = true;
                elements.dataInput.value = '';
                elements.dataInput.disabled = true;
            }
            elements.horariosContainer.innerHTML = '<p>Selecione uma data para ver os horários.</p>';
            elements.agendarBtn.disabled = true;
            state.horarioSelecionado = null;
        }
        
        initAgendamento();
    }
    
    if (elements.consultasLista) {
        function cancelarConsulta(consultaId) {
            if (confirm('Deseja realmente cancelar esta consulta?')) {
                const index = state.consultas.findIndex(c => c.id === consultaId);
                if (index > -1) {
                    state.consultas.splice(index, 1);
                    saveConsultas();
                    loadConsultas();
                    showSuccess('Consulta cancelada com sucesso.');
                }
            }
        }
        function loadConsultas(){
            if (!state.usuarioLogado) {
                elements.consultasLista.innerHTML = '<div class="info-message">Faça login para ver as suas consultas</div>';
                return;
            }
            const userConsultas = state.consultas.filter(c => c.usuarioId === state.usuarioLogado.id).sort((a, b) => new Date(`${b.data}T${b.horario}`) - new Date(`${a.data}T${a.horario}`));
            if (userConsultas.length === 0) {
                elements.consultasLista.innerHTML = '<div class="info-message">Nenhuma consulta agendada</div>';
                return;
            }
            elements.consultasLista.innerHTML = userConsultas.map(c => `
                <div class="consulta-card">
                    <h3>${c.especialidade}</h3>
                    <p><strong>Médico:</strong> ${c.medicoNome}</p>
                    <p><strong>Data:</strong> ${c.dataExibicao} às ${c.horario}</p>
                    <p><strong>Status:</strong> <span class="status-${c.status.toLowerCase()}">${c.status}</span></p>
                    <button class="btn cancelar-btn" data-id="${c.id}">Cancelar</button>
                </div>
            `).join('');
            document.querySelectorAll('.cancelar-btn').forEach(btn => {
                btn.addEventListener('click', () => cancelarConsulta(btn.dataset.id));
            });
        }
        loadConsultas();
    }

    // lógica do formulário
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('contato-email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let isValid = true;
            let errors = [];

            // validação
            if (nome === '') {
                isValid = false;
                errors.push('O campo Nome é obrigatório.');
            }
            if (email === '') {
                isValid = false;
                errors.push('O campo E-mail é obrigatório.');
            } else if (!/^\S+@\S+\.\S+$/.test(email)) { // Validação do e-mail
                isValid = false;
                errors.push('Por favor, insira um e-mail válido.');
            }
            if (assunto === '') {
                isValid = false;
                errors.push('O campo Assunto é obrigatório.');
            }
            if (mensagem === '') {
                isValid = false;
                errors.push('O campo Mensagem é obrigatório.');
            }

            // Exibir feedback
            if (isValid) {
                elements.formFeedback.className = 'success';
                elements.formFeedback.innerHTML = 'Mensagem enviada com sucesso! Agradecemos o seu contato.';
                elements.contactForm.reset(); // Limpa o formulário
            } else {
                elements.formFeedback.className = 'error';
                elements.formFeedback.innerHTML = errors.join('<br>');
            }
        });
    }

    
    checkLoginState();
    initGlobal();
    setupSmoothScroll();
});