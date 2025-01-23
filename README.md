# Inventory Management System

An intuitive and robust **Inventory Management System** built with **React** and **TypeScript**, designed to help manage warehouses and products effectively. This system includes modules for user authentication, warehouse creation, and product management.

## Features

- **User Authentication**:

  - Secure Login and Signup functionality.
  - Role-based access control.

- **Warehouse Management**:

  - Create and manage multiple warehouses.
  - View detailed information about each warehouse.

- **Product Management**:
  - Add and manage products with associated details.
  - Associate products with specific warehouses.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS (optional)
- **State Management**: Redux (or Context API if applicable)
- **Form Handling**: React Hook Form / Formik (if applicable)
- **Routing**: React Router
- **API Handling**: Axios / Fetch API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manavjain01/Inventory.Management.System-React.Typescript.git
   ```

2. Navigate to the project directory:

   ```bash
   cd inventory-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser:
   ```
   http://localhost:5173
   ```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Lints the codebase for errors.
- **`npm run preview`**: Previews the production build locally.

## Folder Structure

```
project-root
├── src
│   ├── assets          # Static assets like images and icons
│   ├── components      # Reusable components
│   ├── modules         # Feature-specific modules (e.g., auth, warehouse, product)
│   ├── pages           # Page components for routing
│   ├── redux           # Redux store and slices (if using Redux)
│   ├── styles          # Global and Tailwind styles (if applicable)
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public              # Public assets
├── package.json        # Project configuration
└── README.md           # Project documentation
```

## API Integration

The application communicates with the backend API for the following operations:

- **Authentication**:

  - `POST /api/login`: Login user.
  - `POST /api/signup`: Signup user.

- **Warehouse Management**:

  - `POST /api/warehouse`: Create warehouse.
  - `GET /api/warehouse`: Retrieve all warehouses.

- **Product Management**:
  - `POST /api/inventory`: Add product.
  - `GET /api/inventory`: Retrieve all products.

> Note: Ensure the backend server is running and the API endpoints are correctly configured.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Contact**

For any queries or feedback, feel free to reach out to me at [your-email@example.com](mailto:your-email@example.com).
