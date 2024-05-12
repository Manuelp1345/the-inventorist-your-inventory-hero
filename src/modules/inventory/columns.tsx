import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Product } from "@/app/utils/types";

interface Columns {
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

export const columns = ({
  setEditProduct,
  setDeleteProduct,
}: Columns): GridColDef<Product>[] => {
  return [
    {
      field: "id",
      headerName: "ID",

      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "handle",
      headerName: "Handle",
      width: 130,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 130,

      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <Tooltip
            title={
              <Box
                className="text-white"
                dangerouslySetInnerHTML={{ __html: params.value }}
              />
            }
            placement="right"
          >
            <VisibilityIcon className="text-[20px] cursor-pointer" />
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "SKU",
      headerName: "SKU",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "grams",
      headerName: "Grams",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "comparePrice",
      headerName: "Compare Price",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "barcode",
      headerName: "Barcode",
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      pinnable: true,
      headerName: "Actions",
      type: "actions",
      getActions: (e: any) => [
        <GridActionsCellItem
          key="Edit"
          icon={<EditIcon className="text-white" />}
          label="Edit"
          onClick={() => setEditProduct(e.row as Product)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon className="text-white" />}
          label="Delete"
          onClick={() => {
            setEditProduct(e.row as Product);
            setDeleteProduct(true);
          }}
        />,
      ],
    },
  ];
};
