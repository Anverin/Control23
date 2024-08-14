import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  product: string = '';

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.host + `/tea?id=${id}`);
  }

  getProducts(product: string): Observable<ProductType[]> {
    let params: HttpParams = new HttpParams();
    if (product) {
      params = params.append('search', product);
    }
    return this.http.get<ProductType[]>(environment.host + '/tea', {params});
  }

}



