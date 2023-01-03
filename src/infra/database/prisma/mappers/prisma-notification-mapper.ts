import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma({
    id,
    recipientId,
    content,
    category,
    readAt,
    createdAt,
  }: Notification) {
    return {
      id,
      recipientId,
      content: content.value,
      category,
      readAt,
      createdAt,
    };
  }
}
