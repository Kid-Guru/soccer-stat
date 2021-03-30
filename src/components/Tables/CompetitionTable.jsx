import React from 'react';
import { Table } from 'react-bootstrap';

const CompetitionTable = ({ list }) => {

  if (list.length === 0) {
    return <h4 className="text-center">Нет игр. Выберите другой период.</h4>
  }
  return (
    <Table bordered hover size="sm" className='text-center'>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Хозяева</th>
          <th>Счет</th>
          <th>Гости</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {list.map(m => <tr key={m.id}><td>{m.date}</td><td>{m.homeTeam.name}</td><td>{`${m.score.homeTeam}:${m.score.awayTeam}`}</td><td>{m.awayTeam.name}</td><td>{m.status}</td></tr>)}
      </tbody>
    </Table>

  )
}

export default CompetitionTable