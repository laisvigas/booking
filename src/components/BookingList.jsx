import React from 'react';
import axios from 'axios';

const BookingList = ({ bookings, onEdit, onSave }) => {
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/agendamentos/${id}`);
        onSave(); 
      } catch (error) {
        console.error('Erro ao excluir reserva:', error);
      }
    };
  
    return (
      <div>
        {bookings.map((booking) => (
          <div key={booking.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{booking.titulo_do_jogo}</h5>
              <p className="card-text">
                <strong>Nickname:</strong> {booking.nickname} <br />
                <strong>Data:</strong> {booking.data} <br />
                <strong>Horário:</strong> {booking.horario}
              </p>
              <button onClick={() => onEdit(booking)} className="btn btn-warning me-2">
                Editar
              </button>
              <button onClick={() => handleDelete(booking.id)} className="btn btn-danger">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BookingList;
  