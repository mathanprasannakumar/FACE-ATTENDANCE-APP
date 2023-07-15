



const video = document.getElementById('video')
const start = document.getElementById('start')
const stop = document.getElementById('stop')
const capture = document.getElementById('capture')
const canvas = document.getElementById('canva')
const face = document.getElementById('face')

let model 
var interval =0
let lx,ly,rx,ry;
let embed;

const register = document.getElementById('submit')
const usernameinput = document.getElementById('username')
const form = document.getElementsByClassName('usernamebox')[0]


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./faceapimodels')
])
model = tf.loadGraphModel('http://localhost:5000/public/tfjsversion/model.json')

async function verify()
{
  if(window.localStream===undefined)
  {
    window.alert("Please start the camera and take a picture")
    return
  }
  if(lx && ly && rx && ry)
{
  //drawing the video content on to the canvas
  canvas.getContext('2d').drawImage(video, 0,0,500,500)
  // converting the bytes pixels to tensor from canvas
  let tensor = tf.browser.fromPixels(canvas)
  // normalizing and adding dimension 
  let normalized = tensor.div(tf.scalar(255.0)).expandDims()
  // cropping the face  and resizing it to a optimal size
  let crop =tf.image.cropAndResize(normalized,[[ly,lx,ry,rx]],[0],[160,160])

  console.log(crop.print())
  //###################
  // for visualization of cropped face
  let vis = crop.squeeze()
  tf.browser.toPixels(vis,face)
  //####################

  model.then(async (model)=>{
    embed = await model.predict(crop).data()
    console.log(embed)
  })
  .catch((error)=>{
    console.log(error.message)
  })
  if(embed !== undefined)
  {
    register.disabled=false;
  }
}
}


form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const data = { name : usernameinput.value,
                 embed: embed}
  console.log(data)
  const xhr = new XMLHttpRequest();

  xhr.open('POST','/register',true)
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request completed successfully
        window.location.href=JSON.parse(xhr.responseText).url
      } else {
        // Request failed
        console.error("Request failed with status: " + xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(data))
})
// when caputure button is pressed this whole block will be executed
//##################################################################

  
  start.addEventListener('click',() => {
      // debugger;
          // debugger; 
      if(window.localStream===undefined)
      {
          navigator.mediaDevices.getUserMedia({
            video: {width:500,height:500},
            audio:false,
          })
          .then(stream => {
            window.localStream = stream;
            video.srcObject = stream;
          })
          .catch((err) => {
            console.log(err);
          });  
          const displaySize = { width: video.width, height: video.height }

          interval =  setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          resizedDetections.forEach((detections)=>{

              lx = Math.round(detections._box._x)
              ly = Math.round(detections._box._y)
              rx = Math.round(detections._box._width+lx)
              ry = Math.round(detections._box._height+ly)
              lx /=500
              ly/=500
              rx/=500
              ry/=500
              // console.log(lx,ly,rx,ry)

          })
          console.log(interval,"Inside start")
        }, 100)
      }

    })

//#########################################################################
capture.addEventListener('click',verify)



//when the stop button is pressed 
stop.addEventListener('click',()=>
{
    // debugger;
  if(window.localStream !== undefined)
  {
    clearInterval(interval)
    video.pause()
    console.log(interval," stop is pressed " )
    localStream.getVideoTracks()[0].stop();
    localStream=undefined;
    video.src = '';
  }
})

