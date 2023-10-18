import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { WishItem } from './../shared/models/wishitem';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http : HttpClient) { }

  private getStandardOptions() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'appication/json'
      })
    }
  }

  getWishes(){
    let options= this.getStandardOptions();
    options.params= new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    return this.http.get('assets/wishes.json',options).pipe(catchError(this.handleError));
  }

  private handleError(error : HttpErrorResponse){
    if(error.status==0){
      console.error('There is an issue with the cilent or network:', error.error);
    }
    else{
      console.error('Server-side error',error.error);
    }
    return throwError(()=> new Error('Cannot retrieve wishes from the server. Please try again'));
  }

  private addWish(wish: WishItem){
    let options= this.getStandardOptions();
    options.headers=options.headers.set('Authorization', 'value-needed-for-authorization');
    this.http.post('assets/wishes.json',wish,options);
  }
}
