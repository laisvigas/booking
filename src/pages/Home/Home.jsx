import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookingForm from '../../components/BookingForm';

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const formRef = useRef(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/agendamentos');
      setBookings(response.data);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    if (formRef.current) {
        // foca no formulário
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSave = async (updatedBooking) => {
    try {
      if (editingBooking) {
        await axios.put(`http://localhost:3001/agendamentos/${editingBooking.id}`, updatedBooking);
        setEditingBooking(null);
      } else {
        await axios.post('http://localhost:3001/agendamentos', updatedBooking);
      }
      fetchBookings();
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3001/agendamentos/${bookingId}`);
      fetchBookings(); 
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div
      className="bg-dark text-light"
    >
      <Container className="py-5">
        <Card className="p-4 mb-4 bg-opacity-75 bg-black text-center">
          <h1
            className="text-warning"
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '2rem',
            }}
          >
            Ovelhas Carnudas
          </h1>
          <h3
            className="text-success fst-italic fs-5"
          >
            O seu espaço para jogos digitais e de mesa
          </h3>
          <p className="fs-6 text-white">
            Reserve um jogo e venha se divertir com seus amigos
          </p>
        </Card>

        <Row className="mb-4">
          <Col md={6} sm={12}>
            <Card className="p-3 bg-opacity-75 bg-black" ref={formRef}>
              <BookingForm onSave={handleSave} initialData={editingBooking} />
              {editingBooking && (
                <Button
                  variant="secondary"
                  onClick={handleCancelEdit}
                  className="mt-3"
                >
                  Cancelar Edição
                </Button>
              )}
            </Card>
          </Col>

          <Col
            md={6}
            sm={12}
            className="d-flex justify-content-center align-items-center"

          >
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="imagem do espaço ovelhas carnudas"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          {bookings.map((booking) => (
            <Col md={3} className="mb-4" key={booking.id}>
              <Card className="p-3 bg-opacity-75 bg-black text-white">
                <Card.Body>
                  <Card.Title>{booking.nickname}</Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> {booking.data} <br />
                    <strong>Horário:</strong> {booking.horario} <br />
                    <strong>Jogo:</strong> {booking.titulo_do_jogo}
                  </Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(booking)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Excluir
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
