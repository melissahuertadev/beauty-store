export const initialServices = [
  { id: 'mani', name: 'Manicura (limpieza y limado)', price: 40, duration: 60 },
  { id: 'gel', name: 'Gel color entero', price: 60, duration: 120 },
  { id: 'rubber', name: 'Rubber', price: 70, duration: 150 },
  { id: 'acrilica', name: 'Acrílico', price: 80, duration: 210 },
  { id: 'builder', name: 'Builder', price: 80, duration: 150 },
  { id: 'polygel', name: 'Polygel sobre uña natural', price: 90, duration: 180 },
  { id: 'soft', name: 'Soft gel', price: 90, duration: 180 },
  { id: 'pedi', name: 'Pedicura en seco', price: 70, duration: 75 },
  { id: 'spa', name: 'Pedicura spa', price: 90, duration: 105 },
];

export const extras = [
  { id: 'retiroGRB', name: 'Retiro Gel, Rubber o Builder', price: 20 },
  { id: 'retiroSGP', name: 'Retiro Soft Gel o Polygel', price: 30 },
  { id: 'retiroAcr', name: 'Retiro Acrílico', price: 40 },
];

export const bookingSteps = ['Tus datos', 'Estado de uñas', 'Tu servicio', 'Diseño', 'Cita'];
export const timeSlots = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export const initialClients = [
  { id: 1, name: 'Camila Torres', phone: '987 654 321', visits: 3, last: '12 Ago 2026', status: 'Confirmada', service: 'Rubber', artist: 'Valeria', note: 'Uñas saludables; próxima visita en 3 semanas.' },
  { id: 2, name: 'Andrea Rojas', phone: '934 118 500', visits: 1, last: 'Sin visitas anteriores', status: 'Pendiente', service: 'Gel color', artist: 'Por asignar', note: '' },
];
