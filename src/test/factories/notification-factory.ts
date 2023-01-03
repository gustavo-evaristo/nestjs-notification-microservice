import { Content } from '@application/entities/Content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Notificação para contar 1'),
    category: 'count',
    recipientId: 'recipient-1',
    ...override,
  });
}
