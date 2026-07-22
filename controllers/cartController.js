import db from "../db.js";

// Add Product to Cart
export const addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const sql = `INSERT INTO cart(user_id, product_id, quantity) VALUES(?,?,?) `;

    db.query(sql, [user_id, product_id, quantity], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.status(201).json({
            message: "Product added to cart"
        });
    });
};

export const getCart = (req, res) => {
    const { user_id } = req.params;
    const sql = `
        SELECT
            cart.id,
            products.name,
            products.price,
            products.image,
            cart.quantity,
            (products.price * cart.quantity) AS total
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.json(result);
    });
};

export const removeCartItem = (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM cart WHERE id=?",
        [id],
        (err) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Item removed"
            });
        }
    );
};

export const updateQuantity = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    db.query(
        "UPDATE cart SET quantity=? WHERE id=?",
        [quantity, id],
        (err) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Quantity Updated"
            });
        }
    );

};