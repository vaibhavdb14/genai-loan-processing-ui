# Enterprise Banking Loan Processing System (UI)

A modern, premium, enterprise-grade banking web application for Loan Document Processing using Generative AI. This repository contains the Frontend UI built for Bank Managers, Underwriters, and Loan Officers.

The interface is designed with a strict **60-30-10 Banking Color Theme** to ensure a professional, secure, and trustworthy user experience.

## Tech Stack
* **Build Tool:** Vite
* **Framework:** ReactJS (JavaScript)
* **Styling:** Tailwind CSS v3
* **Icons:** Lucide React
* **Routing:** React Router DOM

## Core Features Implemented
* **Secure Authentication Flow:** Enterprise login screen.
* **Manager Dashboard:** Key metrics, status tracking, and recent application overviews.
* **Multi-Step Application Form:** Dynamic forms for applicant details, loan types, and document uploads.
* **AI Processing Pipeline:** Visual indicators for GenAI data extraction and RAG summary generation.
* **Cross-Document Verification:** Discrepancy highlighting and risk assessment panels.
* **Re-authentication Security:** Manager confirmation modals for sensitive actions (Approve/Decline).
* **Printable Customer Tokens:** Clean, printer-friendly approval slips.

---

## 🚀 Setup & Installation Guide for Developers

Follow these steps to clone the repository and run the UI locally. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
```

### 2. Install Dependencies
Run the following command to install React, Vite, Tailwind CSS, and all necessary packages.

```bash
npm install
```
### 3. Run the Development Server
Start the Vite development server.

```bash
npm run dev
```

### 4. Open in Browser
Once the server starts, open your browser and navigate to the local URL provided in your terminal (usually http://localhost:5173).

### Folder Structure
To aid in backend integration, the project is structured as follows:

/src/assets/ - Static assets and global configurations.

/src/components/ - Reusable UI components (Sidebar, Header).

/src/layouts/ - Global application wrappers (MainLayout).

/src/pages/ - Core application screens (Dashboard, NewApplication, ApplicationDetail, etc.).