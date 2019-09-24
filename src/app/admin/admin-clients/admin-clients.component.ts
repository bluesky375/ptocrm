import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from 'src/app/models/Client.model';
import  * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit, OnDestroy{

  
  clientForm: FormGroup;
  clientsSubscription: Subscription;
  clients: Client[];
  editClient: boolean = false;


  constructor(private formBuilder: FormBuilder , 
     private clientsService: ClientsService ,
     private router: Router) { }

  ngOnInit() {
    this.initform();
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
    this.clientsService.getClients();
    this.clientsService.emitClients();
  }

  initform(){

    this.clientForm = this.formBuilder.group({
      id: [''],
      nom: ['' , Validators.required],
      entreprise: ['' , Validators.required],
      mail: ['' , Validators.required],
      phone: ['' , Validators.required],
      description: ['']
    });

    }
    resetClientForm(){
      this.editClient = false;
      this.clientForm.reset();
    }
    onSaveClient(){
      const id = this.clientForm.get('id').value;
      const nom = this.clientForm.get('nom').value;
      const entreprise = this.clientForm.get('entreprise').value;
      const mail = this.clientForm.get('mail').value;
      const phone= this.clientForm.get('phone').value;
      const description = this.clientForm.get('description').value;
      const newClient = new Client(nom, entreprise , mail , phone , description); 

      if(this.editClient == true)
      {
        this.clientsService.updateClient(newClient, id);
      }
      else{
        this.clientsService.createClient(newClient);
      }
      
      $('#clientsFormModal').modal('hide');
      this.resetClientForm();
    }
    ngOnDestroy(){
      this.clientsSubscription.unsubscribe(); 
    }
    onDeleteClient(client : Client){
      this.clientsService.removeClient(client);
    }
    onEditClient(client : Client, id: number){
$('#clientsFormModal').modal('show');
this.clientForm.get('id').setValue(id);
this.clientForm.get('nom').setValue(client.nom);
this.clientForm.get('entreprise').setValue(client.entreprise);
this.clientForm.get('mail').setValue(client.mail);
this.clientForm.get('phone').setValue(client.phone);
this.clientForm.get('description').setValue(client.description);
this.editClient = true;
    }

    onViewClient(id :number) {
      console.log('Here is clicked: ', id);
      this.router.navigate(['/client' , id]);
    }
  }



