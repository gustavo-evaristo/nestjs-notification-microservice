import { randomUUID } from 'node:crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/Content';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifiactions', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('Notificação para contar 1'),
        category: 'count',
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('Notificação para contar 2'),
        category: 'count',
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('Notificação para não contar'),
        category: 'not-count',
        recipientId: randomUUID(),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBe(2);
  });
});
