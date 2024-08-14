import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;

  private subscription: Subscription = new Subscription();

  constructor(private activateRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {

    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      if (params['id']) {
        const product = this.productService.getProduct(+params['id']);
        if (product) {
          product.subscribe((data) => {
              this.product = data;
            })
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
