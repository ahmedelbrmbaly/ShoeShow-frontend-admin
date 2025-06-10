import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';


@Component({
  selector: 'app-add-product-component',
  standalone: false,
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  brands = ['Nike', 'Merrel', 'Adidas', 'Puma', 'Gucci', 'Sketchers', 'Reebok', 'New Balance'];
  colors = ['Black', 'White', 'Blue', 'Grey', 'Brown', 'Red', 'Cream'];
  genders = ['MALE', 'FEMALE'];
  categories = ['SNEAKERS', 'CLASSIC', 'CASUAL'];
  sizes = [35,36,37,38,39,40,41,42,43,44,45,46,47,48];
  images: File[] = [];
  imagesPreview: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(300)]],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      brand: ['', Validators.required],
      variations: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.variations.length === 0) {
      this.addVariation();
    }
  }

  get variations(): FormArray {
    return this.productForm.get('variations') as FormArray;
  }

  addVariation() {
    this.variations.push(this.fb.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removeVariation(i: number) {
    if (this.variations.length > 1) {
      this.variations.removeAt(i);
    }
  }

  onImageChange(event: any) {
    const files = Array.from(event.target.files) as File[];
    if (files.length <= 4) {
      this.images = files;
      this.imagesPreview = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesPreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: {
          message: 'Select up to 4 images only',
          type: 'error'
        }
      });
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagesPreview.splice(index, 1);
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isVarInvalid(i: number, controlName: string): boolean {
    const control = (this.variations.at(i) as FormGroup).get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getColorHex(color: string): string {
    const colorMap: { [key: string]: string } = {
      Black: '#222',
      White: '#fff',
      Blue: '#2563eb',
      Grey: '#6b7280',
      Brown: '#8d5524',
      Red: '#dc2626'
    };
    return colorMap[color] || '#ccc';
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
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
      next: res => {
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: {
            message: 'Product added successfully!',
            type: 'success'
          }
        }).afterClosed().subscribe(() => {
          this.productForm.reset();
          this.images = [];
          this.imagesPreview = [];
          while (this.variations.length) this.variations.removeAt(0);
          this.addVariation();
        });
      },
      error: err => {
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: {
            message: 'Failed to add product. Please try again.',
            type: 'error'
          }
        });
      }
    });
  }

}
