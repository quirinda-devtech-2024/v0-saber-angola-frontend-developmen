# SaberAngola - Plataforma de Geração de Documentos Acadêmicos

Uma plataforma moderna para estudantes universitários angolanos criarem documentos acadêmicos profissionais de forma rápida e eficiente.

## 🚀 Funcionalidades

- **Landing Page**: Apresentação da plataforma e registro de usuários
- **Modelos**: Biblioteca de templates acadêmicos (monografias, TFC, CVs, cartas formais)
- **Documentos**: Formulário de preenchimento de dados para geração
- **Studio**: Editor premium para personalização avançada
- **Perfil**: Gestão de conta e dados acadêmicos
- **Guia do Usuário**: Tutoriais e documentação

## 🛠️ Tecnologias

- **Framework**: Next.js 14 com App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Tipografia**: Geist Sans & Geist Mono
- **Ícones**: Lucide React
- **Formulários**: React Hook Form + Zod
- **Analytics**: Vercel Analytics

## 📦 Instalação

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
\`\`\`

## 🌐 Deploy

O projeto está otimizado para deploy na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente necessárias
3. Deploy automático a cada push

### Variáveis de Ambiente

\`\`\`env
# Adicione suas variáveis de ambiente aqui
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
app/
├── page.tsx              # Landing Page
├── home/                 # Dashboard
├── modelos/              # Biblioteca de Templates
├── documentos/           # Formulário de Preenchimento
├── studio/               # Editor Premium
├── perfil/               # Gestão de Conta
├── guia/                 # Tutoriais
└── atualizacoes/         # Changelog

components/
├── navigation/           # Header & Footer
├── ui/                   # Componentes UI
└── ...

public/
├── images/               # Assets e Imagens
└── ...
\`\`\`

## 🎨 Design System

- **Cores Primárias**: Baseadas no logo da SaberAngola
- **Tipografia**: Geist Sans para interface, Geist Mono para código
- **Componentes**: Sistema consistente com Radix UI
- **Responsividade**: Mobile-first design

## 📄 Licença

© 2024 SaberAngola. Todos os direitos reservados.
