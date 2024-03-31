import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url : string ='http://localhost:8082/user/'
  idUser : any=""
  constructor(private http : HttpClient) { 
    this.idUser = localStorage.getItem('idUser');
  }

  getUser(){
    return this.http.get(this.url+this.idUser);
  }
}
