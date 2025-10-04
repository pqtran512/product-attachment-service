# Hashmap Product Management API

## Overview

This project is a NestJS-based API for managing products and their attachments. It demonstrates:
- CRUD operations for products
- Uploading attachments to products
- Building a file tree from uploaded files
- Efficient tree construction using a hash (HashMap) structure
- API documentation with Swagger

---

## Features

### 1. Product CRUD
- **Create, Read, Update, Soft Delete** products via RESTful endpoints.
- Product data is stored in a MySQL database using TypeORM.

### 2. Upload Attachment API
- Upload files (images, PDFs, docs) associated with products.
- Files are stored in a structured directory: `upload/product/{productId}/`.
- Only certain file types are allowed for upload.

### 3. Build File Tree
- The `/attachment/tree` endpoint returns a recursive tree structure of all uploaded files and folders.
- Uses a hash structure for efficient tree building (O(n) complexity).

### 4. Hash Structure Implementation
- When converting a flat list of items (with `id` and `parent_id`) to a tree, a HashMap is used to map IDs to nodes.
- This allows for fast parent lookup and efficient tree construction, even with large datasets.

### 5. Swagger Documentation
- All APIs are documented and accessible at `/docs` when the app is running.
- Interactive API testing is available via Swagger UI.

---

## Project Structure

```
src/
  product/         # Product CRUD logic (controller, service, entity, DTOs)
  attachment/      # Attachment upload and file tree endpoints
  utils/           # Utility functions (e.g., buildFileTree)
  config/          # Database configuration
  db/              # TypeORM migration files
  main.ts          # App entry point, Swagger setup
```

---

## Installation & Setup

### 1. Clone the repository

```sh
git clone https://github.com/pqtran512/product-attachment-service.git
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Environment

Add the `.env` file with your database credentials:

```
DB_PRODUCT__HOST=
DB_PRODUCT__PORT=
DB_PRODUCT__USERNAME=
DB_PRODUCT__PASSWORD=
DB_PRODUCT__DATABASE=
```

### 4. Run Database Migrations

```sh
npm run migration:run
```

### 5. Start the Application

```sh
npm run start:dev
```

The API will be available at `http://localhost:3000`.

### 6. Access Swagger Documentation

Visit [http://localhost:3000/docs](http://localhost:3000/docs) for interactive API docs.

---

## Example API Endpoints

- `POST /product` — Create a product
- `GET /product` — List all products
- `GET /product/:id` — Get product by ID
- `PUT /product/:id` — Update product
- `DELETE /product/:id` — Soft delete product

- `POST /attachment/upload` — Upload a file for a product
- `GET /attachment/tree` — Get the file tree of all uploaded attachments

---

## How Hash Structure is Used

When building a tree from a flat list (e.g., attachments or categories), a HashMap is used to map each item's ID to its node. This allows for O(1) parent lookup, so the entire tree can be built in O(n) time, which is much faster than the naive O(n²) approach.

---
# Example flow:

## CURL for creating a product:
curl --location 'http://localhost:3000/product' \
--header 'Content-Type: application/json' \
--data ' {
  "alias": "iphone-15-pro-max",
  "name": "iPhone 15 Pro Max",
  "brand_id": 1,
  "category_id": 2,
  "price": 32990000,
  "barcode": "1234567890123",
  "description": "Điện thoại iPhone 15 Pro Max chính hãng VN/A",
  "weight": 0.24,
  "length": 15.9,
  "width": 7.6,
  "height": 0.82
}'

## CURL for uploading attachment:
curl --location 'http://localhost:3000/attachment/product/1' \
--form 'file=@"/C:/Users/Tran.pq/Downloads/product.docx"'

## CURL to get attachment tree:
curl --location 'localhost:3000/attachment/tree'

---

## Notes
- Make sure MySQL is running and accessible with the credentials in your `.env`.
- The project uses TypeORM for database access and migrations.