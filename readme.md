# Broh Fitness

Welcome to Broh Fitness. Broh Fitness is fitness trainings booking application based on web. It has use cases for both users as well as trainers. Trainers can release slots as per their availability of time, category and fees. Users can see available slots for the date and time and can book trainings sessions accordingly.

### Tech Stacka Used :
[![My Skills](https://skillicons.dev/icons?i=vue,nodejs,expressjs,mysql,sequelize)](https://skillicons.dev)

### The Dependencies used for frontend are : 
``` "@vuelidate/core": "^2.0.0",
    "@vuelidate/validators": "^2.0.0",
    "axios": "^1.3.3",
    "primeicons": "^6.0.1",
    "primevue": "^3.23.0",
    "typewriter-effect": "^2.19.0",
    "vue": "^3.2.45",
    "vue-router": "^4.1.6"
```

### The Dependencies used for backend are : 
``` "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "lodash.omit": "^4.5.0",
    "mysql2": "^3.1.2",
    "nodemailer": "^6.9.1",
    "sequelize": "^6.28.0",
    "validator": "^13.9.0"
```

### Home Page :

<img src="https://i.ibb.co/hYHQPr7/Broh-Fitness-Home-Page.png"/>

- Here on Home page we have some basic info and templates for site. We have navbar at top of page, As we can see in navbar we have options for Create Acoount and Login. To access Live trainings and other features user or trainer have to login first.

Then, we will see signup and login page :

### SignUp Page :

<img src="https://i.ibb.co/rs9Y8V5/Broh-signup.png">

- From this trainer or user can signup with name,email,mobile number and password. For trainer he/she have to check the box for register as trainer.

### LogIn Page :

<img src="https://i.ibb.co/YTSBfpk/Broh-Login.png">

- From this page trainer or user can login to site with proper credentials provided at the time of signup.

We have applied role based access control. So, we have different features for trainers and users. Now, we will see these different functionalities of triners and users.

## 1. Trainer :

- ### Create Slots :

<img src="https://i.ibb.co/sWMMgxn/Broh-Trainer-create-slot.png">

- From tis page trainer can release or create slots after selecting date, category, time slots and fees. Trainer can not release slots for previous dates.

- ### Slot Status :

<img src="https://i.ibb.co/wLpLpjv/Broh-Trainer-slot-status.png">

- On this page, trainer can see all available slots released by him/her. He/she can reserver particular slots for particular date or he/she can close all slots for particular dates.
- At bottom, In booked slots section, trainer can see the bookings done by customers for his created slots. Here he/she can change the slot status and also can provide links in case of virtual sessions.
- In both the sections, we have filter functionality by dates and training types.

## 2. User :

- ### Live Trainings :

<img src="https://i.ibb.co/CssGpRh/Broh-User-Live-trainings.png">

- From this page, user can see all the available slots by all trainers. Users can book the sessions for suitable training after selecting time slot according to their choice.
- Also, users can filter the trainings sessions by dates and training types.

- ### My Bookings :

<img src="https://i.ibb.co/586d3RK/Broh-User-Bookings.png">

- On this page users can see all the trainig sessions booked by them. Also they can see the slot status and other required information for booked slots.
- Also, Users can filter their booked slots by dates and tarining types.

So, this details concludes our project and features of project.