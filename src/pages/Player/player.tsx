import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import * as PlayerModel from '../../model/Player';
import { getDiscrepanciesByPlayer } from '../../utils/api/api';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
import { generateColumns, PLAYER } from '../../utils/common';

const Player = ()=> {
  const [playersData, setPlayersData] = useState<PlayerModel.Player[]>([]);

  useEffect(() => {
    getDiscrepanciesByPlayer().then(result=>{
      pairAll(result);
    })
  }, []);

  const pairAll = (data:any)=> {
    const homePlayers = pairDataForPlayer(data['homePlayers'] , data['home']['id'] , 'home');
    const awayPlayers = pairDataForPlayer(data['awayPlayers'] , data['away']['id'] , 'away');
    setPlayersData([...homePlayers,...awayPlayers]);
  }

  const resolveItem = (item:PlayerModel.Player) =>{
    resolveObject(item.team+ 'players', item.id);
    setPlayersData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.team == item.team) {
          return {...obj, isReject: 1};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }

  const rejectItem = (item:PlayerModel.Player) =>{
    rejectObject(item.team+ 'players', item.id)
    setPlayersData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.team == item.team)
      }),
    );
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Player </p>
      <div className='px-5'>
        <Table columns={generateColumns(PLAYER, resolveItem, rejectItem)} dataSource={playersData} pagination={false}/>
      </div>
    </div>
  );
}

export default Player;
