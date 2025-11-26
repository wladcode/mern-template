import express from "express";
import { creteUser, getUser } from "../controller/user.controller.js";

const route = express.Router();

route.get("/", getUser);
route.post("/", creteUser);


export default route;
