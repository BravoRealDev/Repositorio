// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentYear();
    setupModal();
    setupHomeCards();
    applyMasks();
    setupMedicoLogin();
    setupPacienteLogin();
    setupPacienteCadastro();
    setupMedicoArea();
    setupPacienteExames();
    setupPacienteHistorico();
    setupServicosPage();
    setupLogout();
    setupTermsModal();
    
    // Redirecionamentos baseados em autenticação
    if (auth.isLoggedIn()) {
        if (auth.isMedico() && !window.location.pathname.includes('medico-')) {
            window.location.href = 'medico-diagnostico.html';
        } else if (auth.isPaciente() && !window.location.pathname.includes('paciente-')) {
            window.location.href = 'paciente-consulta.html';
        }
    }
});

// auth.js - Gerencia a autenticação do usuário
class AuthService {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    isMedico() {
        return this.isLoggedIn() && this.currentUser.tipo === 'medico';
    }

    isPaciente() {
        return this.isLoggedIn() && this.currentUser.tipo === 'paciente';
    }

    login(userData) {
        this.currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}

const auth = new AuthService();

// Funções globais
function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Configuração do Modal
function setupModal() {
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');

    if (loginModal && closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }
}

// Configuração dos Cards Interativos
function setupHomeCards() {
    const agendamentoCard = document.getElementById('agendamento-card');
    const diagnosticoCard = document.getElementById('diagnostico-card');
    const loginModal = document.getElementById('login-modal');
    const modalMessage = document.getElementById('modal-message');

    if (agendamentoCard) {
        agendamentoCard.addEventListener('click', function() {
            if (auth.isLoggedIn()) {
                if (auth.isPaciente()) {
                    window.location.href = 'paciente-consulta.html';
                } else {
                    modalMessage.textContent = 'Esta área é exclusiva para pacientes.';
                    loginModal.style.display = 'block';
                }
            } else {
                modalMessage.textContent = 'Você precisa estar logado como paciente para agendar consultas.';
                loginModal.style.display = 'block';
            }
        });
    }

    if (diagnosticoCard) {
        diagnosticoCard.addEventListener('click', function() {
            if (auth.isLoggedIn()) {
                if (auth.isMedico()) {
                    window.location.href = 'medico-diagnostico.html';
                } else {
                    modalMessage.textContent = 'Esta área é exclusiva para médicos.';
                    loginModal.style.display = 'block';
                }
            } else {
                modalMessage.textContent = 'Você precisa estar logado como médico para acessar diagnósticos.';
                loginModal.style.display = 'block';
            }
        });
    }
}

// Máscaras de formulário
function applyMasks() {
    // Máscara para CPF
    const cpfField = document.getElementById('cpf');
    if (cpfField) {
        cpfField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    // Máscara para telefone
    const telefoneField = document.getElementById('telefone');
    if (telefoneField) {
        telefoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            }
            if (value.length > 10) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            } else if (value.length > 6) {
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    }
}

// Login Médico
function setupMedicoLogin() {
    const loginForm = document.getElementById('medicoLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const crm = document.getElementById('medicoCrm').value;
            const senha = document.getElementById('medicoSenha').value;
            
            if (!crm || !senha) {
                alert('Por favor, preencha todos os campos');
                return false;
            }
            
            const medico = {
                id: 1,
                nome: "Dr. " + crm,
                tipo: "medico",
                crm: crm,
                especialidade: "Clínico Geral"
            };
            
            auth.login(medico);
            window.location.href = 'medico-diagnostico.html';
        });
    }
}

// Cadastro de Paciente
function setupPacienteCadastro() {
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return false;
            }
            
            const paciente = {
                id: Date.now(),
                nome: document.getElementById('nomeCompleto').value,
                dataNascimento: document.getElementById('dataNascimento').value,
                cpf: document.getElementById('cpf').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                tipo: "paciente"
            };
            
            const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            pacientes.push(paciente);
            localStorage.setItem('pacientes', JSON.stringify(pacientes));
            
            auth.login(paciente);
            window.location.href = 'paciente-consulta.html';
        });
    }
}

