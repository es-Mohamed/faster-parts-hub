import ballJoint from "@/assets/ball-joint.jpg";
import brakePads from "@/assets/brake-pads.jpg";
import oilFilter from "@/assets/oil-filter.jpg";
import shockAbsorber from "@/assets/shock-absorber.jpg";

export type Product = { id:string; nameAr:string; nameEn:string; partNo:string; price:number; image:string; compatibility:string[]; category:string };
export const products: Product[] = [
 {id:"ball-joint",nameAr:"مفصل كروي سفلي أمامي",nameEn:"Front Lower Ball Joint",partNo:"FAS-BJ-001",price:89.99,image:ballJoint,compatibility:["ISUZU D-Max 2012–2024","Chevrolet El Dababa 2013–2024"],category:"suspension"},
 {id:"brake-pads",nameAr:"طقم تيل فرامل أمامي",nameEn:"Front Ceramic Brake Pad Set",partNo:"FAS-BP-FR-002",price:64.50,image:brakePads,compatibility:["ISUZU D-Max 2012–2023","Chevrolet Colorado 2012–2022"],category:"brakes"},
 {id:"oil-filter",nameAr:"فلتر زيت عالي الكفاءة",nameEn:"High Efficiency Oil Filter",partNo:"FAS-OF-019",price:24.75,image:oilFilter,compatibility:["Toyota Hilux 2015–2024","Nissan Navara 2016–2024"],category:"engine"},
 {id:"shock-absorber",nameAr:"ممتص صدمات خلفي",nameEn:"Rear Shock Absorber",partNo:"FAS-SA-044",price:119.00,image:shockAbsorber,compatibility:["ISUZU D-Max 2012–2024","Chevrolet El Dababa 2013–2024"],category:"suspension"},
];
export const getProduct=(id:string)=>products.find(p=>p.id===id);
