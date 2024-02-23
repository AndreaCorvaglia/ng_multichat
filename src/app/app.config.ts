import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: ''
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)), provideAnimationsAsync('noop')]
};
