import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _username: string = '';

  constructor() { }

  public getUsername(): string {
    return this._username;
  }

  public generateUsername(): string {
    this._username = this.generateRandomUsername();
    console.log("username generated: " + this._username);
    return this._username;
  }

  private generateRandomUsername(): string {
    const adjectives = ['Happy', 'Silly', 'Clever', 'Brave', 'Kind', 'Funny'];
    const nouns = ['Cat', 'Dog', 'Bird', 'Fish', 'Monkey', 'Tiger'];
    const adjective = adjectives[this.getRandomInt(0, adjectives.length - 1)];
    const noun = nouns[this.getRandomInt(0, nouns.length - 1)];
    const number = this.getRandomInt(1000, 9999);
    return `${adjective}_${noun}_${number}`;
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
