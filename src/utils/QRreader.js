import qrcodeParser from "qrcode-parser";

async function QRreaderUtils(e, setFilterQR, setFilter, readUserData, setRecetaDBP) {

    const res = await qrcodeParser(e.target.files[0])
    setFilterQR(res);
    console.log(res)
    const data = await readUserData('Receta', res, setRecetaDBP, 'qr')
}

export { QRreaderUtils }