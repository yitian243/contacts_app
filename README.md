# Contacts Application

A responsive web application to browse and view contacts using data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).  

The app allows you to:

- Browse contacts in a visually appealing grid layout.
- Search contacts by name, email, or company.
- Click on a contact to view detailed information in a modal.


---

## Live Demo

You can view the live application here:  
[https://yitian243.github.io/contacts_app/](https://yitian243.github.io/contacts_app/)

---
## Features

- Fully responsive design.
- Smooth hover and modal animations.
- Intuitive search functionality.
- Modern card layout with gradient background and avatars.

---

## How to Run Locally

**Step 1: Clone the repository**  

Open your terminal and run:

```bash
git clone https://github.com/yitian243/contacts_app.git
cd contacts_app
```

**Step 2: Open index.html in a browser**

- Double-click index.html in your file explorer, or right-click → Open with your preferred browser.

- No server is required; the app fetches data directly from the JSONPlaceholder API.

**Optional: Use a local server**

Some browsers restrict fetch on file:// URLs. You can run a local server:

**Using Python 3:**

```bash
python -m http.server 8000
```

Then open http://localhost:8000
 in your browser.

**Using VS Code Live Server extension:**

Right-click index.html → **Open with Live Server**.

## File Structure

```text
contacts_app/
│
├── index.html      # Main HTML file
├── style.css       # Styles
├── script.js       # JavaScript for fetching, search, and modal
└── README.md       # This file
```

**Dependencies**

No external dependencies required; uses vanilla HTML, CSS, and JavaScript.

Contacts data fetched from JSONPlaceholder
.
