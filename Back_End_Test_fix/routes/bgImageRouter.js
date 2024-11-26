const bgImageController = require("../controllers/bgImageController");
const upload = require("../middleware/uploadMiddleware");
const router = require("express").Router();

//ADD BgImage
router.post(
    "/",
    (req, res, next) => {
        req.entityType = "bgImage"; 
        next();
    },
    upload.single("img"),
    bgImageController.addBgImage
);

//GET ALL BgImages
router.get("/", bgImageController.getAllBgImages);

//GET AN BgImage
router.get("/:id", bgImageController.getAnBgImage);

//UPDATE AN BgImage
router.put(
    "/:id",
    (req, res, next) => {
        req.entityType = "bgImage"; 
        next();
    },
    upload.single("img"),
    bgImageController.updateBgImage
);

//DELETE BgImage
router.delete("/:id", bgImageController.deleteBgImage);

module.exports = router;
