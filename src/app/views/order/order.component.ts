import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  public orderForm: any = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: ['', [Validators.required]],
    address: ['', [Validators.required]],
    comment: [''],
  })

  public isSuccess: boolean = false;
  public isError: boolean = false;

  get name() {
    return this.orderForm.get('name');
  }
  get last_name() {
    return this.orderForm.get('last_name');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get country() {
    return this.orderForm.get('country');
  }
  get zip() {
    return this.orderForm.get('zip');
  }
  get product() {
    return this.orderForm.get('product');
  }
  get address() {
    return this.orderForm.get('address');
  }

  private observable: Observable<HTMLElement>;

  private subscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private orderService: OrderService) {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 3000);
    })
  }

  ngOnInit(): void {
    this.subscription.add(this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.product?.setValue(params['product']);   //задать инпуту значение, равное параметру
        this.product?.disable();
      }
    }));

  }

  createOrder() {
    this.product?.enable();  //сделать поле enable, чтобы форма отправилась вместе с ним

    this.subscription.add(this.orderService.sendForm(this.orderForm.value)
      .subscribe(response => {
        if (response.success && !response.message) {
          this.isSuccess = true;
        } else {
          this.product?.disable(); //обратно задизейблить поле
          this.isError = true;
          this.subscription.add(this.observable.subscribe(() => {
            this.isError = false;
          }));
        }
      }));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
