import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingList from '../../components/BookingList';
import BookingForm from '../../components/BookingForm';

const Home = () => {
  const [bookings, setBookings] = useState([]);

  // armazena a reserva que está sendo editada
  const [editingBooking, setEditingBooking] = useState(null); 

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/agendamentos');

      // atualiza a lista de reservas
      setBookings(response.data); 
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  };

  const handleEdit = (booking) => {

    // define a reserva que está sendo editada
    setEditingBooking(booking); 
  };

  const handleSave = async (updatedBooking) => {
    try {
      if (editingBooking) {
        // atualiza reserva existente
        await axios.put(`http://localhost:3001/agendamentos/${editingBooking.id}`, updatedBooking);
        setEditingBooking(null);
      } else {
        // cria nova reserva
        await axios.post('http://localhost:3001/agendamentos', updatedBooking);
      }

      // atualiza a lista de reservas
      fetchBookings(); 
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">Gerenciamento de Reservas</h1>
      <BookingForm
        onSave={handleSave}
        initialData={editingBooking}
      />
      {editingBooking && (
        <button onClick={handleCancelEdit} className="btn btn-secondary mb-4">
          Cancelar Edição
        </button>
      )}
      <BookingList bookings={bookings} onEdit={handleEdit} onSave={fetchBookings} />
    </div>
  );
};

export default Home;
