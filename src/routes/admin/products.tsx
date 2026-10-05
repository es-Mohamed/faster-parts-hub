import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Package, Search, Plus, Edit, Trash2, Filter, Image as ImageIcon, X, Upload
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/products")({
  component: AdminProductsPage,
});

const MOCK_PRODUCTS = [
  { id: "PRD-01", code: "ISZ-BK-4011", nameAr: "طقم تيل فرامل أمامي", nameEn: "Front Brake Pads", category: "فرامل", price: 2850, stock: 12, desc: "تيل فرامل أصلي متوافق مع ايسوزو دي ماكس 2012-2020", image: "", status: "active" },
  { id: "PRD-02", code: "CHV-FL-8820", nameAr: "فلتر جاز أصلي", nameEn: "Fuel Filter", category: "فلاتر", price: 300, stock: 5, desc: "فلتر جاز شيفروليه دبابة", image: "", status: "low" },
];

function AdminProductsPage() {
  const { lang } = useStore();
  const isArabic = lang === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  
  // حالات النوافذ المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "add" | "edit">("view");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.nameAr.includes(searchTerm) || p.code.includes(searchTerm) || p.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (mode: "view" | "add" | "edit", product = null) => {
    setModalMode(mode);
    setSelectedProduct(product || { nameAr: "", nameEn: "", code: "", price: 0, stock: 0, desc: "", image: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="size-6 text-[#FACC15]" />
            {isArabic ? "إدارة المخزون وقطع الغيار" : "Inventory & Products"}
          </h1>
        </div>
        <Button onClick={() => openModal("add")} className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90 gap-2">
          <Plus className="size-4" />
          <span>{isArabic ? "إضافة قطعة جديدة" : "Add New Part"}</span>
        </Button>
      </div>

      <div className="relative flex-1">
        <Search className="absolute start-3 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={isArabic ? "بحث باسم القطعة (عربي/انجليزي) أو الكود..." : "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 w-full md:w-1/2 rounded-xl border border-border bg-card ps-9 pe-4 text-sm outline-none focus:border-[#FACC15]"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 bg-accent/50 p-4 border-b border-border text-sm font-bold text-muted-foreground">
          <div className="col-span-2">المنتج / الكود</div>
          <div>التصنيف</div>
          <div>السعر</div>
          <div>المخزون</div>
          <div className="text-end">إجراءات</div>
        </div>

        <div className="flex flex-col divide-y divide-border/60">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col md:grid md:grid-cols-6 gap-4 p-4 items-start md:items-center hover:bg-accent/20 transition-colors">
              <div 
                className="col-span-2 flex items-center gap-3 w-full cursor-pointer group"
                onClick={() => openModal("view", product)}
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent border border-border text-muted-foreground overflow-hidden">
                  {product.image ? <img src={product.image} alt={product.nameAr} className="w-full h-full object-cover" /> : <ImageIcon className="size-5 group-hover:text-[#FACC15] transition-colors" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-[#FACC15] transition-colors">{product.nameAr}</p>
                  <p className="text-xs font-mono text-muted-foreground">{product.code}</p>
                </div>
              </div>
              
              <div className="flex md:contents w-full justify-between items-center text-sm">
                <span className="font-semibold text-foreground">{product.category}</span>
              </div>
              <div className="flex md:contents w-full justify-between items-center text-sm">
                <span className="font-extrabold text-[#FACC15]">{product.price.toLocaleString()} ج.م</span>
              </div>
              <div className="flex md:contents w-full justify-between items-center text-sm">
                <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${product.stock > 10 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {product.stock > 0 ? `${product.stock} قطعة` : 'نفذت الكمية'}
                </span>
              </div>

              <div className="flex w-full md:w-auto md:justify-end gap-2 mt-2 md:mt-0">
                <Button onClick={() => openModal("edit", product)} variant="outline" size="sm" className="border-border hover:text-blue-500">
                  <Edit className="size-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:text-red-500 hover:bg-red-500/10">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* النافذة المنبثقة (Modal) للتفاصيل والإضافة والتعديل */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-2xl rounded-2xl border border-border shadow-xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h2 className="text-xl font-bold">
                {modalMode === "view" ? "تفاصيل المنتج" : modalMode === "add" ? "إضافة منتج جديد" : "تعديل المنتج"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-red-500">
                <X className="size-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* صورة المنتج */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-accent/30">
                {modalMode === "view" ? (
                  selectedProduct?.image ? <img src={selectedProduct.image} alt="Product" className="h-32 object-contain" /> : <ImageIcon className="size-12 text-muted-foreground" />
                ) : (
                  <div className="text-center cursor-pointer hover:text-[#FACC15] transition-colors">
                    <Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm font-bold">رفع صورة المنتج</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">الاسم (عربي)</label>
                <input readOnly={modalMode === "view"} defaultValue={selectedProduct?.nameAr} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">الاسم (إنجليزي)</label>
                <input readOnly={modalMode === "view"} defaultValue={selectedProduct?.nameEn} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">كود القطعة (SKU)</label>
                <input readOnly={modalMode === "view"} defaultValue={selectedProduct?.code} className="w-full h-10 rounded-lg border border-border bg-background px-3 font-mono text-sm outline-none focus:border-[#FACC15]" />
              </div>
              <div className="space-y-1 flex gap-2">
                <div className="flex-1">
                  <label className="text-xs font-bold text-muted-foreground">السعر</label>
                  <input type="number" readOnly={modalMode === "view"} defaultValue={selectedProduct?.price} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-muted-foreground">الكمية المتاحة</label>
                  <input type="number" readOnly={modalMode === "view"} defaultValue={selectedProduct?.stock} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-[#FACC15]" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-muted-foreground">الوصف</label>
                <textarea readOnly={modalMode === "view"} defaultValue={selectedProduct?.desc} className="w-full h-24 rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-[#FACC15] resize-none" />
              </div>
            </div>

            {modalMode !== "view" && (
              <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
                <Button className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90">حفظ المنتج</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}