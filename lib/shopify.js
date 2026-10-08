export function shopConfig(){
  const domain=(process.env.SHOPIFY_STORE_DOMAIN||'').trim();
  const token=(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN||'').trim();
  if(!domain&&!token)return null;
  if(!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)||!token)throw Error('Invalid Shopify configuration');
  const version=process.env.SHOPIFY_API_VERSION||'2026-07';
  if(!/^20\d\d-(01|04|07|10)$/.test(version))throw Error('Invalid Shopify API version');
  return {domain,token,version};
}
export async function storefront(query,variables={},request){
  const config=shopConfig();if(!config)throw Error('Shop is not connected');
  const headers={'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':config.token};
  const ip=request?.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  if(ip)headers['Shopify-Storefront-Buyer-IP']=ip;
  const response=await fetch(`https://${config.domain}/api/${config.version}/graphql.json`,{method:'POST',headers,body:JSON.stringify({query,variables}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw Error('Shopify request failed');
  const result=await response.json();if(result.errors?.length)throw Error('Shopify query failed');return result.data;
}
export const productsQuery=`query Collection($after:String){products(first:100,after:$after,sortKey:TITLE){pageInfo{hasNextPage endCursor}nodes{id title productType description featuredImage{url}variants(first:250){nodes{id title availableForSale price{amount currencyCode}}}}}}`;
export function normalizeProduct(p){const variants=p.variants.nodes.map(v=>({id:v.id,title:v.title,available:v.availableForSale,price:Number(v.price.amount),currency:v.price.currencyCode}));return {id:p.id,title:p.title,category:p.productType||'Apparel',description:p.description,image:p.featuredImage?.url||'/assets/logo.png',price:Math.min(...variants.map(v=>v.price)),currency:variants[0]?.currency||'USD',variants,mock:false};}
export function validLines(lines){return Array.isArray(lines)&&lines.length>0&&lines.length<=50&&lines.every(l=>l&&/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(l.merchandiseId)&&Number.isInteger(l.quantity)&&l.quantity>0&&l.quantity<=20)&&new Set(lines.map(l=>l.merchandiseId)).size===lines.length;}
export function sameOrigin(request){const origin=request.headers.get('origin');if(!origin)return true;try{return new URL(origin).host===new URL(request.url).host;}catch{return false;}}
