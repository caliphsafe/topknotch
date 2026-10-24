import {mkdir,cp,readFile,writeFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});await cp('src','dist',{recursive:true});
const pages={
 index:['Top Knotch Boxing | Boxing Apparel & Training','Explore Top Knotch boxing apparel—tees, hoodies, and shorts inspired by the Top Cat family legacy and David Mahmoud’s 13+ years as a head trainer.'],
 shop:['Boxing Apparel Preview | Top Knotch Boxing','Preview the Top Knotch Boxing concept collection: tees, hoodies, and boxing shorts inspired by a family boxing legacy.'],
 about:['Our Story | Top Knotch Boxing','Meet David Mahmoud and the story behind Top Cat, the AJM logo, and a family legacy carried through boxing training and apparel.'],
 contact:['Contact Top Knotch Boxing | Training & Apparel','Get in touch about training with David, boxing apparel, product questions, or collaborations with Top Knotch Boxing.']
};
const template=await readFile('src/template.html','utf8');
for(const [page,[title,description]] of Object.entries(pages)) await writeFile(`dist/${page}.html`,template.replaceAll('{{TITLE}}',title).replaceAll('{{DESCRIPTION}}',description).replace('{{PAGE}}',page));
await writeFile('dist/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found — Top Knotch Boxing</title><body style="background:#151515;color:#f4efe6;font:20px Arial;padding:10vw"><h1>Wrong corner.</h1><p>This page isn’t in the lineup.</p><a href="/" style="color:#ff594e">Back to Top Knotch Boxing</a></body></html>');
console.log('Built four pages, assets, and 404 into dist.');
