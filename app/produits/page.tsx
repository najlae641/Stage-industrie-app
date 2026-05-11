export default function ListeProduitsPage() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des Produits (Inventaire)</h1>

      <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Inventaire des Produits</h1>
  
  
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors font-medium">
    + Ajouter un produit
  </button>
</div>
     
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Référence</th>
              <th className="p-4 font-semibold text-gray-600">Désignation</th>
              <th className="p-4 font-semibold text-gray-600">Quantité</th>
              <th className="p-4 font-semibold text-gray-600">Prix</th>
            </tr>
          </thead>
          <tbody>
  
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4">#REF-001</td>
    <td className="p-4">Moteur V6 Turbo</td>
    <td className="p-4">24</td>
    <td className="p-4 text-blue-600 font-bold">4500 DH</td>
  </tr>
  
  {/* المنتج 2 */}
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4">#REF-002</td>
    <td className="p-4">Filtre à Huile X1</td>
    <td className="p-4">150</td>
    <td className="p-4 text-blue-600 font-bold">120 DH</td>
  </tr>

 
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4">#REF-003</td>
    <td className="p-4">Batterie 70Ah</td>
    <td className="p-4">12</td>
    <td className="p-4 text-blue-600 font-bold">850 DH</td>
  </tr>
</tbody>
        </table>
      </div>

      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">← Retour au Dashboard</a>
      </div>
    </div>
  );
}