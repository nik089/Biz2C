import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/services/myservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  resData;
  ndata;
  catData
  Uid:String;
  constructor(private mys: MyserviceService, private router: Router) { }
  ngOnInit() {
    this.mys.newuserData().subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.ndata = this.resData.cdata;
        console.log(this.ndata);
      }
      this.Uid = localStorage.getItem('sid');

    });
  }
  deletedata(id) {
    // const con = confirm('Do u want to delete ?');
    const con = Swal.fire('Do U Want To Delete ?');
    if (con) {
      this.mys.delData({ cid: id }).subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.mys.newuserData().subscribe(res => {
            this.resData = res;
            if (this.resData.err === 0) {
              this.catData = this.resData.cdata;
              console.log(this.catData);
              Swal.fire({ title: 'Deleted Succesfully', timer: 2000 });
            }     
          });
        }
      });
    }
  }
  editdata(cid) {
    this.router.navigate([`createuser/${cid}`]);
  }

//   logout()
//   {
//     const con = confirm('Do u want to Logout');
//     if (con) {
//       localStorage.removeItem('sid');
//       this.router.navigate(['/login']);
//     }
// }
}
