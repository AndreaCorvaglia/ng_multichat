import { Injectable, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttConnectionState, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMqttService implements OnDestroy {

  private mqttSubscription: Subscription | undefined;
  private currentTopic: string | undefined;

  constructor(private _mqtt: MqttService) {
    this._mqtt.onConnect.subscribe(() => console.log("connected"));
    this._mqtt.onClose.subscribe(() => console.log("connection closed"));
    this._mqtt.onReconnect.subscribe(() => console.log("reconnecting"));
    this._mqtt.onError.subscribe((err) => console.log("Mqtt error: " + err));
    this._mqtt.onEnd.subscribe(() => console.log("connection ended"));
    this._mqtt.onOffline.subscribe(() => console.log("connection offline"));
  }

  ngOnDestroy(): void {
    this._mqtt.onConnect.unsubscribe();
    this._mqtt.onClose.unsubscribe();
    this._mqtt.onReconnect.unsubscribe();
    this._mqtt.onError.unsubscribe();
    this._mqtt.onEnd.unsubscribe();
    this._mqtt.onOffline.unsubscribe();
  }

  subscribeToTopic(topic: string, callback: (message: IMqttMessage) => void): Subscription {
    this.unsubscribeFromTopic();

    this.mqttSubscription = this._mqtt.observe(topic).subscribe(callback);
    this.currentTopic = topic;

    console.log("subscribed to topic: " + topic);
    return this.mqttSubscription;
  }

  unsubscribeFromTopic(): void {
    if (this.mqttSubscription) {
      this.mqttSubscription.unsubscribe();

      console.log("unsubscribed from topic: " + this.currentTopic);
    }
  }

  unsafePublish(topic: string, message: string): void {
    this._mqtt.unsafePublish(topic, message);

    console.log("sent message: " + message + " on topic: " + topic);
  }
}
