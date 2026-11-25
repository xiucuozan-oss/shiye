import { getChatGPTUser } from '../../chatgpt-auth';
import { importArticle } from '../../../lib/extract.mjs';
export async function POST(request:Request){
 if(!await getChatGPTUser())return Response.json({error:'请先登录后再提取文章。'},{status:401});
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'请求来源不匹配'},{status:403});
 try{const raw=await request.text();if(raw.length>6000)return Response.json({error:'链接过长'},{status:400});const {url}=JSON.parse(raw);if(typeof url!=='string'||url.length>4000)throw Error('请输入有效链接');return Response.json(await importArticle(url),{headers:{'Cache-Control':'no-store'}})}catch(e){return Response.json({error:e instanceof Error?(e.name==='AbortError'?'来源响应超时，请稍后重试':e.message):'提取失败，请稍后重试'},{status:422,headers:{'Cache-Control':'no-store'}})}
}
