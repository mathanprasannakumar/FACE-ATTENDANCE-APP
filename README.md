# FACEATTENDANCEAPP
Face Attendance webapplication which will run on browser , and connected to postgreSQL database for registering the attendance.

<h3>FULL END TO END FACE ATTENDANCE SYSTEM</h3>

<h3>1) Implementation</h3>
<ul>
  <li>If you want to see how the underlying model works for recognition then check out this <a href="https://github.com/mathanprasannakumar/FaceRecognition"><b>notebook</b></li>
  <li>Technologies used : Nodejs , Express for server ,POSTGRESQL for database ,HMTL CSS JAVASCRIPT for front end 
  </li>Here instead of storing the image of the person for verification , we are storing the embedding of the user</li>
  <li>In the note book above, i used mediapipe for the face detection but here mediapipe is not used, here <a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html"><b>FACEAPI</b></a> is used for getting the bounding box coordinates</li>
</ul>
  <h3>Step 1:</h3>
    <ul>
      <li>User enters the username</li>
      <li>Username will be checked agianst the database</li>
      <li>If user already registered,user will be routed to face verfication</li>
    </ul>
  <h3>Step 2:</h3>
    <ul>
      <li>There are two cases possible , user is registered and not registered, when the user enters their username</li>
      <li>If user is not present,used is asked to register</li>
      <li>At the time of register,user need to enter his/her username and capture their face</li>
      <li>When the user is redirected to the register page before, the model is loaded and the input image from the user is taken as a input and embedding is calculated and stored inside the database with the corresponding username</li>
    </ul>
  <h3>Step 3:</h3>
  <ul>
    <li>Now we have the embedding of the user, user will be redirected to the home attendance page</li>
    <li>Again the same process as of Step 1 is executed</li>
  </ul>
<h3>Step 4:</h3>
  <ul>
    <li>This is the last face verifcation step, here user need to capture their face</li>
    <li>Captured face is fed into the model, embedding for the input image is calculated and  referanceembedding of the user is already loaded which resembles the identity of the user.</li>
    <li>When user punches IN or OUT, the  currently calculated embedding and the loaded embedding of the user is computed for getting the **cosine distance**</li>
    <li>if the Cosine distance between the embedding is less than 0.4 then we are assuring that both are same person and attendance for the user will be registered </li>
    <li>if the Cosine distance is greater than 0.4 , then the user is at the samepage and warns about not recognized</li>
  </ul>


Note: This is not a automatic facerecognition system , here users need to enter their username and  press in and out for the registration of thier attendance


<h3>References</h3>
<p>Note: The model is pretrained model, so no training process is done by me ,the whole architecture and weights are taken from  <a href="https://github.com/serengil/deepface/tree/master"><b>Deepface</b></p>
<p> I took the face detection model from faceapi , check <a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html">here</a>
<p style="margin-top:50px;"> Kindly Check this offical paper <a href="https://arxiv.org/abs/1503.03832">facenet</a></p>
