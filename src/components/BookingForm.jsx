import React, { useState } from 'react';

const BookingForm = ({ onSave, initialData }) => {
  const [nickname, setNickname] = useState(initialData?.nickname || '');
  const [data, setData] = useState(initialData?.data || '');
  const [horario, setHorario] = useState(initialData?.horario || '');
  const [titulo_do_jogo, setTitulo_do_jogo] = useState(initialData?.titulo_do_jogo || '');

  React.useEffect(() => {
    setNickname(initialData?.nickname || '');
    setData(initialData?.data || '');
    setHorario(initialData?.horario || '');
    setTitulo_do_jogo(initialData?.titulo_do_jogo || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooking = { nickname, data, horario, titulo_do_jogo };
    onSave(updatedBooking); 
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Nickname</label>
        <input
          type="text"
          className="form-control"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Data</label>
        <input
          type="date"
          className="form-control"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Horário</label>
        <input
          type="time"
          className="form-control"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Título do Jogo</label>
        <input
          type="text"
          className="form-control"
          value={titulo_do_jogo}
          onChange={(e) => setTitulo_do_jogo(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {initialData ? 'Atualizar' : 'Salvar'}
      </button>
    </form>
  );
};

export default BookingForm;
