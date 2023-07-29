import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

let saveTimeToLocalStorage = null;

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeToLocalStorage(currentTime);
});


  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    const seekTime = parseFloat(savedTime);
    player.setCurrentTime(seekTime).then(function (seconds) {
     
      localStorage.setItem('videoplayer-current-time', seconds);
    }).catch(function (error) {
      switch (error.name) {
        case 'RangeError':
      
            break;

        default:
          
          break;
      }
    });
  }


saveTimeToLocalStorage = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);