// Área do Médico
function setupMedicoArea() {
    if (document.getElementById('tabelaDiagnosticos')) {
        if (!auth.isLoggedIn() || !auth.isMedico()) {
            window.location.href = "medico-login.html";
            return;
        }

        document.getElementById('user-name').textContent = auth.currentUser.nome || 'Médico';
        document.getElementById('user-avatar').textContent = auth.currentUser.nome ? auth.currentUser.nome.charAt(0).toUpperCase() : 'M';

        // Função para carregar e exibir diagnósticos
        function carregarDiagnosticos() {
            const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos')) || [];
            const diagnosticosMedico = diagnosticos.filter(d => d.medicoCrm === auth.currentUser.crm);

            const tabelaDiagnosticos = document.getElementById('tabelaDiagnosticos').querySelector('tbody');
            tabelaDiagnosticos.innerHTML = '';

            if (diagnosticosMedico.length === 0) {
                tabelaDiagnosticos.innerHTML = '<tr><td colspan="4">Nenhum diagnóstico registrado</td></tr>';
            } else {
                diagnosticosMedico.forEach(d => {
                    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
                    const paciente = pacientes.find(p => p.cpf === d.pacienteCpf);
                    const nomePaciente = paciente ? paciente.nome : 'Paciente não encontrado';

                    const row = document.createElement('tr');
                    row.dataset.id = d.id; // Adiciona ID do diagnóstico como atributo
                    row.innerHTML = `
                        <td>${nomePaciente}</td>
                        <td>${new Date(d.data).toLocaleDateString('pt-BR')}</td>
                        <td>${d.diagnostico}</td>
                        <td>
                            <button class="btn-icon edit" title="Editar" data-id="${d.id}">✏️</button>
                            <button class="btn-icon delete" title="Excluir" data-id="${d.id}">🗑️</button>
                        </td>
                    `;
                    tabelaDiagnosticos.appendChild(row);
                });

                 // Adiciona eventos aos botões de edição e exclusão
                 document.querySelectorAll('.edit').forEach(btn => {
                    btn.addEventListener('click', editarDiagnostico);
                });

                document.querySelectorAll('.delete').forEach(btn => {
                    btn.addEventListener('click', excluirDiagnostico);
                });


        document.getElementById('novo-diagnostico').addEventListener('click', function() {
            window.location.href = 'diagnostico.html';
        });

        // Função para editar diagnóstico
        function editarDiagnostico(e) {
            const diagnosticoId = e.target.getAttribute('data-id');
            const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos')) || [];
            const diagnostico = diagnosticos.find(d => d.id == diagnosticoId);

            if (diagnostico) {
                // Armazena o diagnóstico a ser editado
                sessionStorage.setItem('diagnosticoEditando', JSON.stringify(diagnostico));
                // Redireciona para a página de edição (pode ser a mesma de novo diagnóstico)
                window.location.href = 'medico-novo-diagnostico.html?edit=true';
            }
        }

        // Função para excluir diagnóstico
        function excluirDiagnostico(e) {
            if (confirm('Tem certeza que deseja excluir este diagnóstico?')) {
                const diagnosticoId = e.target.getAttribute('data-id');
                const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos')) || [];
                
                // Filtra removendo o diagnóstico selecionado
                const diagnosticosAtualizados = diagnosticos.filter(d => d.id != diagnosticoId);
                
                // Atualiza localStorage
                localStorage.setItem('diagnosticos', JSON.stringify(diagnosticosAtualizados));
                
                // Recarrega a lista
                carregarDiagnosticos();
                alert('Diagnóstico excluído com sucesso!');
            }
        }

        // Carrega os diagnósticos inicialmente
        carregarDiagnosticos();

        // Botão para novo diagnóstico
        document.getElementById('novo-diagnostico').addEventListener('click', function() {
            sessionStorage.removeItem('diagnosticoEditando');
            window.location.href = 'medico-novo-diagnostico.html';
        });
    }
}
    }
}


// Logout
function setupLogout() {
    const logoutButtons = document.querySelectorAll('[onclick="logout()"]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            auth.logout();
            window.location.href = this.getAttribute('href');
        });
    });
}


// Login Paciente
function setupPacienteLogin() {
    const loginForm = document.getElementById('pacienteLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = document.getElementById('pacienteCpf').value;
            const senha = document.getElementById('pacienteSenha').value;
            
            if (!cpf || !senha) {
                alert('Por favor, preencha todos os campos');
                return false;
            }
            
            // Simulação de login - verifica no localStorage
            const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            const paciente = pacientes.find(p => p.cpf === cpf);
            
            if (paciente) {
                auth.login(paciente);
                window.location.href = 'paciente-consulta.html';
            } else {
                alert('CPF não cadastrado ou senha incorreta');
            }
        });
    }
}

