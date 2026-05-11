
"use client";
import { useState } from 'react'; 
export default function ListeProduitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 const [produits, setProduits] = useState([
    { ref: "#REF-001", nom: "Moteur V6 Turbo", qte: 24, prix: "4500", lot: "LOT-20260511-001" },
    { ref: "#REF-002", nom: "Filtre à Huile X1", qte: 150, prix: "120", lot: "LOT-20260511-002" },
    { ref: "#REF-003", nom: "Batterie 70Ah", qte: 12, prix: "850", lot: "LOT-20260511-003" }
  ]);

  
  const [newProd, setNewProd] = useState({ ref: '', nom: '', qte: '', prix: '' });

 
 const handleSave = () => {
  // هنا كنعيطو للدالة اللي كتصاوب الكود وكنزيدوه للبرودوي قبل ما نحفظوه
  const lotCode = `LOT-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 900) + 100}`;
  
  const productWithLot = { ...newProd, lot: lotCode };
  
  setProduits([...produits, productWithLot]);
  setIsModalOpen(false);
  setNewProd({ ref: '', nom: '', qte: '', prix: '' });
};
  const handleDelete = (indexToDelete: number) => {
  const updatedProduits = produits.filter((_, index) => index !== indexToDelete);
  setProduits(updatedProduits);
};

const generateLotCode = () => {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, ''); // كيعطي مثلا 20260511
    const randomPart = Math.floor(Math.random() * 900) + 100; // رقم عشوائي من 3 أرقام
    return `LOT-${datePart}-${randomPart}`;
  };


const handlePrintEtiquette = (p: any) => {
    const printWindow = window.open('', '_blank');
    const dateLot = new Date().toISOString().split('T')[0].replace(/-/g, ''); // كود الـ Lot بالتاريخ

    printWindow?.document.write(`
      <html>
        <head>
          <title>ETASCOM - Étiquette</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
          <style>
            body { font-family: 'Courier New', monospace; padding: 10px; width: 350px; border: 2px solid black; }
            .header { border-bottom: 2px solid black; font-weight: bold; font-size: 20px; padding-bottom: 5px; margin-bottom: 10px; }
            .label { font-size: 10px; text-decoration: underline; display: block; }
            .value { font-size: 16px; font-weight: bold; margin-bottom: 8px; display: block; }
            .barcode-container { text-align: center; margin-top: 10px; }
            .qr { float: right; margin-top: -40px; }
          </style>
        </head>
        <body>
          <div class="header">ETASCOM</div>
          <span class="label">CODE PRODUIT (P)</span>
          <span class="value">${p.ref}</span>
          
          <span class="label">DÉSIGNATION</span>
          <span class="value">${p.nom}</span>
          
          <div style="display:flex; justify-content: space-between;">
             <div>
                <span class="label">N° LOT INTERNE</span>
                <span class="value">LOT-${dateLot}</span>
             </div>
             <div style="text-align: right;">
                <span class="label">QUANTITÉ</span>
                <span class="value">${p.qte} PCS</span>
             </div>
          </div>

          <div class="barcode-container">
            <svg id="barcode"></svg>
          </div>
          
          <img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${p.ref}" />

          <script>
            JsBarcode("#barcode", "${p.ref}", { format: "CODE128", width: 2, height: 40, displayValue: true });
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };  

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des Produits (Inventaire)</h1>

      <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Inventaire des Produits</h1>
  
  
  <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors font-medium">
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
              <th className="p-4 font-semibold text-gray-600">N° Lot</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
         
  
  <tbody>
  {produits.map((p, index) => (
    <tr key={index} className="border-b hover:bg-gray-50">
      <td className="p-4">{p.ref}</td>
      <td className="p-4">{p.nom}</td>
      <td className="p-4">{p.qte}</td>
      <td className="p-4 text-blue-600 font-bold">{p.prix} DH</td>
      <td className="p-4 text-xs font-mono text-gray-500">{p.lot || '---'}</td>
      <td className="p-4 text-right">
  <button 
    onClick={() => handleDelete(index)} 
    className="bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
  >
    Supprimer
  </button>
</td>
  <button 
    onClick={() => handlePrintEtiquette(p)} 
    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-bold hover:bg-blue-200"
  >
    🏷️ Étiquette
  </button>

    </tr>
  ))}
</tbody>

        </table>
      </div>
    {/* Formulaire*/}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Nouveau Produit</h2>
      
      <div className="space-y-4">
       
        <input 
          type="text" 
          placeholder="Référence" 
          className="w-full border p-2 rounded-lg"
          onChange={(e) => setNewProd({...newProd, ref: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Désignation" 
          className="w-full border p-2 rounded-lg"
          onChange={(e) => setNewProd({...newProd, nom: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Quantité" 
          className="w-full border p-2 rounded-lg"
          onChange={(e) => setNewProd({...newProd, qte: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Prix" 
          className="w-full border p-2 rounded-lg"
          onChange={(e) => setNewProd({...newProd, prix: e.target.value})} 
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          Annuler
        </button>
        
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
)}

      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">← Retour au Dashboard</a>
      </div>
      
    </div>
    
  );
}