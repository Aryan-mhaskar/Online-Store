import db from "../db.js";

export const checkout = (req, res) => {

    const { user_id } = req.body;
    const cartQuery = `
        SELECT
            cart.product_id,
            cart.quantity,
            products.price
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(cartQuery, [user_id], (err, cartItems) => {
        if (err)
            return res.status(500).json(err);
        if (cartItems.length === 0)
            return res.status(400).json({
                message: "Cart is empty"
            });
        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        db.query(
            "INSERT INTO orders(user_id,total_amount) VALUES(?,?)",
            [user_id, total],
            (err, orderResult) => {
                if (err)
                    return res.status(500).json(err);
                const orderId = orderResult.insertId;
                const values = cartItems.map(item => [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]);

                db.query(
                    "INSERT INTO order_items(order_id,product_id,quantity,price) VALUES ?",
                    [values],
                    (err) => {
                        if (err)
                            return res.status(500).json(err);
                        db.query(
                            "DELETE FROM cart WHERE user_id=?",
                            [user_id],
                            (err) => {
                                if (err)
                                    return res.status(500).json(err);
                                res.json({
                                    message: "Order Placed Successfully",
                                    orderId
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};

export const getOrders = (req, res) => {
    const { user_id } = req.params;
    const sql = `
        SELECT *
        FROM orders
        WHERE user_id=?
        ORDER BY order_date DESC
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.json(result);
    });
};