import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, onSave }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/agendamentos/${booking.id}`);
      alert('Reserva excluída');
      onSave();
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${booking.id}`);
  };

  return (
    <div className="booking-card">
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
};
