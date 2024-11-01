const userController = require("../controllers/userController");
const { protectOnlyAdmin, protectOwnerAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = require("express").Router();

// protectOnlyAdmin, authorize("ADMIN"),
//ADD new user
router.post(
    "/",
    (req, res, next) => {
        req.entityType = "user"; 
        next();
    },
    upload.single("avatar"),
    userController.addUser
);

//GET ALL UserS
router.get("/", userController.getAllUsers);

//GET AN User
router.get("/:id", userController.getAnUser);

//UPDATE AN User
router.put(
    "/:id",
    (req, res, next) => {
        req.entityType = "user"; 
        next();
    },
    upload.single("avatar"),
    userController.updateUser
);
//DELETE User
router.delete("/:id", userController.deleteUser);

// POST LOGIN
router.post("/login", userController.postLogin);
// POST Signup
router.post(
    "/signup",
    (req, res, next) => {
        req.entityType = "user"; 
        next();
    },
    upload.single("avatar"),
    userController.postSignUp
);

module.exports = router;
