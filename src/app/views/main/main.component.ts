import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Modal} from "bootstrap";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<HTMLElement>;

  public static firstVisit: boolean = true;

  public modal!: Modal;

  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000);
    })

  }

  ngOnInit(): void {
    if (MainComponent.firstVisit) {          //проверка, первый ли раз на странице
      this.subscription = this.observable.subscribe(() => {
        this.modal = new Modal('#popup');
        this.modal.show();
      })
    }

    MainComponent.firstVisit = false;   //записать, что визит будет не первый (static переменная не пересоздастся)
  }

  ngOnDestroy(): void {
    this.modal?.hide();
    this.subscription?.unsubscribe();
  }

}
