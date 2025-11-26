import mongoose from "mongoose";

const exmapleSchema = mongoose.Schema(
  {
    CANAL: {
      type: String,
      required: true,
    },
    FECHA: {
      type: Date,
      required: true,
    },
    PROVIENE: {
      type: String,
      required: true,
    },
    MARCA: {
      type: String,
      required: true,
    },
    MODELO: {
      type: String,
      required: true,
    },
    ANIO: {
      type: Number,
      required: true,
    },
    VALOR_FAC: {
      type: Number,
      required: true,
    },
    VALOR_REPUESTOS: {
      type: Number,
      required: true,
    },
    VALOR_M_O: {
      type: Number,
      required: true,
    },
    SERVICIO: {
      type: String,
      required: true,
    },
    TELEFONO: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "marketing",
  }
);

const ExampleModel = mongoose.model("Marketing", exmapleSchema);

export default ExampleModel;
