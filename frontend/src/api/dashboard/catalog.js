import { executeGet, executePost } from "./axiosConfig";

const URL = "/v1/catalogs";

export const apiLoadCatalogs = async () => {
  return executeGet(`${URL}`);
};

export const apiLoadSpentsCatalog = async () => {
    return executeGet(`${URL}`, "spents");
  };

export const apiAddCatalog = async (name, items) => {
  return executePost(`${URL}/`, { name, items});
};

export const apiAddCatalogType = async (name, items) => {
    return executePost(`${URL}/${name}`, { name, items});
  };
  