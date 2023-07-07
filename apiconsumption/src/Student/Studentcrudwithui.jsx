import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Studentcrudwithui = () => {
    const [products, setproducts] = useState([])
    const basepath = "https://localhost:7271/"

    const fetchproducts = async () => {
        try {
            const response = await axios.get(basepath + 'api/Products')
            setproducts(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }



    const createstudent = async () => {
        try {
            const response = await axios.post(basepath + 'api/Products', newstudent)
            setproducts(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const updateproducts = async (id) => {
        try {
            const response = await axios.put(basepath + `api/Products/${id}`, updateproduct)

            const upd = products.map((produc) => {
                if (produc.productId === id) {
                    return response.data
                }
                return products
            });
            setproducts(upd);
            // await axios.put(basepath + `/api/Products/${id}`, updateproduct)
            // fetchproducts();
        }
        catch (error) {
            console.error(error)
        }
    }


    const deleteproducts = async (id) => {
        try {
            await axios.delete(basepath + `api/Products/${id}`, deleteproduct)
            fetchproducts()
        }
        catch (error) {
            console.error(error)
        }
    }





    useEffect(() => {
        fetchproducts()
    },
        [products]
    );

    const updateproduct = {
        productName: "abcdrfg",
        productPrice: 789800,
        productQuantity: 5232,
        productType: "pantsss",
        sex: "boomale",
        productBrand: "ouieuri"
    }


    const deleteproduct = {

    }

    const newstudent = {
        productId: "",
        productName: "",
        productPrice: "",
        productQuantity: "",
        productType: "",
        sex: "",
        productBrand: ""
    }

    return (
        <div>


            <h1>Products Operations</h1>
            <button onClick={createstudent}>Create Product</button>

            <ul>
                {products.map((product) => (
                    <>

                        <li key={product.productId}></li>
                        <span>Product ID : {product.productId}</span><br></br>
                        <span>Product Name : {product.productName}</span><br></br>
                        <span>Product Price : {product.productPrice}</span><br></br>
                        <span>Product Quantity : {product.productQuantity}</span><br></br>
                        <span>Product Type : {product.productType}</span><br></br>
                        <span>Sex : {product.sex}</span><br></br>
                        <span>Product Brand : {product.productBrand}</span><br></br>

                    </>

                ))}
            </ul>


        </div>
    )
}

export default Studentcrudwithui
