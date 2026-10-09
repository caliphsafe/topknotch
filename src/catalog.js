export const mockProducts = [
  {id:'legacy-tee',title:'Logo Tee',category:'Tees',color:'Washed black',price:38,art:0,description:'The full boxing-cat graphic on washed black. A concept short-sleeve tee with the original red, white and gray print.'},
  {id:'cornerman-hoodie',title:'Corner Hoodie',category:'Layers',color:'Ringside black',price:78,art:1,description:'Black-on-black layers, with the boxing-cat graphic up front. A concept pullover hoodie.'},
  {id:'rounds-shorts',title:'Round Short',category:'Shorts',color:'Corner red',price:48,art:2,description:'Red satin, a black waistband and a classic boxing silhouette. A concept short.'},
  {id:'tradition-tee',title:'Wordmark Tee',category:'Tees',color:'Vintage cream',price:38,art:3,description:'The Top Knotch wordmark in black and red on vintage cream. A concept short-sleeve tee.'}
].map(p=>({...p,currency:'USD',mock:true,variants:['S','M','L','XL','2XL'].map(size=>({id:`${p.id}-${size}`,title:size,price:p.price,currency:'USD',available:true}))}));
export const money=(amount,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(amount);
export function cleanCart(value){return Array.isArray(value)?value.filter(x=>x&&typeof x.variantId==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20).slice(0,50):[];}
