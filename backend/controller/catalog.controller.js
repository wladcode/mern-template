import Catalog from "../model/catalog.model.js";
import { buildErrorResponse, buildReponse } from "../util/util.js";

const MAX_CATALOG_ITEMS = 50;

// Get all catalogs
export const getCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.find({ userId: req.user.userId });
    res
      .status(200)
      .json(buildReponse("Catalogs retrieved successfully", catalogs));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

// Add a new catalog
export const addCatalog = async (req, res) => {
  const error = validateCatalog(req);
  if (error) {
    return res.status(400).json(buildErrorResponse(error));
  }

  if (req.body.items.some((type) => !type.id || !type.name)) {
    return res.status(400).json(buildErrorResponse("Invalid type of catalog"));
  }

  if (
    req.body.items.length !==
    new Set(req.body.items.map((type) => type.id)).size
  ) {
    return res.status(400).json(buildErrorResponse("Duplicate type of catalog"));
  }

  if (
    req.body.items.some(
      (type) => req.body.items.filter((t) => t.id === type.id).length > 1
    )
  ) {
    return res.status(400).json(buildErrorResponse("Duplicate type of catalog"));
  }

  const userId = req.user.userId;

  try {
    const savedCatalog = await newCatalog.save();
    res.status(201).json(buildReponse("Registro guardado", savedCatalog));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

// Edit an existing catalog
export const editCatalog = async (req, res) => {
  const error = validateCatalog(req);

  if (error) {
    return res.status(400).json(buildErrorResponse(error));
  }

  const userId = req.user.userId;

  const catalogToEdit = req.body;
  catalogToEdit.name = req.body.name;
  catalogToEdit.items = req.body.items;
  catalogToEdit.userId = userId;

  try {
    const updatedCatalog = await Catalog.findByIdAndUpdate(
      req.params.id,
      catalogToEdit,
      { new: true }
    );

    if (!updatedCatalog) {
      return res.status(404).json(buildErrorResponse("Catalog not found"));
    }

    res.status(200).json(buildReponse("Registro actualizado", updatedCatalog));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

// Get Catalog by name
export const getCatalogByName = async (req, res) => {
  try {
    const catalog = await Catalog.findOne({
      userId: req.user.userId,
      name: req.params.name,
    });

    if (!catalog) {
      return res.status(200).json(buildReponse("Catalog not found", []));
    }

    res
      .status(200)
      .json(buildReponse("Catalog retrieved successfully", catalog));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

// create or update a catalog with the given name
export const createOrUpdateCatalogByName = async (req, res) => {
  const error = validateCatalog(req);

  if (error) {
    return res.status(400).json(buildErrorResponse(error));
  }

  const userId = req.user.userId;

  const catalogToEdit = req.body;
  catalogToEdit.userId = userId;

  try {
    const updatedCatalog = await Catalog.findOneAndUpdate(
      { userId: userId, name: req.params.name },
      catalogToEdit,
      { new: true, upsert: true }
    );

    res.status(200).json(buildReponse("Registro actualizado", updatedCatalog));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

const validateCatalog = (req) => {
  if (!req.body.name || !req.body.items) {
    return "Review the fields";
  }

  if (req.body.items.length === 0) {
    return "You must add at least one type of catalog";
  }

  if (req.body.items.some((type) => type.id.length > 3)) {
    return "Type of catalog must have a maximum length of 3 characters";
  }

  if (req.body.items.some((type) => type.name.length > 50)) {
    return "Type of catalog must have a maximum length of 50 characters";
  }

  if (req.body.name.length > 50) {
    return "Name must have a maximum length of 50 characters";
  }

  if (req.body.items.length > MAX_CATALOG_ITEMS) {
    return "You can add up to " + MAX_CATALOG_ITEMS + " types of catalog";
  }

  if (req.body.items.some((type) => !type.id || !type.name)) {
    return "Invalid type of catalog";
  }

  if (
    req.body.items.length !==
    new Set(req.body.items.map((type) => type.id)).size
  ) {
    return "Duplicate type of catalog";
  }

  if (
    req.body.items.some(
      (type) => req.body.items.filter((t) => t.id === type.id).length > 1
    )
  ) {
    return "Duplicate type of catalog";
  }

  if (
    req.body.items.length !==
    new Set(req.body.items.map((type) => type.name)).size
  ) {
    return "Duplicate type of catalog";
  }

  if (
    req.body.items.some(
      (type) => req.body.items.filter((t) => t.name === type.name).length > 1
    )
  ) {
    return "Duplicate type of catalog";
  }

  return null;
};
