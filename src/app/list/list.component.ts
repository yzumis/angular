import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { from, } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private subject: Subject<string>;
  inputValue: string;
  items: string[];
  filteredItems: string[];

  ngOnInit(): void {
    this.inputValue = "";
    this.items = ["Paris", "Pamplona", "Palma", "Madrid", "Honolulu"];
    this.filteredItems = this.items;
    this.subject = new Subject<string>();
    window["cartEventsObservable"] = this.subject.asObservable();
  }

  filter(inputValue: string) {
    this.filteredItems = this.items.filter(item => item.search(inputValue) != -1)
  }
  
  addToCart(item: string) {
    this.addToLocalStorage(item);
    this.generateCommunicationsBusEvent(item);
  }

  addToLocalStorage(item: string) {
    var cartValue: string = localStorage.getItem("cart");
    if(!cartValue) {
      cartValue = item
    } else {
      cartValue += "," + item;
    }
    localStorage.setItem('cart', cartValue);
  }

  generateCommunicationsBusEvent(item: string) {
    this.subject.next(item);
  }

}
