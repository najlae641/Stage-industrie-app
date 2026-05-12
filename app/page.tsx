"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Données fictives pour les graphiques
const dataBar = [
  { name: 'Jan', commandes: 45, livraisons: 38 },
  { name: 'Fév', commandes: 52, livraisons: 48 },
  { name: 'Mar', commandes: 48, livraisons: 45 },
  { name: 'Avr', commandes: 61, livraisons: 55 },
];

const dataPie = [
  { name: 'Livré', value: 392 },
  { name: 'En cours', value: 64 },
];

const COLORS = ['#10b981', '#f59e0b'];

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Statistique</h1>
        <p className="text-gray-500 text-sm">Analyse globale de l'inventaire et des flux</p>
      </header>

      {/* 1. Les Cartes de Statistiques (Total Produit, Commande, Livraison) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-blue-600">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Produits</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-4xl font-black text-gray-800">1,284</p>
            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">Articles</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-orange-500">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Commandes</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-4xl font-black text-gray-800">456</p>
            <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs font-medium">Reçues</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-green-500">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Livraisons</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-4xl font-black text-gray-800">392</p>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-medium">Terminées</span>
          </div>
        </div>
      </div>

      {/* 2. Section Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique à barres : Commandes vs Livraisons */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Performance des Livraisons</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commandes" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Commandes" />
                <Bar dataKey="livraisons" fill="#10b981" radius={[4, 4, 0, 0]} name="Livraisons" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique Circulaire : Statut des commandes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Répartition des Commandes</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm font-medium">
              <span className="text-green-600">● Livré</span>
              <span className="text-orange-500">● En cours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}