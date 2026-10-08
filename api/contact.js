import {sameOrigin} from '../lib/shopify.js';
function endpoint(){const value=process.env.CONTACT_WEBHOOK_URL;if(!value)return null;try{const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}}
export async function GET(){const email=process.env.CONTACT_EMAIL||'';return Response.json({available:!!endpoint(),email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:null},{headers:{'Cache-Control':'no-store'}});}
export async function POST(request){
  if(!sameOrigin(request))return Response.json({error:'Request not allowed.'},{status:403});
  const target=endpoint();if(!target)return Response.json({error:'Our contact channel is not open yet. Please copy your message to save it.'},{status:503});
  let body;try{const text=await request.text();if(text.length>12000)throw Error();body=JSON.parse(text);}catch{return Response.json({error:'Invalid message.'},{status:400});}
  if(body?.website)return Response.json({error:'Message could not be sent.'},{status:400});
  const {name,email,topic,message}=body||{};
  if(typeof name!=='string'||!name.trim()||name.length>100||typeof email!=='string'||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof message!=='string'||message.trim().length<10||message.length>5000||typeof topic!=='string'||topic.length>100)return Response.json({error:'Please enter a name, valid email and message of at least 10 characters.'},{status:400});
  try{const response=await fetch(target,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.trim(),email:email.trim(),topic,message:message.trim(),source:'Top Knotch Boxing website'}),signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error();return Response.json({sent:true});}catch{console.error('Contact delivery failed');return Response.json({error:'Your message was not sent. Please try again later.'},{status:502});}
}
