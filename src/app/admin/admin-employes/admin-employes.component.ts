import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployesService } from 'src/app/services/employes.service';
import { Employe } from 'src/app/models/Employe.model';
import  * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-employes',
  templateUrl: './admin-employes.component.html',
  styleUrls: ['./admin-employes.component.css']
})
export class AdminEmployesComponent implements OnInit,OnDestroy{

  employeForm: FormGroup;
  employesSubscription : Subscription;
  employes : Employe[];
  editEmploye : boolean = false;
  photoUploading : boolean = false;
  photoUrl : string;
  photoUploaded : boolean = false;
  photosAdded: any[] = [] ;

  constructor(private formBuilder: FormBuilder , 
     private employesService: EmployesService,
     private router: Router) { }

  ngOnInit() {
    this.initform();
    this.employesSubscription = this.employesService.employesSubject.subscribe(
      (employes: Employe[]) => {
        this.employes = employes;

      }
    );
    this.employesService.getEmployes();
    this.employesService.emitEmployes();
  }

  initform(){

    this.employeForm = this.formBuilder.group({
      id:[''],
      nom: ['' , Validators.required],
      prenom: ['' , Validators.required],
      mail: ['' , Validators.required],
      phone: ['' , Validators.required],
      adresse: ['' , Validators.required]
    });

    }
    resetEmployeForm(){
      this.editEmploye = false;
      this.employeForm.reset();
      this.photosAdded = [];
      this.photoUploaded = false;
      this.photoUploading = false;
    }
    onSaveEmploye(){
      const id = this.employeForm.get('id').value;
      const nom = this.employeForm.get('nom').value;
      const prenom = this.employeForm.get('prenom').value;
      const mail = this.employeForm.get('mail').value;
      const phone= this.employeForm.get('phone').value;
      const adresse = this.employeForm.get('adresse').value;
      const photos = this.photosAdded ? this.photosAdded : [];
      const newEmploye = new Employe(nom, prenom , mail , phone , adresse,photos); 
    
      if(this.editEmploye == true)
      {this.employesService.updateEmploye(newEmploye, id);
      }
      else{
      this.employesService.createEmploye(newEmploye);
      }
      $('#employesFormModal').modal('hide');
      this.employeForm.reset();
      this.photoUploaded= false;
      this.photoUrl = '';
    } 
    ngOnDestroy(){
      this.employesSubscription.unsubscribe();
    }
    onDeleteEmploye(employe : Employe){
    
     
      
      this.employesService.removeEmploye(employe);
    }
    onEditEmploye(employe : Employe,id: number){
      $('#employesFormModal').modal('show');
      this.employeForm.get('id').setValue(id);
      this.employeForm.get('nom').setValue(employe.nom);
      this.employeForm.get('prenom').setValue(employe.prenom);
      this.employeForm.get('mail').setValue(employe.mail);
      this.employeForm.get('phone').setValue(employe.phone);
      this.employeForm.get('adresse').setValue(employe.adresse);
      this.photosAdded = employe.photos;
      this.editEmploye = true;

    }
    detectFile(event){
      this.photoUploading = true;
      this.employesService.uploadFile(event.target.files[0]).then(
        (url: string) => {
this.onAddFile(url);
this.photoUploading = false;
this.photoUploaded = true;
        }
      );
    }

    onAddFile(url: string) {
      this.photosAdded.push(url);
    }
    onRemoveAddedFile(id:number)
    {
      this.employesService.removeEmployeDoc(this.photosAdded[id]);
      this.photosAdded.splice(id,1); 
    }
    onViewEmploye(id:number)  {
      this.router.navigate(['/employe' , id]);

    }
  }
