import { CSSProperties, useState } from "react";

import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
interface DropZoneProps {
  onFileSelected: (file: File) => void;
}
const DropZone: React.FC<DropZoneProps> = ({ onFileSelected }) => {
  const [, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nameFile, setNameFile] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const currentFile = acceptedFiles[0];
    if (currentFile.size > 1 * 1024 * 1024) {
      // Más de 1MB
      setError("El archivo es demasiado grande. Debe ser menor a 1MB.");
      return;
    }

    setFile(currentFile);
    setNameFile(currentFile.name);
    setError(null);
    onFileSelected(currentFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    onDropRejected: () => {
      setError("Tipo de archivo no válido o el tamaño excede el límite.");
    },
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });
  return (
    <div className="alc al-c " {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <UploadFileIcon
        sx={{ color: "blue" }}
        style={{ marginRight: "20px", color: "red" }}
      />
      <p style={{ marginRight: "30px" }}>Subir o arrastrar el archivo aquí</p>
      <p>EXCEL, CSV</p>
      {error && <p>{error}</p>}
      {nameFile && <p>{nameFile}</p>}
    </div>
  );
};

const styles: { dropzone: CSSProperties } = {
  dropzone: {
    border: "2px dashed #00BCD4",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "20px",
    width: "420px",
    height: "60px",
  },
};

export default DropZone;
