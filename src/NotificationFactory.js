class EmailNotifier {
  send() {
    return 'Enviando Email: Olá, usuário!';
  }
}

class SMSNotifier {
  send() {
    return 'Enviando SMS: Olá, usuário!';
  }
}

export const NotificationFactory = {
  create(type, message = "Olá, usuário!") {
    const notifiers = {
      email: () => new EmailNotifier(message),
      sms: () => new SMSNotifier(message),
    };

    if (!notifiers[type]) throw new Error('Tipo inválido');

    return notifiers[type]();
  }
}
