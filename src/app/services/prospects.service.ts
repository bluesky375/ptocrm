import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Prospect } from '../models/Prospect.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  prospects : Prospect[] = [];
  prospectsSubject = new Subject<Prospect[]>();

  constructor() { }

  emitProspects() {
    this.prospectsSubject. next(this.prospects);
  }

  saveProspects() {
    firebase.database().ref('/prospects').set(this.prospects);
  }

  createProspect(newProspect : Prospect)
{
  this.prospects.push(newProspect);
  this.saveProspects();
  this.emitProspects();
}

removeProspect(prospect : Prospect) {
  const  index = this.prospects.findIndex(
   (prospectEl) => {
     if(prospectEl === prospect) {
       return true;
     }
   }
 );
 this.prospects.splice(index, 1);
 this.saveProspects();
 this.emitProspects();
 }
getProspects()
{firebase.database().ref('/prospects').on('value',(data) => {
  this.prospects=data.val() ? data.val() : [];
  this.emitProspects();
});}

updateProspect(prospect: Prospect, id: number){
  firebase.database().ref('/prospects/' + id).update(prospect);
}
getSingleProspect(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/prospects/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
}
