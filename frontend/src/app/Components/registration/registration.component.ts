import { Component , OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Registration } from 'src/app/models/Registration.model';
import { RegistrationService } from '../../dataservice/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  carsolenauser = new Registration();
  submitted = false;

  constructor(private registrationDataService: RegistrationService,
              private location: Location) { }

              newRegistration(): void {
                this.submitted = false;
                this.carsolenauser = new Registration();
              }



              addRegistration() {
                this.submitted = true;
                console.log(this.carsolenauser);
                this.registrationDataService.userRegistration(this.carsolenauser)
                    .subscribe();
              }
              goBack(): void {
                this.location.back();
              }

}
