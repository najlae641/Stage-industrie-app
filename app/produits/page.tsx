"use client";
import { useState } from 'react'; 
interface Produit{
  ref:string;
  nom:string;
  qte:number;
  prix:number;
  lot:string;
  client:string;
  statut:string;
}

export default function ListeProduitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [produits, setProduits] = useState([
    { ref: "#REF-001", nom: "Moteur V6 Turbo", qte: 24, prix: 4500, lot: "LOT-20260511-001", client: "mme najlae el ghouli", statut: "En Stock" },
    { ref: "#REF-002", nom: "Filtre à Huile X1", qte: 150, prix: 120, lot: "LOT-20260511-002", client: "mme najlae el ghouli", statut: "En Stock" },
    { ref: "#REF-003", nom: "Batterie 70Ah", qte: 12, prix: 850, lot: "LOT-20260511-003", client: "mme najlae el ghouli", statut: "Stock Faible" }
  ]);

  const [newProd, setNewProd] = useState<Produit>({ ref: '', nom: '', qte: 0, prix: 0,lot:'' ,client: '', statut: '' });

  const handleSave = () => {
    const { ref, nom, qte, prix, client, statut } = newProd;

    if (!ref || !nom || !qte || !prix || !client || !statut) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (editingIndex !== null) {
    
      const updatedProduits = [...produits];
      updatedProduits[editingIndex] = { ...newProd, lot: produits[editingIndex].lot }as Produit ; 
      setEditingIndex(null);
    } else {
      
      const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); 
      const randomPart = Math.floor(Math.random() * 900) + 100;
      const lotCode = `LOT-${datePart}-${randomPart}`;
      setProduits([...produits, { ...newProd, lot: lotCode }as Produit ]);
    }

    setIsModalOpen(false);
    setNewProd({ ref: '', nom:'', qte: 0, prix: 0,lot:'', client: '', statut: '' });
  };

  const handleDelete = (indexToDelete: number) => {
    setProduits(produits.filter((_, index) => index !== indexToDelete));
  };

  
  const openEditModal = (index: number) => {
    const p = produits[index];
    setNewProd({
      ref: p.ref,
      nom: p.nom,
      qte: p.qte.toString(), 
      prix: p.prix.toString(),
      client: p.client,
      statut: p.statut
    } as any);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handlePrintEtiquette = (p: any) => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>ETASCOM - Étiquette</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
          <style>
            body { font-family: 'Courier New', monospace; padding: 10px; width: 350px; border: 2px solid black; }
            .header { border-bottom: 2px solid black; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
            .label { font-size: 10px; text-decoration: underline; display: block; }
            .value { font-size: 14px; font-weight: bold; margin-bottom: 5px; display: block; }
            .barcode-container { text-align: center; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">ETASCOM_AUTOMOTIVE</div>
          <span class="label">RÉFÉRENCE</span><span class="value">${p.ref}</span>
          <span class="label">DÉSIGNATION</span><span class="value">${p.nom}</span>
          <div style="display:flex; justify-content: space-between;">
            <div><span class="label">N° LOT</span><span class="value">${p.lot}</span></div>
            <div><span class="label">QTÉ</span><span class="value">${p.qte} PCS</span></div>
          </div>
          <div class="barcode-container"><svg id="barcode"></svg></div>
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
    <div className="p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Inventaire des Produits</h1>
        <button onClick={() => { setEditingIndex(null); setNewProd({ ref: '', nom: '', qte: 0, prix: 0,lot:'', client: '', statut: '' }); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Ajouter un produit </button>
      </div>

      <div className="border rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50 border-b text-xs text-gray-600 uppercase">
            <tr>
              <th className="p-3">Référence</th>
              <th className="p-3">Désignation</th>
              <th className="p-3">Qté</th>
              <th className="p-3">Prix</th>
              <th className="p-3">N° Lot</th>
              <th className="p-3">Client</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {produits.map((p, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{p.ref}</td>
                <td className="p-3">{p.nom}</td>
                <td className="p-3">{p.qte}</td>
                <td className="p-3 text-blue-600 font-bold whitespace-nowrap">{p.prix} DH</td>
                <td className="p-3 text-xs font-mono text-gray-400">{p.lot}</td>
                <td className="p-3 text-gray-600">{p.client}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.statut === 'En Stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {p.statut}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-2 items-center">
                    
                    <button onClick={() => openEditModal(index)} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs">Modifier</button>
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs">Supprimer</button>
                    <button onClick={() => handlePrintEtiquette(p)} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold hover:bg-blue-200">🏷️ Étiquette</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{editingIndex !== null ? "Modifier le Produit" : "Nouveau Produit"}</h2>
            <div className="space-y-3">
              <input value={newProd.ref} type="text" placeholder="Référence" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, ref: e.target.value})} />
              <input value={newProd.nom} type="text" placeholder="Désignation" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, nom: e.target.value})} />
              <input value={newProd.qte} type="number" placeholder="Quantité" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, qte: Number(e.target.value)})} />
              <input value={newProd.prix} type="number" placeholder="Prix" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, prix:Number(e.target.value) })} />
              <input value={newProd.client} type="text" placeholder="Client" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, client: e.target.value})} />
              <select value={newProd.statut} className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProd({...newProd, statut: e.target.value})}>
                <option value="">Sélectionner Statut</option>
                <option value="En Stock">En Stock</option>
                <option value="Stock Faible">Stock Faible</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setIsModalOpen(false); setEditingIndex(null); }} className="text-gray-500 text-sm">Annuler</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm">
                {editingIndex !== null ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}