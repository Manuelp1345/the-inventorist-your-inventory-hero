"user client";
import {
  Box,
  Button,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import FormatCSV from "../../app/assets/img/formatcsv.png";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Product } from "@/app/utils/types";
import Papa from "papaparse";

interface ModalProductProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateProduct?: boolean;
  product?: Product;
  deleteProduct?: boolean;
  getProduct: () => Promise<void | AxiosResponse<any, any>>;
}

interface RowData {
  [key: string]: string;
}

interface DataProduct {
  id: string | null;
  handle: string;
  title: string;
  sku: string;
  grams: number | null;
  stock: number | null;
  price: number | null;
  comparePrice: number | null;
  barcode: string;
  description: string;
}

const initialDataError = {
  handle: false,
  title: false,
  sku: false,
  grams: false,
  stock: false,
  price: false,
  comparePrice: false,
  barcode: false,
  description: false,
};

const initialData = {
  id: null,
  handle: "",
  title: "",
  sku: "",
  grams: null,
  stock: null,
  price: null,
  comparePrice: null,
  barcode: "",
  description: "",
};

const ModalProduct: React.FC<ModalProductProps> = ({
  open,
  setOpen,
  updateProduct,
  product,
  deleteProduct,
  getProduct,
}) => {
  const [data, setData] = useState<DataProduct>(initialData);
  const [errors, setErrors] = useState(initialDataError);
  const [tableRows, setTableRows] = useState<string[]>([]);
  const [values, setValues] = useState<(string | number)[][]>([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setData(initialData);
    setErrors(initialDataError);
    setOpen(false);
    setTableRows([]);
    setValues([]);
  };

  const createProduct = async () => {
    setLoading(true);
    // Validate fields
    if (!data.handle) {
      setErrors({ ...errors, handle: true });
      return;
    }
    if (!data.title) {
      setErrors({ ...errors, title: true });
      return;
    }
    if (!data.sku) {
      setErrors({ ...errors, sku: true });
      return;
    }
    if (!data.grams && data.grams !== 0) {
      setErrors({ ...errors, grams: true });
      return;
    }
    if (!data.stock && data.stock !== 0) {
      setErrors({ ...errors, stock: true });
      return;
    }
    if (!data.price && data.price !== 0) {
      setErrors({ ...errors, price: true });
      return;
    }
    if (!data.comparePrice && data.comparePrice !== 0) {
      setErrors({ ...errors, comparePrice: true });
      return;
    }
    if (!data.barcode) {
      setErrors({ ...errors, barcode: true });
      return;
    }

    let method = "POST";
    if (updateProduct) {
      method = "PATCH";
    }
    if (deleteProduct) {
      method = "DELETE";
    }

    let response;
    try {
      response = await axios({
        method: method,
        url: `/api/inventory/product`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoading(false);

        return error.response?.status;
      }
      return;
    }
    await getProduct();
    handleClose();
    setLoading(false);
    return;
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: Papa.ParseResult<RowData>) {
        const rowsArray: string[][] = [];
        const valuesArray: (string | number)[][] = [];

        results.data.forEach((d: { [key: string]: string }) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  const createProductFile = async () => {
    setLoading(true);
    const productsToCreate = [];
    for (let i = 0; i < values.length; i++) {
      productsToCreate.push({
        handle: values[i][0] === "" ? "handle" : values[i][0],
        title: values[i][1] === "" ? "title" : values[i][1],
        description: values[i][2] === "" ? "description" : values[i][2],
        sku: values[i][3] === "" ? "sku" : values[i][3],
        grams: values[i][4] === "" ? "0" : values[i][4],
        stock: values[i][5] === "" ? "0" : values[i][5],
        price: values[i][6] === "" ? "0" : values[i][6],
        comparePrice: values[i][7] === "" ? "0" : values[i][7],
        barcode: values[i][8] === "" ? "0" : values[i][8],
      });
    }

    try {
      await axios({
        method: "POST",
        url: `/api/inventory/products`,
        data: productsToCreate,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoading(false);

        return error.response?.status;
      }
      return;
    }
    await getProduct();
    handleClose();
    setLoading(false);

    return;
  };

  useEffect(() => {
    if (product) {
      setData({
        id: product?.id,
        handle: product?.handle,
        title: product?.title,
        sku: product?.SKU,
        grams: product?.grams,
        stock: product?.stock,
        price: product?.price,
        comparePrice: product?.comparePrice,
        barcode: product?.barcode,
        description: product?.description,
      });
    }
  }, [updateProduct, product]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ${
          tableRows.length === 0 ? "md:w-5/12" : "md:w-11/12"
        } bg-color1 text-white rounded-sm shadow-md p-4`}
      >
        <Box className="flex row justify-between items-center mb-[10px]">
          <h2 id="simple-modal-title">
            {deleteProduct && "Delete "}
            {updateProduct && !deleteProduct && "Update "}
            {!updateProduct && !deleteProduct && "Create "}
            Product
          </h2>
          {!updateProduct && (
            <Box className="flex row justify-between items-center">
              <Button
                className="p-0 rounded-full bg-color3 text-white mr-2 "
                size="small"
                variant="contained"
                component="label"
              >
                <UploadFileIcon />
                <input
                  type="file"
                  hidden
                  accept=".csv"
                  onChange={changeHandler}
                />
              </Button>
              <Tooltip
                className="bg-color1"
                sx={{
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#1E2334",
                    color: "#fff",
                    maxWidth: "none",
                  },
                }}
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: "#1E2334",
                      borderRadius: "5px",
                      border: "1px solid #ED4C4B",
                      color: "#fff",
                      maxWidth: "none",
                    },
                  },
                }}
                title={
                  <Box className="w-[800px]">
                    <Typography variant="h6" className="text-white">
                      Info
                    </Typography>
                    <Typography variant="body2" className="text-white">
                      You can upload a file CSV with the product information.
                      Use the following format: <br />
                      Handle Title Description SKU Grams Stock Price Compare
                      Price Barcode <br />
                      <Image
                        src={FormatCSV}
                        alt="csv"
                        width={800}
                        height={800}
                      />
                    </Typography>
                  </Box>
                }
                placement="bottom"
              >
                <InfoOutlinedIcon className="text-color3" />
              </Tooltip>
            </Box>
          )}
        </Box>

        {tableRows.length === 0 && (
          <>
            <Box className="flex row gap-[10px] justify-between">
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                id="Handle"
                label="Handle"
                variant="outlined"
                className="my-2 w-full  rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.handle}
                onChange={(e) => {
                  setErrors({ ...errors, handle: false });
                  setData({ ...data, handle: e.target.value });
                }}
                error={errors.handle}
                helperText={errors.handle ? "The handle is required" : ""}
              />
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                id="Title"
                label="Title"
                variant="outlined"
                className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.title}
                onChange={(e) => {
                  setErrors({ ...errors, title: false });
                  setData({ ...data, title: e.target.value });
                }}
                error={errors.title}
                helperText={errors.title ? "The title is required" : ""}
              />
            </Box>
            <TextField
              InputProps={{ readOnly: deleteProduct }}
              id="SKU"
              label="SKU"
              variant="outlined"
              className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
              value={data.sku}
              onChange={(e) => {
                setErrors({ ...errors, sku: false });
                setData({ ...data, sku: e.target.value });
              }}
              error={errors.sku}
              helperText={errors.sku ? "The SKU is required" : ""}
            />
            <Box className="flex row gap-[10px] justify-between">
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                type="number"
                id="Grams"
                label="Grams"
                variant="outlined"
                className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.grams}
                onChange={(e) => {
                  if (Number(e.target.value) < 0) return e.preventDefault();
                  setData({ ...data, grams: Number(e.target.value) });
                  setErrors({ ...errors, grams: false });
                }}
                error={errors.grams}
                helperText={errors.grams ? "The grams is required" : ""}
              />
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                type="number"
                id="Stock"
                label="Stock"
                variant="outlined"
                className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.stock}
                onChange={(e) => {
                  if (Number(e.target.value) < 0) return e.preventDefault();
                  setData({ ...data, stock: Number(e.target.value) });
                  setErrors({ ...errors, stock: false });
                }}
                error={errors.stock}
                helperText={errors.stock ? "The stock is required" : ""}
              />
            </Box>
            <Box className="flex row gap-[10px] justify-between">
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                type="number"
                id="Price"
                label="Price"
                variant="outlined"
                className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.price}
                onChange={(e) => {
                  if (Number(e.target.value) < 0) return e.preventDefault();
                  setData({ ...data, price: Number(e.target.value) });
                  setErrors({ ...errors, price: false });
                }}
                error={errors.price}
                helperText={errors.price ? "The price is required" : ""}
              />
              <TextField
                InputProps={{ readOnly: deleteProduct }}
                type="number"
                id="ComparePrice"
                label="Compare Price"
                variant="outlined"
                className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
                value={data.comparePrice}
                onChange={(e) => {
                  if (Number(e.target.value) < 0) return e.preventDefault();
                  setData({ ...data, comparePrice: Number(e.target.value) });
                  setErrors({ ...errors, comparePrice: false });
                }}
                error={errors.comparePrice}
                helperText={
                  errors.comparePrice ? "The compare price is required" : ""
                }
              />
            </Box>
            <TextField
              InputProps={{ readOnly: deleteProduct }}
              id="Barcode"
              label="Barcode"
              variant="outlined"
              className="my-2 w-full rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
              value={data.barcode}
              onChange={(e) => {
                setData({ ...data, barcode: e.target.value });
                setErrors({ ...errors, barcode: false });
              }}
              error={errors.barcode}
              helperText={errors.barcode ? "The barcode is required" : ""}
            />
            <TextareaAutosize
              readOnly={deleteProduct}
              aria-label="minimum height"
              minRows={3}
              placeholder="Description"
              className="w-full bg-transparent text-white p-[8px] rounded-md border-[1px] border-color3"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </>
        )}
        {tableRows.length !== 0 && (
          // Table to show the parsed data
          <>
            <Box className="w-full h-[60vh] overflow-y-scroll">
              <Box className="flex row justify-between items-center gap-[10px]">
                <Typography variant="h6" className="text-white">
                  Data Preview
                </Typography>
              </Box>
              <Box className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {tableRows.map((row, index) => (
                        <th key={index} className="text-white p-2">
                          {row}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {values.map((row, index) => (
                      <tr key={index}>
                        {row.map((value, index) => (
                          <td key={index} className="text-white p-2">
                            {index === 2 ? (
                              <Box
                                className="text-white"
                                dangerouslySetInnerHTML={{ __html: value }}
                              />
                            ) : (
                              <>{value}</>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </>
        )}
        <Box className="flex row justify-end items-center gap-[10px] mt-[10px]">
          <Button
            className="bg-color2"
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            disabled={loading}
            className="bg-color3"
            variant="contained"
            color="primary"
            onClick={tableRows.length === 0 ? createProduct : createProductFile}
          >
            {deleteProduct ? "Delete " : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalProduct;
