import { Component } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fName: String;
  lName: String;
  email: String;
  password: String;
  allRegisteredStudents: any = [];

  constructor(private http: HttpClient) { 
    this.getAllStudents();
  }
  
  getAllStudents() {
    this.allRegisteredStudents = this.http.get('http://localhost:3000/students/get-all-students')
      .toPromise().then(data => {console.log(data); this.allRegisteredStudents = data});
    console.log("All registered students" + this.allRegisteredStudents);
  };

  onRegisterSubmit(form: NgForm) {
    const student = {
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      password: this.password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    /* Submit student to database. Note: posting without a service returns an observable so I
    converted it to a promise to insert the data and get a response */
    this.http.post('http://localhost:3000/students/register' , student , httpOptions)
      .toPromise().then(data => {console.log(data); this.getAllStudents()});
    //reset form
    form.reset();
  };

}
