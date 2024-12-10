export const ErrorMessages = {
  error: 'Erro',
  tryAgain: 'Tente novamente mais tarde!',
  codeError: 'Código incorreto!',
  passNotEqual: 'Senha e confirmação diferem!',
  sessionExpired: 'Sua sessão expirou, logue novamente!',
  notAdmin: 'Acesse o sistema como Administrador.',
  notUser: 'Somente usuários têm acesso ao sistema',
  resctrict: 'Restrito.',
  closedConnection: 'Conexão Fechada',
  closePopup:
    'Por gentileza, desabilite seu bloqueador de pop-up e tente novamente!',
  accessNotSelected: 'O tipo de acesso deve ser selecionado.',
  parametersMustBeSetted: 'Os valores de parâmetros devem ser informados',
  arrayNullTransitTime: 'Sem dados no período selecionado',
  accessDenied: 'Você não tem acesso ao sistema',
  requiredUserName: 'O usuário deve ser informado',
  ageRequired: 'O idade deve ser informada e estar entre 1 e 120 anos',
  accountRequired: 'O conta deve ser informada e estar entre 1 e 2147483647.',
  minLength: (minLength: number) =>
    `O campo deve conter no mínimo ${minLength} caracteres.`,
  minMaxLength: (minLength: number, maxLength: number) =>
    `O campo deve conter entre ${minLength} e ${maxLength} caracteres.`,
  minMax: (min: number, max: number) =>
    `O valor do campo deve estar entre ${min} e ${max}.`,
};
export const Messages = {
  success: 'Sucesso',
  emailSuccess: 'Email enviado com sucesso!',
  codeSuccess: 'Código correto!',
  enterNewPass: 'Digite a nova senha.',
  changePassSuccess: 'Senha alterada com sucesso!',
  registerUserSuccess: 'Usuário cadastrado com sucesso!',
  deleteSuccess: 'Excluído com sucesso!',
  registerNotificationSuccess: 'Notificação enviada com sucesso!',
};
