type Invoice = {
  codigoFactura: string;
  nombreApellidos: string;
  direccion: string;
  valorPagar: number;
  fechaVencimiento: string;
  fechaOportunaPago: string;
  estado: string;
};

type FileUploadResponse = {
  data: Invoice[];
};

const mockFileService = {
  uploadFile: async (file: File): Promise<FileUploadResponse> => {
    // Simulamos un tiempo de espera de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Verifica si el archivo que se "envía" es válido (puede agregar más validaciones si lo necesita)
    if (file && file.size > 0) {
      return {
        data: [
          {
            codigoFactura: "INV001",
            nombreApellidos: "John Doe",
            direccion: "123 Main St",
            valorPagar: 100.0,
            fechaVencimiento: "2023-11-01",
            fechaOportunaPago: "2023-10-25",
            estado: "Pendiente",
          },
          {
            codigoFactura: "INV002",
            nombreApellidos: "Jane Smith",
            direccion: "456 Elm St",
            valorPagar: 200.0,
            fechaVencimiento: "2023-11-15",
            fechaOportunaPago: "2023-11-10",
            estado: "Pendiente",
          },
        ],
      };
    } else {
      throw new Error("Archivo inválido");
    }
  },
};

export default mockFileService;
