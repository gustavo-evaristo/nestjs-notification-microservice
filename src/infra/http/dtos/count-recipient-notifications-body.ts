import { IsNotEmpty, IsUUID } from 'class-validator';

export class CountRecipientNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
