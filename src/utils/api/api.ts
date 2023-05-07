import ApiList from './apiList';
import { url } from './baseUrl';
import request from './request';

export const getBaseUrl = ()=> {
    return url;
}

export const getAllDiscrepancies = async(data = {})=> {
    return request.get(ApiList.All, data);
}

export const getDiscrepanciesByPlayer = async(data = {})=> {
    return request.get(ApiList.Player, data);
}

export const getDiscrepanciesByGame = async(data = {})=> {
    return request.get(ApiList.Game, data);
}

export const getDiscrepanciesByTeam = async(data = {})=> {
    return request.get(ApiList.Team, data);
}
