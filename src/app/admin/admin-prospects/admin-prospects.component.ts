import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery'
import { ProspectsService } from 'src/app/services/prospects.service';
import { Prospect } from 'src/app/models/Prospect.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-prospects',
  templateUrl: './admin-prospects.component.html',
  styleUrls: ['./admin-prospects.component.css']
})
export class AdminProspectsComponent implements OnInit , OnDestroy{

  prospectForm: FormGroup;
  prospectsSubscription: Subscription;
  prospects : Prospect[];
  editProspect: boolean = false;

  constructor(private formBuilder: FormBuilder , 
     private prospectsService: ProspectsService ,
     private router: Router) { }

  ngOnInit() {
    this.initform();
    this.prospectsSubscription = this.prospectsService.prospectsSubject.subscribe(
      (prospects: Prospect[]) =>{
        this.prospects = prospects;
      }
    );
    this.prospectsService.getProspects();
    this.prospectsService.emitProspects();

  }
  initform(){

    this.prospectForm = this.formBuilder.group({
      id: [''], 
      nom: ['' , Validators.required],
      entreprise: ['' , Validators.required],
      mail: ['' , Validators.required],
      phone: ['' , Validators.required],
      description: ['']
    });
  
    }
    resetProspectForm(){
      this.editProspect = false;
      this.prospectForm.reset();
    }
    onSaveProspect(){
      const id = this.prospectForm.get('id').value;
      const nom = this.prospectForm.get('nom').value;
      const entreprise = this.prospectForm.get('entreprise').value;
      const mail = this.prospectForm.get('mail').value;
      const phone= this.prospectForm.get('phone').value;
      const description = this.prospectForm.get('description').value;
      const newProspect = new Prospect(nom, entreprise , mail , phone , description); 
     if(this.editProspect == true)
     {
       this.prospectsService.updateProspect(newProspect, id);

     }
     else{
       this.prospectsService.createProspect(newProspect);
     }
     
     
      
      $('#prospectsFormModal').modal('hide');
      this.prospectForm.reset();
    }
    ngOnDestroy(){
      this.prospectsSubscription.unsubscribe();
    }
    onDeleteProspect(prospect : Prospect) {
      this.prospectsService.removeProspect(prospect);
    }

    onEditProspect(prospect: Prospect , id:number){
   $('#prospectsFormModal').modal('show');
   this.prospectForm.get('id').setValue(id);
   this.prospectForm.get('nom').setValue(prospect.nom);
   this.prospectForm.get('entreprise').setValue(prospect.entreprise);
   this.prospectForm.get('mail').setValue(prospect.mail);
   this.prospectForm.get('phone').setValue(prospect.phone);
   this.prospectForm.get('description').setValue(prospect.description);
   this.editProspect = true;
    
 }
 onViewProspect(id : number) 
 {
    console.log('Here is clicked: ', id);
    this.router.navigate(['/prospect' , id]); 
   
 }


  }
