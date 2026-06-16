// Autenticação mock baseada em localStorage (sem backend / sem segurança real).
// Guarda a lista de usuários cadastrados e a sessão ativa. As senhas ficam
// apenas no localStorage para fins de simulação — NÃO use isto em produção.

import { readJSON, writeJSON, StorageKeys } from './storage';
import { defaultSettings } from '../data/mockData';

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getUsers() {
  return readJSON(StorageKeys.users, []);
}

function saveUsers(users) {
  writeJSON(StorageKeys.users, users);
}

/** Semeia/atualiza as configurações de perfil com o nome e email do usuário ativo. */
function seedSettings(name, email) {
  const current = readJSON(StorageKeys.settings, defaultSettings);
  writeJSON(StorageKeys.settings, { ...defaultSettings, ...current, fullName: name, email });
}

/** Retorna a sessão ativa ({ name, email }) ou null. Leitura síncrona. */
export function getCurrentUser() {
  return readJSON(StorageKeys.session, null);
}

export async function register({ name, email, password }) {
  await delay();
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName || !cleanEmail || !password) {
    throw new Error('Preencha todos os campos.');
  }
  const users = getUsers();
  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error('Já existe uma conta com esse email.');
  }

  users.push({ name: cleanName, email: cleanEmail, password });
  saveUsers(users);

  const session = { name: cleanName, email: cleanEmail };
  writeJSON(StorageKeys.session, session);
  seedSettings(cleanName, cleanEmail);
  return session;
}

export async function login({ email, password }) {
  await delay();
  const cleanEmail = email.trim().toLowerCase();
  const found = getUsers().find((u) => u.email === cleanEmail && u.password === password);
  if (!found) {
    throw new Error('Email ou senha inválidos.');
  }

  const session = { name: found.name, email: found.email };
  writeJSON(StorageKeys.session, session);
  seedSettings(found.name, found.email);
  return session;
}

export function logout() {
  writeJSON(StorageKeys.session, null);
}
