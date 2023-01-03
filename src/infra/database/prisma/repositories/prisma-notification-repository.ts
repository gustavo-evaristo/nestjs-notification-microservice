import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });

    const mapper = PrismaNotificationMapper.toDomain(notification);

    return mapper;
  }

  async save(notification: Notification): Promise<void> {
    const mapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notifications.upsert({
      where: { id: mapper.id },
      create: mapper,
      update: mapper,
    });

    return;
  }

  async create(notification: Notification): Promise<void> {
    const mapper = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notifications.create({
      data: mapper,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.prismaService.notifications.count({
      where: { recipientId },
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notifications.findMany({
      where: { recipientId },
    });

    const mapper = notifications.map(PrismaNotificationMapper.toDomain);

    return mapper;
  }
}
