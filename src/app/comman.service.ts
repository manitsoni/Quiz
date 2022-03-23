import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommanService {
  public loggedUser:any;
  public submitedAnswer:Array<any>=[]
  constructor() { }
}
