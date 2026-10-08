import {shopConfig,storefront,productsQuery,normalizeProduct,validLines,sameOrigin} from '../lib/shopify.js';
export async function GET(){
  try{
    if(!shopConfig())return Response.json({mode:'mock'},{headers:{'Cache-Control':'no-store'}});
    let products=[],after=null;
    do{const data=await storefront(productsQuery,{after});products.push(...data.products.nodes.filter(p=>p.variants.nodes.length).map(normalizeProduct));after=data.products.pageInfo.hasNextPage?data.products.pageInfo.endCursor:null;}while(after);
    return Response.json({mode:'live',products},{headers:{'Cache-Control':'public, s-maxage=60, stale-while-revalidate=120'}});
  }catch{console.error('Storefront catalog request failed');return Response.json({error:'The collection is temporarily unavailable.'},{status:503});}
}
export async function POST(request){
  if(!sameOrigin(request))return Response.json({error:'Request not allowed.'},{status:403});
  let body;try{const text=await request.text();if(text.length>20000)throw Error();body=JSON.parse(text);}catch{return Response.json({error:'Invalid request.'},{status:400});}
  if(!validLines(body?.lines))return Response.json({error:'Please review the items in your bag.'},{status:400});
  try{
    if(!shopConfig())return Response.json({error:'Ordering opens when the live shop launches.'},{status:409});
    const data=await storefront(`mutation Checkout($input:CartInput!){cartCreate(input:$input){cart{checkoutUrl}userErrors{message}warnings{message}}}`,{input:{lines:body.lines.map(({merchandiseId,quantity})=>({merchandiseId,quantity}))}},request);
    const result=data.cartCreate;
    if(result.userErrors?.length||result.warnings?.length)return Response.json({error:[...(result.userErrors||[]),...(result.warnings||[])].map(e=>e.message).join(' ')},{status:422});
    if(!result.cart?.checkoutUrl||new URL(result.cart.checkoutUrl).protocol!=='https:')throw Error();
    return Response.json({checkoutUrl:result.cart.checkoutUrl},{headers:{'Cache-Control':'no-store'}});
  }catch{console.error('Storefront checkout request failed');return Response.json({error:'Checkout is temporarily unavailable. Please try again.'},{status:503});}
}
