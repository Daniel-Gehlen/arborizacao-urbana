# 🌳 Projeto de Arborização Urbana Colaborativa  

**Plataforma web para engajar cidadãos no mapeamento e promoção de áreas verdes**  

## 🛠️ Tecnologias Utilizadas  

### Frontend  
- **Framework**: React.js (com Vite para build otimizado)  
- **Mapas**: Leaflet.js + OpenStreetMap  
- **Gráficos**: Chart.js  
- **UI**: Tailwind CSS + HeadlessUI  
- **Validação**: Formik + Yup  
- **Geolocalização**: API ViaCEP + Nominatim (OpenStreetMap)  

### Backend  
- **API**: Node.js + Express  
- **Autenticação**: JWT simples  
- **Limitação de Requests**: rate-limiting básico (express-rate-limit)  

### Aqui está a versão ajustada da seção de Banco de Dados, conforme sua solicitação:

## 📦 Banco de Dados
- **Armazenamento Local**: 
  - Dados persistidos diretamente no navegador usando `localStorage` e `IndexedDB`
  - Estrutura simples (JSON) para formulários submetidos
  - Permanecem disponíveis mesmo após fechar o navegador

- **Sem Autenticação**:
  - Todos os dados são públicos e de contribuição aberta
  - Validação básica por IP/Cookie para evitar duplicações

- **Futura Evolução** (opcional):
  - Migração para SQLite/PostgreSQL quando houver necessidade de análise avançada
  - Possível integração com APIs municipais existentes

### DevOps  
- **Hosting**: Vercel (frontend) + Render (backend)  
- **CI/CD**: GitHub Actions (testes automatizados)  

## 📋 Casos de Uso  

### 1. Formulário de Solicitação Cidadão  
- **Fluxo**:  
  1. Usuário insere CEP → autocompletar endereço (ViaCEP)  
  2. Seleciona pontos no mapa (Leaflet)  
  3. Envia solicitação com fotos opcionais  
- **Validações**:  
  - IP limitado a 1 envio/mês  
  - Campos obrigatórios sanitizados  

### 2. Dashboard Público  
- **Visualizações**:  
  - Mapa calorimétrico de áreas carentes  
  - Gráficos de solicitações por região (Chart.js)  
  - Tabela filtrada por bairro/status  
- **Funcionalidades**:  
  - Exportar dados como CSV  
  - Modo acessível (alto contraste)  

### 3. Painel Administrativo (Prefeitura)  
- **Features**:  
  - Aprovar/rejeitar solicitações  
  - Atualizar status de plantios  
  - Gerar relatórios mensais  

## 🚀 Estrutura do Projeto  
```  
├── frontend/  
│   ├── public/          # Assets estáticos  
│   ├── src/  
│   │   ├── components/  # Formulário, Mapa, Gráficos  
│   │   ├── hooks/       # Custom hooks (ex: useGeolocation)  
│   │   └── utils/       # Helpers para formatação  
├── backend/  
│   ├── controllers/     # Lógica das rotas  
│   ├── middlewares/     # Rate-limiting, CORS  
│   └── models/          # Definição dos dados  
└── docs/                # Especificações técnicas  
```  

## 🔧 Pré-requisitos para Desenvolvimento  
- Node.js 18+  
- Git  
- SQLite3 (para desenvolvimento local)  

## ⚙️ Como Contribuir  
1. Faça fork do repositório  
2. Crie uma branch para sua feature:  
   ```bash  
   git checkout -b feature/nova-funcionalidade  
   ```  
3. Envie um PR com:  
   - Descrição clara das mudanças  
   - Screenshots (se aplicável)  

## 🌱 Roadmap  
- [ ] Fase 1: MVP com formulário + dashboard (2 meses)  
- [ ] Fase 2: Integração com API da Prefeitura  
- [ ] Fase 3: App mobile (React Native)  

## 📄 Licença  
MIT License - Dados abertos para uso comunitário  

---  

**Nota para Desenvolvedores:**  
Este projeto prioriza:  
✅ Documentação clara  
✅ Componentes reutilizáveis  
✅ Performance em dispositivos móveis  

*"Código que cresce junto com as árvores da cidade!"* 🌿💻  

(Link do repositório: `(https://github.com/Daniel-Gehlen/arborizacao-urbana)`)  