// Área do Paciente - Exames
function setupPacienteExames() {
    if (document.getElementById('tabelaExames')) {
        if (!auth.isLoggedIn() || !auth.isPaciente()) {
            window.location.href = "paciente-login.html";
            return;
        }

        // Atualiza informações do usuário
        document.getElementById('user-name').textContent = auth.currentUser.nome || 'Paciente';
        document.getElementById('user-avatar').textContent = auth.currentUser.nome ? auth.currentUser.nome.charAt(0).toUpperCase() : 'P';

        // Carrega exames do localStorage
        const exames = JSON.parse(localStorage.getItem('exames')) || [];
        const tabelaExames = document.getElementById('tabelaExames').querySelector('tbody');
        
        // Filtra exames apenas do paciente logado
        const examesPaciente = exames.filter(exame => exame.pacienteId === auth.currentUser.id);
        
        // Limpa a tabela antes de carregar
        tabelaExames.innerHTML = '';

        if (examesPaciente.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" class="no-results">Nenhum exame encontrado</td>`;
            tabelaExames.appendChild(row);
        } else {
            examesPaciente.forEach(exame => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${exame.tipo}</td>
                    <td>${formatarData(exame.data)}</td>
                    <td><span class="status-badge ${exame.status.toLowerCase()}">${exame.status}</span></td>
                    <td>
                        ${exame.status === 'Disponível' ? 
                          '<button class="btn-icon download" title="Download">⬇️</button>' : ''}
                        ${exame.status === 'Agendado' ? 
                          '<button class="btn-icon cancel" title="Cancelar">✖️</button>' : ''}
                    </td>
                `;
                tabelaExames.appendChild(row);
            });
        }

        // Botão para limpar exames cancelados
        document.getElementById('limpar-exames-btn').addEventListener('click', function() {
            const exames = JSON.parse(localStorage.getItem('exames')) || [];
            const examesAtualizados = exames.filter(exame => 
                exame.pacienteId !== auth.currentUser.id || exame.status !== 'Cancelado'
            );
            localStorage.setItem('exames', JSON.stringify(examesAtualizados));
            alert('Exames cancelados removidos com sucesso!');
            location.reload();
        });
    }
}

// Função auxiliar para formatar data
function formatarData(dataString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
}

// Área do Paciente - Histórico
function setupPacienteHistorico() {
    if (document.getElementById('tabelaHistorico')) {
        if (!auth.isLoggedIn() || !auth.isPaciente()) {
            window.location.href = "paciente-login.html";
            return;
        }

        // Atualiza informações do usuário
        document.getElementById('user-name').textContent = auth.currentUser.nome || 'Paciente';
        document.getElementById('user-avatar').textContent = auth.currentUser.nome ? auth.currentUser.nome.charAt(0).toUpperCase() : 'P';

        // Simulação de histórico médico (substituir por dados reais)
        const historico = [
            { 
                data: "2023-06-15", 
                tipo: "Consulta",
                descricao: "Consulta de rotina", 
                medico: "Dr. João Silva",
                detalhes: "Paciente apresentou melhora nos sintomas relatados na consulta anterior"
            },
            { 
                data: "2023-07-10", 
                tipo: "Exame",
                descricao: "Exame de sangue completo", 
                medico: "Dra. Maria Oliveira",
                detalhes: "Hemograma completo - resultados dentro da normalidade"
            },
            { 
                data: "2023-08-05", 
                tipo: "Procedimento",
                descricao: "Vacinação anual", 
                medico: "Enf. Carlos Andrade",
                detalhes: "Aplicação da vacina contra influenza"
            }
        ];

        const tabelaHistorico = document.getElementById('tabelaHistorico').querySelector('tbody');
        
        if (historico.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5" class="no-results">Nenhum registro de histórico encontrado</td>`;
            tabelaHistorico.appendChild(row);
        } else {
            historico.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatarData(item.data)}</td>
                    <td><span class="tipo-badge ${item.tipo.toLowerCase()}">${item.tipo}</span></td>
                    <td>${item.descricao}</td>
                    <td>${item.medico}</td>
                    <td><button class="btn-icon details" title="Ver detalhes" data-details="${item.detalhes}">🔍</button></td>
                `;
                tabelaHistorico.appendChild(row);
            });
        }

        // Botão para gerar relatório
        document.getElementById('gerar-relatorio').addEventListener('click', function() {
            alert('Relatório gerado com sucesso! Esta funcionalidade pode ser expandida para gerar um PDF completo.');
        });

        // Eventos para os botões de detalhes
        document.querySelectorAll('.details').forEach(button => {
            button.addEventListener('click', function() {
                const detalhes = this.getAttribute('data-details');
                alert(`Detalhes:\n\n${detalhes}`);
            });
        });
    }
}

// Serviços Médicos
function setupServicosPage() {
    if (document.getElementById('servicesContainer')) {
        // Dados dos serviços médicos (pode ser substituído por chamada API)
        const servicosMedicos = [
            {
                id: 1,
                nome: "Consulta Clínica Geral",
                especialidade: "Clínico Geral",
                descricao: "Avaliação geral de saúde com médico clínico",
                categoria: "clinica",
                duracao: "30 min",
                icon: "👨‍⚕️"
            },
            {
                id: 2,
                nome: "Cardiologia",
                especialidade: "Cardiologista",
                descricao: "Avaliação e acompanhamento de doenças cardíacas",
                categoria: "especializada",
                duracao: "40 min",
                icon: "❤️"
            },
            {
                id: 3,
                nome: "Dermatologia",
                especialidade: "Dermatologista",
                descricao: "Diagnóstico e tratamento de doenças de pele",
                categoria: "especializada",
                duracao: "30 min",
                icon: "🧴"
            },
            {
                id: 4,
                nome: "Pediatria",
                especialidade: "Pediatra",
                descricao: "Acompanhamento de saúde infantil",
                categoria: "especializada",
                duracao: "40 min",
                icon: "👶"
            },
            {
                id: 5,
                nome: "Exame de Sangue",
                especialidade: "Laboratório",
                descricao: "Coleta de sangue para análise laboratorial",
                categoria: "exames",
                duracao: "15 min",
                icon: "💉"
            },
            {
                id: 6,
                nome: "Ultrassonografia",
                especialidade: "Imagem",
                descricao: "Exame de imagem por ultrassom",
                categoria: "exames",
                duracao: "30 min",
                icon: "📷"
            },
            {
                id: 7,
                nome: "Vacinação",
                especialidade: "Enfermagem",
                descricao: "Aplicação de vacinas conforme calendário",
                categoria: "procedimentos",
                duracao: "20 min",
                icon: "💊"
            }
        ];

        // Função para renderizar serviços
        function renderServicos(servicos) {
            const container = document.getElementById('servicesContainer');
            container.innerHTML = '';

            if (servicos.length === 0) {
                container.innerHTML = '<div class="no-results">Nenhum serviço encontrado com os filtros aplicados</div>';
                return;
            }

            servicos.forEach(servico => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <div class="service-image">
                        ${servico.icon}
                    </div>
                    <div class="service-info">
                        <h3>${servico.nome}</h3>
                        <span class="service-specialty">${servico.especialidade}</span>
                        <p class="service-description">${servico.descricao}</p>
                        <div class="service-meta">
                            <span>⏱️ ${servico.duracao}</span>
                            <span>${servico.categoria === 'clinica' ? '⭐ Básico' : '✨ Especializado'}</span>
                        </div>
                        <button class="btn-agendar" data-servico-id="${servico.id}">Agendar Consulta</button>
                    </div>
                `;
                container.appendChild(card);
            });

            // Adiciona eventos aos botões de agendamento
            document.querySelectorAll('.btn-agendar').forEach(btn => {
                btn.addEventListener('click', function() {
                    const servicoId = this.getAttribute('data-servico-id');
                    agendarServico(servicoId);
                });
            });
        }

        // Função para agendar serviço
        function agendarServico(servicoId) {
            if (!auth.isLoggedIn()) {
                alert('Por favor, faça login como paciente para agendar consultas.');
                window.location.href = 'paciente-login.html';
                return;
            }

            if (!auth.isPaciente()) {
                alert('Apenas pacientes podem agendar consultas.');
                return;
            }

            const servico = servicosMedicos.find(s => s.id == servicoId);
            if (servico) {
                // Armazena o serviço selecionado para usar na página de agendamento
                sessionStorage.setItem('servicoSelecionado', JSON.stringify(servico));
                window.location.href = 'paciente-consulta.html';
            }
        }

        // Filtros e busca
        document.getElementById('searchInput').addEventListener('input', function() {
            filtrarServicos();
        });

        document.getElementById('filterCategory').addEventListener('change', function() {
            filtrarServicos();
        });

        function filtrarServicos() {
            const termoBusca = document.getElementById('searchInput').value.toLowerCase();
            const categoria = document.getElementById('filterCategory').value;

            let servicosFiltrados = servicosMedicos;

            if (categoria !== 'all') {
                servicosFiltrados = servicosFiltrados.filter(s => s.categoria === categoria);
            }

            if (termoBusca) {
                servicosFiltrados = servicosFiltrados.filter(s => 
                    s.nome.toLowerCase().includes(termoBusca) || 
                    s.especialidade.toLowerCase().includes(termoBusca)
                );
            }

            renderServicos(servicosFiltrados);
        }

        // Renderiza todos os serviços inicialmente
        renderServicos(servicosMedicos);
    }
}

