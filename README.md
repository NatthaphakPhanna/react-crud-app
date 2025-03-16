# react-crud-app
😃 โปรเจกต์นี้เป็นแอปพลิเคชันบนเว็บที่พัฒนาด้วย React โดยนำเสนอการทำงานครบถ้วนของ CRUD Operations (Create, Read, Update, Delete) ซึ่งเป็นฟังก์ชันพื้นฐานสำหรับจัดการและโต้ตอบกับข้อมูล โดยมีอินเทอร์เฟซที่ใช้งานง่าย เหมาะสำหรับการเริ่มต้นสร้างแอปที่มีความสามารถด้าน CRUD และสามารถปรับแต่งได้ตามความต้องการ

## 💻 Client
✨โค้ดหลักในฝั่ง Client จะถูกจัดเก็บในโฟลเดอร์: react-crud-app/client/src/App.jsx ที่นี่เป็นจุดศูนย์กลางสำหรับการพัฒนาฝั่ง Client โดยคุณสามารถแก้ไข UI และการทำงานต่างๆ ของแอปพลิเคชันได้อย่างครบถ้วน ✔

## 💻 Server
✨โค้ดหลักในฝั่ง Server จะจัดเก็บอยู่ใน: react-crud-app/server ซึ่งรวมการตั้งค่าการเชื่อมต่อกับฐานข้อมูล การทำงานของ API, และการจัดการ CRUD Operations สำหรับการเชื่อมต่อระหว่าง Client และ Server ✔

## 🎉Database

✨คำสั่งสร้าง database ( Mysql )

```bash
  CREATE DATABASE employeesystem;
  
  USE employeesystem;
  
  CREATE TABLE employees (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,      
      surname VARCHAR(255) NOT NULL,    
      age INT NOT NULL,                  
      email VARCHAR(255) NOT NULL     
  );

```

