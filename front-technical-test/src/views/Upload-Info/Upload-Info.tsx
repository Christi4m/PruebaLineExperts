import { useNavigate } from "react-router-dom";
import { useRouteContext } from "../../contexts/RoutesContext";
import "./Upload-Info.scss";
import DropZone from "../../components/DropZone/DropZone";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import fileService from "../../services/File.service";

const UploadInfo: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentRoute } = useRouteContext();
  const [file, setFile] = useState<File | null>(null);
  const [viewProcess, setViewProcess] = useState<string | null>("upload");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleRedirectToList = () => {
    setCurrentRoute("list");
    navigate("/home/list");
  };
  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };
  const submit = async () => {
    setViewProcess("process");
    setCurrentRoute("process");

    try {
      if (file) {
        await fileService.uploadFile(file).then((res) => {
          if (res) {
            console.log("Respuesta del servidor :", res);
            handleRedirectToList();
          }
        });
      }
    } catch (error) {
      setShowAlert(true);
      setViewProcess("upload");
      console.error("Hubo un error al subir el archivo:", error);
    }
  };
  useEffect(() => {}, [file]);
  return (
    <>
      {showAlert ? (
        <Alert severity="error">Hubo un error al subir el archivo </Alert>
      ) : null}
      <div className="container-dropz">
        <h5>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum es simplemente el texto de relleno de
          las imprentas y archivos .
        </h5>

        {viewProcess === "upload" ? (
          <div>
            <div className="drop">
              <h4 className="LabelDrop">Cargue de facturas</h4>
              <DropZone onFileSelected={handleFileSelected} />
              <h5 className="label-ins">
                El documento debe ser formato csv o excel y un tamaño maximo de
                1MB.
              </h5>
              <div className="btn-continue alc al-c">
                <Button onClick={submit} disabled={!file} variant="contained">
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {viewProcess === "process" ? (
          <div>
            <div className="process alc al-c">
              <div className="img">
                <img src="/src/assets/empty_state.png" alt="img process" />
              </div>

              <div className="text">
                <h3>Estamos preparando la información</h3>
                <h6>Cuando este lista la encontráras aquí</h6>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UploadInfo;
