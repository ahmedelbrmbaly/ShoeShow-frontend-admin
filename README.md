[![Angular](https://img.shields.io/badge/Angular-20%2B-DD0031?logo=angular&logoColor=white&style=for-the-badge)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge)](#)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange?style=for-the-badge)](CONTRIBUTING.md)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ahmedelbrmbaly/shoeshow-frontend-admin)
[![Netlify Status](https://api.netlify.com/api/v1/badges/930a1ea3-0ff9-4104-b199-bd1e3c798814/deploy-status)](https://app.netlify.com/projects/shoe-show-admin/deploys)

# ShoeShow Admin Frontend

ShoeShow Admin Frontend is a web-based administration dashboard for managing the ShoeShow e-commerce platform. Built with Angular, it provides a modern, responsive interface for product, order, and customer management, as well as analytics and reporting.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [Further Documentation](#further-documentation)

## Features
- Admin authentication and session management
- Product CRUD (Create, Read, Update, Delete) operations
- Order management and status tracking
- Customer management
- Dashboard with sales and statistics charts
- Responsive UI with Angular Material and Bootstrap
- Dialogs and notifications for user feedback

## Tech Stack
- **Framework:** Angular 20
- **UI:** Angular Material, Bootstrap 5
- **Charts:** Chart.js
- **State & Utilities:** RxJS


## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v9 or later)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ShoeShow-frontend-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
ng serve
```
Visit [http://localhost:4201](http://localhost:4200) in your browser.

## Project Structure
```
ShoeShow-frontend-admin/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── add-product-component/
│   │   │   ├── edit-product-component/
│   │   │   ├── dashboard/
│   │   │   ├── order/
│   │   │   ├── product/
│   │   │   ├── customer/
│   │   │   ├── shared/
│   │   │   │   ├── info-dialog/
│   │   │   │   ├── login/
│   │   │   │   └── logout-dialog/
│   │   ├── services/
│   │   ├── model/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── ...
│   ├── styles/
│   └── ...
├── public/
├── angular.json
├── package.json
└── ...
```

## Usage
- **Login:** Use your admin credentials to access the dashboard.
- **Products:** Add, edit, or remove products. Upload images and manage variations.
- **Orders:** View and update order statuses.
- **Customers:** Browse and manage customer information.
- **Dashboard:** Visualize sales and statistics with interactive charts.

#

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

## Further Documentation
- For detailed component and service documentation, visit the [DeepWiki project page](https://deepwiki.com/ahmedelbrmbaly/shoeshow-frontend-admin).
- For Angular best practices, see the [Angular documentation](https://angular.io/docs).

---

© 2025 ShoeShow. All rights reserved.
