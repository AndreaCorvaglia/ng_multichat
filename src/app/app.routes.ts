import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'Home page' },
    { path: 'chatroom', component: ChatroomComponent, title: 'Chatroom page' },
];
