// Mensagem para o dono quando o login falha. Não diz se foi o e-mail ou a senha que errou.
export function describeLoginError(error) {
  switch (error?.kind) {
    case 'invalid-credentials':
      return 'E-mail ou senha incorretos.'
    case 'rate-limit':
      return 'Muitas tentativas. Espere alguns minutos e tente de novo.'
    case 'network':
      return 'Não consegui falar com o servidor de login. Verifique sua internet.'
    case 'config':
      return 'O login ainda não está configurado neste site.'
    default:
      return 'Não foi possível entrar agora. Tente de novo.'
  }
}
