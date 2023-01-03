import { Content } from '@application/entities/Content';
import { Notification } from '@application/entities/notification';
import { notifications as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma({
    id,
    recipientId,
    content,
    category,
    readAt,
    createdAt,
    canceledAt,
  }: Notification) {
    return {
      id,
      recipientId,
      content: content.value,
      category,
      readAt,
      canceledAt,
      createdAt,
    };
  }

  static toDomain({
    id,
    category,
    content,
    recipientId,
    readAt,
    canceledAt,
    createdAt,
  }: RawNotification): Notification {
    return new Notification(
      {
        category,
        content: new Content(content),
        recipientId,
        readAt,
        canceledAt,
        createdAt,
      },
      id,
    );
  }
}
