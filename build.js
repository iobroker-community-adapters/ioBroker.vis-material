// Sync package.json version into widget HTML/JS (same pattern as other vis-widget adapters).

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
const newJs = js
    .replace(/version: "\d+\.\d+\.\d+"/g, `version: "${pack.version}"`)
    .replace(/version: '\d+\.\d+\.\d+'/g, `version: '${pack.version}'`);
if (js !== newJs) {
    fs.writeFileSync(jsPath, newJs);
    console.log('material.js updated');
}
