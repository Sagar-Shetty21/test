const { default: axios } = require("axios");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;

        const response = await axios.get(
            `https://reqres.in/api/users?per_page=5&page=${currentPage}`
        );

        res.json({ data: response.data });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(8080, () => {
    console.log(`Example app listening on port ${8080}`);
});
