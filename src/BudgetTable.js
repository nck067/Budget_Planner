import { React, useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BudgetTable() {
  const [table, setTable] = useState([]);

  // Saņem visus ierakstus par projektiem no datubāzes
  const fetchAllBudgets = () => {
    axios.get(`http://localhost:3004/finances`).then((response) => {
      setTable(response.data);
      console.log(response.data);
    });
  };

  // Uz komponenta ielādi vienu reizi atjauninam datus par šobrīd esošajām vērtībām
  useEffect(() => {
    fetchAllBudgets();
  }, []);

  // lapu maršrutēšana
  const navigate = useNavigate();

  function handleClick() {
    navigate('../form');
  }

  function handleLogOut() {
    navigate('/');
  }

  const lastElement = table[table.length - 1]; // Savācam pēdējo elementu no masīva

  return (
    <Container className='mt-4'>
      <Row>
        <Col>
          <Button
            className='mb-3'
            variant='outline-danger'
            size='sm'
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button className='mb-3' onClick={handleClick}>
            Create new report
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Income</td>
            <td>${lastElement?.income || 0}</td> {/* Display the last element's income property */}
          </tr>
          <tr>
            <td>Expenses</td>
            <td>${lastElement?.expenses || 0}</td> {/* Display the last element's expenses property */}
          </tr>
          <tr>
            <td>Savings</td>
            <td>${lastElement?.savings || 0}</td> {/* Display the last element's savings property */}
          </tr>
          <tr>
            <td>Total</td>
            <td>
              ${lastElement?.income - lastElement?.expenses || 0}
            </td> {/* Calculate the total using the last element's properties */}
          </tr>
          <tfoot>
            <tr>
              <td colSpan={2}>
                {(lastElement?.income - lastElement?.expenses) + lastElement?.savings >
                0 ? (
                  <Badge bg='success'>You are saving money!</Badge>
                ) : (
                  <Badge bg='danger'>
                    You are spending more than you earn!
                  </Badge>
                )}
              </td>
            </tr>
          </tfoot>
        </tbody>
      </Table>
    </Container>
  );
}

export default BudgetTable;
