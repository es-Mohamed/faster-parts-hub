import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Plus, ArrowRight, Trash2, Search, Check, AlertCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/vehicles")({
  component: VehiclesPage,
});

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  isDefault?: boolean;
}

const INITIAL_VEHICLES: Vehicle[] = [
  { id: "v1", brand: "Isuzu", model: "D-Max (جامبو)", year: "2022", engine: "3.0L Turbo Diesel", isDefault: true },
  { id: "v2", brand: "Chevrolet", model: "Dabbaba (دبابة)", year: "2020", engine: "2.5L Diesel" },
];

function VehiclesPage() {
  const { lang } = useStore();
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ brand: "Isuzu", model: "", year: "2024", engine: "" });
  const isArabic = lang === "ar";

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.model) return;
    
    setVehicles([
      ...vehicles,
      { id: `v_${Date.now()}`, ...newVehicle, isDefault: vehicles.length === 0 }
    ]);
    setNewVehicle({ brand: "Isuzu", model: "", year: "2024", engine: "" });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setVehicles(vehicles.map(v => ({ ...v, isDefault: v.id === id })));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* الهيدر ورابط الرئيسية */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isArabic ? "سياراتي المحفوظة" : "My Saved Vehicles"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic ? "احفظ سياراتك لتصفح قطع الغيار المتوافقة بنقرة واحدة" : "Save your vehicles to automatically filter matching parts"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90 gap-2"
          >
            <Plus className="size-4" />
            <span>{isArabic ? "إضافة سيارة جديدة" : "Add Vehicle"}</span>
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-[#FACC15] hover:text-[#FACC15]"
          >
            <ArrowRight className="size-4 rtl:rotate-0 ltr:rotate-180" />
            <span>{isArabic ? "الرئيسية" : "Home"}</span>
          </Link>
        </div>
      </div>

      {/* نموذج إضافة سيارة جديدة */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="rounded-2xl border border-[#FACC15]/40 bg-card p-5 shadow-lg space-y-4 animate-in fade-in">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Car className="size-5 text-[#FACC15]" />
            <span>{isArabic ? "بيانات السيارة الجديدة" : "New Vehicle Information"}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">{isArabic ? "الماركة" : "Brand"}</label>
              <select
                value={newVehicle.brand}
                onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                className="mt-1 block h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-[#FACC15]"
              >
                <option value="Isuzu">Isuzu (إيسوزو)</option>
                <option value="Chevrolet">Chevrolet (شيفروليه)</option>
                <option value="Toyota">Toyota (تويوتا)</option>
                <option value="Nissan">Nissan (نيسان)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">{isArabic ? "الموديل (النوع)" : "Model"}</label>
              <input
                type="text"
                required
                placeholder={isArabic ? "مثال: D-Max أو دبابة" : "e.g. D-Max"}
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                className="mt-1 block h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-[#FACC15]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">{isArabic ? "سنة الصنع" : "Year"}</label>
              <input
                type="number"
                required
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                className="mt-1 block h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-[#FACC15]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">{isArabic ? "سعة المحرك (اختياري)" : "Engine (Optional)"}</label>
              <input
                type="text"
                placeholder="3.0L / Diesel"
                value={newVehicle.engine}
                onChange={(e) => setNewVehicle({ ...newVehicle, engine: e.target.value })}
                className="mt-1 block h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-[#FACC15]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" className="bg-[#FACC15] text-black font-bold hover:bg-[#FACC15]/90">
              {isArabic ? "حفظ السيارة" : "Save Vehicle"}
            </Button>
          </div>
        </form>
      )}

      {/* عرض قائمة السيارات المحفوظة */}
      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Car className="size-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-bold text-foreground">{isArabic ? "لا توجد سيارات محفوظة" : "No saved vehicles"}</h3>
          <p className="text-xs text-muted-foreground mt-1">{isArabic ? "أضف سيارتك الأولى للبحث عن قطع الغيار المناسبة لها بسرعة" : "Add your first vehicle to find matching parts easily"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <div 
              key={v.id} 
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all bg-card ${
                v.isDefault ? "border-[#FACC15] shadow-md" : "border-border hover:border-border/80"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-xl bg-accent text-[#FACC15]">
                      <Car className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-foreground text-lg">{v.brand} {v.model}</h3>
                      <p className="text-xs text-muted-foreground">{isArabic ? `موديل ${v.year}` : `Year ${v.year}`} {v.engine ? `• ${v.engine}` : ""}</p>
                    </div>
                  </div>

                  {v.isDefault && (
                    <span className="rounded-full bg-[#FACC15]/10 px-3 py-1 text-[11px] font-bold text-[#FACC15] flex items-center gap-1">
                      <Check className="size-3" />
                      {isArabic ? "الافتراضية" : "Default"}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xs font-bold text-[#FACC15] hover:underline"
                >
                  <Search className="size-4" />
                  <span>{isArabic ? "استعراض قطع الغيار المطابقة" : "Browse Matching Parts"}</span>
                </Link>

                <div className="flex items-center gap-2">
                  {!v.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(v.id)} className="text-xs text-muted-foreground">
                      {isArabic ? "تعيين كافتراضية" : "Set Default"}
                    </Button>
                  )}
                  <button 
                    onClick={() => handleDelete(v.id)} 
                    className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}