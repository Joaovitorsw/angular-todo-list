export const FIREBASE_ERROR_MENSAGENS: { [key: string]: string } = {
  'auth/email-already-in-use': 'O e-mail informado já está em uso.',
  'auth/internal-error': 'Não foi possível encontrar este usuário.',
  'auth/invalid-credential': 'Credencial inválida.',
  'auth/cancelled-popup-request': 'A solicitação de login foi cancelada.',
  'auth/account-exists-with-different-credential':
    'Já existe uma conta com este e-mail.',
  'auth/user-not-found': 'Não foi possível encontrar este usuário.',
  'auth/invalid-email': 'O e-mail informado é inválido.',
  'auth/wrong-password': 'A senha informada é inválida.',
  'auth/unauthorized-domain': 'O domínio do site não é autorizado.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    'A chave da API é inválida.',
};

export enum FirebaseThrowError {
  USER_IS_NOT_LOGGED = 'Usuário não está logado.',
  USER_HAS_FACEBOOK_LOGIN = 'Usuário já está logado com o Facebook.',
}

export enum FirebaseToastMessage {
  USER_CREATED = 'Usuário criado com sucesso!',
  USER_UPDATED = 'Usuário atualizado com sucesso!',
  USER_DELETED = 'Usuário excluído com sucesso!',
  USER_LOGGED_IN = 'Usuário logado com sucesso!',
  USER_LOGGED_OUT = 'Usuário deslogado com sucesso!',
}
