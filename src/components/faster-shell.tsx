import { Link, useRouterState } from "@tanstack/react-router";
import { Search, UserRound, ShoppingCart, Home, Grid2X2, X, Instagram, Facebook, Linkedin, MapPin, Headphones, ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { copy, useStore } from "@/lib/store"; 
import logoAsset from "@/assets/faster-logo.png";

// تم استبدال الأقسام بالمنتجات في شريط الموبايل السفلي
const nav=[{to:"/",key:"home",icon:Home},{to:"/products",key:"products",icon:Grid2X2},{to:"/cart",key:"cart",icon:ShoppingCart},{to:"/account",key:"account",icon:UserRound}] as const;
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};

export function FasterShell({children}:{children:React.ReactNode}){
  const {lang,toggleLang,count}=useStore();
  const t=copy[lang];
  const [search,setSearch]=useState(false);
  const [install,setInstall]=useState<InstallEvent>();
  const path=useRouterState({select:s=>s.location.pathname});
  
  useEffect(()=>{
    const onPrompt=(event:Event)=>{event.preventDefault();setInstall(event as InstallEvent)};
    window.addEventListener("beforeinstallprompt",onPrompt);
    return()=>window.removeEventListener("beforeinstallprompt",onPrompt)
  },[]);

  return (
    <div dir={lang==="ar"?"rtl":"ltr"} className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-header-border bg-header text-header-foreground">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 md:h-20 md:px-6">
          <Link to="/" aria-label="Faster home" className="order-1 flex shrink-0 items-center gap-3">
            <img src={logoAsset} className="h-8 w-auto object-contain md:h-10" alt="Faster Auto Spare Parts"/>
            <div className="flex flex-col">
              <b className="text-xl font-black leading-none tracking-tight text-brand md:text-2xl">FASTER</b>
              <span className="text-[9px] font-bold tracking-widest text-header-muted uppercase md:text-[10px]">Auto Parts</span>
            </div>
          </Link>
          <nav className="order-2 hidden min-w-0 items-center justify-center gap-7 md:flex">
            <Link to="/" className="text-sm font-semibold text-header-muted hover:text-brand" activeProps={{className:"text-brand"}}>{t.home}</Link>
            <Link to="/products" className="text-sm font-semibold text-header-muted hover:text-brand" activeProps={{className:"text-brand"}}>{t.products}</Link>
            <Link to="/contact" className="text-sm font-semibold text-header-muted hover:text-brand" activeProps={{className:"text-brand"}}>{t.contact}</Link>
          </nav>
          <div className="order-3 flex shrink-0 items-center justify-end gap-1.5">
            <div className={`flex h-10 items-center overflow-hidden rounded-md border transition-all duration-300 ${search?"w-44 border-brand shadow-glow sm:w-72":"w-10 border-transparent"}`}>
              {search&&<input autoFocus className="min-w-0 flex-1 bg-transparent px-3 text-sm text-header-foreground outline-none placeholder:text-header-muted" placeholder={t.search}/>}
              <Button variant="header" size="icon" aria-label={t.search} onClick={()=>setSearch(v=>!v)}>{search?<X/>:<Search/>}</Button>
            </div>
            <Button variant="language" size="sm" onClick={toggleLang}>{lang==="ar"?"EN":"عربي"}</Button>
            <Link to="/account" className="hidden md:grid h-10 w-10 place-items-center text-header-muted hover:text-brand"><UserRound className="size-5"/></Link>
            <Link to="/cart" className="relative hidden md:grid h-10 w-10 place-items-center text-header-muted hover:text-brand">
              <ShoppingCart className="size-5"/>
              {count>0&&<span className="absolute end-0 top-0 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">{count}</span>}
            </Link>
          </div>
        </div>
      </header>
      
      <main>{children}</main>
      
      {install&&
        <div className="fixed inset-x-3 bottom-20 z-40 flex items-center justify-between gap-3 rounded-lg border border-brand bg-header p-3 text-header-foreground shadow-brand md:hidden">
          <div className="min-w-0">
            <b className="block text-sm">{lang==="ar"?"ثبّت تطبيق فاستر":"Install Faster"}</b>
            <span className="text-xs text-header-muted">{lang==="ar"?"وصول أسرع من الشاشة الرئيسية":"Faster access from your home screen"}</span>
          </div>
          <Button variant="catalog" size="sm" onClick={async()=>{await install.prompt();await install.userChoice;setInstall(undefined)}}>
            <Download/>{lang==="ar"?"تثبيت":"Install"}
          </Button>
        </div>
      }
      
      <FasterFooter lang={lang}/>
      
      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-18 grid-cols-4 border-t border-header-border bg-header md:hidden">
        {nav.map(n=>{
          const Icon=n.icon;
          const active=n.to==="/"?path==="/":path.startsWith(n.to);
          return (
            <Link key={n.to} to={n.to} className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${active?"text-brand":"text-header-muted"}`}>
              <Icon className="size-5"/>
              <span>{t[n.key as keyof typeof t]}</span>
              {n.key==="cart"&&count>0&&<b className="absolute end-[28%] top-2 grid size-4 place-items-center rounded-full bg-brand text-[9px] text-brand-foreground">{count}</b>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function FasterFooter({lang}:{lang:"ar"|"en"}){
  const ar=lang==="ar";
  return (
    <footer className="border-t border-border bg-[#0A0A0A] pb-20 text-gray-400 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:gap-12 md:px-6 md:py-16">
        <div className="mb-2 md:mb-0 md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logoAsset} className="h-10 w-auto object-contain" alt="Faster Auto Spare Parts"/>
            <b className="text-2xl font-black tracking-tight text-[#FACC15]">FASTER</b>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-gray-400">
            {ar?"وجهتك الموثوقة لقطع غيار السيارات الأصلية. جودة لا تُضاهى وأداء يعتمد عليه لجميع السيارات.":"Your trusted destination for genuine automotive parts. Unmatched quality and reliable performance."}
          </p>
        </div>
        
        <FooterColumn 
          title={ar?"الشركة":"Company"} 
          links={[
            { label: ar ? "جميع المنتجات" : "All Products", to: "/products" },
            { label: ar ? "حساب التاجر" : "Trade Account", to: "/account" }
          ]} 
        />
        
        <FooterColumn 
          title={ar?"الدعم والمساعدة":"Support"} 
          links={[
            { label: ar ? "تواصل معنا" : "Contact Us", to: "/contact" },
            { label: ar ? "سياسة الضمان" : "Warranty Policy", to: "/contact" },
            { label: ar ? "الشحن والتوصيل" : "Shipping & Delivery", to: "/contact" }
          ]} 
        />
        
        <div className="border-t border-gray-800 py-4 md:border-0 md:py-0">
          <h2 className="text-base font-extrabold text-white md:text-lg">{ar?"خدمة العملاء":"Customer Service"}</h2>
          <div className="mt-4 space-y-4 text-sm md:mt-5">
            <Link to="/contact" className="flex items-center gap-3 transition-colors hover:text-[#FACC15]">
              <Headphones className="size-5 shrink-0 text-[#FACC15]"/>
              <span>{ar?"الدعم الفني والمبيعات":"Technical Support & Sales"}</span>
            </Link>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-[#FACC15]"/>
              <span>{ar?"توصيل سريع لجميع المحافظات":"Fast delivery to all regions"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-xs text-gray-500">© 2026 Faster Auto Spare Parts. All rights reserved.</p>
          <div className="flex gap-3">
            {[Instagram,Facebook,Linkedin].map((Icon,i)=>(
              <a key={i} href="#" aria-label={["Instagram","Facebook","LinkedIn"][i]} className="grid size-9 place-items-center rounded-md bg-gray-900 text-gray-400 transition-all hover:bg-[#FACC15] hover:text-black">
                <Icon className="size-4"/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({title, links}:{title:string; links:{label:string, to:string}[]}){
  const [open,setOpen]=useState(false);
  return (
    <div className="border-t border-gray-800 py-4 md:border-0 md:py-0">
      <button type="button" onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between text-start text-base font-extrabold text-white outline-none md:pointer-events-none md:text-lg">
        <span>{title}</span>
        <ChevronDown className={`size-5 text-gray-500 transition-transform md:hidden ${open?"rotate-180":""}`}/>
      </button>
      <ul className={`${open?"mt-4 flex":"hidden"} flex-col space-y-3 text-sm md:mt-5 md:flex`}>
        {links.map((link)=>(
          <li key={link.label}>
            <Link to={link.to} className="text-gray-400 transition-colors hover:text-[#FACC15]">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}