const BASE_URL = "http://localhost:5000";

export const addProductApi = async (data) => {
  const response = await fetch(
    `${BASE_URL}/add-product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const getProductsApi = async () => {
  const response = await fetch(
    `${BASE_URL}/products`
  );

  return response.json();
};

export const deleteProductApi = async (id) => {
  const response = await fetch(
    `${BASE_URL}/delete-product/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};