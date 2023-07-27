import { http } from './http.service';

class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  reinitialiser(user) {
    return http
      .post('/auth/initPassword', {
        email: user.email,
        username: user.username
      })
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }

  logout(user) {
    http
      .get('/auth/logout/' + user._id)
      .then(response => {
        if (response.data.info == "ok") {
          localStorage.removeItem('user');
        }
      });
    localStorage.removeItem('user');

  }

  all() {
    return http.get('/auth');
  }
  allClient() {
    return http.get('/auth/frontoffice');
  }
  allAdmin() {
    return http.get('/auth/backoffice');
  }
  save(user) {
    return http.post('/auth/add', {
      nom: user.nom,
      prenom: user.prenom,
      sexe: user.sexe,
      portable: user.portable,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles,
      adresse: user.adresse,
    });
  }

  update(user) {
    return http.put('/auth/'+user._id, {
      _id : user._id,
      nom: user.nom,
      sexe: user.sexe,
      portable: user.portable,
      username: user.username,
      email: user.email,
      password: user.password,
      cni: user.cni,
      profil: user.profil,
      pays: user.pays,
      ville: user.ville,
      profession: user.profession,
    });
  }

  changePicture(data) {
    const formData = new FormData();
    formData.append('profil', data.profil)
    formData.append('_id', data._id)

    return http.post('/api/arl_website/auth/updatePicture', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }
}

export default new AuthService();