// Conteúdos dos Termos e Política
const termsContent = {
    title: "Termos de Serviço - Sistema de Saúde Pública",
    content: `
      <h3>1. Aceitação dos Termos</h3>
      <p>Ao utilizar o Sistema de Saúde Pública, você concorda com estes Termos de Serviço e com nossa Política de Privacidade.</p>
      
      <h3>2. Uso do Sistema</h3>
      <p>O sistema destina-se exclusivamente a:</p>
      <ul>
        <li>Agendamento de consultas médicas</li>
        <li>Acompanhamento de exames e resultados</li>
        <li>Gestão de histórico médico pessoal</li>
      </ul>
      
      <h3>3. Responsabilidades do Usuário</h3>
      <p>Você concorda em:</p>
      <ul>
        <li>Fornecer informações verdadeiras e atualizadas</li>
        <li>Manter suas credenciais de acesso em sigilo</li>
        <li>Não utilizar o sistema para fins ilegais ou não autorizados</li>
      </ul>
      
      <h3>4. Limitações</h3>
      <p>O sistema não substitui atendimento médico emergencial. Em caso de urgência, procure imediatamente um serviço de saúde.</p>
    `
  };
  
  const privacyContent = {
    title: "Política de Privacidade - Sistema de Saúde Pública",
    content: `
      <h3>1. Informações Coletadas</h3>
      <p>Coletamos os seguintes dados pessoais:</p>
      <ul>
        <li>Dados cadastrais (nome, CPF, data de nascimento)</li>
        <li>Informações de contato (e-mail, telefone)</li>
        <li>Dados de saúde (consultas, exames, diagnósticos)</li>
      </ul>
      
      <h3>2. Uso das Informações</h3>
      <p>Seus dados serão utilizados para:</p>
      <ul>
        <li>Prestação de serviços médicos</li>
        <li>Agendamento de consultas e exames</li>
        <li>Comunicação sobre sua saúde</li>
        <li>Melhoria dos nossos serviços</li>
      </ul>
      
      <h3>3. Compartilhamento de Dados</h3>
      <p>Seus dados poderão ser compartilhados com:</p>
      <ul>
        <li>Profissionais de saúde diretamente envolvidos em seu tratamento</li>
        <li>Laboratórios e clínicas parceiras</li>
        <li>Autoridades sanitárias quando exigido por lei</li>
      </ul>
      
      <h3>4. Segurança</h3>
      <p>Utilizamos medidas técnicas e administrativas para proteger seus dados, incluindo criptografia e controle de acesso.</p>
    `
  };
  
  // Configuração do Modal de Termos
  function setupTermsModal() {
    const modal = document.getElementById('terms-modal');
    const closeBtn = document.querySelector('.close-modal');
    const termsLinks = document.querySelectorAll('a[href="#"]');
    
    // Fechar modal ao clicar no X ou fora
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
    
    // Configurar links
    termsLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('modal-title');
        const content = document.getElementById('modal-content');
        
        if (link.textContent.includes('Termos')) {
          title.textContent = termsContent.title;
          content.innerHTML = termsContent.content;
        } else {
          title.textContent = privacyContent.title;
          content.innerHTML = privacyContent.content;
        }
        
        modal.style.display = 'block';

      });
    });
  }

