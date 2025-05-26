document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const elements = {
        loginBtn: document.getElementById('login-btn'),
        loginModal: document.getElementById('login-modal'),
        closeBtn: document.querySelector('.close'),
        loginForm: document.getElementById('login-form'),
        especialidadeSelect: document.getElementById('especialidade'),
        medicoSelect: document.getElementById('medico'),
        dataInput: document.getElementById('data'),
        horariosContainer: document.getElementById('horarios-disponiveis'),
        agendarBtn: document.getElementById('agendar-btn'),
        consultasLista: document.getElementById('consultas-lista'),
        especialidadesGrid: document.getElementById('especialidades-grid'),
        agendarForm: document.querySelector('#agendar form')
    };

    // Estado da aplicação
    const state = {
        usuarioLogado: null,
        consultas: [],
        horarioSelecionado: null,
        medicos: {
            cardiologia: [
                { id: '1', nome: 'Dr. Carlos Silva' },
                { id: '2', nome: 'Dra. Ana Oliveira' }
            ],
            dermatologia: [
                { id: '3', nome: 'Dr. Marcos Souza' },
                { id: '4', nome: 'Dra. Juliana Costa' }
            ],
            pediatria: [
                { id: '5', nome: 'Dra. Patrícia Lima' },
                { id: '6', nome: 'Dr. Rafael Almeida' }
            ],
            ortopedia: [
                { id: '7', nome: 'Dr. Felipe Martins' },
                { id: '8', nome: 'Dra. Beatriz Rocha' }
            ],
            ginecologia: [
                { id: '9', nome: 'Dra. Fernanda Dias' },
                { id: '10', nome: 'Dr. André Mendes' }
            ],
            oftalmologia: [
                { id: '11', nome: 'Dr. Lucas Pereira' },
                { id: '12', nome: 'Dra. Camila Santos' }
            ],
            psiquiatria: [
                { id: '13', nome: 'Dr. Eduardo Lima' },
                { id: '14', nome: 'Dra. Mariana Ferreira' }
            ],
            endocrinologia: [
                { id: '15', nome: 'Dr. Tiago Martins' },
                { id: '16', nome: 'Dra. Larissa Almeida' }
            ],
            neurologia: [
                { id: '17', nome: 'Dr. Gustavo Rocha' },
                { id: '18', nome: 'Dra. Vanessa Costa' }
            ],
            clinicoGeral: [
                { id: '19', nome: 'Dr. João Silva' },
                { id: '20', nome: 'Dra. Maria Oliveira' }
            ]

        },
        especialidades: [
            {
                id: 'cardiologia',
                nome: 'Cardiologia',
                descricao: 'Especialidade médica que trata do coração e sistema cardiovascular. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-abstrato-de-hipertensao_335657-4603.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'dermatologia',
                nome: 'Dermatologia',
                descricao: 'Especialidade médica que trata da pele, cabelos e unhas. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-arte-de-uma-linha-desenhada-a-mao_23-2149281403.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'pediatria',
                nome: 'Pediatria',
                descricao: 'Especialidade médica dedicada à saúde de crianças e adolescentes. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/medico-e-paciente-tratamento-de-crianca-no-hospital-hmpv-ou-metapneumovirus-humano_40876-3811.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'ortopedia',
                nome: 'Ortopedia',
                descricao: 'Especialidade médica que trata de problemas nos ossos e articulações. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/conjunto-de-icones-de-cor-de-ortopedia_1284-11320.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'ginecologia',
                nome: 'Ginecologia',
                descricao: 'Especialidade médica que cuida da saúde da mulher. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-ginecologia_23-2148651431.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'oftalmologia',
                nome: 'Oftalmologia',
                descricao: 'Especialidade médica que cuida da saúde dos olhos. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-premium/o-medico-esta-examinando-a-visao-do-olho-exame-olhos-pessoas-tratamento-de-correcao-de-foco-oftalmologia-optometrista-oftalmologista-pessoal-medico-com-oculos-teste-de-visao-apartamento_352905-153.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'psiquiatria',
                nome: 'Psiquiatria',
                descricao: 'Especialidade médica que trata de doenças mentais. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/saude-mental-entender-o-vetor-do-cerebro_53876-79082.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'endocrinologia',
                nome: 'Endocrinologia',
                descricao: 'Especialidade médica que cuida de doenças hormonais e metabólicas. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-de-tireoide-de-design-plano-desenhado-a-mao_23-2149312211.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            },
            {
                id: 'neurologia',
                nome: 'Neurologia',
                descricao: 'Especialidade médica que cuida de doenças do sistema nervoso. <strong>Tempo máximo de consulta: 30 minutos.</strong>',
                imagem: 'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-quimica-do-cerebro_114360-13526.jpg?ga=GA1.1.1044485151.1745371656&semt=ais_hybrid&w=740'
            }            

        ],
        usuarios: [
            {
                id: 1,
                nome: 'Paciente Exemplo',
                email: 'paciente@exemplo.com',
                senha: '123456',
                tipo: 'paciente'
            }
        ]
    };

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        renderEspecialidades();
        setMinDate();
    }

    function setupEventListeners() {
        // Login
        elements.loginBtn.addEventListener('click', toggleLogin);
        elements.closeBtn.addEventListener('click', closeModal);
        elements.loginForm.addEventListener('submit', handleLogin);
        window.addEventListener('click', closeModalOnOutsideClick);

        // Agendamento
        elements.especialidadeSelect.addEventListener('change', loadMedicos);
        elements.medicoSelect.addEventListener('change', enableDateInput);
        elements.dataInput.addEventListener('change', loadHorarios);
        elements.agendarBtn.addEventListener('click', agendarConsulta);
        
        // Reset do formulário quando o modal é fechado
        elements.loginModal.addEventListener('click', function(e) {
            if (e.target === this) {
                resetAgendamentoForm();
            }
        });
    }

    // Funções de UI
    function toggleLogin() {
        if (state.usuarioLogado) {
            logout();
        } else {
            elements.loginModal.style.display = 'block';
        }
    }

    function closeModal() {
        elements.loginModal.style.display = 'none';
        resetAgendamentoForm();
    }

    function closeModalOnOutsideClick(e) {
        if (e.target === elements.loginModal) {
            closeModal();
        }
    }

    // Funções de autenticação
    function handleLogin(e) {
        e.preventDefault();
        const email = elements.loginForm.email.value;
        const senha = elements.loginForm.senha.value;

        const usuario = state.usuarios.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            state.usuarioLogado = usuario;
            closeModal();
            updateUI();
            loadConsultas();
            showSuccess(`Bem-vindo, ${usuario.nome}!`);
        } else {
            showError('Credenciais inválidas. Tente: paciente@exemplo.com / 123456');
        }
    }

    function logout() {
        if (confirm('Deseja realmente sair?')) {
            state.usuarioLogado = null;
            updateUI();
            showSuccess('Você saiu do sistema.');
            resetAgendamentoForm(true); // Reset completo
        }
    }

    // Funções de agendamento
    function renderEspecialidades() {
        elements.especialidadesGrid.innerHTML = state.especialidades.map(esp => `
            <div class="especialidade-card" data-especialidade="${esp.id}">
                <div class="especialidade-img" style="background-image: url('${esp.imagem}')"></div>
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

        // Adiciona eventos aos botões
        document.querySelectorAll('.especialidade-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.especialidade-btn')) return; // Ignora clique no botão
                const especialidadeId = this.dataset.especialidade;
                redirecionarParaAgendamento(especialidadeId);
            });
        });

        document.querySelectorAll('.especialidade-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Impede o evento de click no card
                const card = this.closest('.especialidade-card');
                redirecionarParaAgendamento(card.dataset.especialidade);
            });
        });
    }


    

    //Função para redirecionar para o agendamento
    function redirecionarParaAgendamento(especialidadeId) {
        const agendarSection = document.querySelector('#agendar');
        if (!agendarSection) {
            console.error('Seção de agendamento não encontrada!');
            return;
        }
        agendarSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        if (elements.especialidadeSelect) {
            elements.especialidadeSelect.value = especialidadeId;
            loadMedicos();
            elements.especialidadeSelect.style.border = "2px solid #007bff"; // Adiciona borda azul
            setTimeout(() => {
                elements.especialidadeSelect.style.border = ""; // Remove a borda após 2 segundos
            }, 2000);
        } else {
            console.error('Elemento de especialidade não encontrado!');
        }
    }


    function loadMedicos() {
        const espId = elements.especialidadeSelect.value;
        elements.medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
        elements.medicoSelect.disabled = !espId;

        if (espId) {
            state.medicos[espId].forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = medico.nome;
                elements.medicoSelect.appendChild(option);
            });
        }

        resetAgendamentoForm();
    }

    function enableDateInput() {
        elements.dataInput.disabled = !elements.medicoSelect.value;
        if (!elements.medicoSelect.value) {
            elements.dataInput.value = '';
        }
        resetAgendamentoForm();
    }

    function setMinDate() {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera horas, minutos e segundos
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);
        
        elements.dataInput.min = formatDateForInput(amanha);

        //validação de data
        elements.dataInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            if (selectedDate < hoje) {
                showError('Data inválida. Selecione uma data a partir de amanhã.');
                this.value = '';
                resetAgendamentoForm();
            }
        });      
            
    }

    function loadHorarios() {
        if (!elements.dataInput.value) return;

        elements.horariosContainer.innerHTML = '<div class="loading">Carregando horários disponíveis...</div>';

        // Simula requisição assíncrona
        setTimeout(() => {
            const medicoId = elements.medicoSelect.value;
            const dataSelecionada = elements.dataInput.value;
            
            if (!medicoId || !dataSelecionada) {
                showError('Selecione um médico e uma data válida');
                return;
            }

            // Verifica consultas existentes
            const consultasNoDia = state.consultas.filter(c => 
                c.medicoId === medicoId && 
                c.data === dataSelecionada
            );

            // Gera horários disponíveis
            const horarios = generateHorariosDisponiveis(consultasNoDia);
            renderHorarios(horarios);
        }, 500);
    }

    function generateHorariosDisponiveis(consultasNoDia) {
        const horarios = [];
        const startHour = 7;
        const endHour = 17;

        for (let hour = startHour; hour <= endHour; hour++) {
            // Horário cheio (ex: 09:00)
            const fullHour = `${String(hour).padStart(2, '0')}:00`;
            const isFullHourAvailable = !consultasNoDia.some(c => c.horario === fullHour);
            
            // Horário meia hora (ex: 09:30)
            const halfHour = `${String(hour).padStart(2, '0')}:30`;
            const isHalfHourAvailable = !consultasNoDia.some(c => c.horario === halfHour);
            
            horarios.push({
                hora: fullHour,
                disponivel: isFullHourAvailable
            }, {
                hora: halfHour,
                disponivel: isHalfHourAvailable && hour <= endHour - 1
            });
        }

        return horarios.filter(h => h.disponivel);
    }

    function renderHorarios(horarios) {
        elements.horariosContainer.innerHTML = '';

        if (horarios.length === 0) {
            elements.horariosContainer.innerHTML = '<div class="no-slots">Não há horários disponíveis para esta data.</div>';
            elements.agendarBtn.disabled = true;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'calendario';
        
        horarios.forEach(horario => {
            const btn = document.createElement('button');
            btn.className = 'horario-btn';
            btn.textContent = horario.hora;
            btn.dataset.hora = horario.hora;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                selectHorario(btn, horario.hora);
            });
            grid.appendChild(btn);
        });

        elements.horariosContainer.appendChild(grid);
    }

    function selectHorario(button, hora) {
        // Remove seleção anterior
        document.querySelectorAll('.horario-btn').forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        // Adiciona nova seleção
        button.classList.add('selecionado');
        state.horarioSelecionado = hora;
        elements.agendarBtn.disabled = false;
        
        console.log('Horário selecionado:', hora); // Para debug
    }

    function agendarConsulta(e) {
        e.preventDefault();
        
        if (!state.usuarioLogado) {
            showError('Faça login para agendar consultas');
            toggleLogin();
            return;
        }

        // Validação completa
        const errors = [];
        if (!elements.especialidadeSelect.value) errors.push('Selecione uma especialidade');
        if (!elements.medicoSelect.value) errors.push('Selecione um médico');
        if (!elements.dataInput.value) errors.push('Selecione uma data');
        if (!state.horarioSelecionado) errors.push('Selecione um horário');
        
        if (errors.length > 0) {
            showError(errors.join('\n'));
            return;
        }

        // Dados da consulta
        const especialidade = elements.especialidadeSelect.selectedOptions[0].text;
        const medicoId = elements.medicoSelect.value;
        const medicoNome = elements.medicoSelect.selectedOptions[0].text;
        const data = elements.dataInput.value;
        const dataFormatada = formatDateForDisplay(data);
        const horario = state.horarioSelecionado;

        // Verifica conflito
        const conflitoUsuario = state.consultas.some(c => 
            c.usuarioId === state.usuarioLogado.id && 
            c.data === data && 
            c.horario === horario
        );
        
        if (conflitoUsuario) {
            showError('Você já tem uma consulta agendada para este horário.');
            loadHorarios();
            return;
        }

        // Cria nova consulta
        const novaConsulta = {
            id: Date.now().toString(),
            especialidade,
            medicoId,
            medicoNome,
            data,
            dataExibicao: dataFormatada,
            horario,
            status: 'Agendada',
            usuarioId: state.usuarioLogado.id,
            criadoEm: new Date().toISOString()
        };

        // Adiciona ao estado
        state.consultas.push(novaConsulta);
        
        // Feedback e reset
        showSuccess(`Consulta agendada com sucesso para ${dataFormatada} às ${horario}`);
        resetAgendamentoForm(true);
        loadConsultas();
        
        // Rolagem para consultas
        document.querySelector('#minhas-consultas').scrollIntoView({ behavior: 'smooth' });
    }

    function resetAgendamentoForm(fullReset = false) {
        if (fullReset) {
            elements.especialidadeSelect.value = '';
            elements.medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
            elements.medicoSelect.disabled = true;
            elements.dataInput.value = '';
            elements.dataInput.disabled = true;
        }
        
        elements.horariosContainer.innerHTML = '<p>Selecione uma data para ver os horários disponíveis.</p>';
        elements.agendarBtn.disabled = true;
        state.horarioSelecionado = null;
        
        // Remove seleção de horários
        document.querySelectorAll('.horario-btn').forEach(btn => {
            btn.classList.remove('selecionado');
        });
    }

    // Funções de consultas
    function loadConsultas() {
        if (!state.usuarioLogado) {
            elements.consultasLista.innerHTML = '<div class="info-message">Faça login para ver suas consultas</div>';
            return;
        }

        const userConsultas = state.consultas
            .filter(c => c.usuarioId === state.usuarioLogado.id)
            .sort((a, b) => new Date(b.data + 'T' + b.horario) - new Date(a.data + 'T' + a.horario));

        if (userConsultas.length === 0) {
            elements.consultasLista.innerHTML = '<div class="info-message">Nenhuma consulta agendada</div>';
            return;
        }

        elements.consultasLista.innerHTML = userConsultas.map(consulta => `
            <div class="consulta-card">
                <h3>${consulta.especialidade}</h3>
                <p><strong>Médico:</strong> ${consulta.medicoNome}</p>
                <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                <p><strong>Data:</strong> ${consulta.dataExibicao}</p>
                <p><strong>Horário:</strong> ${consulta.horario}</p>
                <p><strong>Status:</strong> <span class="status-${consulta.status.toLowerCase()}">${consulta.status}</span></p>
                <button class="btn cancelar-btn" data-id="${consulta.id}">Cancelar</button>
            </div>
        `).join('');

        // Eventos de cancelamento
        document.querySelectorAll('.cancelar-btn').forEach(btn => {
            btn.addEventListener('click', () => cancelarConsulta(btn.dataset.id));
        });
    }

    function cancelarConsulta(consultaId) {
        if (confirm('Deseja realmente cancelar esta consulta?')) {
            state.consultas = state.consultas.filter(c => c.id !== consultaId);
            loadConsultas();
            showSuccess('Consulta cancelada com sucesso');
        }
    }

    // Funções auxiliares
    function updateUI() {
        elements.loginBtn.textContent = state.usuarioLogado ? 'Logout' : 'Login';
        renderEspecialidades();
        loadConsultas();
    }

    function isValidDate(dateString) {
        return !isNaN(new Date(dateString).getTime());
    }

    function formatDateForDisplay(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function showSuccess(message) {
        alert(`✅ ${message}`);
    }

    function showError(message) {
        alert(`❌ ${message}`);
    }
});