# Sistema de Cadastro de Pacientes e Médicos

Este projeto é um sistema de cadastro que permite a interação entre pacientes e médicos. Os pacientes podem visualizar suas consultas, enquanto os médicos têm a capacidade de diagnosticar pacientes.

## Estrutura do Projeto

```
sistema-cadastro
├── src
│   ├── controllers
│   │   ├── medicoController.ts
│   │   └── pacienteController.ts
│   ├── models
│   │   ├── medico.ts
│   │   └── paciente.ts
│   ├── routes
│   │   ├── medicoRoutes.ts
│   │   └── pacienteRoutes.ts
│   ├── views
│   │   ├── medico
│   │   │   └── diagnostico.html
│   │   ├── paciente
│   │   │   └── consultas.html
│   │   └── shared
│   │       ├── header.html
│   │       └── footer.html
│   ├── app.ts
│   └── types
│       └── index.ts
├── public
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── script.js
│   └── assets
│       └── icons
│           └── health-icon.png
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd sistema-cadastro
   ```
3. Instale as dependências:
   ```
   npm install
   ```

## Uso

Para iniciar o servidor, execute:
```
npm start
```

Acesse o sistema através do navegador em `http://localhost:3000`.

## Funcionalidades

- **Cadastro de Pacientes**: Permite que novos pacientes se cadastrem no sistema.
- **Login de Pacientes e Médicos**: Autenticação para acesso às funcionalidades específicas.
- **Diagnóstico de Pacientes**: Médicos podem registrar diagnósticos para pacientes.
- **Visualização de Consultas**: Pacientes podem visualizar suas consultas agendadas.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.