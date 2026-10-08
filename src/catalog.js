export const mockProducts = [
  {id:'legacy-tee',title:'The Legacy Tee',category:'Tees',color:'Washed black',price:38,art:0,description:'The original mark, front and center. A concept everyday tee that carries the Top Cat tribute beyond the ropes.'},
  {id:'cornerman-hoodie',title:'The Cornerman Hoodie',category:'Layers',color:'Ringside black',price:78,art:1,description:'For the people in your corner. A concept pullover built around the mark that started it all.'},
  {id:'rounds-shorts',title:'The Rounds Short',category:'Shorts',color:'Corner red',price:48,art:2,description:'A classic boxing silhouette in the color of our corner. A concept short inspired by the work between the bells.'},
  {id:'tradition-tee',title:'The Tradition Tee',category:'Tees',color:'Vintage cream',price:38,art:3,description:'A quiet nod to a loud legacy. Our concept wordmark tee keeps the family name in the everyday rotation.'}
].map(p=>({...p,currency:'USD',mock:true,variants:['S','M','L','XL','2XL'].map(size=>({id:`${p.id}-${size}`,title:size,price:p.price,currency:'USD',available:true}))}));
export const money=(amount,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(amount);
export function cleanCart(value){return Array.isArray(value)?value.filter(x=>x&&typeof x.variantId==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20).slice(0,50):[];}
