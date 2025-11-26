import express from "express";
import {
  getAllExamples,
  getExampleById,
  getExampleByDate,
  getExampleByMonth,
  getExampleByYear,
  addExample,
  editExample,
  deleteExample,
} from "../controller/example.controller.js";

const router = express.Router();

router.get("/", getAllExamples);
router.get("/date", getExampleByDate);
router.get("/month/:year/:month", getExampleByMonth);
router.get("/year/:year", getExampleByYear);
router.post("/", addExample);
router.put("/:id", editExample);
router.delete("/:id", deleteExample);
router.get("/:id", getExampleById);

export default router;
