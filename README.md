# Appointment-Management-System
## install
This project use React Native for frontend. React Native depends on nodejs. You need to download NodeJs by your self on https://nodejs.org/en/.  
Then, you can install React Native by npm
```sh
$ npm install -g react-native-cli
```
This project also use EXPO for debugging. You can install EXPO by npm
```sh
$ npm install -g expo-cli
```
This project use flask to construct backend. You can install the flask and other denpendency by pip
```sh
$ npm pip install -r requirements.txt
```
## Usage
You can start front end by npm. you should run commond in the correct folder (e.g. frontend_v2)
```sh
$ npm start
```
please be sure you install all dependency by before start up frontend
```sh
$ npm install
```
You can start backend by excuting main.py
```sh
$ python main.py
```
Then you can use you phone or pad down load EXPO GO and run app on you end.
By the way, since application use http to communicate with backend, please be sure run on the same Internet and change the ip in each file of axios function.
and you can use test.http in backend folder to check backend. REST client in VS code is useful.

