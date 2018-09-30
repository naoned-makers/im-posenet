# im-posenet
Stream Rpi camera to a web page via [rpi-webrtc-streamer](https://github.com/kclyu/rpi-webrtc-streamer) and webrtc
Use [posenet model](https://github.com/tensorflow/tfjs-models/tree/master/posenet) on tensoflowjs to publish mqtt command from the web page

# Doc
I want to do https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
From a webrtc stream comming form RPI like https://www.linux-projects.org/uv4l/tutorials/custom-webapp-with-face-detection/
After trying uv4l i switch to rpi-webrtc-streamer (who rocks) see reason http://www.softwaresamurai.org/2017/10/14/uv4l-webrtc-vs-rpi-webrtc-streamer/

# Install
* Clone this repo on a rpi3 under /home/pi/dev/
As describe in https://github.com/kclyu/rpi-webrtc-streamer-deb
* sudo apt update
* sudo apt full-upgrade
* sudo rpi-update
* wget https://github.com/kclyu/rpi-webrtc-streamer-deb/raw/master/rws_0.73.2_armhf.deb
* sudo dpkg -i rws_0.73.2_armhf.deb
Inspire by https://github.com/kclyu/rpi-webrtc-streamer/blob/master/README_rws_setup.md#running-rws-with-nginx
* sudo apt-get install nginx-light
* sudo cp /home/pi/dev/im-posenet/nginx.conf /etc/nginx/sites-available/rws.conf
* sudo cp -rf /home/pi/dev/im-posenet/media_config.conf /opt/rws/etc/media_config.conf 
* chmod -R 755 /home/pi/dev/im-posenet/public
* sudo openssl genrsa -out /etc/ssl/private/selfsign.key 2048 && sudo openssl req -new -x509 -key /etc/ssl/private/selfsign.key -out /etc/ssl/private/selfsign.crt -sha256
* sudo ln -s /etc/nginx/sites-available/rws.conf /etc/nginx/sites-enabled/
* sudo unlink /etc/nginx/sites-enabled/default
* sudo service nginx reload
* sudo systemctl start rws

# Configure rws
Background info
* https://www.raspberrypi.org/forums/viewtopic.php?t=197585
* https://picamera.readthedocs.io/en/release-1.13/fov.html#sensor-modes

# Credits 
https://github.com/kclyu/rpi-webrtc-streamer Lyu,KeunChang
https://github.com/tensorflow/tfjs-models/tree/master/posenet

# License
[rpi-webrtc-streamer] (https://github.com/kclyu/rpi-webrtc-streamer/blob/master/LICENSE/LICENSE.rpi-webrtc-streamer)
[tfjs-models] (https://github.com/tensorflow/tfjs-models/blob/master/LICENSE)
