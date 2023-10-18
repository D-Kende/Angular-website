import { Component } from '@angular/core';
import { WishItem } from './../shared/models/wishitem';
import {EventService} from './../../app/shared/services/EventService';
import { WishService } from './../wish/wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent {
  items  : WishItem[] = [];

  constructor(events : EventService, private wishService : WishService){
    events.listen('removeWish',(wish : any) => {
      let index= this.items.indexOf(wish);
      this.items.slice(index, 1);
    })
  }

 

 ngOnInit(): void {
   this.wishService.getWishes().subscribe((data : any)=>{
    this.items=data;
   },
    (error : any) => {
      alert(error.message);
    }
   );
 }
 filter: any;
}
