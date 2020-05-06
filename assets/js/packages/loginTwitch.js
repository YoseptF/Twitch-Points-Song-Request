const Twitch = (() => {

  const clientId = 'ywmn3hsh9suwikirumjrq9oqk0szfc'
  const redirectUrl = 'http://localhost:1314/'
  const scopes = 'user:read:email'

  const url = `https://id.twitch.tv/oauth2/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUrl}` +
    `&response_type=token` +
    `&scope=${scopes}`


  const login = () => {
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => console.log('json: ', json))
  }

  return { login }

})()

export default Twitch