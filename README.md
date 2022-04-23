# Chat App - a chatting app by Matan Shamir and Itamar Bachar.
1. [About](#About)
2. [Dependencies](#dependencies)  
3. [Pages-flow-and-explanation](#Pages-flow-and-explanation)
4. [How to open the app](#How to open the app)
5. [How to use the app](#How to use the app)
6. [Developers](#Developers)


## About
This is the first milestone in the advanced programming 2 course. we used react for the client side.

## Dependencies
* Windows / Linux / macOS
* Git
* VScode

## Pages-flow-and-explanation:
### Login page
At this stage, only existing users (hard coded) can log in.<br />
In case of a wrong user name or password there is a note notifying about the error.<br />
For safety reasons we do not give the information about which field is incorrect.<br />
<br />
![image](https://user-images.githubusercontent.com/74719554/164935361-04d6928e-9c86-4373-a76f-1efa5d161db1.png)
By clicking on "register" you can go to the register page.

### Register page
A new user can register.<br />
The username must be unique and in the form of a phone number. <br />
Password must contain digits and letters, and must be at least 8 digit's long. (unlike already registered users)<br />
Nickname isn't optional. When not given, a red error appears.<br />
Picture is optional. When not given, a default image will appear.<br />
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

####features included:
- Adding chat with a new friend:<br />
By clicking the on the contact symbol, the user can add an existing registrated user as a friend.<br />
If the user does not exist, a red note will be displayed. otherwise, he will be added. <br />

![image](https://user-images.githubusercontent.com/74719554/164934916-3f840283-150f-4f34-833e-cded38d3c704.png)
<br />


- Searching in the chat:<br />
A user can search for a specific chat by typing a username in the search bar.<br />
The user can have as much contacts as he want with the same names, as nicknames aren't unique, unlike usernames (phone numbers).
![image](https://user-images.githubusercontent.com/74719554/164935231-434a76e1-ea98-4f88-887e-1d37f48ee947.png)

## How to open the app
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

## How to use the app
Now that you have logged in, in order to use our app, enter the following username and password:
```
Username - 054-1234567
Password - 12345678
```
This will log into Jon Snow's account. you will be able to observe already sent <br />
messages with Sansa and Arya, and add more messages.

If you wish to further test our app, log out and log in again with another user, <br />
after some messages were sent, say to Arya with these credentials:
```
Username - 054-2345678
Password - 12345678
```
and see that Jons messages were received.

## Developers:
**Matan Shamir 206960239**
**Itamar Bachar 295847376**
