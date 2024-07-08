const userController = require("../controllers/userController");

const router = require("express").Router();

//ADD AUTHOR
router.post("/", userController.addUser);

//GET ALL UserS
router.get("/", userController.getAllUsers);

//GET AN User
router.get("/:id", userController.getAnUser);

//UPDATE AN User
router.put("/:id", userController.updateUser);

//DELETE User
router.delete("/:id", userController.deleteUser);
// POST LOGIN

router.post("/login", userController.postLogin);

module.exports = router;