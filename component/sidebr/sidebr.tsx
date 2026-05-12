import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 h-screen sticky top-0 flex flex-col">
      {/* العنوان يجي معزول بوحدو لفوق */}
      <div className="mb-10 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-blue-50">
          ETASCOM AUTOMOTIVE
        </h2>
      </div>

      {/* المنيو هابط نيشان */}
      <nav className="flex flex-col space-y-4 flex-1">
        <div className="text-blue-400 font-medium py-2">
          Tableau de bord
        </div>
        
        <Link 
          href="/produits" 
          className="hover:text-blue-300 transition-colors py-1 inline-block"
        >
          Produits fini
        </Link>

        <Link 
          href="/matiere_premiere" 
          className="hover:text-blue-300 transition-colors py-1 inline-block"
        >
          Matière première
        </Link>
      </nav>
      
      {/* تقدري تزيدي شي حاجة لتحت هنا إلا بغيتي */}
    </aside>
  );
}