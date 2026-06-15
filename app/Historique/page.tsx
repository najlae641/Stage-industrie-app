"use client";
import { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface LogEntry {
  id: number;
  date: string;
  admin: string;
  action: string;
  details: string;
}

export default function HistoriquePage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // جلب الهيستوريك من الـ localStorage فاش كتحل الصفحة
  useEffect(() => {
    const savedLogs = localStorage.getItem('mp_history');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // مسح الهيستوريك بالكامل
  const handleClearHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer tout l'historique ?")) {
      localStorage.removeItem('mp_history');
      setLogs([]);
    }
  };

  // تحميل الهيستوريك كملف PDF منظم
  const downloadHistoryPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des Actions - ETASCOM", 14, 15);
    autoTable(doc, {
      head: [['Date/Heure', 'Utilisateur', 'Action', 'Détails']],
      body: logs.map(log => [log.date, log.admin, log.action, log.details]),
    });
    doc.save("Historique_Actions.pdf");
  };

  // تلوين وسم العملية حسب نوعها (إضافة، حذف...)
  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "Ajout": return "bg-green-100 text-green-800";
      case "Modification": return "bg-blue-100 text-blue-800";
      case "Suppression": return "bg-red-100 text-red-800";
      case "Mise à jour Quantité": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Historique des Actions</h1>
          <p className="text-gray-500 text-xs">Suivi en temps réel de toutes les modifications effectuées par les administrateurs</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadHistoryPDF} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700">
            Exporter PDF
          </button>
          <button onClick={handleClearHistory} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-700">
            Effacer l'historique
          </button>
        </div>
      </div>

      {/* البحث في الهيستوريك */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par utilisateur, action ou détail..."
          className="border p-2 rounded w-full md:w-1/3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* جدول الحركات */}
      <div className="bg-white border rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50 border-b text-xs text-gray-600 uppercase">
            <tr>
              <th className="p-3">Date / Heure</th>
              <th className="p-3">Utilisateur</th>
              <th className="p-3">Action</th>
              <th className="p-3">Détails</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400 italic">Aucune action enregistrée pour le moment.</td>
              </tr>
            ) : (
              logs
                .filter(log => 
                  log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.details.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-xs text-gray-500 font-mono whitespace-nowrap">{log.date}</td>
                    <td className="p-3 font-semibold text-gray-800">{log.admin}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-xs md:text-sm text-gray-600 font-mono">{log.details}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}