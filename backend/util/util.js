import mongoose  from 'mongoose';

const setSuccessHeader = (message) => {
  if (message === "" || message === undefined) {
    message = "Datos cargados correctamente";
  }

  const header = {
    code: "200",
    message,
    date: new Date(),
  };

  return header;
};

const setEmptyHeader = () => {
  const header = {
    code: "ERROR_02",
    message: "No se encuentra la informaciónn solicitada",
    date: new Date(),
  };

  return header;
};

const setErrorHeader = (message) => {
  const header = {
    code: "ERROR_01",
    message: message,
    date: new Date(),
  };

  return header;
};

export const buildReponse = (message, data) => {
  const response = {
    header: undefined,
    data: undefined,
  };

  if (data === undefined) {
    response.header = setEmptyHeader();
    response.data = undefined;
  } else {
    response.header = setSuccessHeader(message);
    response.data = data;
  }

  return response;
};

export const buildErrorResponse = (message) => {

  const response = {
    success: false,
    header: setErrorHeader(message),
    data: undefined,
  };

  return response;
};

export const validateObjectId = (id, res) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(404)
      .json(buildErrorResponse("No existen registros con este id"));
  }
};
