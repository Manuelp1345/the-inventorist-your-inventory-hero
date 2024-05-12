"use client";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tab from "@mui/material/Tab";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import TableProduct from "@/modules/inventory/Table";
import ModuleProducts from "@/modules/inventory/ModulesProducts";
import SyncIcon from "@mui/icons-material/Sync";
import axios from "axios";
import { useRouter } from "next/navigation";
import ModalProduct from "./ModalProduct";
import { Product } from "@/app/utils/types";

const ContainerInventory = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState({} as Product);
  const [deleteProduct, setDeleteProduct] = useState(false);
  // get user pc or mobile

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    if (mobile) {
      setValue(1);
    }
  }, []);

  const getProduct = async () => {
    setProduct([]);
    setLoading(true);

    let response;
    try {
      response = await axios.get("/api/inventory/product", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      setProduct([]);
      if (error.response?.status === 401) {
        return router.push("/");
      }

      return setLoading(false);
    }

    if (response.status === 200) {
      setProduct(response.data);
    }
    setLoading(false);
    return response;
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (open === false) {
      setEditProduct({} as Product);
      setDeleteProduct(false);
    }
  }, [open]);

  useEffect(() => {
    getProduct();
  }, [value]);

  useEffect(() => {
    Object.keys(editProduct).length > 0 && setOpen(true);
  }, [editProduct]);

  return (
    <>
      <Box className="w-full flex justify-end">
        <Tabs
          className="[&>div>span]:bg-color3"
          value={value}
          onChange={handleChange}
        >
          <Tab
            className="hidden md:block "
            icon={<ViewListIcon className="text-color3" />}
            aria-label="table"
          />
          <Tab
            icon={<ViewModuleIcon className="text-color3" />}
            aria-label="Module"
          />
        </Tabs>
      </Box>
      <Box
        className="flex flex-col  items-center flex-wrap bg-color1 p-[20px] max-w-[1225px] "
        sx={{ width: "100%", height: value === 0 ? "80vh" : "100%" }}
      >
        <Box className="w-full flex justify-between md:flex-row flex-col  mb-[10px] bg-color1">
          <Typography variant="h5" className="text-white">
            Products
          </Typography>

          <Box className="flex flex-row gap-[15px]">
            <Tooltip title="synchronize" placement="right">
              <Button onClick={getProduct} className="bg-color3 text-white">
                <SyncIcon />
              </Button>
            </Tooltip>
            <Button
              onClick={handleOpen}
              className="normal-case bg-color3 text-white flex justify-center items-center gap-1"
            >
              Add Product <AddCircleOutlineIcon />
            </Button>
          </Box>
        </Box>
        {value === 0 && (
          <TableProduct
            getProduct={getProduct}
            product={product}
            loading={loading}
            setEditProduct={setEditProduct}
            setDeleteProduct={setDeleteProduct}
          />
        )}
        {value === 1 && (
          <ModuleProducts
            getProduct={getProduct}
            product={product}
            loading={loading}
            setEditProduct={setEditProduct}
            setDeleteProduct={setDeleteProduct}
          />
        )}
      </Box>
      <ModalProduct
        open={open}
        setOpen={setOpen}
        product={editProduct}
        getProduct={getProduct}
        updateProduct={Object.keys(editProduct).length > 0}
        deleteProduct={deleteProduct}
      />
    </>
  );
};

export default ContainerInventory;
