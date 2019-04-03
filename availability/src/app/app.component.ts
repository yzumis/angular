import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { from, } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'availability';

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
    this.createSubscriptionToCartEventsObservable();
  }

  createSubscriptionToCartEventsObservable() {
    var observable: Observable<string> = window["cartEventsObservable"];
    observable.subscribe(next => this.eventSubscribtionObservable());
  }

  filter(inputValue: string) {
    this.filteredItems = this.items.filter(item => item.search(inputValue) != -1)
  }
  
  addToCart(item: string) {
    this.addToLocalStorage(item);
    this.generateWindowCustomEvent(item);
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
  
  generateWindowCustomEvent(item: string) {
    console.log("generateWindowCustomEvent");
    var addToCartEvent: CustomEvent = new CustomEvent('addToCartEvent');
    window.dispatchEvent(addToCartEvent);
  }

  generateCommunicationsBusEvent(item: string) {
    console.log("generateCommunicationsBusEvent");
    this.subject.next("addToCartEvent");
  }


  @HostListener('window:addToCartEvent')
  eventSubscribtionWindow() {
    window.alert("Received event from window custom event");
  }

  eventSubscribtionObservable() {
    window.alert("Received event from observable object");
  }
  
}
