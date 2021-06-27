import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

//const API_URL = 'http://localhost:8008/api/';
const API_URL = 'https://flashcard-io-project.ew.r.appspot.com/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'test/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }

  getAllUsers(){
    return axios.get(API_URL + 'user/all');
  }

  getAllSets() {
    return axios.get(API_URL + 'set/all');
  }

  getAllGames() {
    return axios.get(API_URL + 'game/all');
  }

  getRanking(setId){
    return axios.get(API_URL + 'game/set?index='+setId);
  }

  postSet(set){
    return axios({
      method: 'post',
      url: API_URL + 'admin/set',
      headers: {},
      data: set,
      config: { headers: authHeader() }
    })
  }

  postGame(game){

    return axios({
      method: 'post',
      url: API_URL + 'game',
      headers: {},
      data: game,
      config: { headers: authHeader() }
    })
  }


}

export default new UserService();
