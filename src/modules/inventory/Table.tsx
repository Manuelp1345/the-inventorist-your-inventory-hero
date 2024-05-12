"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridSlots,
} from "@mui/x-data-grid";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { CustomNoRowsOverlay } from "./CustomNoRow";
import { columns } from "./columns";
import { Product, ProductData } from "@/app/utils/types";

const stylesTable = {
  maxWidth: "1125px",
  bgcolor: "#1E2334",
  color: "#fff",
  "& .MuiDataGrid-columnHeader": {
    color: "#fff",
    bgcolor: "#1E2334",
  },
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#1E2334",
  },
  "& .MuiDataGrid-cell": {
    color: "#fff",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#2E334D",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#411D28",
  },
  "& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell": {
    color: "#fff",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: "#1E2334",
  },
  "& .MuiCheckbox-root": {
    color: "#fff",
  },
  "& .MuiCheckbox-root:hover": {
    backgroundColor: "#ED4C4B",
  },
  "& .MuiCheckbox-root.Mui-checked": {
    color: "#fff",
  },

  "& .MuiTablePagination-displayedRows": {
    color: "#fff",
  },
  "& .MuiTablePagination-actions": {
    color: "#fff",
  },
};
interface TableProducts extends ProductData {
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableProduct: React.FC<TableProducts> = ({
  getProduct,
  product,
  loading,
  setEditProduct,
  setDeleteProduct,
}) => {
  const [rowsCheck, setRows] = React.useState<GridRowSelectionModel>([]);

  return (
    <>
      <DataGrid
        sx={stylesTable}
        rows={product}
        columns={columns({
          setEditProduct,
          setDeleteProduct,
        })}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
        pageSizeOptions={[10]}
        slots={{
          loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        disableRowSelectionOnClick
        loading={loading}
        onRowSelectionModelChange={(params) => {
          setRows(params);
        }}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </>
  );
};

export default TableProduct;
