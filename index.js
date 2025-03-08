import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = 3000;

// PostgreSQL database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "book-storage",
  password: "1234",
  port: 5432,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display book reviews
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM booklist ORDER BY id DESC");
    res.render("index", { reviews: result.rows });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to add a new review
app.post("/add-review", async (req, res) => {
  const { book_name, book_review, review_score } = req.body;
  try {
    await pool.query(
      "INSERT INTO booklist (book_name, book_review, review_score) VALUES ($1, $2, $3)",
      [book_name, book_review, review_score]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a review
app.post("/delete-review", async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("DELETE FROM booklist WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to edit a review
app.post("/edit-review", async (req, res) => {
  const { id, book_name, book_review, review_score } = req.body;

  try {
    await pool.query(
      "UPDATE booklist SET book_name = $2, book_review = $3, review_score = $4 WHERE id = $1",
      [id, book_name, book_review, review_score]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).send("Error updating review");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
