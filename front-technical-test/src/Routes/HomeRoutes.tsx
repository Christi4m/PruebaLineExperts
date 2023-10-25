// HomeRoutes.tsx
import { Routes, Route } from "react-router-dom";
import UploadInfo from "../views/Upload-Info/Upload-Info";
import ListInfo from "../views/List-Info/List-Info";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="upload" element={<UploadInfo />} />
      <Route path="list" element={<ListInfo />} />
      <Route path="*" element={<UploadInfo />} />
    </Routes>
  );
};

export default HomeRoutes;
