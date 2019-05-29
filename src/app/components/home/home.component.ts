import {Component, OnInit, ViewChild} from '@angular/core';
import {BikeService} from '../../services/bike.service';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {Observable, throwError} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: string[] = [
    'Globo MTB 29 Full Suspension',
    'Globo Carbon Fiber Race Series',
    'Globo Time Trial Blade',
  ];

  bikeform: FormGroup;
  validMessage: string = '';
/*  @ViewChild('theForm') theForm: NgForm;*/


  constructor(private bikeService: BikeService) {
  }

  ngOnInit() {
    this.bikeform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10)]),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl()
    });
  }

  /*onSubmit() {
    if (this.bikeform.pristine ||
      this.bikeform.untouched ||
      !this.bikeform.valid) {
      return this.validMessage = 'Try again';
    } else {
      return ([this.bikeform.reset(), this.validMessage = 'Thank you for your submission!']);
    }
  }*/


  onSubmit() {

    if (this.bikeform.valid) {
      this.validMessage = 'Your bike registration has been submitted. Thank you!';
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
          return true;
        },
        err => {
          return Observable.throw(err);
        }
      )
    } else {
      this.validMessage = 'Please fill out the form before submitting';
    }
  }
}
