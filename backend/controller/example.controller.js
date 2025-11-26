import {
  buildErrorResponse,
  buildReponse,
  validateObjectId,
} from "../util/util.js";
import ExampleModel from "../model/example.model.js";

export const getAllExamples = async (req, res) => {
  try {
    const examples = await ExampleModel.find();

    res.status(200).json(buildReponse("Registros encontrados", examples));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const getExampleById = async (req, res) => {
  try {
    const { id } = req.params;

    validateObjectId(id);

    const example = await ExampleModel.findById(id);

    if (!example) {
      return res.status(404).json(buildErrorResponse("Registro no encontrado"));
    }

    res.status(200).json(buildReponse("Registro encontrado", example));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const getExampleByDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  console.log("Dates received:");
  console.log(startDate, endDate);

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json(buildErrorResponse("Missing startDate or endDate"));
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log("Query dates:");
    console.log(start, end);

    const examples = await ExampleModel.find({
      FECHA: {
        $gte: start,
        $lte: end,
      },
    });

    console.log("Examples found:", examples.length);

    res.status(200).json(buildReponse("Registros encontrados", examples));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const getExampleByMonth = async (req, res) => {
  const { year, month } = req.params;

  let startOfDay = new Date();
  let endOfDay = new Date();

  if (month && year) {
    startOfDay = new Date(year, month - 1, 1, 0, 0, 0);
    endOfDay = new Date(year, month, 0, 23, 59, 59);
  } else {
    return res.status(400).json(buildErrorResponse("Missing year or month"));
  }

  try {
    const examples = await ExampleModel.find({
      FECHA: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.status(200).json(buildReponse("Registros encontrados", examples));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const getExampleByYear = async (req, res) => {
  const { year } = req.params;

  let startOfDay = new Date();
  let endOfDay = new Date();

  if (year) {
    startOfDay = new Date(year, 0, 1, 0, 0, 0);
    endOfDay = new Date(year, 11, 31, 23, 59, 59);
  } else {
    return res.status(400).json(buildErrorResponse("Missing year"));
  }

  try {
    const examples = await ExampleModel.find({
      FECHA: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.status(200).json(buildReponse("Registros encontrados", examples));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

const addOrEditValidations = (req, res) => {
  const {
    CANAL,
    FECHA,
    PROVIENE,
    MARCA,
    MODELO,
    ANIO,
    VALOR_FAC,
    VALOR_REPUESTOS,
    VALOR_M_O,
    SERVICIO,
    TELEFONO,
  } = req.body;

  if (
    !CANAL ||
    !FECHA ||
    !PROVIENE ||
    !MARCA ||
    !MODELO ||
    !ANIO ||
    VALOR_FAC === undefined ||
    VALOR_REPUESTOS === undefined ||
    VALOR_M_O === undefined ||
    !SERVICIO ||
    !TELEFONO
  ) {
    return res.status(400).json(buildErrorResponse("Revise los campos"));
  }

  if (VALOR_FAC <= 0 || VALOR_REPUESTOS < 0 || VALOR_M_O < 0) {
    return res
      .status(400)
      .json(buildErrorResponse("Los montos deben ser válidos"));
  }

  if (ANIO < 1900 || ANIO > new Date().getFullYear()) {
    return res
      .status(400)
      .json(buildErrorResponse("El año debe ser válido"));
  }
};

export const addExample = async (req, res) => {
  const {
    CANAL,
    FECHA,
    PROVIENE,
    MARCA,
    MODELO,
    ANIO,
    VALOR_FAC,
    VALOR_REPUESTOS,
    VALOR_M_O,
    SERVICIO,
    TELEFONO,
  } = req.body;

  addOrEditValidations(req, res);

  try {
    const example = new ExampleModel({
      CANAL,
      FECHA,
      PROVIENE,
      MARCA,
      MODELO,
      ANIO,
      VALOR_FAC,
      VALOR_REPUESTOS,
      VALOR_M_O,
      SERVICIO,
      TELEFONO,
    });

    await example.save();

    res.status(201).json(buildReponse("Registro guardado", example));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const editExample = async (req, res) => {
  try {
    const { id } = req.params;

    addOrEditValidations(req, res);

    validateObjectId(id);

    const exampleToEdit = req.body;

    const updated = await ExampleModel.findByIdAndUpdate(id, exampleToEdit, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json(buildErrorResponse("Registro no encontrado"));
    }

    res.status(200).json(buildReponse("Registro actualizado", updated));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};

export const deleteExample = async (req, res) => {
  try {
    const { id } = req.params;

    validateObjectId(id);

    const deleted = await ExampleModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json(buildErrorResponse("Registro no encontrado"));
    }

    res.status(200).json(buildReponse("Registro eliminado correctamente", id));
  } catch (error) {
    res.status(500).json(buildErrorResponse(error.message));
  }
};
