"use client";

import React, { useEffect, useState } from "react";
import axios from "../../../../utilis/axios";
import Spinner from "@/app/components/loader";

const Product = (params) => {
  const Id = params.params.id;
  const [productDetail, setproductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(params.params.id);
  useEffect(async () => {
    const response = await axios.get(`/get-product/${Id}`);
    let Data = response.data;
    setproductDetail(Data);
    console.log(response.data);
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <b>Product Details</b>
          <br /> ID : {params.params.id}
          <div>
            Name : {productDetail.name}
            <br />
            Category : {productDetail.category}
          </div>
          Price : {productDetail.price}
          <img src={productDetail.imageUrl}className="w-46 h-96"/>
        </div>
      )}
    </div>
  );
};

export default Product;
