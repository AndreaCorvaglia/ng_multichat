import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyMqttService } from '../../services/mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';
import { UserService } from '../../services/user.service';
import { TOPICS } from '../../constants/consts';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatMessage } from '../../entities/chat-message';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, ChatMessageComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent implements OnInit, OnDestroy {

  protected topics: string[] = TOPICS;
  protected messages: ChatMessage[] = [
    { isSent: true, text: "test 1" },
    { isSent: false, text: "test 2" }
  ];
  protected username: string = '';
  protected selectedTopic: string = '';
  protected messageForm: FormGroup = this.createMessageForm();
  private lastSentMessage: ChatMessage | undefined;

  constructor(private _mqttService: MyMqttService, private _userService: UserService) { }

  ngOnInit(): void {
    this.username = this._userService.getUsername();
    if (this.username === '') this.username = this._userService.generateUsername();

    if (this.topics.length > 0) this.subscribeToTopic(this.topics[0]);
  }

  ngOnDestroy(): void {
    this._mqttService.unsubscribeFromTopic();
  }

  protected subscribeToTopic(topic: string): void {
    this.selectedTopic = topic;
    this._mqttService.subscribeToTopic(this.selectedTopic, this.handleTopicMessages.bind(this));
  }

  protected handleTopicMessages(message: IMqttMessage): void {
    if (this.lastSentMessage && message)
      this.messages.push({ isSent: true, text: message.payload.toString() });
  }

  protected submitFormWithEnter(): void { this.sendMessage(); }

  protected sendMessage(): void {
    this._mqttService.unsafePublish(this.selectedTopic, this.messageForm.value.message ?? '');
    this.lastSentMessage = { isSent: true, text: this.messageForm.value }
    this.messages.push(this.lastSentMessage);
    this.messageForm.reset();
  }

  private createMessageForm(): FormGroup {
    return new FormGroup({
      message: new FormControl(),
    })
  }
}
