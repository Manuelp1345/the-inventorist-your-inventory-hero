import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { Product, ProductData } from "@/app/utils/types";

interface TableProducts extends ProductData {
  setEditProduct: React.Dispatch<React.SetStateAction<Product>>;
  setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModuleProducts: React.FC<TableProducts> = ({
  loading,
  product,
  setDeleteProduct,
  setEditProduct,
}) => {
  return (
    <>
      <Box className=" flex flex-row max-w-[1225px] gap-[15px] justify-center items-center flex-wrap  ">
        {!loading &&
          product.map((item: any) => (
            <Card
              key={item.handle}
              className="bg-color1 text-white w-[300px]  border-2 border-color3  "
            >
              <CardContent>
                <Tooltip title={item.title} placement="top">
                  <Typography
                    variant="h5"
                    className="text-color3 text-ellipsis text-nowrap overflow-hidden whitespace-nowrap  "
                  >
                    {item.title}
                  </Typography>
                </Tooltip>
                <Tooltip title={item.handle} placement="top">
                  <Typography
                    variant="body2"
                    className="text-white text-ellipsis text-nowrap overflow-hidden whitespace-nowrap  "
                  >
                    {item.handle}
                  </Typography>
                </Tooltip>
                <Tooltip
                  title={
                    <Box
                      className="text-white"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  }
                  placement="top"
                >
                  <Typography variant="body2" className="text-white">
                    Description:{" "}
                    <VisibilityIcon className="text-[20px] cursor-pointer" />
                  </Typography>
                </Tooltip>

                <Typography variant="body2" className="text-white">
                  SKU: {item.SKU}
                </Typography>
                <Typography variant="body2" className="text-white">
                  Grams: {item.grams}
                </Typography>
                <Typography variant="body2" className="text-white">
                  Stock: {item.stock}
                </Typography>
                <Typography variant="body2" className="text-white">
                  Price: {item.price}
                </Typography>
                <Typography variant="body2" className="text-white">
                  Compare Price: {item.comparePrice}
                </Typography>
                <Typography variant="body2" className="text-white">
                  Barcode: {item.barcode}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  className="bg-color3 text-white"
                  onClick={() => {
                    setEditProduct(item);
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  className="bg-color2 text-white"
                  onClick={() => {
                    setEditProduct(item);
                    setDeleteProduct(true);
                  }}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}

        {loading && (
          <Box className="md:w-[1225px] flex row gap-[15px] justify-center items-center flex-wrap">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />{" "}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />{" "}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />{" "}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />{" "}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={300}
              height={255}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ModuleProducts;
