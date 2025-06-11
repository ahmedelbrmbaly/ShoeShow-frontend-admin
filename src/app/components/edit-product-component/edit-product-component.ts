import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-edit-product-component',
  standalone: false,
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css'
})
export class EditProductComponent {

  productForm: FormGroup;
  brands = ['Nike', 'Merrel', 'Adidas', 'Puma', 'Gucci', 'Sketchers', 'Reebok', 'New Balance'];
  colors = ['Black', 'White', 'Blue', 'Grey', 'Brown', 'Red', 'Cream']; // Added 'Cream' from your data
  genders = ['MALE', 'FEMALE'];
  categories = ['SNEAKERS', 'CLASSIC', 'CASUAL'];
  sizes = [35,36,37,38,39,40,41,42,43,44,45,46,47,48];
  images: File[] = [];
  imagesPreview: string[] = [];
  productId: number | null = null;
  // STATIC_PATH: string = "src/main/resources/static/";

  // Track which variations are from existing product vs newly added
  existingVariationsCount: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog,
    private route: ActivatedRoute
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
    this.route.paramMap.subscribe(params => {
      const id = params.get('productId');
      if (id) {
        this.productId = +id;
        console.log("Editing product ID:", this.productId);

        // Call the service to fetch product details
        this.productService.getProductById(this.productId).subscribe({
          next: (product) => {
            console.log("Product data received:", product);
            // add server path to images
              product.img = product.img.map((imagePath: string) => "http://185.69.166.150/" + imagePath);
            this.populateForm(product);
          },
          error: (err) => {
            console.error('Failed to fetch product:', err);
            this.dialog.open(InfoDialogComponent, {
              width: '400px',
              data: {
                message: 'Failed to load product data.',
                type: 'error'
              }
            });
          }
        });
      } else {
        // If no product ID, add empty variation for new product
        if (this.variations.length === 0) {
          this.addVariation();
        }
      }
    });
  }

  populateForm(product: any): void {
    // Extract category and gender from the product name or set defaults
    // You might need to adjust this based on your actual data structure
    const category = this.extractCategory(product);
    const gender = this.extractGender(product);

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      category: category,
      gender: gender,
      price: product.price,
      brand: this.extractBrand(product) // Extract brand from name
    });

    // Populate images from API response
    this.imagesPreview = [];
    if (product.img && product.img.length > 0) {
      product.img.forEach((imagePath: string) => {
        // Construct full image URL
        const fullImagePath = imagePath;
        console.log(fullImagePath);
        this.imagesPreview.push(fullImagePath);
      });
    }

    // Clear existing variations and populate new ones
    this.variations.clear();

    if (product.productInfos && product.productInfos.length > 0) {
      product.productInfos.forEach((info: any) => {
        this.variations.push(this.fb.group({
          size: [info.size.replace('SIZE_', ''), Validators.required],
          color: [info.color, Validators.required],
          quantity: [info.quantity, [Validators.required, Validators.min(1)]]
        }));
      });

      // Track how many variations are from existing product
      this.existingVariationsCount = product.productInfos.length;
    } else {
      // Add at least one empty variation if none exist
      this.addVariation();
      this.existingVariationsCount = 0;
    }
  }

  // Helper method to extract brand from product name
  extractBrand(product: any): string {

    if(product.brand){
      return product.brand;
    }

    return 'NIKE'; // Return empty if no brand found
  }

  // Helper method to extract category (you might need to adjust this)
  extractCategory(product: any): string {
    // If your API returns category directly, use it
    if (product.category) {
      return product.category;
    }

    // Otherwise, try to infer from name
    const name = product.name.toLowerCase();
    if (name.includes('sneaker')) return 'SNEAKERS';
    if (name.includes('classic')) return 'CLASSIC';
    if (name.includes('casual')) return 'CASUAL';

    return 'SNEAKERS'; // Default fallback
  }

  // Helper method to extract gender
  extractGender(product: any): string {
    // If your API returns gender directly, use it
    if (product.gender) {
      return product.gender;
    }

    // Otherwise, try to infer from name
    const name = product.name.toLowerCase();
    if (name.includes('male') && !name.includes('female')) return 'MALE';
    if (name.includes('female')) return 'FEMALE';

    return 'MALE'; // Default fallback
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
    // Only allow removal if it's not an existing variation from the product
    // and there's more than one variation total
    if (this.variations.length > 1 && i >= this.existingVariationsCount) {
      this.variations.removeAt(i);
    }
  }

  // Check if a variation can be removed
  canRemoveVariation(index: number): boolean {
    // Can remove if:
    // 1. It's not from existing product data (index >= existingVariationsCount)
    // 2. There's more than one variation total
    // 3. OR if it's a new product (productId is null), then normal rules apply
    if (!this.productId) {
      return this.variations.length > 1;
    }

    return index >= this.existingVariationsCount && this.variations.length > 1;
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
      Red: '#dc2626',
      Cream: '#f5f5dc' // Added cream color
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

    // Add product ID if editing
    // if (this.productId) {
    //   formData.append('productId', this.productId.toString());
    // }

    formData.append('name', v.name);
    formData.append('description', v.description);
    formData.append('category', v.category);
    formData.append('gender', v.gender);
    formData.append('price', v.price);
    formData.append('brand', v.brand);

    // Only append new images if any were selected
    if (this.images.length > 0) {
      this.images.forEach(img => formData.append('images', img));
    }

    v.variations.forEach((varItem: any, idx: number) => {
      formData.append(`variations[${idx}].size`, `SIZE_${varItem.size}`);
      formData.append(`variations[${idx}].color`, varItem.color);
      formData.append(`variations[${idx}].quantity`, varItem.quantity.toString());
    });

    // Use different service method for update vs create
    const serviceCall = this.productId
      ? this.productService.updateProduct(this.productId, formData)
      : this.productService.addProduct(formData);

    serviceCall.subscribe({
      next: res => {
        const message = this.productId ? 'Product updated successfully!' : 'Product added successfully!';
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: {
            message: message,
            type: 'success'
          }
        }).afterClosed().subscribe(() => {
          if (!this.productId) {
            // Only reset form for new products
            this.productForm.reset();
            this.images = [];
            this.imagesPreview = [];
            while (this.variations.length) this.variations.removeAt(0);
            this.addVariation();
            this.existingVariationsCount = 0;
          }
        });
      },
      error: err => {
        const message = this.productId ? 'Failed to update product. Please try again.' : 'Failed to add product. Please try again.';
        this.dialog.open(InfoDialogComponent, {
          width: '400px',
          data: {
            message: message,
            type: 'error'
          }
        });
      }
    });
  }
}
