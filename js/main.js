$(document).ready(() => {
  console.log("Hello");

  const searchBar = $('.searchBar');
  const mainVideo = $('.mainVideo')[0];
  const input = $('.input')[0];

  // ADD CLICK HANDLERS AND BEHAVIOUR TO FIRST OPENING PAGE

  getData();

  function getData() {

    let URL = `https://www.googleapis.com/youtube/v3/search?q=connorMcgregor&maxResults=4&part=snippet&key=AIzaSyCBfCkDNcpKifeBPjqT6YEU26F9pKgIC9U`

    // do some ajax here
    $.getJSON(URL, (data) => {
      const mainVideoId = data.items[0].id.videoId;  
      let videos = data.items.slice(1);
      let images = document.querySelectorAll('.thumb'); 
      let info = document.querySelectorAll('p');     
      let suggestions = document.querySelectorAll('.related');
      let i = 0;
      console.log(videos);
      
      // CHANGE MAIN VIDEO EMBED URL
      mainVideo.src = `https://www.youtube.com/embed/${mainVideoId}`

      videos = videos.reduce((acc, video, i) => {
        acc[i] = {
          title: video.snippet.title,
          thumb: video.snippet.thumbnails.default.url,
          videoUrl: `https://www.youtube.com/embed/${video.id.videoId}`
        }
        return acc;  
      }, {})

      // loop through videos obj inserting into DOM.
      for (video in videos) {
        images[i].src = videos[video].thumb;
        info[i].textContent = videos[video].title;
        i++;
      }

      // add click handlers to video suggestions
      suggestions.forEach(box => {
        box.addEventListener('click', (event) => {
          const box = event.target.id - 1;
          const title = videos[box].title;

          getData(title);
        })
      })
    })
}

  //////////////////////////////////////////////////////////////////////////////////////

  // POST FIRST PAGE LOAD

  searchBar.on('submit', (event) => {
    event.preventDefault();

    let inputVal = event.target.children[0].value;

    input.value = '';

    grabData();

    function grabData (title) {

      if (title) inputVal = title;

      let URL = `https://www.googleapis.com/youtube/v3/search?q=${inputVal}&maxResults=4&part=snippet&key=AIzaSyCBfCkDNcpKifeBPjqT6YEU26F9pKgIC9U`
    
      // do some ajax here
      $.getJSON(URL, (data) => {
        const mainVideoId = data.items[0].id.videoId;  
        let videos = data.items.slice(1);
        let images = document.querySelectorAll('.thumb'); 
        let info = document.querySelectorAll('p');     
        let suggestions = document.querySelectorAll('.related');
        let i = 0;
        console.log(videos);
        
        // CHANGE MAIN VIDEO EMBED URL
        mainVideo.src = `https://www.youtube.com/embed/${mainVideoId}`

        // 
        videos = videos.reduce((acc, video, i) => {
          acc[i] = {
            title: video.snippet.title,
            thumb: video.snippet.thumbnails.default.url,
            videoUrl: `https://www.youtube.com/embed/${video.id.videoId}`
          }
          return acc;  
        }, {})

        // loop through videos obj inserting into DOM.
        for (video in videos) {
          images[i].src = videos[video].thumb;
          info[i].textContent = videos[video].title;
          i++;
        }

        console.log(suggestions);

        // add click handlers to video suggestions
        suggestions.forEach(box => {
          box.addEventListener('click', (event) => {
            const box = event.target.id - 1;
            const title = videos[box].title;

            grabData(title);
          })
        })
      })
    }
  })

});

