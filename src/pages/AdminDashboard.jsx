import { useState } from 'react';

export default function AdminDashboard({ services, setServices }) {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const updateService = (id, field, value) => setServices((current) => current.map((service) => service.id === id ? { ...service, [field]: Number(value) } : service));
  const addService = () => {
    if (!newName.trim() || !newPrice) return;
    setServices((current) => [...current, { id: Date.now().toString(), name: newName.trim(), price: Number(newPrice), duration: 120 }]);
    setNewName('');
    setNewPrice('');
  };

  return <main className="dashboard"><div><p className="eyebrow">ADMINISTRACIÓN</p><h1>Configuración de Haru</h1><p>Edita la oferta sin depender de desarrollo.</p></div><section className="card admin"><h2>Servicios, precios y duración</h2><div className="service-table"><div className="table-head"><span>Servicio</span><span>Desde</span><span>Duración</span></div>{services.map((service) => <div className="table-row" key={service.id}><span>{service.name}</span><label>S/<input type="number" value={service.price} onChange={(event) => updateService(service.id, 'price', event.target.value)}/></label><label><input type="number" value={service.duration} onChange={(event) => updateService(service.id, 'duration', event.target.value)}/> min</label></div>)}</div><h3>Nuevo servicio</h3><div className="new-service"><input placeholder="Nombre del servicio" value={newName} onChange={(event) => setNewName(event.target.value)}/><input type="number" placeholder="Precio" value={newPrice} onChange={(event) => setNewPrice(event.target.value)}/><button type="button" onClick={addService}>Agregar</button></div></section><section className="card settings"><h2>Reglas de agenda</h2><p>Horario: lunes a sábado, 11:00 AM – 8:00 PM</p><button type="button" className="ghost">Gestionar feriados</button><button type="button" className="ghost">Gestionar artistas</button><button type="button" className="ghost">Editar preguntas del wizard</button></section></main>;
}
