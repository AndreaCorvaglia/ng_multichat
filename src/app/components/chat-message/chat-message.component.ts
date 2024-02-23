import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../entities/chat-message';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() message: ChatMessage | undefined;
}
