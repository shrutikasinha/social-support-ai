# React + TypeScript + Vite + Docker

# Social Support – AI Integrated

A React + Vite application that helps users draft better social support / assistance content with AI.  
The app combines a modern frontend stack with OpenAI’s API, wired through Redux Toolkit for state management.

---

## 🧩 Tech Stack

**Core Framework & Build**

- **React** – Component-based UI.
- **Vite** – Fast dev server and bundler.

**State Management**

- **Redux Toolkit** – Centralised state + async API calls (RTK Query).

**Forms & UI**

- **React Hook Form** – Form state, validation, and submission handling.
- **Ant Design (Antd)** – UI components (inputs, buttons, modals, layout).
- **Tailwind CSS** – Utility-first styling for layout, spacing, and responsive design.

**Quality, Testing & DX**

- **React Testing Library** – Component interaction and behaviour tests.
- **Jest** – Test runner and assertion framework.
- **ESLint** – Enforces consistent, error-free JS/TS code style.
- **Prettier** – Code formatter for consistent formatting.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shrutikasinha/social-support-ai.git
cd social-support-ai
npm i 

OR

You can pull and run the image using:
docker pull shrutikasinha/social-support-ai:latest
docker run shrutikasinha/social-support-ai:latest
```

## ✨ Key Features

### 1. React Hook Form Integration

Forms in the project are built using **React Hook Form** to keep everything lightweight, fast, and controlled.  
It handles:

- Field registration and validation  
- Error messages  
- Clean integration with Ant Design inputs  
- Smooth form submission and reset flow  
- Minimal re-renders for better performance  

This ensures a stable, predictable user experience even with complex, multi-step form fields.

---

### 2. Help Me Write – AI-Powered Writing Assistant

The app includes a built-in AI writing assistant that helps users refine or generate content using the OpenAI API.  
It appears inside a modal with two main actions.

#### **Option A: Regenerate**

- Uses the **original text** the user typed into the form  
- Sends it as the input prompt to OpenAI  
- Returns a fresh improved version of the same content  
- The user doesn’t modify the input before generating  
- Ideal when the user wants a simple rewrite or enhanced clarity  

#### **Option B: Edit & Regenerate**

- Uses the **AI-generated result**, along with **any edits made by the user**  
- Treats the edited content as the new base text  
- Sends this combined version to OpenAI for a more refined rewrite  
- Great for iterative improvement when the user partially edits the draft and wants AI to continue polishing  

---

### How the Flow Works

1. User enters text inside a field  
2. Opens the **Help Me Write** modal  
3. Chooses between:
   - **Regenerate** → uses only the original user text  
   - **Edit & Regenerate** → uses the AI output + user edits  
4. Redux Toolkit handles the API call  
5. The refined content is returned and placed back into the form  

This gives users a loop of:  
enter → improve → tweak → improve again,  
keeping the content helpful, accurate, and editable at every step.

---






