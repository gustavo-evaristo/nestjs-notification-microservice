import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ICancelNotificationRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ notificationId }: ICancelNotificationRequest): Promise<void> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
