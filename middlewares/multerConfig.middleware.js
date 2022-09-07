import multer from "multer";

export class Multer {
  constructor() {
    this.setMimeType();
  }

  setMimeType() {
    this.MIME_TYPES = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
    };
  }

  static setMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "images");
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(".")[0].split(" ").join("_");
        const extension = this.MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
      },
    });

    const fileFilter = (req, file, callback) => {
      const extension = this.MIME_TYPES[file.mimetype];
      if (extension === "jpg" || extension === "png") {
        callback(null, true);
      } else {
        callback("Error : Wrong file type", false);
      }
    };
    return multer({
      storage: storage,
      limits: 4000000,
      fileFilter,
    }).single("image"); // limit : 4 Mo.
  }
}
