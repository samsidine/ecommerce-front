import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
productId! : string;
product! : Product;
productFormGroup! : FormGroup;
  constructor(private route : ActivatedRoute, public prodService : ProductService,
              private fb : FormBuilder ) {
    this.productId=this.route.snapshot.params['id'];

  }
  ngOnInit() {
    this.prodService.getProduct(this.productId).subscribe({
next :(product)=>{
this.product=product;

  this.productFormGroup= this.fb.group({
    name : this.fb.control(this.product.name,[ Validators.required, Validators.minLength(4)]),

    price : this.fb.control(this.product.price,[ Validators.required,Validators.min(200) ]),
    promotion : this.fb.control(this.product.promotion,[ Validators.required]),
  });


},
      error : (err)=>{
  console.log(err);
      }

    });
  }


  handleUpdateProduct() {
let p=this.productFormGroup.value;
p.id=this.product.id;
this.prodService.updateProduct(p).subscribe({
  next : (prod)=>{
    alert("Product updated successfully ")
  },
  error : err => {
    console.log(err);
  }
})


  }
}
