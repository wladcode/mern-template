import express from "express";
import { register } from "../controller/auth.controller.js";

const route = express.Router();

route.post("/", register);

export default route;
