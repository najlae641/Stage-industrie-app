"use client";
import { useState, useEffect } from 'react'; 
import { Toaster, toast } from 'react-hot-toast'; 
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface MatierePremiere {
  ref: string;
  nom: string;
  qte: any;
  prix: any;
  lot: string;
  fournisseur: string;
  statut: string;
}

const downloadRapport = (data: any[], title: string) => {
  const doc = new jsPDF();
  doc.text(title, 14, 15);
  autoTable(doc, {
    head: [['Référence', 'Nom', 'Quantité', 'Prix', 'Fournisseur']],
    body: data.map(m => [m.ref, m.nom, m.qte, m.prix, m.fournisseur]),
  });
  doc.save("Rapport_Matieres_Premieres.pdf");
};

export default function MatierePremierePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [matieres, setMatieres] = useState([
    { ref: "MP-001", nom: "Acier Galvanisé", qte: 500, prix: 45, lot: "LOT-MP-20260511-001", fournisseur: "ArcelorMittal", statut: "En Stock" },
    { ref: "MP-002", nom: "Plastique ABS", qte: 1200, prix: 12, lot: "LOT-MP-20260511-002", fournisseur: "Maghreb Plast", statut: "En Stock" },
    { ref: "MP-003", nom: "Câblage Cuivre", qte: 15, prix: 85, lot: "LOT-MP-20260511-003", fournisseur: "Nexans", statut: "Stock Faible" }
  ]);

  useEffect(() => {
    const lowStockItems = matieres.filter(m => m.statut === 'Stock Faible');
    if (lowStockItems.length > 0) {
      toast.error(`Attention: ${lowStockItems.length} matière(s) première(s) en stock faible !`, {
        duration: 5000,
        position: 'top-right',
      });
    }
  }, [matieres]);

  const [newMat, setNewMat] = useState<MatierePremiere>({ ref: '', nom: '', qte: 0, prix: 0, lot: '', fournisseur: '', statut: '' });
  const [searchTerm, setSearchTerm] = useState("");
  
  // دالة مسؤولة على تسجيل الحركات فالهيستوريك
  const logAction = (actionType: string, details: string) => {
    const currentLogs = JSON.parse(localStorage.getItem('mp_history') || '[]');
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      admin: "Admin Siham", // هنا كيدير اسم الادمين لي مسجل الدخول
      action: actionType,
      details: details
    };
    localStorage.setItem('mp_history', JSON.stringify([newLog, ...currentLogs]));
  };

  const handleUpdateQty = (ref: string, change: number) => {
    setMatieres(prev => prev.map(m => {
      if (m.ref === ref) {
        const newQte = Math.max(0, m.qte + change);
        logAction("Mise à jour Quantité", `${m.nom} (${ref}) : Qte ${m.qte} -> ${newQte}`);
        return { ...m, qte: newQte };
      }
      return m;
    }));
  };

  const handleSave = () => {
    const { ref, nom, qte, prix, fournisseur, statut } = newMat;
    if (!ref || !nom || !qte || !prix || !fournisseur || !statut) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (editingIndex !== null) {
      const updatedMatieres = [...matieres];
      const oldMat = matieres[editingIndex];
      updatedMatieres[editingIndex] = { ...newMat, lot: matieres[editingIndex].lot } as MatierePremiere; 
      setMatieres(updatedMatieres);
      logAction("Modification", `Modification de la matière ${oldMat.nom} (${oldMat.ref})`);
      setEditingIndex(null);
    } else {
      const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); 
      const randomPart = Math.floor(Math.random() * 900) + 100;
      const lotCode = `LOT-MP-${datePart}-${randomPart}`;
      setMatieres([...matieres, { ...newMat, lot: lotCode } as MatierePremiere]);
      logAction("Ajout", `Ajout d'une nouvelle matière: ${nom} (${ref}) avec Qte: ${qte}`);
    }
    setIsModalOpen(false);
    setNewMat({ ref: '', nom: '', qte: 0, prix: 0, lot: '', fournisseur: '', statut: '' });
  };

  const handleDelete = (indexToDelete: number) => {
    const matToDelete = matieres[indexToDelete];
    setMatieres(matieres.filter((_, index) => index !== indexToDelete));
    logAction("Suppression", `Suppression de la matière: ${matToDelete.nom} (${matToDelete.ref})`);
  };

  const openEditModal = (index: number) => {
    const m = matieres[index];
    setNewMat({
      ref: m.ref,
      nom: m.nom,
      qte: m.qte, 
      prix: m.prix,
      lot: m.lot,
      fournisseur: m.fournisseur,
      statut: m.statut
    });
    setEditingIndex(index);
    setIsModalOpen(true);
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
    <div className="p-4 bg-white min-h-screen">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gestion des Matières Premières</h1>
          <p className="text-gray-500 text-xs">Suivi du stock des composants et fournisseurs</p>
        </div>
        <div className="flex gap-2">
            <button onClick={() => downloadRapport(matieres, "Inventaire Matières Premières ETASCOM")} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Exporter PDF</button>
            <button onClick={() => { setEditingIndex(null); setNewMat({ ref: '', nom: '', qte: 0, prix: 0, lot: '', fournisseur: '', statut: '' }); setIsModalOpen(true); }} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Ajouter une matière</button>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Rechercher une matière première..."
          className="border p-2 rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
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
              <th className="p-3">Fournisseur</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {matieres
              .filter((m) => 
                m.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                m.ref.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((m, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium font-mono text-sm">{m.ref}</td>
                  <td className="p-3">{m.nom}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleUpdateQty(m.ref, -1)} className="px-2 bg-red-100 text-red-600 rounded hover:bg-red-200">-</button>
                      <span className="min-w-[20px] text-center font-medium">{m.qte}</span>
                      <button onClick={() => handleUpdateQty(m.ref, 1)} className="px-2 bg-green-100 text-green-600 rounded hover:bg-green-200">+</button>
                    </div>
                  </td>
                  <td className="p-3 text-blue-600 font-bold whitespace-nowrap">{m.prix} DH</td>
                  <td className="p-3 text-xs font-mono text-gray-400">{m.lot}</td>
                  <td className="p-3 text-gray-600 italic">{m.fournisseur}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.statut === 'En Stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {m.statut}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2 items-center">
                      <button onClick={() => openEditModal(index)} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs">Modifier</button>
                      <button onClick={() => handleDelete(index)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs">Supprimer</button>
                      <button onClick={() => handlePrintEtiquette(m)} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold hover:bg-blue-200">🏷️ Étiquette</button>
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
            <h2 className="text-lg font-bold mb-4">{editingIndex !== null ? "Modifier la Matière Première" : "Nouvelle Matière Première"}</h2>
            <div className="space-y-3">
              <input value={newMat.ref} type="text" placeholder="Référence (ex: MP-001)" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, ref: e.target.value})} />
              <input value={newMat.nom} type="text" placeholder="Désignation" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, nom: e.target.value})} />
              <input value={newMat.qte} type="number" placeholder="Quantité" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, qte: Number(e.target.value)})} />
              <input value={newMat.prix} type="number" placeholder="Prix" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, prix: Number(e.target.value)})} />
              <input value={newMat.fournisseur} type="text" placeholder="Fournisseur" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, fournisseur: e.target.value})} />
              <select value={newMat.statut} className="w-full border p-2 rounded text-sm" onChange={(e) => setNewMat({...newMat, statut: e.target.value})}>
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