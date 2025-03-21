
import { Router } from "express";
import { addEducator, createEmployeeAccount, fetchAllEmployees, getEmployeeProfile, loginEmployeeAccount } from "../controllers/employee.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router();


router.route("/create-account")
.post( upload.single('avatar') ,createEmployeeAccount);

router.route("/login")
.post(loginEmployeeAccount);



router.use(verifyJWT); 

router.route("/get-my-profile")
.get(getEmployeeProfile);


// Admin Routes

router.use(verifyAdmin);

router.route("/add-educator")
.post(addEducator);

router.route("/fetch-all-employees")
.get(fetchAllEmployees);


export default router;