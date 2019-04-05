import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { from, } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(private router: Router) { }

  eventReceivedItem = "";
  cartValue = "";

  ngOnInit() {
    this.extractCartFromStorage();
    var observable: Observable<string> = window["cartEventsObservable"];
    observable.subscribe(next => this.processSubscriptionEvent(next));
  }

  processSubscriptionEvent(item: string) {
    this.eventReceivedItem = item;
    this.extractCartFromStorage()
  }

  extractCartFromStorage() {
    this.cartValue = localStorage.getItem('cart');
  }

  changeView() {
    this.router.navigate(['/shoppingCart']);
  }

  cleanShoppingCart() {
    localStorage.removeItem('cart');
    this.extractCartFromStorage();
  }

}