// Função para buscar paciente por CPF
function buscarPaciente() {
    const cpf = document.getElementById('pacienteCpf').value.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
        alert('CPF inválido. Digite os 11 números do CPF.');
        return;
    }
    
    // Simulação de busca no "banco de dados"
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes.find(p => p.cpf === cpf);
    
    if (paciente) {
        document.getElementById('pacienteNome').textContent = paciente.nome;
        document.getElementById('pacienteNascimento').textContent = new Date(paciente.dataNascimento).toLocaleDateString('pt-BR');
        document.getElementById('pacienteSUS').textContent = paciente.cartaoSUS || 'Não informado';
        
        // Busca última consulta
        const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        const ultimaConsulta = consultas
            .filter(c => c.pacienteCpf === cpf)
            .sort((a, b) => new Date(b.data) - new Date(a.data))[0];
        
        document.getElementById('pacienteUltimaConsulta').textContent = ultimaConsulta 
            ? new Date(ultimaConsulta.data).toLocaleString('pt-BR') 
            : 'Nenhuma consulta registrada';
        
        document.getElementById('dadosPaciente').style.display = 'block';
    } else {
        alert('Paciente não encontrado. Verifique o CPF digitado.');
        document.getElementById('dadosPaciente').style.display = 'none';
    }
}

