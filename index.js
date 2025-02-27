const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", async (req, res) => {
  const animeName = req.body.anime;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${animeName}&limit=5`
    );
    res.render("result", { animeList: response.data.data });
  } catch (error) {
    res.send("Error fetching anime data!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
