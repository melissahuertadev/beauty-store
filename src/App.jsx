import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { initialClients, initialServices, extras } from './data/booking';
import AdminDashboard from './pages/AdminDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import ClientWizard from './pages/ClientWizard';

const initialForm = {
  name: '', dni: '', phone: '', source: 'Instagram', currentSystem: 'Ningún sistema', days: '',
  condition: 'No', sensitive: 'No', category: 'Manicura', service: 'gel', pedicureService: 'pedi', extras: [],
  length: 'Largo 1', shape: 'Almendra', date: '', time: '', notes: '',
};

export default function App() {
  const [view, setView] = useState('client');
  const [step, setStep] = useState(0);
  const [services, setServices] = useState(initialServices);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [clients, setClients] = useState(initialClients);

  const selectedServices = form.category === 'Manicura y pedicura'
    ? services.filter((service) => service.id === form.service || service.id === form.pedicureService)
    : services.filter((service) => service.id === form.service);
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0) + form.extras.reduce((sum, id) => sum + (extras.find((extra) => extra.id === id)?.price || 0), 0);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggleExtra = (id) => update('extras', form.extras.includes(id) ? form.extras.filter((extraId) => extraId !== id) : [...form.extras, id]);
  const submit = () => {
    setSubmitted(true);
    setClients((current) => [{ id: Date.now(), name: form.name || 'Nueva clienta', phone: form.phone, visits: 0, last: 'Nueva reserva', status: 'Pendiente de confirmación', service: selectedServices.map((service) => service.name).join(' + '), artist: 'Por asignar', appointmentDate: form.date, appointmentTime: form.time, note: '', photos: [] }, ...current]);
  };

  return (
    <div className="app">
      <Header view={view} onViewChange={setView} />
      {view === 'client' && <ClientWizard {...{ step, setStep, form, update, services, selectedServices, total, toggleExtra, submitted, setSubmitted, submit }} />}
      {view === 'artist' && <ArtistDashboard clients={clients} setClients={setClients} />}
      {view === 'admin' && <AdminDashboard services={services} setServices={setServices} />}
      <Footer />
    </div>
  );
}
