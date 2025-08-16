# 💰 Financial Account Management System (FMS)

<p align="center">
  <b>A modern, role-based web platform to manage finance, powered by <br/>ASP.NET Core + React (Vite)</b>
</p>

---

## 🌟 Why this project?
Financial data is the heart of any business. Traditional methods are slow, insecure, and hard to scale.  
This project solves these challenges with:
- ⚡ Lightning fast **React + Vite** frontend
- 🔐 Secure **.NET backend with RBAC**
- 📊 Interactive financial dashboards & reports
- 🛠️ Clean architecture for scalability

---

## 🏗️ Tech Stack

| Layer        | Technology Used             |
| ------------ | --------------------------- |
| **Frontend** | React 18, Vite, TailwindCSS |
| **Backend**  | ASP.NET Core (.NET 7/8), C# |
| **Database** | SQL Server                  |
| **Build**    | Vite, MSBuild               |
| **Auth**     | Identity / JWT              |

---

## 📂 Project Structure

```
/FinancialManagementSystemsln.sln  # .NET Solution
/FinancialManagementSystems/       # Backend Project
/frontend/                         # React (Vite) App
vite.config.js                     # Vite Config
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sonia66Hub/Financial-AccountManagementSystem.git
cd <repo-name>
```

### 2️⃣ Backend Setup (.NET)

```bash
cd FinancialManagementSystems
dotnet restore
dotnet run
# 👉 Runs at: https://localhost:5001
```

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
# 👉 Runs at: http://localhost:5173
```

---

## 🔑 Demo Credentials

```
👤 Username: admin
🔑 Password: admin123
```

---

## ✨ Features

- 🧑‍💼 Role Based Access Control (Admin, Manager, User)
- 💳 Manage accounts, transactions, expenses
- 📊 Generate financial statements & reports
- 🔄 Seamless Frontend-Backend API integration
- 📦 Scalable & production-ready

---

## ⚙️ Environment Setup

### Backend `.env` / appsettings.json override:

```ini
ConnectionStrings__DefaultConnection=your-sqlserver-connection
```

### Frontend `.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Build & Deployment

### Backend:

```bash
dotnet publish -c Release
```

### Frontend:

```bash
npm run build
```

Deploy easily to **Azure, Vercel, or Docker**.

---


 ## 📸 Screenshots  

🔐 **Login Page**  
![Login](<img width="783" height="605" alt="Screenshot 2025-08-16 160444" src="https://github.com/user-attachments/assets/82063c59-2237-427e-a0ec-4e94ba8e82b2" />
)

📊 **Dashboard**  
![Dashboard](https://github.com/user-attachments/assets/489faffe-ef40-43e8-a067-8cab5be61b86)

💳 **Transactions**  
![Transactions](https://github.com/user-attachments/assets/ec0b8420-bd89-44cf-8e3a-d78edcd420

---

## 🎥 Demo Video


### 🔹 YouTube
👉 [Watch on YouTube](https://youtu.be/hwZ-xUo3Vww)


---

## 🤝 Contribution Guide

1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit changes & push  
4. Open a Pull Request 🎉  

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use & improve!

<p align="center">✨ Built with ❤️ by <b>Sonia Khatun</b> ✨</p>
