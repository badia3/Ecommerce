import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandele } from '../_model/file.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit,OnChanges {

  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    productDescription: new FormControl("", Validators.required),
    productDiscountedPrice: new FormControl("", Validators.required),
    productActualPrice: new FormControl("", Validators.required),
    productImage: new FormControl(null,Validators.required),
  })
  get productDiscountedPrice() {
    if (this.productForm.get('productDiscountedPrice')?.value)
      return +this.productForm.get('productDiscountedPrice')?.value!
    else
      return null
  }
  get productActualPrice(){
    if (this.productForm.get('productActualPrice')?.value)
      return +this.productForm.get('productActualPrice')?.value!
    else
      return null
  }

   product: Product = {
    productName: this.productForm.get('productName')?.value ?? '',
    productDescription:this.productForm.get('productDescription')?.value ?? '',
    productDiscountedPrice: this.productDiscountedPrice,
    productActualPrice: this.productActualPrice,
    productImages: this.productForm.get('productImages')?.value ?? [],
  };

  addProduct() {
    const prepareFormData = this.prepareFormData(this.product);

    this.productService.addProduct(prepareFormData).subscribe(
      (response: any) => {
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    this.productForm.reset();


  }

prepareFormData(product: Product): FormData{
  const formData = new FormData();
  formData.append('product',
  new Blob([JSON.stringify(product)],{type: 'application/json'})
  );
  for(var i =0;i<product.productImages.length;i++){
    formData.append(
      'imageFile',
      product.productImages[i].file,
      product.productImages[i].file.name
    )
  }
  return formData;
}


  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandele : FileHandele = {
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandele)
    }

  }
  removeImage(i:number){
    this.product.productImages.splice(i,1);
  }
  fileDropped(fileHandele: FileHandele){
    this.product.productImages.push(fileHandele);

  }
}
