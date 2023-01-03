import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Send notifiaction', () => {
  it('should be able to send notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'this is a notification',
      category: 'test',
      recipientId: randomUUID(),
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
