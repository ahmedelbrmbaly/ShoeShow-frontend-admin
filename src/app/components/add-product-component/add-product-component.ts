import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';


@Component({
  selector: 'app-add-product-component',
  standalone: false,
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css'
})
export class AddProductComponent {

   productForm: FormGroup;
  brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'];
  colors = ['Black', 'White', 'Blue', 'Grey', 'Brown', 'Red'];
  genders = ['MALE', 'FEMALE'];
  categories = ['SNEAKERS', 'CLASSIC', 'CASUAL'];
  sizes = [35,36,37,38,39,40,41,42,43,44,45,46,47,48];
  images: File[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      variations: this.fb.array([])
    });
  }

  get variations(): FormArray {
    return this.productForm.get('variations') as FormArray;
  }

  addVariation() {
    this.variations.push(this.fb.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  removeVariation(i: number) {
    this.variations.removeAt(i);
  }

  onImageChange(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files.length <= 4) {
      this.images = files;
    } else {
      alert('Select up to 4 images only');
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    const v = this.productForm.value;
    formData.append('name', v.name);
    formData.append('description', v.description);
    formData.append('category', v.category);
    formData.append('gender', v.gender);
    formData.append('price', v.price);
    formData.append('brand', v.brand);

    this.images.forEach(img => formData.append('images', img));

    v.variations.forEach((varItem: any, idx: number) => {
      formData.append(`variations[${idx}].size`, `SIZE_${varItem.size}`);
      formData.append(`variations[${idx}].color`, varItem.color);
      formData.append(`variations[${idx}].quantity`, varItem.quantity.toString());
    });

    this.productService.addProduct(formData).subscribe({
      next: res => { alert('Product added successfully!'); this.productForm.reset(); this.images = []; this.variations.clear(); },
      error: err => alert('Failed to add product')
    });
  }

}
