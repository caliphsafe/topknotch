import {mkdir,cp,readFile,writeFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});await cp('src','dist',{recursive:true});
const pages={index:['Home','Explore tees, layers and shorts from Top Knotch Boxing, the apparel brand by David Mahmoud.'],shop:['Shop','Explore the Top Knotch Boxing concept collection. Apparel with a fighting heritage.'],about:['About','From Abdul Jaami Mahmoud to David Mahmoud: the family, the fighter and the story behind Top Knotch Boxing.'],contact:['Contact','Get in touch with Top Knotch Boxing for product questions, partnerships and more.']};
const template=await readFile('src/template.html','utf8');
for(const [page,[title,description]] of Object.entries(pages)) await writeFile(`dist/${page}.html`,template.replaceAll('{{TITLE}}',`${title} — Top Knotch Boxing`).replaceAll('{{DESCRIPTION}}',description).replace('{{PAGE}}',page));
await writeFile('dist/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found — Top Knotch Boxing</title><body style="background:#151515;color:#f4efe6;font:20px Arial;padding:10vw"><h1>Wrong corner.</h1><p>This page isn’t in the lineup.</p><a href="/" style="color:#ff594e">Back to Top Knotch Boxing</a></body></html>');
console.log('Built four pages, assets, and 404 into dist.');
