import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/Employe.model';
import { ActivatedRoute } from '@angular/router';
import { EmployesService } from '../services/employes.service';



@Component({
  selector: 'app-single-employe',
  templateUrl: './single-employe.component.html',
  styleUrls: ['./single-employe.component.css']
})
export class SingleEmployeComponent implements OnInit {

  employe: Employe;


  constructor(private route: ActivatedRoute, private employesService: EmployesService) { }

  ngOnInit() {
    this.employe = new Employe('', '', '', '', '', []);
    const id = this.route.snapshot.params['id'];
    this.employesService.getSingleEmploye(+id).then(
      (employe : Employe) => {
        this.employe = employe;
      }
    )
  }

}
