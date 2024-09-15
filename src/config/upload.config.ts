import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'src/assets/');
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    },
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter(req, file, callback) {
        const fileType = /jpeg|jpg|png|gif/;
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileType.test(file.mimetype)

        if (mimeType && extname) {
            return callback(null, true)
        } else {
            callback(new Error("only images ar allowed"))
        }
    },
})

export default upload;