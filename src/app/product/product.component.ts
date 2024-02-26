import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {deleteOutputDir} from "@angular-devkit/build-angular/src/utils";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  product! :Array<Product>;
  currentPage : number =0;
  pageSize: number =5;
  totalPages: number = 0;
  errorMessage! : string;
  searchFormGroup! :FormGroup;
  currentAction : string ="all";

  constructor(private productService : ProductService,private  fb: FormBuilder,
public authService : AuthenticationService,private router: Router

              ) { }

  ngOnInit() {
  this.searchFormGroup=this.fb.group({
keyword : this.fb.control(null)
  });
    this.handleGetPageProduct();
  }
handleGetAllProduct(){
  this.productService.getAllProduct().subscribe({
    next : (data : any[] )=>{
      this.product=data;

    },
    error : (err)=> {
      this.errorMessage=err;
    }
  });
}
  handleGetPageProduct(){
    this.productService.getPageProduct(this.currentPage, this.pageSize).subscribe({
      next : (data )=>{
        this.product=data.product;
        this.totalPages=data.totalPages;
       console.log(this.totalPages);

      },
      error : (err)=> {
        this.errorMessage=err;
      }
    });
  }
  handleDeleteProduct(p: Product) {
   let conf=confirm("Are you sure? ");
   if(conf==false) return;
this.productService.deleteProduct(p.id).subscribe({
  next : (data )=>{
//this.handleGetAllProduct();
    let index=this.product.indexOf(p);
    this.product.splice(index,1);
  }
})

  }

  handleSetPromotion(p: Product) {
    let promo=p.promotion;
this.productService.setPromotion(p.id).subscribe({
  next : (data)=>{
  p.promotion=!promo;
  },
  error : err => {
    this.errorMessage=err;
  }
})
  }

  handleSearchProducts() {
    this.currentAction ="search";

let keyword=this.searchFormGroup.value.keyword;
this.productService.searchProduct(keyword,this.currentPage, this.pageSize).subscribe({
  next :(data )=>{
    this.product=data.product;
    this.totalPages=data.totalPages;

  }
})
  }

  gotoPage(i: number) {
    this.currentPage=i;
    if(this.currentAction==='all')
    this.handleGetPageProduct();
    else
      this.handleSearchProducts();

  }

  handleNewProduct() {
this.router.navigateByUrl("/admin/newProduct");
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }
}
