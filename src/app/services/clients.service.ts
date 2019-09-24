import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from '../models/Client.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clients : Client[] = [];
  clientsSubject = new Subject<Client[]>();

  constructor() { }

  emitClients() {
    this.clientsSubject. next(this.clients);
  }

  saveClients() {
    firebase.database().ref('/clients').set(this.clients);
  }

  createClient(newClient: Client)
{
  this.clients.push(newClient);
  this.saveClients();
  this.emitClients();
}

removeClient(client : Client) {
 const  index = this.clients.findIndex(
  (clientEl) => {
    if(clientEl === client) {
      return true;
    }
  }
);
this.clients.splice(index, 1);
this.saveClients();
this.emitClients();
}
getClients()
{
  firebase.database().ref('/clients').on('value', (data) => {
    this.clients= data.val() ? data.val() : [];
    this.emitClients();
  });
}

updateClient(client: Client, id: number){
  firebase.database().ref('/clients/' + id).update(client);
}
getSingleClient(id: number) {
  return new Promise(
    (resolve , reject) => {
      firebase.database().ref('/clients/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        },
        (error)=> {
          reject(error);
        }
      );
        }
      );
    }
  
}

