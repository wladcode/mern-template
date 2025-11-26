import express from "express";
import { authenticateFirebase, basicAuthentication } from "../controller/auth.controller.js";

const route = express.Router();

route.post("/authenticateFirebase", authenticateFirebase);
route.post("/", basicAuthentication);

export default route;
