# TaskManagement_System

A **full-stack Task Management application** built with **Django REST Framework** and **React.js**.  
Organize tasks in Kanban-style boards, drag-and-drop tasks between columns, and manage projects efficiently.

---

## 🌟 Features

- User authentication: Sign up, login, change password, forgot/reset password
- Create, update, delete **boards**
- Create, update, delete **tasks**
- Drag-and-drop tasks between columns using **@dnd-kit**
- Kanban-style board interface for managing tasks
- Responsive and clean design with **Ant Design**
- API-driven frontend using **Axios**

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | Django, Django REST Framework |
| Frontend     | React.js, Tailwind CSS, Ant Design, @dnd-kit |
| Database     | MySql |
| API Requests | Axios |

---

## 💻 Installation

### Clone the repository

```bash
git clone https://github.com/bhaveshpa1234/TaskManagement_System.git
cd TaskManagement_System


cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# OR
source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm start


