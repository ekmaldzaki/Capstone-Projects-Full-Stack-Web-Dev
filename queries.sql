
---database name---
book-storage

---creating the table---
CREATE TABLE booklist(
	id SERIAL PRIMARY KEY,
	book_name VARCHAR(200),
	book_review TEXT,
	review_score INT
)