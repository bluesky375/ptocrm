import { Component, OnInit } from '@angular/core';
import { Prospect } from '../models/Prospect.model';
import { ActivatedRoute } from '@angular/router';
import {ProspectsService} from '../services/prospects.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-single-prospect',
  templateUrl: './single-prospect.component.html',
  styleUrls: ['./single-prospect.component.css']
})
export class SingleProspectComponent implements OnInit {

  prospect: Prospect;


  constructor(private route : ActivatedRoute, private prospectsService : ProspectsService) { }

  ngOnInit() {
    this.prospect = new Prospect('','','','','');
    const id = this.route.snapshot.params['id'];
    this.prospectsService.getSingleProspect(+id).then(
      (prospect : Prospect) => {
        this.prospect = prospect;

      }
    )
  }

}
