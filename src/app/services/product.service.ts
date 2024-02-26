import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private product! : Array<Product>;
  constructor() {
    this.product=[
      { id:UUID.UUID(), name : "Computer", price :4538 ,promotion :true},
      { id:UUID.UUID(), name : "Printer", price :45367 ,promotion :false},
      { id:UUID.UUID(), name : "Smart phone", price :543038 , promotion :true},
    ];
    for (let i = 0; i < 10; i++) {
this.product.push({ id:UUID.UUID(), name : "Computer", price :4538 ,promotion :true});
      this.product.push({ id:UUID.UUID(), name : "Printer", price :45367 ,promotion :false});
      this.product.push({id:UUID.UUID(), name : "Smart phone", price :543038 , promotion :true});
    }
  }
public getAllProduct() : Observable<Product[]>{
    let rnd=Math.random();
if(rnd<0.1) return throwError(()=>new Error("Internet connexion error"));

  else return of(this.product);
}
  public getPageProduct(page : number,size : number) : Observable<PageProduct>{
    let index =page*size;
    let totalPages = ~~(this.product.length / size);
    if (this.product.length % size !=0)
      totalPages++;
    let pageProducts =this.product.slice(index,index+size);
    return of({page:page, size:size,totalPages:totalPages,product : pageProducts});
  }
public deleteProduct(id:string):Observable<boolean>{
  this.product = this.product.filter(p=>p.id!=id);
  return of(true);
}


public setPromotion(id: string) {
 let product= this.product.find(p=>p.id==id);
if(product !=undefined){
  product.promotion=!product.promotion;
  return of(true);
} else return  throwError(()=>new Error("Product not found"));

  }
public searchProduct(keyword :string, page : number, size:number ) : Observable<PageProduct>{
    let result = this.product.filter(p=>p.name.includes(keyword));
  let index =page*size;
  let totalPages = ~~(result.length / size);
  if (this.product.length % size !=0)
    totalPages++;
  let pageProducts =result.slice(index,index+size);

    return of({page:page, size:size, totalPages:totalPages, product : pageProducts});
  }
public addNewProduct(product : Product):Observable<Product>{
product.id=UUID.UUID();
this.product.push(product);
return of(product);
}
public getProduct(id : string) : Observable<Product>{
let product = this.product.find(p=>p.id==id );
if (product ==undefined) return throwError(()=>new Error("Product not fount"));

return of(product);

}

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if(error['required']){
      return fieldName +"  is Required" ;
    } else if (error ['minlength']){
      return fieldName+" should have at least "+error['minlength']['requiredLength']+" Characters";
    }
    else if (error ['min']){
      return fieldName+" should have min value "+error['min']['min'];
    }
    else return " ";
  }
  public updateProduct(product :Product) : Observable<Product>{
    this.product=this.product.map(p=>(p.id==product.id)?product:p);
  return of(product);
  }


}
