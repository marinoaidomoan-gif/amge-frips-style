// TODO : vérifier le JWT (header Authorization ou cookie httpOnly),
// attacher req.user si valide, sinon 401.
export default function authMiddleware(req, res, next) {
  next();
}