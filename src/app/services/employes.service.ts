import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Employe } from '../models/Employe.model';
import { Subject } from 'rxjs';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  employes : Employe[] = [];
  employesSubject = new Subject<Employe[]>();

  constructor() { }

  emitEmployes() {
    this.employesSubject. next(this.employes);
  }

  saveEmployes() {
    firebase.database().ref('/employes').set(this.employes);
  }

  createEmploye(newEmploye: Employe)
{
  this.employes.push(newEmploye);
  this.saveEmployes();
  this.emitEmployes();
}

removeEmploye(employe : Employe) {
  const  index = this.employes.findIndex(
   (employeEl) => {
     if(employeEl === employe) {
       return true;
     }
   }
 );
 this.employes.splice(index, 1);
 this.saveEmployes();
 this.emitEmployes();
 }
getEmployes()
{
  firebase.database().ref('/employes').on('value' , (data) => {
    this.employes= data.val() ? data.val() : [];
    this.emitEmployes();
  });
}
  updateEmploye(employe: Employe , id: Number){
    firebase.database().ref('/employes/' + id).update(employe);
  
}

uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const uniqueId = Date.now().toString();
      const upload = firebase.storage().ref().child('documents/employes/' + uniqueId + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Loading ...');

        
        },
        (error) => {
          console.log('Error ! : ' + error);
          reject();
        },
        ()=> {
          upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL);
          });
        }
        );
    }
  );
}

removeEmployeDoc(doclink: string){
  if (doclink) {
    const storageRef = firebase.storage().refFromURL(doclink);
    storageRef.delete().then(
      () => {
        console.log ('File deleted');
      }
    ).catch(
      (error) => {
        console.log('File not found : ' + error);
      }
    );

  }
}
getSingleEmploye(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/employes/' + id).once('value').then(
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
