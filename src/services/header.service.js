export default function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));
    // console.log("user.token : ", user)
    if (token) {
        return {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
    } else {
        return {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
    }
}