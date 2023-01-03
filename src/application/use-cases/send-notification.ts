import { Injectable } from '@nestjs/common';
import { Content } from '../entities/Content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface ISendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    category,
    content,
    recipientId,
  }: ISendNotificationRequest): Promise<ISendNotificationResponse> {
    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
