import { Component } from '@angular/core';
import * as  firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
     // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBQQsXLWas6GR8puWJzP7WFtOuTuyj_h2s",
    authDomain: "ptocrm-47407.firebaseapp.com",
    databaseURL: "https://ptocrm-47407.firebaseio.com",
    projectId: "ptocrm-47407",
    storageBucket: "gs://ptocrm-47407.appspot.com/",
    messagingSenderId: "138726557633",
    appId: "1:138726557633:web:65598b4c7abaada5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
  }
  
}
