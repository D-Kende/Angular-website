import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WishItem } from 'src/app/shared/models/wishitem';
import {EventService} from './../../../app/shared/services/EventService';


@Component({
  selector: 'wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {
  @Input() wish! : WishItem;

  

  get cssClasses(){
    return {'strikeout text-muted': this.wish.isComplete};
  }

constructor(private events : EventService) { }

ngOnInit(): void {
  
}
  removeWish(){
    this.events.emit('removeWish',this.wish);
  }


  toggleFullfilled(){
    this.wish.isComplete= !this.wish.isComplete;
    
  }

}
