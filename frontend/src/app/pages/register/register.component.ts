import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/services/myservice.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm:FormGroup;
  resData;
  reData;

  constructor(private fb:FormBuilder, private router:Router, private mys:MyserviceService) { }

  ngOnInit(): void {
    this.validate();
  }

  userReg() {
    const fdata = this.myForm.getRawValue();
    console.log(fdata);
    this.mys.regData(fdata).subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.reData = this.resData.rdata;
        console.log(this.reData);
        Swal.fire({ title: 'User regiater Successfully', timer: 2000 });
      }
    });
    this.router.navigate(['/login']);
  }

  validate() {
    this.myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(".{3,20}")]],
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
    pn: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    pass: ['', [Validators.required, Validators.pattern(".{8,20}")]],
    });
  }
}
