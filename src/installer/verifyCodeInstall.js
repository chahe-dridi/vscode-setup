const fs = require('fs').promises;
const path = require('path');

/**
 * Verifica si un archivo existe en la ruta proporcionada.
 * @param {string} filePath - La ruta del archivo a verificar.
 * @returns {Promise<boolean>} - Resuelve con true si el archivo existe, false de lo contrario.
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Verifica las instrucciones de instalación del código en Windows.
 * @param {string} installationPath - La ruta donde se espera que esté instalado el código.
 * @returns {Promise<void>}
 */
async function verifyCodeInstall(installationPath) {
  if (!installationPath || typeof installationPath !== 'string') {
    throw new Error('La ruta de instalación debe ser una cadena no vacía.');
  }

  const fullPath = path.resolve(__dirname, installationPath);

  try {
    const exists = await fileExists(fullPath);
    if (exists) {
      console.log(`El código está instalado en la ruta: ${fullPath}`);
    } else {
      console.error(`El código no está instalado en la ruta: ${fullPath}`);
    }
  } catch (error) {
    console.error('Error al verificar la instalación del código:', error);
  }
}

module.exports = { verifyCodeInstall };