// Função para salvar diagnóstico
function salvarDiagnostico(e) {
    e.preventDefault();
    
    // Verifica autenticação
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.tipo !== 'medico') {
        alert('Acesso não autorizado');
        window.location.href = 'medico-login.html';
        return;
    }
    
    // Obtém e valida CPF
    const cpf = document.getElementById('pacienteCpf').value.replace(/\D/g, '');
    if (cpf.length !== 11) {
        alert('CPF inválido. Digite os 11 números do CPF.');
        return;
    }
    
    // Verifica se paciente existe
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes.find(p => p.cpf === cpf);
    if (!paciente) {
        alert('Paciente não encontrado. Verifique o CPF digitado.');
        return;
    }
    
    // Valida campos obrigatórios
    const camposObrigatorios = [
        { id: 'dataConsulta', nome: 'Data da Consulta' },
        { id: 'sintomas', nome: 'Sintomas' },
        { id: 'diagnostico', nome: 'Diagnóstico' }
    ];
    
    for (const campo of camposObrigatorios) {
        if (!document.getElementById(campo.id).value.trim()) {
            alert(`O campo ${campo.nome} é obrigatório!`);
            return;
        }
    }
    
    // Cria objeto do diagnóstico
    const novoDiagnostico = {
        id: Date.now(),
        pacienteCpf: cpf,
        pacienteNome: paciente.nome, // Adiciona nome do paciente
        medicoCrm: currentUser.crm,
        medicoNome: currentUser.nome,
        data: document.getElementById('dataConsulta').value,
        sintomas: document.getElementById('sintomas').value,
        diagnostico: document.getElementById('diagnostico').value,
        prescricao: document.getElementById('prescricao').value || '',
        observacoes: document.getElementById('observacoes').value || '',
        dataRegistro: new Date().toISOString()
    };
    
    try {
        // Salva diagnóstico
        const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos')) || [];
        diagnosticos.push(novoDiagnostico);
        localStorage.setItem('diagnosticos', JSON.stringify(diagnosticos));
        
        // Atualiza lista de consultas
        const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        consultas.push({
            id: novoDiagnostico.id,
            pacienteCpf: cpf,
            medicoCrm: currentUser.crm,
            data: novoDiagnostico.data,
            especialidade: currentUser.especialidade || 'Clínico Geral',
            status: 'realizada',
            diagnosticoId: novoDiagnostico.id
        });
        localStorage.setItem('consultas', JSON.stringify(consultas));
        
        alert('Diagnóstico registrado com sucesso!');
        window.location.href = 'medico-diagnostico.html';
    } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
        alert('Erro ao salvar diagnóstico. Por favor, tente novamente.');
    }
}

// Função para logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Função para inicializar a página
function initDiagnosticoPage() {
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Configura data/hora padrão para agora
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0, 16);
    document.getElementById('dataConsulta').value = localISOTime;
    
    // Verifica se o usuário está logado como médico
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user || user.tipo !== 'medico') {
        window.location.href = 'medico-login.html';
    } else {
        document.getElementById('user-name').textContent = user.nome;
        document.getElementById('user-avatar').textContent = user.nome.charAt(0);
    }
    
    // Event Listeners
    document.getElementById('buscarPaciente').addEventListener('click', buscarPaciente);
    document.getElementById('formDiagnostico').addEventListener('submit', salvarDiagnostico);
    document.getElementById('cancelarBtn').addEventListener('click', () => {
        window.location.href = 'medico-diagnostico.html';
    });
    document.getElementById('logout-btn').addEventListener('click', logout);
}

// Inicializa a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initDiagnosticoPage);


