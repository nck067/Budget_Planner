import { Container, Button, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetForm() {
   const [budget, setBudget] = useState({});

  // Links uz datubāzi
  const dbUrl = 'http://localhost:3004/finances'

  // Atjaunina veidlapas datus, kad lietotājs sniedz datus
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setBudget(values => ({...values, [name]: value}))
  }

  // Nosūtam datus uz datubāzi 
  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(dbUrl, budget)
            .then(function (res) {
              console.log(res.data);    
              // routes the user to added product page after form is submitted
              handleClick();
            });
    }
  
  const fetchAllBudgets = () => {
    axios.get(`http://localhost:3004/finances`).then((response) => {
      console.log(response.data);
    });
  }

  useEffect(() => {
    fetchAllBudgets();
  }, []);
  

  const navigate = useNavigate()

  function handleClick() {
    navigate("../table")
  }

  return (
   
    
    <Container className='main-contaier'>
      
      <Row>
      <Row>
        <Col className='d-flex justify-content-end mb-5'>
        <Button variant='warning' onClick={handleClick}>Cancel</Button>
        </Col>
      </Row>
        <Col>
        <Row className='mb-6'>
        <Col className='d-flex justify-content-center'>
          <h1 className='heading'>Budget Calculator</h1>
        </Col>
      </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2 mt-5' controlId="income">
              <Form.Label>Income</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your income"
                name='income'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-2' controlId="expenses">
              <Form.Label>Expenses</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your expenses"
                name='expenses'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="savings">
              <Form.Label>Savings</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your savings"
                name='savings'
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className='mt-3' variant='info' type='submit'>Calculate</Button>
          </Form>
        </Col>
      </Row>
    </Container>

  );
  
}

export default BudgetForm;