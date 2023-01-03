import { IsNotEmpty, IsUUID } from 'class-validator';

export class UnreadNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  notificationId: string;
}
