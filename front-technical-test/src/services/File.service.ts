import axios from "axios";

const BASE_URL = "http://localhost:8080";

const fileService = {
  uploadFile: async (file: File): Promise<unknown> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BASE_URL}/invoice`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  },

  getInvoices: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/invoice`);
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },
  sendArrayToBackend: async (data: number[]) => {
    try {
      const response = await axios.post(`${BASE_URL}/invoice/reject`, data);
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar el array al backend:", error);
    }
  },
};

export default fileService;
