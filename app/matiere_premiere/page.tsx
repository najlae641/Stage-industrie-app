
"use client";
import { useState } from 'react'; 

export default function MatierePremierePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const [matieres, setMatieres] = useState([
    { ref: "MP-001", nom: "Acier Galvanisé", qte: 500, prix: 45, lot: "LOT-MP-2026-001", fournisseur: "ArcelorMittal" },
    { ref: "MP-002", nom: "Plastique ABS", qte: 1200, prix: 12, lot: "LOT-MP-2026-002", fournisseur: "Maghreb Plast" },
    { ref: "MP-003", nom: "Câblage Cuivre", qte: 300, prix: 85, lot: "LOT-MP-2026-003", fournisseur: "Nexans" }
  ]);

  const [newMat, setNewMat] = useState({ ref: '', nom: '', qte: 0, prix: 0, fournisseur: '' });

  
  const handleSave = () => {
    const { ref, nom, qte, prix, fournisseur } = newMat;
    
    if (!ref || !nom || !qte || !prix || !fournisseur) {
      alert("Veuillez remplir tout les champs");
      return;
    }

    const lotCode = `LOT-MP-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 900) + 100}`;
    const newItem = { ...newMat, lot: lotCode };
    
    setMatieres([...matieres, newItem]);
    setIsModalOpen(false);
    setNewMat({ ref: '', nom: '', qte: 0, prix: 0, fournisseur: '' });
  };

  const handleDelete = (indexToDelete: number) => {
    setMatieres(matieres.filter((_, index) => index !== indexToDelete));
  };

  const handlePrintEtiquette = (m: any) => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>ETASCOM - MP Étiquette</title>
          <style>
            body { font-family: 'Courier New', monospace; padding: 10px; width: 300px; border: 1px solid #000; }
            .type { background: #000; color: #fff; text-align: center; font-weight: bold; padding: 2px; margin-bottom: 5px; }
            .header { font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 5px; }
            .details { font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="type">MATIÈRE PREMIÈRE</div>
          <div class="header">ETASCOM AUTOMOTIVE</div>
          <div class="details">
            <b>REF:</b> ${m.ref}<br>
            <b>NOM:</b> ${m.nom}<br>
            <b>FOURNISSEUR:</b> ${m.fournisseur}<br>
            <b>LOT:</b> ${m.lot}<br>
            <b>QTÉ:</b> ${m.qte} UNITÉS
          </div>
          <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Matières Premières</h1>
          <p className="text-gray-500 text-sm">Suivi du stock des composants et fournisseurs</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-all">
          + Nouvelle Matière
        </button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600 text-sm uppercase">
              <th className="p-4">Référence</th>
              <th className="p-4">Désignation</th>
              <th className="p-4">Fournisseur</th>
              <th className="p-4">Qté</th>
              <th className="p-4">N° Lot</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {matieres.map((m, index) => (
              <tr key={index} className="border-b hover:bg-green-50 transition-colors">
                <td className="p-4 font-mono text-sm">{m.ref}</td>
                <td className="p-4 font-medium">{m.nom}</td>
                <td className="p-4 text-blue-700 italic">{m.fournisseur}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${m.qte < 100 ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}>
                    {m.qte}
                  </span>
                </td>
                <td className="p-4 text-xs text-gray-500 font-mono">{m.lot}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handlePrintEtiquette(m)} className="text-blue-600 hover:underline text-sm">Étiquette</button>
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline text-sm">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Ajouter Matière Première</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Référence (ex: MP-001)" className="w-full border p-3 rounded-xl outline-blue-500" onChange={(e) => setNewMat({...newMat, ref: e.target.value})} />
              <input type="text" placeholder="Désignation" className="w-full border p-3 rounded-xl outline-blue-500" onChange={(e) => setNewMat({...newMat, nom: e.target.value})} />
              <input type="text" placeholder="Nom du Fournisseur" className="w-full border p-3 rounded-xl outline-blue-500" onChange={(e) => setNewMat({...newMat, fournisseur: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Quantité" className="w-full border p-3 rounded-xl outline-blue-500" onChange={(e) => setNewMat({...newMat, qte:Number(e.target.value) })} />
                <input type="number" placeholder="Prix Unitaire" className="w-full border p-3 rounded-xl outline-blue-500" onChange={(e) => setNewMat({...newMat, prix: Number(e.target.value)})} />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-medium">Annuler</button>
              <button onClick={handleSave} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}