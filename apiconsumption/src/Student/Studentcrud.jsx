import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Studentcrud = () => {
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
        productId: 100,
        productName: "XYZ",
        productPrice: 1500,
        productQuantity: 5,
        productType: "Shirt",
        sex: "Male",
        productBrand: "Otto"
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



                        {editStudent === student.studId ? (
                            <React.Fragment>
                                <input
                                    type="text"
                                    value={editStudent.studId}
                                    onChange={(e) =>
                                        setEditStudent({ ...editStudent, productId: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={editStudent.name}
                                    onChange={(e) =>
                                        setEditStudent({ ...editStudent, productName: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={editStudent.city}
                                    onChange={(e) =>
                                        setEditStudent({ ...editStudent, productPrice: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Pin"
                                    value={editStudent.}
                                    onChange={(e) =>
                                        setEditStudent({ ...editStudent, pin: e.target.value })
                                    }
                                />
                                <button onClick={() => updateStudent(student.studId)}>
                                    Save
                                </button>{" "}
                                &nbsp; &nbsp; &nbsp;
                                <button onClick={() => setEditStudent(null)}>
                                    Cancel
                                </button>{" "}
                                &nbsp; &nbsp; &nbsp;
                            </React.Fragment>
                        ) : (
                            <button onClick={() => {
                                setEditStudent(student.studId)
                                console.log(editStudent.studId);
                            }}>
                                Edit
                            </button>
                        )}
                        <button onClick={() => deleteStudent(student.studId)}>
                            Delete
                        </button>

                    </>

                ))}
            </ul>


        </div>
    )
}

export default Studentcrud
