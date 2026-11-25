import type { Metadata } from 'next';
export const metadata: Metadata={title:'拾页 · 私人阅读收藏',description:'保存文章和图片的独立副本，阅读并划线标注。',icons:{icon:'/library/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
