import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 1) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notificationsCount = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    if (!notificationsCount) {
      return 0;
    }

    return notificationsCount.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications;
  }
}
