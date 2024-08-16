import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<HTMLElement>;

  public static firstVisit: boolean = true;

  @ViewChild('modal', {static: true})
  private modal!: TemplateRef<any>;

  private subscription: Subscription | null = null;

  constructor(private modalService: NgbModal) {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000);
    })
  }

  ngOnInit(): void {
    if (MainComponent.firstVisit) {          //проверка, первый ли раз на странице
      this.subscription = this.observable.subscribe(() => {
        this.modalService.open(this.modal);
      })
    }

    MainComponent.firstVisit = false;   //записать, что визит будет не первый (static переменная не пересоздастся)
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}












