import Cart from "./cart";
export const metadata = {
    title: "Choowy|Cart",
    description:
        "Our calculator will help you work out the cost of your child's pre-primary, primary, secondary and tertiary education. You will also get a comprehensive report.",
    alternates: {
        canonical: `https://choowy.co.za/cart/`,
    },
};

const CartPage = () => {
    return <Cart />;
};

export default CartPage;
