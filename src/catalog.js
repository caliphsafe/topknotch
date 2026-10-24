export const mockProducts = [
  {id:'legacy-tee',title:'Logo Tee',category:'Tees',color:'Washed black',price:38,art:0,description:'A concept short-sleeve boxing apparel tee featuring the Top Cat graphic on washed black.'},
  {id:'cornerman-hoodie',title:'Corner Hoodie',category:'Layers',color:'Ringside black',price:78,art:1,description:'A concept boxing apparel hoodie in ringside black, with the Top Cat graphic up front.'},
  {id:'rounds-shorts',title:'Round Short',category:'Shorts',color:'Corner red',price:48,art:2,description:'A concept pair of boxing shorts in corner red, with a black waistband and a classic fight-night silhouette.'},
  {id:'tradition-tee',title:'Wordmark Tee',category:'Tees',color:'Vintage cream',price:38,art:3,description:'A concept short-sleeve boxing apparel tee in vintage cream, finished with the Top Knotch wordmark.'}
].map(p=>({...p,currency:'USD',mock:true,variants:['S','M','L','XL','2XL'].map(size=>({id:`${p.id}-${size}`,title:size,price:p.price,currency:'USD',available:true}))}));
export const money=(amount,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(amount);
export function cleanCart(value){return Array.isArray(value)?value.filter(x=>x&&typeof x.variantId==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20).slice(0,50):[];}
