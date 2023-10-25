/* eslint-disable @typescript-eslint/no-explicit-any */
import "./List-Info.scss";
import { useEffect, useState } from "react";
import { Button, Pagination } from "@mui/material";
import fileService from "../../services/File.service";
import { Invoice } from "../../interface/Invoice.interface";

const ListInfo: React.FC = () => {
  const [page, setPage] = useState(1);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const fetchInvoices = async () => {
    try {
      const data = await fileService.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };
  useEffect(() => {
    fetchInvoices();
  }, []);

  const columns: {
    field: keyof Invoice;
    headerName: string;
    width?: number;
    type?: string;
  }[] = [
    { field: "invoiceCode", headerName: "Codigo" },
    { field: "fullName", headerName: "Nombre y Apellidos" },
    { field: "address", headerName: "Dirección" },
    {
      field: "amountDue",
      headerName: "Valor a Pagar",
      type: "number",
    },
    {
      field: "dueDate",
      headerName: "Fecha de Vencimiento",
    },
    {
      field: "promptPaymentDate",
      headerName: "Fecha de Pago",
    },
    { field: "state", headerName: "Estado" },
  ];

  const rowsPerPage = 5;
  const totalPages = Math.ceil(invoices.length / rowsPerPage);
  const displayRows = invoices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (row: any, isChecked: any) => {
    setSelectedRows((prevSelectedRows: any) => {
      if (isChecked) {
        return [...prevSelectedRows, row];
      } else {
        return prevSelectedRows.filter(
          (selectedRow: any) => selectedRow.id !== row.id
        );
      }
    });
  };
  useEffect(() => {
    if (selectedRows.length > 0) {
      console.log(selectedRows);
    }
  }, [selectedRows]);

  const recjectFunction = async () => {
    try {
      console.log(selectedRows);
      await fileService.sendArrayToBackend(selectedRows);
      setSelectedRows([]);
      fetchInvoices();
    } catch (error) {
      console.error("Error reject invoices:", error);
    }
  };

  return (
    <div className="alc al-c">
      <div className="alc al-c" style={{ width: "100%" }}>
        <div style={{ marginBottom: "16px", width: "100%" }}>
          <div className="button-recjected alc al-r">
            <Button
              onClick={recjectFunction}
              disabled={selectedRows.length == 0}
              variant="contained"
              style={{ textTransform: "none" }}
            >
              Rechazar
            </Button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row: Invoice) => (
              <tr key={row.invoiceCode}>
                {columns.map(
                  (column: { field: keyof Invoice; headerName: string }) => (
                    <td
                      key={column.field}
                      className={
                        column.field === "fullName" ? "bold-black" : ""
                      }
                    >
                      {column.field === "invoiceCode" ? (
                        <div>
                          <input
                            className="check"
                            type="checkbox"
                            disabled={row.state != "Pendiente"}
                            onChange={(e) =>
                              handleCheckboxChange(row.id, e.target.checked)
                            }
                          />
                          {row[column.field]}
                        </div>
                      ) : column.field === "state" ? (
                        <div
                          className="alc al-l"
                          style={{
                            borderRadius: "12px",
                            border: "1px solid gray",
                            padding: "5px",
                            fontWeight: "Bolder",
                            color: "var(--color-text)",
                          }}
                        >
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor:
                                row.state === "Pendiente"
                                  ? "yellow"
                                  : row.state === "Progreso"
                                  ? "#00b5e2"
                                  : row.state === "Pagado"
                                  ? "green"
                                  : "red",
                              marginRight: "5px",
                            }}
                          ></div>
                          {row.state}
                        </div>
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_event, value) => {
            setPage(value);
          }}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default ListInfo;