// Função para buscar paciente por CPF
function buscarPaciente() {
    const cpf = document.getElementById('pacienteCpf').value.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
        alert('CPF inválido. Digite os 11 números do CPF.');
        return;
    }
    
    // Simulação de busca no "banco de dados"
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes.find(p => p.cpf === cpf);
    
    if (paciente) {
        document.getElementById('pacienteNome').textContent = paciente.nome;
        document.getElementById('pacienteNascimento').textContent = new Date(paciente.dataNascimento).toLocaleDateString('pt-BR');
        document.getElementById('pacienteSUS').textContent = paciente.cartaoSUS || 'Não informado';
        
        // Busca última consulta
        const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        const ultimaConsulta = consultas
            .filter(c => c.pacienteCpf === cpf)
            .sort((a, b) => new Date(b.data) - new Date(a.data))[0];
        
        document.getElementById('pacienteUltimaConsulta').textContent = ultimaConsulta 
            ? new Date(ultimaConsulta.data).toLocaleString('pt-BR') 
            : 'Nenhuma consulta registrada';
        
        document.getElementById('dadosPaciente').style.display = 'block';
    } else {
        alert('Paciente não encontrado. Verifique o CPF digitado.');
        document.getElementById('dadosPaciente').style.display = 'none';
    }
}

// Função para salvar diagnóstico
function salvarDiagnostico(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cpf = document.getElementById('pacienteCpf').value.replace(/\D/g, '');
    
    if (!currentUser || currentUser.tipo !== 'medico') {
        alert('Acesso não autorizado');
        window.location.href = 'medico-login.html';
        return;
    }
    
    const novoDiagnostico = {
        id: Date.now(),
        pacienteCpf: cpf,
        medicoCrm: currentUser.crm,
        medicoNome: currentUser.nome,
        data: document.getElementById('dataConsulta').value,
        sintomas: document.getElementById('sintomas').value,
        diagnostico: document.getElementById('diagnostico').value,
        prescricao: document.getElementById('prescricao').value,
        observacoes: document.getElementById('observacoes').value,
        dataRegistro: new Date().toISOString()
    };
    
    // Salva no "banco de dados"
    const diagnosticos = JSON.parse(localStorage.getItem('diagnosticos')) || [];
    diagnosticos.push(novoDiagnostico);
    localStorage.setItem('diagnosticos', JSON.stringify(diagnosticos));
    
    alert('Diagnóstico registrado com sucesso!');
    window.location.href = 'medico-diagnostico.html';
}

// Função para logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Função para inicializar a página
function initDiagnosticoPage() {
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Configura data/hora padrão para agora
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0, 16);
    document.getElementById('dataConsulta').value = localISOTime;
    
    // Verifica se o usuário está logado como médico
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user || user.tipo !== 'medico') {
        window.location.href = 'medico-login.html';
    } else {
        document.getElementById('user-name').textContent = user.nome;
        document.getElementById('user-avatar').textContent = user.nome.charAt(0);
    }
    
    // Event Listeners
    document.getElementById('buscarPaciente').addEventListener('click', buscarPaciente);
    document.getElementById('formDiagnostico').addEventListener('submit', salvarDiagnostico);
    document.getElementById('cancelarBtn').addEventListener('click', () => {
        window.location.href = 'medico-diagnostico.html';
    });
    document.getElementById('logout-btn').addEventListener('click', logout);
}

// Inicializa a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initDiagnosticoPage);


  
// Adicionar ao script.js DADOS MOCKADOS
// Mock de dados para pacientes, médicos, consultas e diagnósticos
if (!localStorage.getItem('pacientes')) {
    localStorage.setItem('pacientes', JSON.stringify([
        {
            id: 1,
            nome: "João Silva",
            dataNascimento: "1990-01-01",
            cpf: "12345678900",
            telefone: "(11) 91234-5678",
            email: "joaosilva@gmail.com",
            tipo: "paciente",
            senha: "senha123"
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            dataNascimento: "1985-05-15",
            cpf: "98765432100",
            telefone: "(11) 99876-5432",
            email: "mariaoliveira@gmail.com",
            tipo: "paciente",
            senha: "senha456"
        }
    ]));
}

if (!localStorage.getItem('medicos')) {
    localStorage.setItem('medicos', JSON.stringify([
        {
            id: 1,
            nome: "Dr. João Silva",
            crm: "SP123456",
            especialidade: "Clínico Geral",
            tipo: "medico",
            senha: "senha123"
        },
        {
            id: 2,
            nome: "Dra. Maria Oliveira",
            crm: "SP654321",
            especialidade: "Pediatra",
            tipo: "medico",
            senha: "senha456"
        }
    ]));
}


if (!localStorage.getItem('consultas')) {
    localStorage.setItem('consultas', JSON.stringify([
        {
            id: 1,
            pacienteCpf: "12345678900",
            medicoCrm: "SP123456",
            data: "2023-07-20T14:00",
            especialidade: "Clínico Geral",
            status: "agendada"
        }
    ]));
}

