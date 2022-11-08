import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  @Output() hideForm = new EventEmitter<any>();
  @Output() userInfo = new EventEmitter<any>();

  personalInfo = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      house: new FormControl(''),
      zip: new FormControl('')
    })
  })

  hideDataForm() {
    this.hideForm.emit();
  }

  addData() {
    console.log(this.personalInfo.value);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
