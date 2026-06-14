"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (username === 'admin' && password === '1234') {
      alert("Bienvenue");
      router.push('/produits'); 
    } else {
      alert("Nom d'utilisateur  ou mot de pass incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Connexion</h2>
        <input 
          placeholder="Admin" 
          className="border p-2 w-full mb-3" 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="1234" 
          className="border p-2 w-full mb-3" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Se connecter</button>
      </form>
    </div>
  );
}