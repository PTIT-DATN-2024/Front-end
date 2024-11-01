const { Product, Category, BgImage } = require("../model/model");
const path = require("path");
const fs = require("fs");
const bgImageController = {
    //ADD BgImage
    addBgImage: async (req, res) => {
        try {
            const { name } = req.body;
            const img = req.file ? req.file.path : null;
            const newBgImage = new BgImage({
                name,
                img,
            });
            const saveBgImage = await newBgImage.save();
            res.status(200).json({ EC: 0, MS: "Add BgImage success!", saveBgImage });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Add BgImage error!", err });
        }
    },
    //GET ALL BgImage
    getAllBgImages: async (req, res) => {
        try {
            const bgImages = await BgImage.find();
            const bgImagesWithImages = bgImages.map((bgImage) => ({
                _id: bgImage._id,
                name: bgImage.name,
                img: bgImage.img ? `/v1/uploads/bgImages/${bgImage.img.replace("uploads\\bgImages\\", "")}` : null,
            }));
            res.status(200).json({ EC: 0, MS: "Get all bgImages success!", bgImages: bgImagesWithImages });
        } catch (err) {
            res.status(500).json({ EC: 1, MS: "Get all bgImages failed!", err });
        }
    },
    //GET AN BgImage
    getAnBgImage: async (req, res) => {
        try {
            const bgImage = await BgImage.findById(req.params.id);
            if (!bgImage) {
                return res.status(404).json({ EC: 1, MS: "bgImage not found" });
            }
            const bgImageData = {
                _id: bgImage._id,
                name: bgImage.name,
                img: bgImage.img ? `/v1/uploads/bgImages/${bgImage.img.replace("uploads\\bgImages\\", "")}` : null,
            };
            res.status(200).json({ EC: 0, MS: "Get a bgImage success!", bgImage: bgImageData });
        } catch (err) {
            res.status(500).json({ EC: 2, MS: "Get a bgImage error!", err });
        }
    },

    updateBgImage: async (req, res) => {
        try {
            const bgImage = await BgImage.findById(req.params.id);
            if (!bgImage) {
                return res.status(404).json({ EC: 1, MS: "bgImage not found" });
            }
            if (req.file) {
                if (bgImage.img) {
                    const imagePath = path.join(__dirname, "..", bgImage.img);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                bgImage.img = req.file.path;
            }

            bgImage.name = req.body.name || bgImage.name;

            await bgImage.save();

            res.status(200).json({ EC: 0, MS: "Update success!" });
        } catch (err) {
            console.error("Update bgImage error:", err);
            res.status(500).json({ EC: 1, MS: "Update error!", err });


            
        }
    },

    deleteBgImage: async (req, res) => {
        try {
            const bgImage = await BgImage.findById(req.params.id);
            if (!bgImage) {
                return res.status(404).json({ EC: 2, MS: "bgImage not found" });
            }
            if (bgImage.img) {
                let imagePath = path.join(__dirname, "..", bgImage.img);
                imagePath = path.normalize(imagePath);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.log(`File ${imagePath} not found`);
                }
            }
            await BgImage.findByIdAndDelete(req.params.id);

            res.status(200).json({ EC: 0, MS: "Delete success!" });
        } catch (err) {
            console.error("Delete bgImage error:", err);
            res.status(500).json({ EC: 3, MS: "Delete error!", err });
        }
    },
};

module.exports = bgImageController;
