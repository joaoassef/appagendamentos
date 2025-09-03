# Agenda de Serviços (React Native + Expo)

Aplicativo para pequenos negócios gerenciarem **serviços, colaboradores, agendamentos e atendimentos** de forma simples.  
Este repositório contém o código do app **appagendamentos** desenvolvido com **React Native + Expo**.

---

## Sumário
- [Visão Geral](#visão-geral)
- [Stack e Requisitos](#stack-e-requisitos)
- [Como Rodar](#como-rodar)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Funcionalidades (RF)](#funcionalidades-rf)
- [Requisitos Não Funcionais (RNF)](#requisitos-não-funcionais-rnf)
- [Progresso](#progresso)
- [Roadmap](#roadmap)
- [Padrões do Projeto](#padrões-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral

O app permite:
- Cadastrar **serviços** e **colaboradores** (com preferências por serviço).
- **Agendar** clientes com data/hora e visualizar tudo no **calendário**.
- Transformar agendamentos em **atendimentos**, editar e compartilhar um **resumo**.
- Ajustar o **tema** (automático, claro, escuro) e recuperar **senha** quando necessário.

---

## Stack e Requisitos

**Tecnologias**
- React Native (Expo)
- Node.js (LTS) / npm ou yarn
- AsyncStorage (onboarding/autenticação), libs de navegação e formulário

**Ambiente**
- **Expo SDK 53**
- Android **12+** e iOS **13+**
- Execução via **Expo Go**

> Observação: ver seção de RNF para requisitos de plataforma.

---

## Como Rodar

1) **Clonar e instalar dependências**
```bash
git clone https://github.com/joaoassef/appagendamentos.git
cd appagendamentos
npm install
npx expo
npm start
# ou: yarn
