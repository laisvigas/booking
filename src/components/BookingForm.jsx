import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
    
    setNickname('');
    setData('');
    setHorario('');
    setTitulo_do_jogo('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 text-white">
      <Form.Group className="mb-3" controlId="nickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="data">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="horario">
        <Form.Label>Horário</Form.Label>
        <Form.Control
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="titulo_do_jogo">
        <Form.Label>Título do Jogo</Form.Label>
        <Form.Control
          type="text"
          value={titulo_do_jogo}
          onChange={(e) => setTitulo_do_jogo(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        {initialData ? 'Atualizar' : 'Salvar'}
      </Button>
    </Form>
  );
};

export default BookingForm;
