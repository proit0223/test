import { Player } from '../model/Player';
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Tag } from "antd";
import { GameAttribute } from "../model/GameAttribute";

export const GAME = "Game"
export const TEAM = "Team"
export const PLAYER = "Player"

const TEAM_KEY = 'team'
const ATTENDANCE = 'attendance'
const RUSH_ATTEMPS = 'rushAttempts'
const RUSH_TOUCH_DOWNS = 'rushTds'
const RUSH_YARDS_GAINED = 'rushYdsGained'
const RECEPTIONS = 'rec'
const RECEIVING_YARDS = 'receivingYards'

const COLUMN_TITLES = {
    team: 'Team',
    attendance: 'Attendance',
    rushAttempts: 'Rush Attempts',
    rushTds: 'Rush Touch Downs',
    rushYdsGained: 'Rush Yards Ganed',
    rec: 'Receptions',
    receivingYards: 'Receiving Yards',
}

const renderStatus = (item: any)=> {            
    if(!item.isReject){
        return ''
    }

    let color = 'volcano';
    if (item.isReject === 1) {
        color = 'green';
    }
    return (
        <Tag color={color} key={item.isReject??'noaction'}>
            Resolved
        </Tag>
    );
}

const renderActionBtn = (item: any, resolveItem: any, rejectItem: any)=> {
    if(item.keyName=='id') return''
    return (
        <Space size="middle">
            <Button size='small' type="primary" danger
                onClick={()=>{
                    rejectItem(item);
                }}
            >Ignore</Button>
            <Button size='small' type='primary'
                onClick={()=>{
                    resolveItem(item);
                }}
            >Resolve</Button>
        </Space>
    )
}

export const generateColumns = (type: string, resolveItem: any, rejectItem: any): ColumnsType<any>=> {
    switch(type) {
    case GAME:
        const gameColumns: ColumnsType<GameAttribute> = [
            {
                title: "Game Id",
                dataIndex: 'id',
                key: 'id',
                width: '30%',
            },
            {
                title: COLUMN_TITLES[ATTENDANCE],
                key: ATTENDANCE,
                dataIndex: ATTENDANCE,
                width: '30%',
            },
            {
                title: 'Status',
                render: (item)=> renderStatus(item)
            },
            {
                title: 'Action',
                key: 'action',
                width: 200,
                render: (item)=> renderActionBtn(item, resolveItem, rejectItem)
            },
        ];
        return gameColumns
    case TEAM:
        const teamColumns: ColumnsType<GameAttribute> = [
            {
                title: 'Team Id',
                key: 'teamId',
                dataIndex: 'id',
            },
            {
                title: COLUMN_TITLES[TEAM_KEY],
                key: TEAM_KEY,
                dataIndex: 'name',
            },
            {
                title: COLUMN_TITLES[RUSH_ATTEMPS],
                key: RUSH_ATTEMPS,
                dataIndex: RUSH_ATTEMPS,
            },
            {
                title: COLUMN_TITLES[RUSH_TOUCH_DOWNS],
                key: RUSH_TOUCH_DOWNS,
                dataIndex: RUSH_TOUCH_DOWNS,
            },
            {
                title: COLUMN_TITLES[RUSH_YARDS_GAINED],
                key: RUSH_YARDS_GAINED,
                dataIndex: RUSH_YARDS_GAINED,
            },
            {
                title: COLUMN_TITLES[RECEPTIONS],
                key: RECEPTIONS,
                dataIndex: RECEPTIONS,
            },
            {
                title: COLUMN_TITLES[RECEIVING_YARDS],
                key: RECEIVING_YARDS,
                dataIndex: RECEIVING_YARDS,
            },
            {
                title: 'Status',
                render: (item) =>renderStatus(item)
            },
            {
                title: 'Action',
                key: 'action',
                width: 200,
                render: (item)=> renderActionBtn(item, resolveItem, rejectItem)
            },
        ];
        return teamColumns
    default:
        const playerColumns: ColumnsType<Player> = [
            {
                title: 'Player Id',
                render: (player) => player.id,
            },
            {
                title: COLUMN_TITLES[TEAM_KEY],
                key: TEAM_KEY,
                dataIndex: TEAM_KEY,
            },
            {
                title: COLUMN_TITLES[RUSH_ATTEMPS],
                key: RUSH_ATTEMPS,
                dataIndex: RUSH_ATTEMPS,
            },
            {
                title: COLUMN_TITLES[RUSH_TOUCH_DOWNS],
                key: RUSH_TOUCH_DOWNS,
                dataIndex: RUSH_TOUCH_DOWNS,
            },
            {
                title: COLUMN_TITLES[RUSH_YARDS_GAINED],
                key: RUSH_YARDS_GAINED,
                dataIndex: RUSH_YARDS_GAINED,
            },
            {
                title: COLUMN_TITLES[RECEPTIONS],
                key: RECEPTIONS,
                dataIndex: RECEPTIONS,
            },
            {
                title: COLUMN_TITLES[RECEIVING_YARDS],
                key: RECEIVING_YARDS,
                dataIndex: RECEIVING_YARDS,
            },
            {
                title: 'Status',
                render: (item)=> renderStatus(item)
            },
            {
                title: 'Action',
                key: 'action',
                width: 200,
                render: (item)=> renderActionBtn(item, resolveItem, rejectItem)
            }
        ];
        return playerColumns;
    }
}