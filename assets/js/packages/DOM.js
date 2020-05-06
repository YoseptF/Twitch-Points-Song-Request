const setDOMInterface = user => {
  $('.userImg').src = user.profile_image_url
  $('.userDisplayName').innerHTML = user.display_name
}

const setDOMSongEvent = () => {
  console.log($('.songEventSetter'));
  $('.songEventSetter').style.display = 'none'
}

export { setDOMInterface, setDOMSongEvent }