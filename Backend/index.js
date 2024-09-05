const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const RegisterRoutes = require('./routes/RegistrationRoutes.js');
const isAuthenticated = require('./middleware/isAuthenticated.js');
const companyRouter=require('./routes/CompanyRoute.js')
const jobRouter=require('./routes/JobRouter.js')
const applyingRouter=require('./routes/ApplyingRouter.js')

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request to ${req.url}`);
//   next();
// });

app.use("/api/jobhunt", RegisterRoutes);
app.use("/api/jobhunt",companyRouter);
app.use("/api/jobhunt", jobRouter);
app.use("/api/jobhunt",applyingRouter);
mongoose.connect(process.env.MongoURI)
  .then(() => {
    console.log("Database is online");
    app.listen(process.env.PORT, () => {
      // console.log("Backend started on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("Error:", err));
