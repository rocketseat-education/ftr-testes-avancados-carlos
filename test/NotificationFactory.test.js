import { expect } from 'chai';
import sinon from 'sinon';
import { NotificationFactory } from '../src/NotificationFactory.js';

describe('Notification Factory - TDD', () => {
  it('deve criar uma notificação de e-mail', () => {
    const emailNotifier = NotificationFactory.create('email');
    expect(emailNotifier.send()).to.equal('Enviando Email: Olá, usuário!');
  });
  it('deve criar uma notificação de SMS', () => {
    const smsNotifier = NotificationFactory.create('sms');
    const spy = sinon.spy(smsNotifier, 'send');

    smsNotifier.send();
    expect(spy.calledOnce).to.be.true;
  });
});
