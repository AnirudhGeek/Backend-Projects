const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/book-controller");

//create expres router
const router = express.Router();

//all the routes that are related to books only

//geting all the books
router.get("/get", getAllBooks);

//getting by id
router.get("/get/:id", getSingleBookById);

//add a new book
router.post("/add", addNewBook);

//update based on id
router.put("/update/:id", updateBook);

//deleting book based in id
router.delete("/delete/:id", deleteBook);

module.exports = router;
