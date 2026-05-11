import { table } from "console";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
 
  <aside className="w-64 bg-slate-900 text-white p-6">
    <h2 className="text-xl font-bold mb-10">ETASCOM AUTOMOTIVE </h2>
    <nav className="space-y-4">
      <div className="text-blue-400">Tableau de bord</div>
      <div className="hover:text-blue-300 cursor-pointer">Produits</div>
    </nav>
  </aside>

  
  <main className="flex-1 p-8">
    <h1 className="text-2xl font-bold mb-6">Gestion des Stocks</h1>

    
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">Produit</th>
            <th className="p-4">Quantité</th>
            <th className="p-4">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium">Moteur V6</td>
            <td className="p-4">24</td>
            <td className="p-4 text-green-600 font-bold">En Stock</td>
          </tr>
          <tr>
            <td className="p-4 font-medium">Filtre X1</td>
            <td className="p-4">08</td>
            <td className="p-4 text-red-500 font-bold">Stock Faible</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</div>
       
  );
}
