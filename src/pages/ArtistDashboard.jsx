import { useEffect, useState } from 'react';
import Icon from '../components/Icon';

const formatDate = (value) => {
  if (!value) return 'Fecha pendiente';
  return new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(new Date(`${value}T12:00:00`));
};

export default function ArtistDashboard({ clients, setClients }) {
  const [selectedId, setSelectedId] = useState(clients[0]?.id);
  const [note, setNote] = useState('');
  const selected = clients.find((client) => client.id === selectedId);

  useEffect(() => {
    setNote(selected?.note || '');
  }, [selectedId]);

  const updateClient = (id, changes) => {
    setClients((current) => current.map((client) => client.id === id ? { ...client, ...changes } : client));
  };

  const handlePhotos = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setClients((current) => current.map((client) => client.id === selected.id
          ? { ...client, photos: [...(client.photos || []), { name: file.name, src: reader.result }] }
          : client));
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  return (
    <main className="dashboard artist-dashboard">
      <div>
        <p className="eyebrow">PANEL DE ARTISTA</p>
        <h1>Agenda y seguimiento</h1>
        <p>Confirma solicitudes, organiza la agenda y registra la atención de tus clientas.</p>
      </div>

      <div className="dashboard-grid">
        <section className="card client-list">
          <h2>Solicitudes y citas</h2>
          {clients.map((client) => (
            <button type="button" className={selectedId === client.id ? 'selected' : ''} onClick={() => setSelectedId(client.id)} key={client.id}>
              <strong>{client.name}</strong>
              <span>{client.status} · {client.service}</span>
              <small>{formatDate(client.appointmentDate)}{client.appointmentTime ? ` · ${client.appointmentTime}` : ''}</small>
            </button>
          ))}
        </section>

        {selected && <section className="card client-record">
          <div className="record-title">
            <div>
              <p className="eyebrow">FICHA DE CLIENTA</p>
              <h2>{selected.name}</h2>
              <p>{selected.phone} · {selected.visits} visita{selected.visits !== 1 ? 's' : ''}</p>
            </div>
            <span className={`pill ${selected.status.toLowerCase().replaceAll(' ', '-')}`}>{selected.status}</span>
          </div>

          <div className="history">
            <div><small>Fecha y hora</small><b>{formatDate(selected.appointmentDate)}{selected.appointmentTime ? ` · ${selected.appointmentTime}` : ''}</b></div>
            <div><small>Servicio</small><b>{selected.service}</b></div>
            <div><small>Artista</small><b>{selected.artist}</b></div>
          </div>

          {selected.status !== 'Atendida' && selected.status !== 'Cancelada' && <section className="appointment-actions">
            <h3>Gestionar cita</h3>
            <div className="action-buttons">
              {selected.status !== 'Confirmada' && <button type="button" onClick={() => updateClient(selected.id, { status: 'Confirmada' })}><Icon name="check" /> Confirmar cita</button>}
              {selected.status === 'Confirmada' && <button type="button" onClick={() => updateClient(selected.id, { status: 'Atendida', last: formatDate(selected.appointmentDate), visits: (selected.visits || 0) + 1 })}><Icon name="check" /> Marcar como atendida</button>}
              <button type="button" className="ghost danger" onClick={() => updateClient(selected.id, { status: 'Cancelada' })}><Icon name="close" /> Cancelar</button>
            </div>

            <details className="reschedule">
              <summary><Icon name="clock" /> Reprogramar cita</summary>
              <div className="reschedule-fields">
                <label>Nueva fecha<input type="date" value={selected.appointmentDate || ''} onChange={(event) => updateClient(selected.id, { appointmentDate: event.target.value })} /></label>
                <label>Nueva hora<input type="time" value={selected.appointmentTime || ''} onChange={(event) => updateClient(selected.id, { appointmentTime: event.target.value })} /></label>
              </div>
              <small>La nueva fecha y hora se guardan al cambiarlas.</small>
            </details>
          </section>}

          {selected.status === 'Atendida' && <section className="appointment-photos">
            <h3>Fotos del servicio</h3>
            <label className="photo-upload"><Icon name="image" /> Añadir fotos<input type="file" accept="image/*" multiple onChange={handlePhotos} /></label>
            {selected.photos?.length > 0 && <div className="appointment-photo-grid">{selected.photos.map((photo, index) => <figure key={`${photo.name}-${index}`}><img src={photo.src} alt={`Foto del servicio: ${photo.name}`} /><figcaption>{photo.name}</figcaption></figure>)}</div>}
          </section>}

          <section className="follow-up">
            <h3>Seguimiento clínico/estético</h3>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ej. Uñas saludables, sellado correcto; recomendar retorno en 3 semanas." />
            <button type="button" className="ghost" onClick={() => updateClient(selected.id, { note })}><Icon name="note" /> Guardar nota</button>
          </section>
        </section>}
      </div>
    </main>
  );
}
