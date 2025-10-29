🎢 THEME PARK TICKET BOOKING SYSTEM  
🧑‍💻 Created by Vishan  

---

⚙️ 1️⃣ Run the BACKEND (Spring Boot)
📁 Folder: TICKETBOOKING

Steps:
1. Open the project in VS Code / IntelliJ / Eclipse.  
2. Make sure MongoDB is installed and running locally (port 27017).  
3. Open the file  
   src/main/resources/application.properties  
   and confirm it has:  
   spring.data.mongodb.uri=mongodb://localhost:27017/themeparkdb  
   server.port=8080  
4. In the terminal (inside the backend folder), run:  
   mvn spring-boot:run  
5. Once it starts, open this link in your browser to test:  
   http://localhost:8080/api/bookings/all  
   ✅ You should see booking data (JSON format).

---

💻 2️⃣ Run the FRONTEND (React App)
📁 Folder: THEMEPARK-FRONTEND

Steps:
1. Open a new terminal in the frontend folder.  
2. Install dependencies (only the first time):  
   npm install  
3. Start the React app:  
   npm start  
4. The browser will automatically open:  
   http://localhost:3000  

✅ The homepage will appear with your Theme Park Ticket Booking interface.

---

🔄 3️⃣ Connecting Frontend & Backend
- The frontend automatically sends requests to:  
  http://localhost:8080/api/bookings  
- Make sure both frontend (3000) and backend (8080) are running at the same time.

---

🧩 4️⃣ Project Overview
- Frontend: React + Tailwind CSS  
- Backend: Spring Boot + MongoDB  
- Main Features:  
  - Ticket booking form  
  - Stores data in MongoDB  
  - View all bookings (simple upgraded feature)

---

🎯 5️⃣ To Stop the App
- Backend: Press Ctrl + C in the terminal running mvn spring-boot:run  
- Frontend: Press Ctrl + C in the terminal running npm start

---

✨ Thank you for viewing my project!  
Created with dedication by **Vishan**.
