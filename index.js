import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/submit", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const newPost = {
      title: title,
      content: content,
      time: new Date().toLocaleString(),
    };
    posts.unshift(newPost);
  }
  res.redirect("/");
});

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  const post = posts[id];

  if (!post) {
    return res.redirect("/");
  }

  res.render("post.ejs", { post, id });
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  res.render("edit.ejs", { post: posts[id], id: id });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  posts[id].title = req.body.title;
  posts[id].content = req.body.content;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`URL: http://localhost:${port}/`);
});
