import db from "../db.js";

// Get all products
export const getProducts = (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if (err)
            return res.status(500).json(err);
        res.status(200).json(result);
    });
};

export const getProductById = (req, res) => {
    const { id } = req.params;
    db.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err, result) => {
            if (err)
                return res.status(500).json(err);
            if (result.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.json(result[0]);
        }
    );
};

export const searchProducts = (req, res) => {
    const { search } = req.query;
    db.query(
        "SELECT * FROM products WHERE name LIKE ?",
        [`%${search}%`],
        (err, result) => {
            if (err)
                return res.status(500).json(err);
            res.json(result);
        }
    );
};

export const categoryProducts = (req, res) => {
    const { category } = req.params;
    db.query(
        "SELECT * FROM products WHERE category=?",
        [category],
        (err, result) => {
            if (err)
                return res.status(500).json(err);
            res.json(result);
        }
    );
};

