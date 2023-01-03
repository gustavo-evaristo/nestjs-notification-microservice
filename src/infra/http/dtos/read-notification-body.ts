import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReadNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  notificationId: string;
}
