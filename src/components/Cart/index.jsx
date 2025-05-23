import { useEffect, useState } from "react"
import CartFooter from "../CartFooter"
import CartHeader from "../CartHeader"
import Product from "../Product"
import data from "./../../data"

const Cart = () => {
    const [cart, setCart] = useState(data);
    const [total, setTotal] = useState({
        price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0),
        count: cart.reduce((prev, curr) => prev + curr.count, 0),
    });

    useEffect(() => {
        setTotal({
            price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0),
            count: cart.reduce((prev, curr) => prev + curr.count, 0),
        })
    }, [cart])

    const deleteProduct = (id) => {
        setCart((cart) =>
            cart.filter((product) => id !== product.id
            ));
    }

    const increase = (id) => {
        setCart((cart) =>
            cart.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        count: ++product.count,
                        priceTotal: product.count * product.price,
                    };
                }
                return product

            }))
    }

    const decrease = (id) => {
        setCart((cart) =>
            cart.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        count: (product.count === 1) ? product.count : --product.count,
                        priceTotal: product.count * product.price,
                    };
                }
                return product

            }))
    }

    const changeValue = (id, value) => {
        setCart((cart) =>
            cart.map((product) => {
                value = Math.max(1, value)
                if (product.id === id) {
                    return {
                        ...product,
                        count: value,
                        priceTotal: value * product.price,
                    };
                }
                return product

            }))
    }

    const products = cart.map((product) => {
        return <Product
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            increase={increase}
            decrease={decrease}
            changeValue={changeValue}
        />;
    })
    return (
        <section className="cart">
            <CartHeader />
            {products}
            <CartFooter total={total} />
        </section>
    )
}

export default Cart