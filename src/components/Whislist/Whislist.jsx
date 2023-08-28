import React, { useEffect, useState } from "react";
import styled from "./Whislist.module.css"
import { Product } from "../Product/Product"
import { useNavigate } from "react-router-dom";

export const WhisList = () => {
    const navigate = useNavigate()
    const [cantWhisList, setCantWhisList] = useState(true);
    const whisList = JSON.parse(localStorage.getItem("whislist")) || [];


    useEffect(() => {
        // const whisList = JSON.parse(localStorage.getItem("whislist")) || [];
        const cant = whisList.length
        if (cant > 0) { setCantWhisList(true) }
        else { setCantWhisList(false) }
    }, [whisList])

    // console.log(whisList);
    // navigate('/whislist')
    return (
        <main className={styled.containeWhislist}>
            {
                cantWhisList === true ?
                    <section className={styled.prodsGrid}>
                        {whisList.map((product) =>
                            product.active === true && (
                                <Product
                                    key={product.id}
                                    active={product.active}
                                    id={product.id}
                                    name={product.name}
                                    rating={product.rating}
                                    description={product.description}
                                    price={product.price}
                                    image={product.image}
                                />
                            )
                        )}
                    </section>
                    : <div className={styled.noFavsCont}>
                        <h2>You didn't add any favorites to your list!</h2>
                    </div>
            }
        </main >
    )
}