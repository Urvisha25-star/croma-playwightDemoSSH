 HEAD
 # Croma E-Commerce Automation Suite 🛒

An end-to-end (E2E) testing framework built with **Playwright** and **JavaScript** to automate and validate critical user journeys on the Croma website.

## 🚀 Features
- **POM Architecture:** Implemented Page Object Model for enhanced maintainability and code reusability.
- **CI/CD Integration:** Fully automated via **GitHub Actions** with manual trigger support (`workflow_dispatch`).
- **Resilient Locators:** Optimized selectors using Playwright's `getByRole` and `getByTestId` to handle dynamic e-commerce elements.
- **Detailed Reporting:** Generates HTML reports and traces for easy debugging of failed test cases.

## 🛠️ Tech Stack
- **Engine:** [Playwright](https://playwright.dev)
- **Language:** JavaScript
- **CI/CD:** GitHub Actions
- **Reporter:** Playwright HTML Reporter

## 📋 Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests
- **Run all tests:**
  ```bash
  npx playwright test
  ```
- **Run in UI Mode (for debugging):**
  ```bash
  npx playwright test --ui
  ```
- **Run a specific test file:**
  ```bash
  npx playwright test tests/login.spec.js
  ```

## ☁️ Continuous Integration
This project uses **GitHub Actions** to ensure code quality. You can manually run specific test files via the **Actions** tab using the `test_file` input.
# Croma Playwright Framework

Automation framework using Playwright with JavaScript.

## Run:
npm install
npx playwright install
npm test

# croma-playwightDemoSSH
Automation Framework for Testing Croma E-Commerce Website
 9ffcfd8bbd9614d1863317124d87af8fde165bcf


