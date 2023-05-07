import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { getDiscrepanciesByTeam } from '../../utils/api/api';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
import * as TeamModel from '../../model/Team';
import { generateColumns, TEAM } from '../../utils/common';


const Team = ()=> {
  const [teamData, setTeamData] = useState<TeamModel.Team[]>([]);

  useEffect(() => {
    getDiscrepanciesByTeam().then(result=>{
      const teams = pairDataForTeam(result);
      setTeamData(teams);
    })
  }, []);

  const resolveItem = (item:TeamModel.Team) =>{
    resolveObject('team', item.id);
    setTeamData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.name == item.name) {
          return {...obj, isReject: 1};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }

  const rejectItem = (item:TeamModel.Team) =>{
    rejectObject('team', item.id);
    setTeamData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.name == item.name)
      }),
    );
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Team </p>
      <div className='px-5'>
        <Table columns={generateColumns(TEAM, resolveItem, rejectItem)} dataSource={teamData} pagination={false}/>
      </div>
    </div>
  );
}

export default Team;