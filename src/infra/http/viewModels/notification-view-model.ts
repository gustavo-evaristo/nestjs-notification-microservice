import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp({ id, content, category, recipientId }: Notification) {
    return {
      id,
      recipientId,
      content: content.value,
      category,
    };
  }
}
