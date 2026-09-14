// TODO : logique CRUD complète

export const getAllProducts = async (req, res) => {
  res.json([]);
};

export const getProductById = async (req, res) => {
  res.json(null);
};

export const createProduct = async (req, res) => {
  res.status(201).json(null);
};

export const updateProduct = async (req, res) => {
  res.json(null);
};

export const deleteProduct = async (req, res) => {
  res.status(204).send();
};