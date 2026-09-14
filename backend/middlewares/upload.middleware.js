import multer from 'multer';

// TODO : stockage dans /uploads, filtre JPEG/PNG, limite 5MB.
const upload = multer({ dest: 'uploads/' });

export default upload;