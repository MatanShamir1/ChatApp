# Chat App - ex2 branch
## important! ! !
**if you want to know how to run the server side, go to the server repository and read the instructions there!
another important thing- we use session cookies, so if you want to try and check several users in the same time, you must use different browsers and *not* just different tabs!!!**

## a chatting app by Matan Shamir and Itamar Bachar.
1. [About](#About)
2. [Dependencies](#dependencies)  
3. [Pages-flow-and-explanation](#Pages-flow-and-explanation)
4. [How-to-open-the-app](#How-to-open-the-app)
5. [How-to-use-the-app](#How-to-use-the-app)
6. [Developers](#Developers)

## About
this branch is continues to the first branch- master, and is the main branch of ex2.
it has been edited to communicate with the server, which lies in another repository.
the client-side of the project lies in this repository, and runs in a different server, as a different program.

## Dependencies
* Windows / Linux / macOS
* Git
* VScode
* node.js
* React packages:  react-bootstrap, react-router-dom, axios

## Pages-flow-and-explanation:
### Login page
In case of a wrong user name or password there is a note notifying about the error.<br />
For safety reasons we do not give the information about which field is incorrect.<br />
when a user hits "login", a post request is sent to the server, who checks that the user actually exists and he's password is the right one. if so, the user is redirected to the chat page via react. else, he remains in the login page and gets notified.<br />
<br />
![image](https://user-images.githubusercontent.com/74719554/164935361-04d6928e-9c86-4373-a76f-1efa5d161db1.png)
By clicking on "register" you can go to the register page.

### Register page
A new user can register.<br />
The username must be unique and in the form of a phone number. <br />
Password must contain digits and letters, and must be at least 8 digit's long. (unlike already registered users)<br />
Nickname isn't optional. When not given, a red error appears.<br />
Picture are not working on this milestone.<br />
when a user hits 'register' the server gets a post request and checks whether or not another user with the same username already exists. if not, it adds thre user and react redirects him to the lign page for authentication.<br />
<br />
![image](https://user-images.githubusercontent.com/74719554/164936106-07606545-3bce-43a7-9514-dd453c4206bd.png)

### Chat page
![image](https://user-images.githubusercontent.com/74719554/164934633-fc5999c7-f287-412b-994e-199ae0706820.png)
The chat consists of 3 main components- the recognition in the top, the contact list in the left and the messages list in the right.
Now that the user has logged in, he can chat with his contacts.<br />
Even though it wasn't required, if you login with another user (we specified how to do so below),<br />
you can see the sent messages. it simulates a client-server app in the best possible way. <br />
Our app supports text, image choosing, video choosing, recording voice messages and taking photos from camera.<br />
Try to use these by choosing the pop-up next to the chat text-box.<br />
![image](https://user-images.githubusercontent.com/74719554/164934621-d79e6693-2a7b-46ec-af60-c224af73e58b.png)
<br />

### Ratings site
the ratings site is another MVC project which client side in implemented in the server.
you can **navigate there** only as a logged in user, by pressing the upper-right botton:
![image](https://user-images.githubusercontent.com/74719554/170246219-a9fdbe7b-85e4-4ecf-a421-2e873d2a43cc.png)
if you did go there, you get to the ratings index.html page. more on that in the server repository readme. 
if you want to **navigate back**, you can press the "chatpage" botton in the ratings page layout:
![image](https://user-images.githubusercontent.com/74719554/170246447-40ba1776-b742-42b5-b97d-9e3c626255dc.png)
* **an important point:**
  in case your cookie session is still valid, you will be redirected to the chat page and will not     have to log back in! your cookie session is valid for **30 minutes** from the moment you logged     in. if your cookie session is no longer valid, or if you pressed "log out", are the only ways to     go back to the login page.
### pay attention:
![image](https://user-images.githubusercontent.com/84122241/164944419-b9da86b4-2e40-4e2e-8d0e-b4585a28b38f.png)
- in first button you can upload both video and image and only them.
- in the second button you can upload record from the computer.
- in third button we also add ,dispite in wasn't requirment , abillty to picature image from the screen.
<br/>
**features included:**
- Adding chat with a new friend:<br />
By clicking the on the contact symbol, the user can add an existing registrated user as a friend.<br />
If the user does not exist, a red note will be displayed. otherwise, he will be added. <br />
If the user added a contact but the contact does not have this user as friend, he will appear as an unknown number. <br />

![image](https://user-images.githubusercontent.com/74719554/164934916-3f840283-150f-4f34-833e-cded38d3c704.png)
<br />

- Searching in the chat:<br />
A user can search for a specific chat by typing a username in the search bar.<br />
The user can have as much contacts as he want with the same names, as nicknames aren't unique, unlike usernames (phone numbers).
![image](https://user-images.githubusercontent.com/74719554/164935231-434a76e1-ea98-4f88-887e-1d37f48ee947.png)

## How-to-open-the-app
if you are in linux please do the following..
1) select Download Zip 
![image](https://user-images.githubusercontent.com/84122241/165762901-012d7396-d583-470a-b5de-71a714cf5801.png)
2) create new folder and extract the content to the new folder.
3) ![image](https://user-images.githubusercontent.com/84122241/165763234-09187c83-35cf-40a1-be9c-8b42ea96bc26.png)
4) upgrade and update in the terminal with the command - (sudo apt -y update && sudo apt -y upgrade)
5) install node js - version 16 with the command - (sudo apt install -y curl) <br>
 and then (curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -)
 6) go to the folder and start with npm start.



if you are in windows please do the following..
1. Clone the repository to your preffered location. Get into your directory, <br />
   open Git Bash / PowerShell if on windows, or Terminal if on a linux machine, and write:  
    ```
    $ git clone https://github.com/MatanShamir1/ChatApp.git
    ```
2. If you haven't ever used react, you should install node.js for your machine. <br />
   use this link: https://nodejs.org/en/
3. Continue on your chosen cmd in the repo's directory and write:
    ```
    $ npm install
    ```
   This will install all the dependencies needed for our project.
4. Write npm start.   

## How-to-use-the-app
Now that you have logged in, in order to use our app, you can choose 2 options:
### first option: sign you own users up!
go ahead and sign users up, open different browsers, add them as contacts and make them conversations to test the app.

### second option: get some DB intial info from our code
go to the server program in visual studio, to the conversationController's contructor, un-comment all of it, and use a plain browser to surf to http://localhost:5243/api/contacts.
this will trigger the constructor and initialize the data your DB needs. 
re-comment the commented lines, go to the client and log in as:
```
  username: 12345
  password: aaa
```

## Developers:
**Matan Shamir 206960239** <br />
**Itamar Bachar 295847376**
