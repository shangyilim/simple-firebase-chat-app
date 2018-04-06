import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my chatting app';

  name: string;
  message: string;

  //messages is now an Observable of array instead of just an array
  messages: Observable<any[]>;

  constructor(public db: AngularFirestore){
    // retrieve the chats collection documents from firestore.
    this.messages = db.collection('chats').valueChanges();
  }

  sendMessage() {
    // create an object that has name and message property, and they are initialized with
    // values name and message from the user input
    const message = {
      name: this.name,
      message: this.message
    };

    // calls firestore and adds a message to the chats collection
    this.db.collection('chats').add(message);
    
  }
}
