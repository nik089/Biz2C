import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/services/myservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  myForm:FormGroup;
  userData;
  resData;
  cid:any;


  constructor(private fb: FormBuilder,private router:Router, private mys:MyserviceService) { }

  ngOnInit(): void {
    this.validate();
  }

  createuser()
  {
    const fdata = this.myForm.getRawValue();
    console.log(fdata);
    this.mys.createnewData(fdata).subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.userData = this.resData.ndata;
        console.log(this.userData);
        Swal.fire({ title: 'Create User Successfully', timer: 2000 });
      }
    });
    this.router.navigate(['/homepage']);
  
  }
  validate() {
    this.myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(".{3,20}")]],
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
    pn: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    pass: ['', [Validators.required, Validators.pattern(".{8,20}")]],
    });
  }
  edit()
  {
    const name = this.myForm.controls.name.value;
    const email = this.myForm.controls.email.value;
    const pn = this.myForm.controls.pn.value;
    this.mys.editData({ 'name': name, 'email':email, 'pn':pn ,'cid': this.cid })
      .subscribe(res => {
        console.log(res);
        Swal.fire({ title: 'Data  Succesfully Edit', timer: 2000 });
      });
  }
}



