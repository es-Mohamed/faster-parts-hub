import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Lang="ar"|"en"; type Cart=Record<string,number>;
type Store={lang:Lang;toggleLang:()=>void;cart:Cart;add:(id:string,qty?:number)=>void;remove:(id:string)=>void;setQty:(id:string,qty:number)=>void;count:number};
const StoreContext=createContext<Store|undefined>(undefined);
export function StoreProvider({children}:{children:ReactNode}){
 const [lang,setLang]=useState<Lang>("ar"); const [cart,setCart]=useState<Cart>({});
 useEffect(()=>{const saved=sessionStorage.getItem("faster-cart");if(saved) try{setCart(JSON.parse(saved))}catch{}},[]);
 useEffect(()=>{sessionStorage.setItem("faster-cart",JSON.stringify(cart))},[cart]);
 const add=(id:string,qty=1)=>setCart(c=>({...c,[id]:(c[id]||0)+qty}));
 const remove=(id:string)=>setCart(c=>{const n={...c};delete n[id];return n});
 const setQty=(id:string,qty:number)=>qty<1?remove(id):setCart(c=>({...c,[id]:qty}));
 return <StoreContext.Provider value={{lang,toggleLang:()=>setLang(l=>l==="ar"?"en":"ar"),cart,add,remove,setQty,count:Object.values(cart).reduce((a,b)=>a+b,0)}}>{children}</StoreContext.Provider>
}
export function useStore(){const c=useContext(StoreContext);if(!c)throw new Error("StoreProvider missing");return c}
export const copy={
 ar:{home:"الرئيسية",categories:"الأقسام",cart:"السلة",account:"حسابي",contact:"تواصل معنا",products:"المنتجات",search:"ابحث باسم القطعة أو رقمها",heroTag:"قطع غيار أصلية",heroTitle:"القوة تبدأ من القطعة الأصلية",heroBody:"قطع غيار موثوقة لسيارتك، بجودة تليق بكل رحلة.",browse:"تصفح القطع",all:"عرض الكل",trade:"هل أنت تاجر قطع غيار؟",tradeSub:"سجّل الآن واحصل على أسعار موزعين حصرية",featured:"المنتجات المميزة",original:"أصلي",add:"أضف",brands:"تسوق حسب ماركة السيارة",warranty:"ضمان شامل",genuine:"قطع أصلية فقط",delivery:"توصيل سريع",compatibility:"التوافق المؤكد",details:"تفاصيل المنتج",addCart:"أضف إلى السلة",quote:"اطلب عرض سعر جملة",related:"منتجات ذات صلة",back:"العودة",subtotal:"الإجمالي",empty:"سلة التسوق فارغة",checkout:"إتمام الطلب",signIn:"تسجيل الدخول",welcome:"مرحباً بك في فاستر",accountBody:"تابع طلباتك واحفظ سياراتك المفضلة.",qty:"الكمية"},
 en:{home:"Home",categories:"Categories",cart:"Cart",account:"Account",contact:"Contact Us",products:"Products",search:"Search by part name or number",heroTag:"GENUINE PARTS",heroTitle:"Power begins with genuine parts",heroBody:"Trusted spare parts for your vehicle, engineered for every journey.",browse:"Browse parts",all:"See all",trade:"Trade partner?",tradeSub:"Register now for exclusive distributor pricing",featured:"Featured products",original:"ORIGINAL",add:"Add",brands:"Shop by vehicle brand",warranty:"Comprehensive warranty",genuine:"Original parts only",delivery:"Fast delivery",compatibility:"Verified compatibility",details:"Product details",addCart:"Add to cart",quote:"Request wholesale quote",related:"Related products",back:"Back",subtotal:"Subtotal",empty:"Your cart is empty",checkout:"Checkout",signIn:"Sign in",welcome:"Welcome to Faster",accountBody:"Track orders and save your favourite vehicles.",qty:"Quantity"}}
