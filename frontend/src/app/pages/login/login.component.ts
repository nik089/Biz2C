import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { MyserviceService } from 'src/app/services/myservice.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  resData;
  errMsg;
  sucMsgg;
  
  constructor(private fb: FormBuilder, private router: Router, private mys: MyserviceService) { }

  ngOnInit() {
    this.validate();
  }
  loginData() {
    const fdata = this.myForm.getRawValue();
      console.log(fdata);
      this.mys.logIn(fdata)
        .subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          localStorage.setItem('sid', this.resData.uid);
          this.sucMsgg = this.resData.msg;
          this.router.navigate(['/homepage'])
        }
        if (this.resData.err === 1) {
        // Swal.fire('Login Not Successful', 'Please Check Email Or Password', 'error');
        this.errMsg = this.resData.msg;
        }
      }, err => {
      console.log(err);
    });
  }
  validate() {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
        pass: ['', [Validators.required]]
      });
  }

}
