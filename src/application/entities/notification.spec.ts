import { Content } from './Content';
import { Notification } from './notification';

describe('Notification', () => {
  it('it should be able to create notification', () => {
    const content = new Notification({
      content: new Content('Você recebeu uma nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(content).toBeTruthy();
  });
});
