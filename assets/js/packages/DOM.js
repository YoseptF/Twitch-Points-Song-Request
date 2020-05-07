import Firebase from "./Firebase"

const setDOMInterface = user => {
  $('.userImg').src = user.profile_image_url
  $('.userDisplayName').innerHTML = user.display_name
}

const hideDOMSongEvent = () => {
  $('.songEventSetter').style.display = 'none'
}

const setDOMSongEvent = (event) => {
  $('#reward-id').value = event
}

const songEventButtonListener = () => {
  $('.setEventButton').on('click', () => {
    Firebase.songEvent = $('#reward-id').value
  })
}

const setDOMCurrentSong = (song) => {
  $('.videPlayer').src = `https://www.youtube.com/embed/${song}`
  $('.videPlayer').addEventListener("onStateChange", function (state) {
    if (state === 0) {
      console.log('finish');
    }
  });
}

const setDOMSongsTable = async (songList) => {

  console.log('src: ', $('.videPlayer').src == '');

  if ($('.videPlayer').src == '') {
    setDOMCurrentSong(songList[0])
  }

  const pendingSongs = $('.pendingSongs');

  pendingSongs.innerHTML = ''

  for (let i = 1; i < songList.length; i++) {
    let response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${songList[i]}`)
    let json = await response.json()

    pendingSongs.innerHTML += `
    <tr>
    <th scope="row">${i}</th>
    <td>${json.title}</td>
    <td><a href="${json.url}" target='_blank'>${json.url}</a></td>
    <td><button class="btn btn-block btn-danger deleteSongButton" data-id="${songList[i]}">Delete</button></td>
    </tr>
    `
  }

  $$('.deleteSongButton').forEach(button => {
    button.on('click', () => {
      console.log('button: ', button.dataset.id);
      Firebase.removeSong(button.dataset.id)
    })
  })
}

const setDOMAddSongButton = () => {
  $('.addNewSongButton').on('click', (event) => {
    event.preventDefault()
    if(event.target.previousElementSibling.value != '')
    Firebase.addSong(event.target.previousElementSibling.value)
  })
}

export {
  setDOMInterface,
  hideDOMSongEvent,
  setDOMSongEvent,
  songEventButtonListener,
  setDOMCurrentSong,
  setDOMSongsTable,
  setDOMAddSongButton
}