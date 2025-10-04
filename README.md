# Swimming-Traffic

🧾 Como gerar um .exe com Electron Packager

1. Instalar dependências

bash
npm install
2. Instalar Electron Packager

bash
npm install --save-dev electron-packager
3. Editar o package.json

Adicione o script "pack" dentro de "scripts":

json
"scripts": {
  "start": "electron .",
  "pack": "electron-packager . swimming-traffic --platform=win32 --arch=x64 --out=dist --overwrite"
}
Certifique-se de que "main" aponta para o arquivo principal, como "play.js".

4. Empacotar o app

bash
npm run pack
5. Local do .exe gerado

Código
dist/swimming-traffic-win32-x64/swimming-traffic.exe
6. Para não refazer tudo

Não apague a pasta dist

Se quiser atualizar o app, altere os arquivos e rode npm run pack novamente
====== 60 segundos ======
golf gti 180kmh
bm4 240kmh
supra 350kmh
gt-r 430kmh
ferrari 800kmh
