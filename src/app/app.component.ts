import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HomepageComponent,
    ChatroomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng_multichat';
}
