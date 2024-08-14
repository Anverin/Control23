import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'catalogue-component',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];

  public loading: boolean = true;

  public subject: string = '';

  public searchResultHeader: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.add(this.activatedRoute.queryParams.subscribe((params) => {

      //если из инпута передан параметр (там не null)
      if (params['search']) {
        this.subject = params['search'];    //он записывается в переменную subject
        this.searchResultHeader = 'Результаты поиска по запросу "' + this.subject + '"';    //поиск находит частично и пишет, что нашел
      } else {
        this.subject = '';     //иначе туда попадает пустая строка
        this.searchResultHeader = 'Наши чайные коллекции';     //поиск находит сразу всё
      }

      this.subscription.add(this.productService.getProducts(params['search'])
        .subscribe(
          {
            next: (data) => {
              this.loading = false;
              this.products = data;
              if (data.length == 0) {   //если приходит пустой массив
                this.searchResultHeader = 'Ничего не найдено';
              }
            },
            error: (error) => {
              this.loading = false;
              console.log(error);
              this.router.navigate(['/']);
            }
          }));
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
