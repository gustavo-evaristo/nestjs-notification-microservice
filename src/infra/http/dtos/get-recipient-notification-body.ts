import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRecipientNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
