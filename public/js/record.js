var recordedChunks = [];

function download() {
    var blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'posenet.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }


  function handleDataAvailable(event) {
      console.log("data")
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    } else {
      // ...
    }
  }

 playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'
    if (isError) {
      alert(message);
      return
    }
    var fileURL = window.URL.createObjectURL(file)
    videoNode.src = fileURL
    videoNode.setAttribute("autoplay","");
    videoNode.setAttribute("playsinline","");
    videoNode.setAttribute("controls","");
    videoNode.setAttribute("muted","");
    videoNode.style="display:inline;";
  }
