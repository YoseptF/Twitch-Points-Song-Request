import Firebase from "./Firebase"

const setDOMInterface = user => {
  $('.userImg').src = user.profile_image_url
  $('.userDisplayName').innerHTML = user.display_name
  $('.userGreeting').innerHTML = `Hello, ${user.display_name}!`
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

const setIframeListener = () => {
  var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerStateChange(event) {
    if (event.data == 0) {
      let now = Firebase.songList[0]
      let next = Firebase.songList[1]

      if (next){
        player.loadVideoById(next)
      }
      else {
        DOMToggleEmptySongs()
      }
      Firebase.removeSong(now)
    };
  }
  function onPlayerReady(event) {
    console.log('ready');
  }
}

const setDOMCurrentSong = (song) => {
  const player = $('.player')

  player.src = `https://www.youtube.com/embed/${song}?enablejsapi=1`
  DOMToggleEmptySongs()
  setIframeListener();
}

const DOMToggleEmptySongs = () => {
  const emptyDataSong = $('#player')
  emptyDataSong.dataset.empty = emptyDataSong.dataset.empty == 'true' ? 'false' : 'true';
}

const setDOMSongsTable = async (songList) => {
  if ($('.player').dataset.empty == 'true') setDOMCurrentSong(songList[0])

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
    if (event.target.previousElementSibling.value != '')
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