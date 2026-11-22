// package.json-Version in material.html und material.js eintragen (wie bei anderen vis-Widget-Adaptern).
// Wird vor dem Release ausgeführt, damit Widget und NPM-Version zusammenpassen.

const fs = require('node:fs');
const pack = require('./package.json');

const htmlPath = `${__dirname}/widgets/material.html`;
const html = fs.readFileSync(htmlPath, 'utf8');
const newHtml = html.replace(/version: "\d+\.\d+\.\d+"/, `version: "${pack.version}"`);
if (html !== newHtml) {
    fs.writeFileSync(htmlPath, newHtml);
    console.log('material.html updated');
}

const jsPath = `${__dirname}/widgets/material/js/material.js`;
const js = fs.readFileSync(jsPath, 'utf8');
// /g: Header-Kommentar und vis.binds.material.version müssen gleich package.json sein
const newJs = js
    .replace(/version: "\d+\.\d+\.\d+"/g, `version: "${pack.version}"`)
    .replace(/version: '\d+\.\d+\.\d+'/g, `version: '${pack.version}'`);
if (js !== newJs) {
    fs.writeFileSync(jsPath, newJs);
    console.log('material.js updated');
}
