import express from "express";
import {
  addCatalog,
  createOrUpdateCatalogByName,
  editCatalog,
  getCatalogByName,
  getCatalogs,
} from "../controller/catalog.controller.js";

const router = express.Router();

router.get("/", getCatalogs);

// Get a catalog item by name
router.get("/:name", getCatalogByName);

// Create a new catalog item
router.post("/", addCatalog);
router.post("/:name", createOrUpdateCatalogByName);

// Update a catalog item by ID
router.put("/:id", editCatalog);

export default router;
