**Campus Problem Reporting System**

**📖 Overview**
The Campus Problem Reporting System is a web-based application that allows students to report campus-related issues and track their status. Admins can view all reported problems and mark them as resolved.
This project demonstrates full stack development concepts using frontend, logic handling, and client-side storage.


👨‍🎓 Student**
Register a new account
Login securely
Report problems with details and image
Track pending problems
View resolved problems
Dashboard showing statistics

🛠️** Admin**
Login as admin
View all pending problems
Mark problems as resolved
Manage complaints efficiently
🧱 **Project Structure
**
📁 **Campus-Problem-Reporting**
│── index.html        # Login & Register Page
│── dashboard.html    # Student Dashboard
│── report.html       # Report Problem Page
│── tracking.html     # Pending Problems
│── solved.html       # Solved Problems
│── admin.html        # Admin Panel
│── style.css         # Styling
│── script.js         # Application Logic

**⚙️ Technologies Used**
HTML5
CSS3
JavaScript (Vanilla JS)
LocalStorage (for data storage)
**🔐 Default Admin Login**

Username: admin
Password: admin123
Role: admin
**🧠 Working Process**
**1. Authentication**
Users can register as students
Login validates username, password, and role

**2. Problem Submission**
Student enters:
Name
Location
Category
Description
Image (optional)
Data stored in LocalStorage

**3. Tracking**
Problems filtered by:
Student ID
Status (Pending / Resolved)

**4. Admin Control**
Admin views all pending problems
Click Resolve button to update status

**📊 Dashboard**
Total → Total problems reported
Pending → Problems not yet resolved
Resolved → Completed problems

**💡 Key Concepts**
DOM Manipulation
Event Handling
LocalStorage CRUD operations
Role-based Authentication
Dynamic Rendering
File Handling (FileReader API)

**🔒 Security**
Input validation
Basic XSS protection using escape function
Role-based access

**🎨 UI Features**
Modern glassmorphism design
Smooth animations
Responsive layout
Sidebar navigation (Admin panel)

**⚠️ Limitations**
No real backend (uses LocalStorage)
Not suitable for production use
Basic authentication only

**🔮 Future Improvements**
Add backend (Node.js / Express)
Integrate database (MongoDB / MySQL)
Add notifications system
Add priority levels
Improve security

**▶️ How to Run**
Download or clone the repository
Open index.html in any browser
Register or login
Start reporting and managing problems

**🏷️ Project Type**
Full Stack Development
Mini Project
Beginner Friendly

🙌 Author
Pilli Vnekata Madhyusha
