import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreateNotificationBody,
  GetRecipientNotificationBody,
  CountRecipientNotificationBody,
  ReadNotificationBody,
  CancelNotificationBody,
  UnreadNotificationBody,
} from '../dtos';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../viewModels/notification-view-model';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { UnreadNotification } from '@application/use-cases/unred-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private _getRecipientNotifications: GetRecipientNotifications,
    private _countRecipientNotifications: CountRecipientNotifications,
    private _readNotification: ReadNotification,
    private _unreadNotification: UnreadNotification,
    private _cancelNotification: CancelNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      recipientId,
      content,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }

  @Get('/:recipientId')
  async getRecipientNotifications(
    @Param() params: GetRecipientNotificationBody,
  ) {
    const { recipientId } = params;

    const { notifications } = await this._getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Get('/:recipientId/count')
  async countRecipientNotifications(
    @Param() params: CountRecipientNotificationBody,
  ) {
    const { recipientId } = params;

    const { count } = await this._countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Patch('/:notificationId/read')
  async readNotification(@Param() params: ReadNotificationBody) {
    const { notificationId } = params;

    await this._readNotification.execute({ notificationId });

    return { message: 'success' };
  }

  @Patch('/:notificationId/unread')
  async unreadNotification(@Param() params: UnreadNotificationBody) {
    const { notificationId } = params;

    await this._unreadNotification.execute({ notificationId });

    return { message: 'success' };
  }

  @Patch('/:notificationId/cancel')
  async cancelNotification(@Param() params: ReadNotificationBody) {
    const { notificationId } = params;

    await this._cancelNotification.execute({ notificationId });

    return { message: 'success' };
  }
}