if (!localStorage.getItem('diagnosticos')) {
    localStorage.setItem('diagnosticos', JSON.stringify([
        {
            id: 1,
            pacienteCpf: "12345678900",
            medicoCrm: "SP123456",
            data: "2023-06-15",
            diagnostico: "Hipertensão estágio 1",
            prescricao: "Mudanças na dieta e exercícios físicos"
        }
    ]));
}

document.addEventListener('DOMContentLoaded', function() {

    // --- DADOS DE EXEMPLO ---
    // Em um projeto real, esses dados viriam de uma API/banco de dados.
    const consultasData = [
        { data: '2024-05-28', horario: '14:00', medico: 'Dr. Carlos Andrade', status: 'Realizada' },
        { data: '2024-06-15', horario: '10:30', medico: 'Dra. Beatriz Lima', status: 'Realizada' },
        { data: '2024-07-22', horario: '09:00', medico: 'Dr. Carlos Andrade', status: 'Agendada' },
        { data: '2024-07-25', horario: '11:00', medico: 'Dr. Ricardo Souza', status: 'Agendada' },
        { data: '2024-08-05', horario: '16:00', medico: 'Dra. Beatriz Lima', status: 'Agendada' },
        { data: '2024-05-10', horario: '08:00', medico: 'Dr. Ricardo Souza', status: 'Cancelada' }
    ];

    // Função para carregar as consultas na tabela
    function carregarConsultas() {
        const tabelaBody = document.querySelector('#tabelaConsultas tbody');
        tabelaBody.innerHTML = ''; // Limpa a tabela antes de preencher

        if (consultasData.length === 0) {
            document.getElementById('sem-consultas').style.display = 'table-row';
            return;
        }

        // Ordenar consultas por data (mais recentes primeiro)
        consultasData.sort((a, b) => new Date(b.data) - new Date(a.data));

        consultasData.forEach(consulta => {
            const tr = document.createElement('tr');

            // Formatar data para o padrão brasileiro (dd/mm/yyyy)
            const dataFormatada = new Date(consulta.data + 'T00:00:00').toLocaleDateString('pt-BR');

            // Criar uma classe para o status para poder estilizar
            const statusClass = 'status-' + consulta.status.toLowerCase();

            tr.innerHTML = `
                <td>${dataFormatada}</td>
                <td>${consulta.horario}</td>
                <td>${consulta.medico}</td>
                <td><span class="status ${statusClass}">${consulta.status}</span></td>
                <td>
                    <button class="btn-action btn-details" title="Ver Detalhes">Detalhes</button>
                    ${consulta.status === 'Agendada' ? '<button class="btn-action btn-cancel" title="Cancelar Consulta">Cancelar</button>' : ''}
                </td>
            `;
            tabelaBody.appendChild(tr);
        });

        adicionarEventListenersAcoes();
    }
    
    // Função para atualizar os cards de resumo
    function atualizarCards() {
        const totalAgendadas = consultasData.filter(c => c.status === 'Agendada').length;
        const totalRealizadas = consultasData.filter(c => c.status === 'Realizada').length;
        
        // Encontrar a próxima consulta
        const proximasConsultas = consultasData
            .filter(c => c.status === 'Agendada' && new Date(c.data) >= new Date())
            .sort((a, b) => new Date(a.data) - new Date(b.data));

        let proximaConsultaTexto = 'Nenhuma';
        if (proximasConsultas.length > 0) {
            const proxima = proximasConsultas[0];
            const dataFormatada = new Date(proxima.data + 'T00:00:00').toLocaleDateString('pt-BR');
            proximaConsultaTexto = `${dataFormatada} às ${proxima.horario}`;
        }
        
        document.getElementById('total-agendadas').textContent = totalAgendadas;
        document.getElementById('total-realizadas').textContent = totalRealizadas;
        document.getElementById('proxima-consulta').textContent = proximaConsultaTexto;
    }
    
    // Função para adicionar listeners aos botões de ação
    function adicionarEventListenersAcoes() {
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', () => alert('Funcionalidade "Detalhes" a ser implementada.'));
        });

        document.querySelectorAll('.btn-cancel').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                    alert('Consulta cancelada! (Esta é uma simulação)');
                    // Aqui você adicionaria a lógica para atualizar o status da consulta
                }
            });
        });
    }

    // Funcionalidade do botão de Sair
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Você foi desconectado.');
            // Redirecionar para a página de login, por exemplo
            window.location.href = 'login.html'; 
        });
    }

    // Atualizar ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Iniciar o carregamento dos dados
    carregarConsultas();
    atualizarCards();
});