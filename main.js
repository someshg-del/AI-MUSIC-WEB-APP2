
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
score_rightWrist=0;
song1="";
song2="";
song1status="";
song2status="";


function preload()
{
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}

function setup()
{canvas=createCanvas(600,500);
 canvas.center();
    
 video=createCapture(VIDEO);
 video.hide();

 posenet=ml5.poseNet(video,modelLoaded);
 posenet.on("pose",gotPoses);

}

function modelLoaded()
{
    console.log("model is loaded");
}

function gotPoses(results)
{
 if(results.length>0)
 {
  console.log(results) 
  
  leftWristX=results[0].pose.leftWrist.x;
  leftWristY=results[0].pose.leftWrist.y;
  rightWristX=results[0].pose.rightWrist.x;
  rightWristY=results[0].pose.rightWrist.y;
  score_leftWrist=results[0].pose.keypoints[9].score;
  score_rightWrist=results[0].pose.keypoints[10].score;
  
 } 

}



function draw()
{
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();

     if (score_leftWrist>0.2) {
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if (song1status==false) {
            song1.play();

            document.getElementById("song").innerHTML="Harry Poter Theme Song";
        }
        
     }

     if (score_rightWrist>0.2) {
        circle(rightWristX,rightWristY,20);
        song1.stop();

        if (song2status==false) {
            song2.play();

            document.getElementById("song").innerHTML="Playing Peter Pan Song";
        }
    }

        

     
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}