// Importamos o multer
import multer from "multer";
// Importamos o crypto
import uploadConfig from "@config/upload";
import crypto from "crypto";

// Criamos uma instancia do diskStorage com as configurações de salvamento da imagem
const storage = multer.diskStorage({
  // Função que irá dizer onde a imagem será salva
  destination: (req, file, cb) => {
    cb(null, uploadConfig.path);
  },
  // Função que irá alterar o nome da imagem para um hash
  filename: (req, file, cb) => {
    // Pega a extensão do nome original do arquivo
    const extensionSplit = file.originalname.split(".");
    const extension = extensionSplit[extensionSplit.length - 1];

    // Gera um hash hexadecimal
    const newName = crypto.randomBytes(10).toString("hex");
    // Altera o nome do arquivo
    cb(null, `${newName}.${extension}`);
  },
});
// Inicializamos o multer com as configurações acima
const uploadFile = multer({ storage });
export default uploadFile;
