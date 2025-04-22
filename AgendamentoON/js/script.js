document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const dataInput = document.getElementById('data');
    const horariosDisponiveis = document.getElementById('horarios-disponiveis');
    const agendarBtn = document.getElementById('agendar-btn');
    const consultasLista = document.getElementById('consultas-lista');
    
    // Variáveis de estado
    let usuarioLogado = null;
    let consultasAgendadas = [];
    let horarioSelecionado = null;
    let todasConsultasAgendadas = [];
    
    // Banco de dados de usuários (simulado)
    const usuariosCadastrados = [
        {
            id: 1,
            nome: "Paciente Teste",
            email: "paciente@teste.com",
            senha: "123456",
            tipo: "paciente"
        }
    ];

    // Especialidades disponíveis
    const especialidadesDisponiveis = [
        {
            id: 'cardiologia',
            nome: 'Cardiologia',
            descricao: 'Cuida do coração e sistema cardiovascular.',
            disponivel: true,
            imagem: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 'dermatologia',
            nome: 'Dermatologia',
            descricao: 'Trata doenças da pele, cabelos e unhas.',
            disponivel: true,
            imagem: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            id: 'pediatria',
            nome: 'Pediatria',
            descricao: 'Cuidados médicos para crianças e adolescentes.',
            disponivel: true,
            imagem: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ];

    // Dados mockados de médicos
    const medicosPorEspecialidade = {
        'cardiologia': [
            { id: 1, nome: 'Dr. Carlos Silva' },
            { id: 2, nome: 'Dra. Ana Oliveira' },
            { id: 3, nome: 'Dr. João Pereira' },
            { id: 4, nome: 'Dra. Fernanda Almeida' },
            { id: 5, nome: 'Dr. Felipe Santos' }
        ],
        'dermatologia': [
            { id: 6, nome: 'Dr. Marcos Souza' },
            { id: 7, nome: 'Dra. Juliana Costa' },
            { id: 8, nome: 'Dr. Lucas Lima' },
            { id: 9, nome: 'Dra. Beatriz Martins' },
            { id: 10, nome: 'Dr. André Mendes' }
        ],
        'pediatria': [
            { id: 11, nome: 'Dra. Patrícia Lima' },
            { id: 12, nome: 'Dr. Rafael Almeida' },
            { id: 13, nome: 'Dra. Camila Rocha' },
            { id: 14, nome: 'Dr. Eduardo Ferreira' },
            { id: 15, nome: 'Dra. Mariana Ribeiro' }
        ]
    };

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        carregarEspecialidades();
        configurarDataMinima();
    }

    function setupEventListeners() {
        loginBtn.addEventListener('click', abrirModalLogin);
        closeBtn.addEventListener('click', fecharModalLogin);
        window.addEventListener('click', fecharModalClickExterno);
        loginForm.addEventListener('submit', fazerLogin);
        especialidadeSelect.addEventListener('change', carregarMedicos);
        medicoSelect.disabled = true;
        medicoSelect.addEventListener('change', habilitarData);
        dataInput.addEventListener('change', carregarHorariosDisponiveis);
        agendarBtn.addEventListener('click', agendarConsulta);
    }

    function configurarDataMinima() {
        const hoje = new Date();
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);

        // Formatar a data no formato ISO local sem fuso horário
        const ano = amanha.getFullYear();
        const mes = String(amanha.getMonth() + 1).padStart(2, '0');
        const dia = String(amanha.getDate()).padStart(2, '0');
        dataInput.min = `${ano}-${mes}-${dia}`;
    }

    function carregarEspecialidades() {
        const grid = document.getElementById('especialidades-grid');
        if (!grid) {
            console.error('Elemento #especialidades-grid não encontrado!');
            return;
        }
        
        grid.innerHTML = '';
        
        especialidadesDisponiveis.forEach(especialidade => {
            const card = document.createElement('div');
            card.className = 'especialidade-card';
            
            card.innerHTML = `
                <div class="especialidade-img" style="background-image: url('${especialidade.imagem}')"></div>
                <div class="especialidade-content">
                    <h3>${especialidade.nome}</h3>
                    <p>${especialidade.descricao}</p>
                    
                    <div class="disponibilidade">
                        <i class="fas ${especialidade.disponivel ? 'fa-check-circle disponivel' : 'fa-times-circle indisponivel'}"></i>
                        <span>${especialidade.disponivel ? 'Disponível para agendamento' : 'Indisponível no momento'}</span>
                    </div>
                    
                    <a href="#agendar" class="especialidade-btn ${!especialidade.disponivel ? 'desabilitado' : ''}" 
                       data-especialidade="${especialidade.id}" 
                       ${!especialidade.disponivel ? 'aria-disabled="true"' : ''}>
                        ${especialidade.disponivel ? 'Agendar Consulta' : 'Indisponível'}
                    </a>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        // Adicionar event listeners aos botões
        document.querySelectorAll('.especialidade-btn:not(.desabilitado)').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (usuarioLogado) {
                    const especialidadeId = this.getAttribute('data-especialidade');
                    document.getElementById('especialidade').value = especialidadeId;
                    carregarMedicos();
                } else {
                    e.preventDefault();
                    abrirModalLogin();
                    alert('Por favor, faça login para agendar uma consulta.');
                }
            });
        });
    }

       // Funções de manipulação de modal    
    function abrirModalLogin() {
        loginModal.style.display = 'block';
    }
    
    function fecharModalLogin() {
        loginModal.style.display = 'none';
    }
    
    function fecharModalClickExterno(e) {
        if (e.target === loginModal) {
            fecharModalLogin();
        }
    }
    
    
    function fazerLogout  ()  {
        usuarioLogado = null;
        consultasAgendadas = [];
        atualizarInterfaceUsuario();
        loginBtn.textContent = 'Login';
        loginBtn.removeEventListener('click', fazerLogout);
        loginBtn.addEventListener('click', abrirModalLogin);
    }

    function fazerLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        const usuario = usuariosCadastrados.find(
            user => user.email === email && user.senha === senha
        );
        
        if (usuario) {
            usuarioLogado = usuario;
            fecharModalLogin();
            atualizarInterfaceUsuario();
            carregarConsultasUsuario();
            loginBtn.textContent = 'Logout';
            loginBtn.removeEventListener('click', abrirModalLogin);
            loginBtn.addEventListener('click', fazerLogout);
            alert(`Bem-vindo(a), ${usuario.nome}!`);
        } else {
            alert('E-mail ou senha incorretos.\n\nUse:\nE-mail: paciente@teste.com\nSenha: 123456');
        }
    }
    
    function atualizarInterfaceUsuario() {
        if (usuarioLogado) {
            document.querySelector('#minhas-consultas p').style.display = 'none';
        } else {
            document.querySelector('#minhas-consultas p').style.display = 'block';
            consultasLista.innerHTML = '<p>Faça login para visualizar suas consultas agendadas.</p>';
        }
    }
    
    function carregarMedicos() {
        medicoSelect.disabled = true;
        medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
        horariosDisponiveis.innerHTML = '<p>Selecione uma especialidade, médico e data para ver os horários disponíveis.</p>';
        agendarBtn.disabled = true;
        
        const especialidade = especialidadeSelect.value;
        
        if (especialidade) {
            medicoSelect.disabled = false;
            const medicos = medicosPorEspecialidade[especialidade];
            
            medicos.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = medico.nome;
                medicoSelect.appendChild(option);
            });
        }
    }
    
    function habilitarData() {
        dataInput.disabled = !medicoSelect.value;
        if (!medicoSelect.value) {
            dataInput.value = '';
            horariosDisponiveis.innerHTML = '<p>Selecione uma especialidade, médico e data para ver os horários disponíveis.</p>';
            agendarBtn.disabled = true;
        }
    }
    
    function carregarHorariosDisponiveis() {
        if (!dataInput.value) return;
        
        // carregamento
        horariosDisponiveis.innerHTML = '<p>Carregando horários disponíveis...</p>';
        
        // Simular delay de API
        setTimeout(() => {
            const medicoId = medicoSelect.value;
            const dataSelecionada = new Date(dataInput.value).toISOString().split('T')[0];

            //obter consultas agendadas
            const consultasDoDia = todasConsultasAgendadas.filter(consulta => consulta.medicoId === medicoId && consulta.data === dataSelecionada);
                  
            
            // Gerar horários fictícios
            const horarios = [];
            const horaInicio = 8;
            const horaFim = 17;
            
            for (let hora = horaInicio; hora < horaFim; hora++) {
            const horarioCheio = `${hora}:00`;
            const horarioOcupadoCheio = consultasDoDia.some(consulta => consulta.horario == horarioCheio);
            
            horarios.push({
                hora: horarioCheio,
                disponivel: !horarioOcupadoCheio && Math.random() > 0.3
            });
            
            // Adiciona o horário de meia hora
            if (hora < horaFim - 1) {
                const horarioMeia = `${hora}:30`;
                const horarioOcupadoMeia = consultasDoDia.some(consulta => consulta.horario == horarioMeia);

                horarios.push({
                    hora: horarioMeia,
                    disponivel: !horarioOcupadoMeia && Math.random() > 0.3                        
                });
            }
        }
        
        // Exibir horários
        exibirHorariosDisponiveis(horarios);
    }, 800);
    }
    
    function exibirHorariosDisponiveis(horarios) {
        horariosDisponiveis.innerHTML = '';
        
        if (horarios.length === 0) {
            horariosDisponiveis.innerHTML = '<p>Não há horários disponíveis para esta data.</p>';
            agendarBtn.disabled = true;
            return;
        }
        
        const gridHorarios = document.createElement('div');
        gridHorarios.className = 'calendario';
        
        horarios.forEach(horario => {
            const horarioBtn = document.createElement('button');
            horarioBtn.className = 'horario-btn';
            horarioBtn.textContent = horario.hora;
            
            if (!horario.disponivel) {
                horarioBtn.classList.add('ocupado');
                horarioBtn.disabled = true;
            } else {
                horarioBtn.addEventListener('click', () => selecionarHorario(horarioBtn, horario.hora));
            }
            
            gridHorarios.appendChild(horarioBtn);
        });
        
        horariosDisponiveis.appendChild(gridHorarios);
    }
    
    function selecionarHorario(botao, hora) {
        const botoes = document.querySelectorAll('.horario-btn');
        botoes.forEach(btn => btn.classList.remove('selecionado'));
        
        botao.classList.add('selecionado');
        horarioSelecionado = hora;
        agendarBtn.disabled = false;
    }
    
    function agendarConsulta() {
        if (!usuarioLogado) {
            alert('Por favor, faça login para agendar uma consulta.');
            abrirModalLogin();
            return;
        }
        
        if (!horarioSelecionado) {
            alert('Por favor, selecione um horário.');
            return;
        }
        
        const especialidade = especialidadeSelect.options[especialidadeSelect.selectedIndex].text;
        const medicoId = medicoSelect.value;
        const medicoNome = medicoSelect.options[medicoSelect.selectedIndex].text;
        const data = new Date(dataInput.value).toISOString().split('T')[0];
        const dataSelecionada = new Date(dataInput.value);
        
        if (isNaN(dataSelecionada.getTime())) {
            alert('Data inválida. Por favor, selecione uma data válida.');
            return;
        }

        //ajustar fuso horário
        const dataLocal = new Date(dataSelecionada.getTime() - (dataSelecionada.getTimezoneOffset() * 60000));
        const dataFormatada = formatarData(dataLocal.toISOString().split('T')[0]);

        //verifica se já existe uma consulta agendada para o mesmo médico e data
        const horarioOcupado = todasConsultasAgendadas.some(consulta => consulta.medicoId == medicoId && consulta.data == data && consulta.horario == horarioSelecionado);
        
        if (horarioOcupado) {
            alert('Este horário já está ocupado. Por favor, selecione outro horário.');
            carregarHorariosDisponiveis();
            return;
        }

        const consulta = {
            id: Date.now(),
            especialidade,
            medicoId,
            medicoNome,
            data: dataFormatada,
            horario: horarioSelecionado,
            status: 'Agendada',
            usuarioId: usuarioLogado.id
        };

        //adiciona a consulta à lista de consultas agendadas
        todasConsultasAgendadas.push(consulta);
        consultasAgendadas.push(consulta);
                
        carregarConsultasUsuario();
        
        especialidadeSelect.value = '';
        medicoSelect.innerHTML = '<option value="">Selecione um médico</option>';
        medicoSelect.disabled = true;
        dataInput.value = '';
        dataInput.disabled = true;
        horariosDisponiveis.innerHTML = '<p>Selecione uma especialidade, médico e data para ver os horários disponíveis.</p>';
        agendarBtn.disabled = true;
        horarioSelecionado = null;
        
        alert(`Consulta agendada com sucesso!\n\nDetalhes:\nMédico: ${medicoNome}\nEspecialidade: ${especialidade}\nData: ${dataFormatada}\nHorário: ${horarioSelecionado}`);
    }
    
    function carregarConsultasUsuario() {
        if (!usuarioLogado) return;
        
        consultasLista.innerHTML = '';
        
        if (consultasAgendadas.length === 0) {
            consultasLista.innerHTML = '<p>Você não possui consultas agendadas.</p>';
            return;
        }
        
        consultasAgendadas.forEach(consulta => {
            const consultaCard = document.createElement('div');
            consultaCard.className = 'consulta-card';

            //formatar data corretamente
            const dataFormatada = formatarData(consulta.data);
            const horarioFormatado = consulta.horario || 'Não definido';
            
            consultaCard.innerHTML = `
                <h3>Consulta de ${consulta.especialidade}</h3>
                <p><strong>Médico:</strong> ${consulta.medicoNome}</p>                
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Horário:</strong> ${horarioFormatado}</p>
                <p><strong>Status:</strong> ${consulta.status}</p>
                <div class="consulta-info">
                    <button class="btn cancelar-btn" data-id="${consulta.id}">Cancelar</button>
                </div>
            `;
            
            consultasLista.appendChild(consultaCard);
        });
        
        document.querySelectorAll('.cancelar-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const consultaId = parseInt(this.getAttribute('data-id'));
                cancelarConsulta(consultaId);
            });
        });
    }
    
    function cancelarConsulta(consultaId) {
        if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
            consultasAgendadas = consultasAgendadas.filter(consulta => consulta.id !== consultaId);
            carregarConsultasUsuario();
            alert('Consulta cancelada com sucesso.');
        }
    }
    
   // Função definida corretamente
    function formatarData(dataString) {
    try {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            return 'Data inválida';
        }
        return data.toLocaleDateString('pt-BR', {   
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        } catch (error) {
        console.error("Erro ao formatar data:", error);
        return 'Data inválida';
        }
    }
    
});
