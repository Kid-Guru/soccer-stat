import React from 'react';
import { Table } from 'react-bootstrap';

const TeamTable = ({ list }) => {

  if (list.length === 0) {
    return <h4 className="text-center">Нет игр. Выберите другой период.</h4>
  }
  return (
    <Table bordered hover size="sm" className='text-center'>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Турнир</th>
          <th>Соперник</th>
          <th>Счет</th>
          <th>Победитель</th>
        </tr>
      </thead>
      <tbody>
        {list.map(m => <tr key={m.id}><td>{m.date}</td><td>{m.competition.name}</td><td>{m.rival.name}</td><td>{`${m.score.homeTeam}:${m.score.awayTeam}`}</td><td>{m.winner.name}</td></tr>)}
      </tbody>
    </Table>

  )
}

export default TeamTable