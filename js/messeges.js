/*                                        Variables */
//                  Constant variables (Variables that never change)
var uuid = localStorage.getItem("uID"); // User ID
const room = localStorage.getItem("room"); // Room Code
const ul = document.querySelector("#ulist");
const username = localStorage.getItem("username"); // Username
const email = localStorage.getItem("uName"); // User Email Address
const query = firebase.database().ref("rooms/" + room + "/chats").limitToLast(75);
const rooms = firebase.database().ref("rooms/");
const roomName = firebase.database().ref("rooms/" + room);
const bannedwords = ["ahole", "anus", "ash0le", "ash0les", "asholes", "ass", "Ass Monkey", "Assface", "assh0le", "assh0lez", "asshole", "assholes", "assholz", "asswipe", "azzhole", "bassterds", "bastard", "bastards", "bastardz", "basterds", "basterdz", "Biatch", "bitch", "bitches", "Blow Job", "boffing", "butthole", "buttwipe", "c0ck", "c0cks", "c0k", "Carpet Muncher", "cawk", "cawks", "Clit", "cnts", "cntz", "cock", "cockhead", "cock-head", "cocks", "CockSucker", "cock-sucker", "crap", "cum", "cunt", "cunts", "cuntz", "dick", "dild0", "dild0s", "dildo", "dildos", "dilld0", "dilld0s", "dominatricks", "dominatrics", "dominatrix", "dyke", "enema", "f u c k", "f u c k e r", "fag", "fag1t", "faget", "fagg1t", "faggit", "faggot", "fagg0t", "fagit", "fags", "fagz", "faig", "faigs", "fart", "flipping the bird", "fuck", "fucker", "fuckin", "fucking", "fucks", "Fudge Packer", "fuk", "Fukah", "Fuken", "fuker", "Fukin", "Fukk", "Fukkah", "Fukken", "Fukker", "Fukkin", "g00k", "God-damned", "h00r", "h0ar", "h0re", "hells", "hoar", "hoor", "hoore", "jackoff", "jap", "japs", "jerk-off", "jisim", "jiss", "jizm", "jizz", "knob", "knobs", "knobz", "kunt", "kunts", "kuntz", "Lezzian", "Lipshits", "Lipshitz", "masochist", "masokist", "massterbait", "masstrbait", "masstrbate", "masterbaiter", "masterbate", "masterbates", "Motha Fucker", "Motha Fuker", "Motha Fukkah", "Motha Fukker", "Mother Fucker", "Mother Fukah", "Mother Fuker", "Mother Fukkah", "Mother Fukker", "mother-fucker", "Mutha Fucker", "Mutha Fukah", "Mutha Fuker", "Mutha Fukkah", "Mutha Fukker", "n1gr", "nastt", "nigger;", "nigur;", "niiger;", "niigr;", "orafis", "orgasim;", "orgasm", "orgasum", "oriface", "orifice", "orifiss", "packi", "packie", "packy", "paki", "pakie", "paky", "pecker", "peeenus", "peeenusss", "peenus", "peinus", "pen1s", "penas", "penis", "penis-breath", "penus", "penuus", "Phuc", "Phuck", "Phuk", "Phuker", "Phukker", "polac", "polack", "polak", "Poonani", "pr1c", "pr1ck", "pr1k", "pusse", "pussee", "pussy", "puuke", "puuker", "queer", "queers", "queerz", "qweers", "qweerz", "qweir", "recktum", "rectum", "retard", "sadist", "scank", "schlong", "screwing", "semen", "sex", "sexy", "Sh!t", "sh1t", "sh1ter", "sh1ts", "sh1tter", "sh1tz", "shit", "shits", "shitter", "Shitty", "Shity", "shitz", "Shyt", "Shyte", "Shytty", "Shyty", "skanck", "skank", "skankee", "skankey", "skanks", "Skanky", "slag", "slut", "sluts", "Slutty", "slutz", "son-of-a-bitch", "turd", "va1jina", "vag1na", "vagiina", "vagina", "vaj1na", "vajina", "vullva", "vulva", "w0p", "wh00r", "wh0re", "whore", "xrated", "xxx", "b!+ch", "bitch", "blowjob", "clit", "arschloch", "fuck", "shit", "ass", "asshole", "b!tch", "b17ch", "b1tch", "bastard", "bi+ch", "boiolas", "buceta", "c0ck", "cawk", "chink", "cipa", "clits", "cock", "cum", "cunt", "dildo", "dirsa", "ejakulate", "fatass", "fcuk", "fuk", "fux0r", "hoer", "hore", "jism", "kawk", "l3itch", "l3i+ch", "lesbian", "masturbate", "masterbat*", "masterbat3", "motherfucker", "s.o.b.", "mofo", "nazi", "nigga", "nigger", "nutsack", "phuck", "pimpis", "pusse", "pussy", "scrotum", "sh!t", "shemale", "shi+", "sh!+", "slut", "smut", "teets", "boobs", "b00bs", "teez", "testical", "testicle", "w00se", "jackoff", "wank", "whoar", "whore", "*damn", "*dyke", "*fuck*", "*shit*", "@$$", "amcik", "andskota", "arse*", "assrammer", "ayir", "bi7ch", "bitch*", "bollock*", "breasts", "butt-pirate", "cabron", "cazzo", "chraa", "chuj", "Cock*", "cunt*", "d4mn", "daygo", "dego", "dick*", "dike*", "dupa", "dziwka", "ejackulate", "Ekrem*", "Ekto", "enculer", "faen", "fag*", "fanculo", "fanny", "feces", "feg", "Felcher", "ficken", "fitt*", "Flikker", "foreskin", "Fotze", "Fu(*", "fuk*", "futkretzn", "gook", "guiena", "h0r", "h4x0r", "helvete", "hoer*", "honkey", "Huevon", "hui", "injun", "jizz", "kanker*", "kike", "klootzak", "kraut", "knulle", "kuk", "kuksuger", "Kurac", "kurwa", "kusi*", "kyrpa*", "lesbo", "mamhoon", "masturbat*", "merd*", "mibun", "monkleigh", "mouliewop", "muie", "mulkku", "muschi", "nazis", "nepesaurio", "nigger*", "orospu", "paska*", "perse", "picka", "pierdol*", "pillu*", "pimmel", "piss*", "pizda", "poontsee", "poop", "porn", "p0rn", "pr0n", "preteen", "pula", "pule", "puta", "puto", "qahbeh", "queef*", "rautenberg", "schaffer", "scheiss*", "schlampe", "schmuck", "screw", "sh!t*", "sharmuta", "sharmute", "shipal", "shiz", "skribz", "skurwysyn", "sphencter", "spic", "spierdalaj", "splooge", "suka", "b00b*", "testicle*", "twat", "vittu", "wank*", "wetback*", "wichser", "wop*", "yed", "zabourah", "pidhi", "pirdhu", "pidh", "pidhuc", "kari", "kar", "karuc", "piqk", "piqken", "muti", "mut", "pshurq", "shurr", "karlesh", "qirje", "gay", "bitch", "snitch", "qifsha", "gojore", "hanksh mutin", "mutin", "qifsha nanen", "qifsha motren", "qifsha familjen", "ta qifsha", "qifsha", "hanksh karin", "qifsha ropt", "seks", "sex", "porn", "xnxx", "x n x x", "x nxx", "pornhub", "kaka", "seksi", "qihemi", "qihem", "qifsha", "xvideos", ];

const characterLimit = 30; // 30 characters limit
let theme = localStorage.getItem("user-theme") ?? false;
let t = false;
let u;
let messageKEY = false;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uuid = user.uid;
        u = user;
        // ...
    } else {
        // User is signed out
        // ...
        location.replace("account.html");

    }
});

if (t) {
    localStorage.setItem("uID", uuid);
    uuid = localStorage.getItem("uID");
}

let items = 50;
let others = [];

function doDynamic(){
    items = items + 8;
    firebase.database().ref("rooms/" + room + "/chats").limitToLast(1 * items).on('child_added', function (snapshot) {
    // Get the messages

    let owner = snapshot.val().user;
    let message = snapshot.val().message;
    let username = snapshot.val().username;
    let times = snapshot.val().time;
    let postKey = snapshot.key;
    let ms = snapshot.val().timespan;

    if(others.includes(postKey)){
        return false;
    }
    others.push(postKey);
    createText2(owner, message, times, username, postKey, ms);

    })
}


var network = navigator.onLine;
let chatCreated = localStorage.getItem("chat-time");


const proxy = "https://erproxy.herokuapp.com/";

var usedBannedWords = [];
var swearCount = 0;

/*

            Adding and managing rooms in the My Rooms tab.

*/


var roomsList = 1;
const messageLenght = 10000;
let roomsArray = [];

// Functions to set from string to object
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
};

if (localStorage.getItem("roomss") == null || localStorage.getItem("roomss") == undefined || localStorage.getItem("roomss") == "") {
    let data = {
        name: "default",
        room: "default",
    };

    let arr = [data, data];
    localStorage.setObj("roomss", arr);
    roomsArray = localStorage.getObj("roomss");

} else {
    roomsArray = localStorage.getObj("roomss");
}


const secondList = document.getElementById("list1");

function createRoomList(name, room) {
    roomsList++;
    let li = document.createElement("li");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("id");
    let att3 = document.createAttribute("onclick");
    att1.value = "list-items";
    att2.value = `list-items-id-${roomsList}`;
    att3.value = `joinRoom("${room}")`;
    li.setAttributeNode(att1);
    li.setAttributeNode(att2);
    li.setAttributeNode(att3);
    li.innerText = name;
    secondList.appendChild(li);
}

function addRoom(name, room) {
    let t = false;
    for (let i = 0; i < roomsArray.length; i++) {
        let roomcode = roomsArray[i].room;
        if (room == roomcode) {
            t = true;
        }
    }
    if (t == true) {
        console.log("This room is alerdy added!");
        return false;
    }
    let data = {
        name,
        room,
    };
    roomsArray.push(data);
    localStorage.setObj("roomss", roomsArray);
    console.log("Succesfully added a room!");
}
for (let i = 2; i < roomsArray.length; i++) {
    createRoomList(roomsArray[i].name, roomsArray[i].room);
}

function openMenu() {
    console.log(event.target.id);
}

//                  Variables that can be changed

let roomID = [];
let darkIndex = 0;
let replyIndex = 0;
let joined = localStorage.getItem("joined");
let inWebsite = true;
let messagesNotSeen = 0;
let darkMode = false;

//                  Emoji support
const eButton = document.getElementById("#emoji-button");
const ePicker = new EmojiButton({
    theme: localStorage.getItem("mode") ?? "light"
});

function showEmoji() {
    ePicker.togglePicker(eButton);
}
ePicker.on("emoji", (emoji) => {
    document.getElementById("message").value += emoji;
});

// Check the user system theme and aplies it

if (localStorage.getItem("room") == null) {} else {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //changeTheme("dark");
    }
}

const key = "54b73f2ac3a46a";
const server = "https://ipinfo.io/?token=" + key;
let userLocation = false;
let ip, country, city, timezone;

fetch(proxy + server).then(response => {
    return response.json();
}).then(data => {
    ip = data.ip;
    country = data.country;
    city = data.city;
    timezone = data.timezone;
    userLocation = true;
});

function removeUnwantedChars(text){
    let unwatedChars = [".", "#", "$", "[", "]"];
    let newText = text;
    for(let i = 0; i < unwatedChars.length; i++){
        newText = String(newText.split(unwatedChars[i]).join("-"));
    }
    return newText;
}

function createRoom() {
    if (userLocation) {
        if (uuid !== u.uid) {
            return false;
        }

        if(String(document.getElementById("roomname").value) == ""){
            Swal.fire("You  can't create rooms without adding a name!");
            return false;
        }

        let realName = removeUnwantedChars(document.getElementById("roomname").value);
        realName = removeTags(String(realName));

        if (realName.length >= characterLimit) {
            return false;
        }
        if (realName.length === 0) {
            return false;
        }



        var t = new Date();
        let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();
        let roomNameOLD = "room-" + t.getTime() + uuid + "-" + document.getElementById("roomname").value + time + "-ww-server" + Math.floor(Math.random() * 10000000000);
        let roomName = roomNameOLD.replace(/\s+/g, "");
        roomName = removeUnwantedChars(roomName);
        let private_date;

        // Create the room
        firebase.database().ref("rooms/" + roomName).set({
            owner: uuid,
            time: time,
            joins: 0,
            roomRealName: realName,
            ms: t.getTime()
        });

        firebase.database().ref("user_information/" + roomName).set({
            owner: uuid,
            time: time,
            joins: 0,
            roomRealName: realName,
            private_data: {
                ipAddress: ip,
                country,
                city,
                timezone,
                ms: t.getTime(),
                dt: time + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
            }
        });
        Swal.fire("This is your room code:                    " + roomName);
        localStorage.setItem("room", roomName);
        addRoom(realName, roomName);
        setTimeout(() => {
            location.reload();
        }, 2000);
    } else {
        if (uuid !== u.uid) {
            return false;
        }

        if(String(document.getElementById("roomname").value) == ""){
            Swal.fire("You  can't create rooms without adding a name!");
            return false;
        }

        let realName = removeUnwantedChars(document.getElementById("roomname").value);

        if (realName.length >= characterLimit) {
            return false;
        }

        if (realName.length === 0) {
            return false;
        }

        var t = new Date();
        let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();
        let roomNameOLD = "room-" + t.getTime() + uuid + "-" + document.getElementById("roomname").value + time + "-ww-server" + Math.floor(Math.random() * 10000000000);
        let roomName = roomNameOLD.replace(/\s+/g, "");
        let private_date;

        // Create the room
        firebase.database().ref("rooms/" + roomName).set({
            owner: uuid,
            time: time,
            joins: 0,
            roomRealName: realName,
            ms: t.getTime()
        });

        alert("This is your room code:                    " + roomName);
        localStorage.setItem("room", roomName);
        addRoom(realName, roomName);
        location.reload();
    }
}

function joinRoom(code) {
    const image = localStorage.getItem("image");
    if (typeof code === "undefined") {
        let realName = document.getElementById("join-room-name").value;
        let t = new Date();
        let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();
        addRoom(realName, realName);
        if (realName === "") {
            return false;
        } else {
            var n = roomID.includes(realName);
            if (n) {
                localStorage.setItem("room", realName);
                firebase.database().ref("rooms/" + realName + "/chats").push().set({
                    message: " joined the room! 👋",
                    time: time,
                    user: localStorage.getItem("uName"),
                    username: username,
                    "timespan": t.getTime(),
                    image
                });
                Swal.fire(`You successfully joined the chat room!`);
                location.reload();
                return true;
            } else {
                Swal.fire("Error", `You're chat room code was not found!`, "error");
                document.getElementById("join-room-name").value = "";
                return false;
            }
        }
    } else {
        let realName = code;
        let t = new Date();
        let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();
        addRoom(realName, realName);
        if (realName === "") {
            return false;
        } else {
            var n = roomID.includes(realName);
            if (n) {
                localStorage.setItem("room", realName);
                firebase.database().ref("rooms/" + realName + "/chats").push().set({
                    message: " joined the room! 👋",
                    time: time,
                    user: localStorage.getItem("uName"),
                    username: username,
                    "timespan": t.getTime(),
                    image
                });
                Swal.fire(`You successfully joined the chat room!`);
                location.reload();
                return true;
            } else {
                Swal.fire("Error", `You're chat room code was not found!`, "error");
                document.getElementById("join-room-name").value = "";
                return false;
            }
        }
    }
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function isVideo(url) {
    return /\.(mp4|mov|webm|mpg|mp2|mpeg|mpv|ogg|m4p|m4v|avi|wmv|qt|flv|swf|avchd)$/.test(url);
}

function isAudio(url) {
    return /\.(mp3|m4a|flac|waw|wma|aac)$/.test(url);
}

function isYouTube(url) {
    let result = url.includes("youtube");
    return result;
}

function isWeather(url) {
    let result = url.includes("/weather");
    return result;
}

function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
}

function urlify(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //var urlRegex = /(https?:\/\/[^\s]+)/g;
    let t = removeTags(text);
    return t.replace(urlRegex, function (url, b, c) {
        let isImageT = isImage(url);
        let isVideoT = isVideo(url);
        let isAudioT = isAudio(url);
        let isYouTubeT = isYouTube(url);
        let isWeatherT = isWeather(url);
        if (isImageT) {
            var url2 = c == "www." ? "http://" + url : url;
            return ('\n\n <br> <a href="' + url2 + '" data-lightbox="image-1" data-title="' + url2 + '"> <img src="' + url2 + '" target="_blank" width="320px" height="auto" alt="Image" class="imageChat">' + "</img> </a><br>");
        } else if (isVideoT) {
            let url2 = c == "www." ? "http://" + url : url;
            return ('\n\n <br> <video class="videoChat lazy" width="320px" height="240px"  controls playsinline id="player1">  <source src="' + url2 + '"/></video><br>');
        } else if (isAudioT) {
            let url2 = c == "www." ? "http://" + url : url;
            return ('\n\n <audio class="audioChat" controls id="player1">  <source src="' + url2 + '"></audio><br>');
        } else if (isYouTubeT) {
            let url2 = c == "www." ? "http://" + url : url;
            if (url2.includes("embed")) {
                // Ok
                return ('\n\n <br> <iframe class="iframeChat" width="320px" height="240px" allowpaymentrequest="false" allowfullscreen="true" loading="lazy" src="' + url2 + '"></iframe><br>');
            } else {
                let r = url2.replace("watch?v=", "embed/");
                r = r.split("&ab_channel")[0];
                return ('\n\n <br> <iframe class="iframeChat" width="320px" height="240px" allowpaymentrequest="false" allowfullscreen="true" loading="lazy" src="' + r + '"></iframe><br>');
            }
        } else {
            var url2 = c == "www." ? "http://" + url : url;
            return (`<a href="#${url2}" onclick="openLink('${url2}')" class="aChat">${url2}</a>`);
        }
    });
}

function time_ago(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}


function createText(user, message, time, username1, key, ms, image) {
    let messageFirst = `${urlify(message)} \n <div class="miniText"><p class="timemin">${time_ago(ms)}</p> <p onclick="showMenu('${user}','${message}','${time}', '${username1}', '${key}', '${image}', '${ms}'); return false;" class="replyText"><i class="fa-solid fa-reply"></i></p>  </div>`;
    darkIndex++;
    if(image == "" || image == undefined || image == null || image.length == 0){
    console.log(image);
    }
    let imageP = image ?? "https://studenti.uni-pr.edu/Images/users/male-empty-user.jpg";
    let li = document.createElement("li");
    let text = `<!-- <div class="first"><div class="circular--portrait"> <img src="${imageP}" class="img" alt="Profile picture of ${user}"> </div> </div> --> ${username1} <br> ${messageFirst}`;
    li.innerHTML = text;
    ul.appendChild(li);
    let attribute1 = document.createAttribute("id");
    let attribute2 = document.createAttribute("class");
    let attribute3 = document.createAttribute("title");
    let attribute4 = document.createAttribute("title");
    let attribute5 = document.createAttribute("class");
    let attribute6 = document.createAttribute("oncontextmenu");
    let attribute7 = document.createAttribute("data-key");
    let attribute8 = document.createAttribute("class");
    let attribute9 = document.createAttribute("ontouchend");
    let info = `${user} \n\n ${time}`;
    attribute1.value = `message-id-${key}`;
    attribute2.value = "message-class animate__bounceIn";
    attribute3.value = `${user} \n\n ${time}`;
    attribute4.value = `You are mentioned in this message!\n\n ${info}`;
    attribute5.value = "notify";
    attribute6.value = `showMenu("${user}","${message}","${time}", "${username1}", "${key}", "${image}", "${ms}"); return false;`;
    attribute7.value = key;
    attribute8.value = "myMessage";
    attribute9.value = `showMenu("${user}","${message}","${time}", "${username1}", "${key}", "${image}", "${ms}"); return false;`;
    li.setAttributeNode(attribute1);
    li.setAttributeNode(attribute2);
    li.setAttributeNode(attribute3);
    li.setAttributeNode(attribute6);
    li.setAttributeNode(attribute7);
    li.setAttributeNode(attribute9);
    if (username == username1) {
        li.setAttributeNode(attribute8);
    } else {
        let n = message.toString().includes("@" + username);
        if (n) {
            playAudio("myAudio");
            document.getElementById(`message-id-${darkIndex}`).style.color = "#DD4132";
            li.setAttributeNode(attribute4);
            li.setAttributeNode(attribute5);
        }
    }
    if (inWebsite === true) {} else {
        messagesNotSeen++;
        document.title = `(${messagesNotSeen}) unread messeges!`;
        setTimeout(() => {
            if (inWebsite) {
                playAudio("newMessage");
            } else {}
        }, 750);
        if (music) {
            if (localStorage.getItem(`message-${message}`) === true) {} else {
                let notify = new Notification(`New message from ${username1}`, {
                    body: message,
                    icon: image,
                    tag: key
                });
                localStorage.setItem(`message-${message}`, true);
            }
        } else {}
    }
    $("#ulist").animate({
        scrollTop: $("#ulist").prop("scrollHeight")
    }, 0);
    document.getElementById('ulist').scrollTop =  document.getElementById('ulist').scrollHeight;
}

function createText2(user, message, time, username1, key, ms) {
    let messageFirst = `${urlify(message)} \n <p class="timemin">${time_ago(ms)}</p>`;
    darkIndex++;
    let li = document.createElement("li");
    let text = `${username1} <br> ${messageFirst}`;
    li.innerHTML = text;
    ul.prepend(li);
    let attribute1 = document.createAttribute("id");
    let attribute2 = document.createAttribute("class");
    let attribute3 = document.createAttribute("title");
    let attribute4 = document.createAttribute("title");
    let attribute5 = document.createAttribute("class");
    let attribute6 = document.createAttribute("oncontextmenu");
    let attribute7 = document.createAttribute("data-key");
    let attribute8 = document.createAttribute("class");
    let info = `${user} \n\n ${time}`;
    attribute1.value = `message-id-${key}`;
    attribute2.value = "message-class animate__bounceIn";
    attribute3.value = `${user} \n\n ${time}`;
    attribute4.value = `You are mentioned in this message!\n\n ${info}`;
    attribute5.value = "notify";
    attribute6.value = `showMenu("${user}","${message}","${time}", "${username1}", "${key}"); return false;`;
    attribute7.value = key;
    attribute8.value = "myMessage";
    li.setAttributeNode(attribute1);
    li.setAttributeNode(attribute2);
    li.setAttributeNode(attribute3);
    li.setAttributeNode(attribute6);
    li.setAttributeNode(attribute7);
    if (username == username1) {
        li.setAttributeNode(attribute8);
    } else {
        let n = message.toString().includes("@" + username);
        if (n) {
            playAudio("myAudio");
            document.getElementById(`message-id-${darkIndex}`).style.color = "#DD4132";
            li.setAttributeNode(attribute4);
            li.setAttributeNode(attribute5);
        }
    }
    if (inWebsite === true) {} else {
        messagesNotSeen++;
        document.title = `(${messagesNotSeen}) unread messeges!`;
        setTimeout(() => {
            if (inWebsite) {
                playAudio("newMessage");
            } else {}
        }, 750);
        if (music) {
            if (localStorage.getItem(`message-${message}`) === true) {} else {
                var notify = new Notification(`New message from ${username1}`, {
                    body: message,
                });
                localStorage.setItem(`message-${message}`, true);
            }
        } else {}
    }
}

function checkRoom() {
    if (localStorage.getItem("room") === null) {
        showRoomControls();
    } else {
        console.info("You are currently connected to a room!");
        hideRoomControls();
    }
}

function showRoomControls() {
    document.getElementById("chat").classList.add("hidden");
}

function hideRoomControls() {
    document.getElementById("make-room").classList.add("hidden");
    document.getElementById("join-room").classList.add("hidden");
    document.getElementById("roomSelection").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
}

function getTime(){
    let t = new Date();
        let time;
        if (t.getMonth() < 10) {
            if (t.getHours() < 10) {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                }
            } else {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
                }
            }
        } else {
            if (t.getHours() < 10) {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                }
            } else {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
                }
            }
        }
    return time;
}

function sendMessage() {
    const image = localStorage.getItem("image");
    if (chat === true) {
        let message = document.getElementById("message").value;
        let name = message.toLowerCase();


        message = message.replace(/["']/g, ""); // Remove quotes
        message = removeTags(message);
        let t = new Date();
        let time = getTime();
        if (t.getMonth() < 10) {
            if (t.getHours() < 10) {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                }
            } else {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
                }
            }
        } else {
            if (t.getHours() < 10) {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                }
            } else {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
                }
            }
        }


        if (message == "") {
            Swal.fire("You can't send empty messeges.");
            return false;
        }

        const arrayBad = bannedwords.length;

        for (let i = 0; i < arrayBad; i++) {
            if (bannedwords[i].toLowerCase() == name || bannedwords[i].toUpperCase() == name) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    Swal.fire("Your message has been blocked for using bad words. Please remove them.");
                    return false;
                }
            }
        }
        for (let i = 0; i < arrayBad; i++) {
            if (name.includes(bannedwords[i].toLowerCase()) || bannedwords[i].toUpperCase() == name) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    return false;
                }
            }
        }
        if (message.length >= messageLenght) {
            Swal.fire(`You reached the maximun length limit! (${message.length})`);
            document.getElementById("message").value = "";
            return false;
        } else {
            firebase.database().ref("rooms/" + room + "/chats").push().set({
                message: message,
                time: time,
                user: localStorage.getItem("uName"),
                username: username,
                "timespan": t.getTime(),
                image: image
            });
            document.getElementById("message").value = "";
            playAudio("sendMessage");
            disableChat();
            setTimeout(() => {
                enableChat();
            }, 5000);
        }
    } else {
        return false;
    }
}

firebase.database().ref("rooms/" + room + "/chats").on("child_removed", function (snapshot) {
    document.getElementById(`message-id-${snapshot.key}`).innerText = "This message has been deleted!";
    setTimeout(() => {
        document.getElementById(`message-id-${snapshot.key}`).classList.add("hidden");
    }, 5000);
});



let browserName;
fnBrowserDetect();

function fnBrowserDetect(){
                 
         let userAgent = navigator.userAgent;

         
         if(userAgent.match(/chrome|chromium|crios/i)){
             browserName = "Chrome";
           }else if(userAgent.match(/firefox|fxios/i)){
             browserName = "Firefox";
           }  else if(userAgent.match(/safari/i)){
             browserName = "Safari";
           }else if(userAgent.match(/opr\//i)){
             browserName = "Opera";
           } else if(userAgent.match(/edg/i)){
             browserName = "Edge";
           }else{
             browserName="No browser detection";
           }
         
        return browserName + " browser";
  }

function scrollWin() {
    window.scrollTo(300, 5000);
}
query.on("child_added", function (snapshot) {
    // Get the messages
    let owner = snapshot.val().user;
    let message = snapshot.val().message;
    let username = snapshot.val().username;
    let times = snapshot.val().time;
    let postKey = snapshot.key;
    let ms = snapshot.val().timespan;
    let image = snapshot.val().image;
    others.push(postKey);
    createText(owner, message, times, username, postKey, ms, image);
    document.getElementById("loading").style.display = "none";
    enableChat();
});

rooms.on("child_added", function (snapshot) {
    // Get the messages
    let postKey = snapshot.key;
    roomID.push(postKey);
});

rooms.on("child_removed", function (snapshot) {
    if (snapshot.key === room) {
        alert("This chat room has been deleted!");
        localStorage.removeItem("room");
        location.reload();
    } else {
        return false;
    }
});
let done = false;

roomName.on("value", function (snapshot) {
    // Get the messages
    if (localStorage.getItem("room") === null) {
        // User is not in a room
    } else {
        let chatname = snapshot.val().roomRealName;
        document.getElementById("chatname").innerText = chatname;
        localStorage.setItem("chatOwner", snapshot.val().owner);
        localStorage.setItem("chat-joins", snapshot.val().joins);
        localStorage.setItem("chat-time", snapshot.val().time);
        localStorage.setItem("chat-ms", snapshot.val().ms);
        localStorage.setItem("roomname", chatname);
        if (uuid === localStorage.getItem("chatOwner")) {
            // Only chat owner can do!
        }
        if (done) {} else {
            let html = ``;
            html2 = `<span id="chatname" onclick="chatInfo()">${chatname}</span>`;
            // html += `<button id="infoButton" class="btn-info" title="Info" onclick="chatInfo()"><i
            // class="fas fa-info-circle"></i></button>`;
            document.getElementById("chatname").innerHTML = html2;
            done = true;
        }
    }
});

function leaveRoom() {
    Swal.fire({
        title: "Are you sure you want to leave this room?",
        text: "You can always join later if you have the room code!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.value) {
            document.getElementById("message").value = " left the room! 👋";
            sendMessage();
            localStorage.removeItem("room");
            Swal.fire(`You successfully left the chat room!`);
            location.reload();
            document.getElementById("message").value = "";
        }
    });
}

function shareRoom() {
    if (uuid === localStorage.getItem("chatOwner")) {
        document.getElementById("share-menu").classList.remove("hidden");
        document.getElementById("main").classList.add("hidden");
        shareQR();
    } else {
        Swal.fire("Error!", `You don't have permission to share this chat room!`, "error");
    }
}

function closeShareMenu() {
    document.getElementById("share-menu").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
}
checkRoom();
document.addEventListener("keydown", function (event) {
    if (event.which === 13) {
        sendMessage();
    }
});
let chat = true;

function enableChat() {
    chat = true;
    document.getElementById("btn-send").disabled = false;
    document.getElementById("shareButton").disabled = false;
    document.getElementById("btn-send").style.cursor = "pointer";
}

function disableChat() {
    chat = false;
    document.getElementById("btn-send").disabled = true;
    document.getElementById("shareButton").disabled = true;
    document.getElementById("btn-send").style.cursor = "not-allowed";
}

function checkURL(url) {
    let b = url.split("?url=")[1];
    let c = url.split("?url=")[0];
    if (b === undefined || b === null || b == localStorage.getItem("room")) {
        return false;
    }

    Swal.fire({
  title: 'Do you want to join this room?',
  text: "You can always join back if you have the room code!",
  icon: 'info',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Join!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Joined room!',
      'Your have sucessfully join this room.',
      'success'
    );
    joinRoom(b);
    location.replace(c);
  }
})
}

function editRoom() {
    /*let name = prompt("Whats your new chat name?");
      let n = document.getElementById("chatname").value;
      if (name === "") {
          alert("noo");
          return false;
      }
      for (let i = 0; i < bannedwords.length; i++) {
          if (bannedwords[i] == name) {
              alert("noo");
              return false;
          }
      }
      for (let i = 0; i < bannedwords.length; i++) {
          if (name.includes(bannedwords[i])) {
              alert("noo");
              return false;
          }
      }
      const database = firebase.database().ref();
      // Get the data
      let owner = localStorage.getItem("chatOwner");
      let joins = localStorage.getItem("chat-joins");
      let time = localStorage.getItem("chat-time");
      let roomRealName = n;
      data = { joins, owner, roomRealName, time }
      database.child("rooms/" + room).update(data);
      location.reload();
      */
}
let url;
let music = false;

function allowMusic() {
    url = location.href;
    setTimeout(() => {
        checkURL(url);
    }, 2000);
    //setBrowserTheme();
    setTimeout(() => {
        music = true;
        notifyMe();
    }, 7500);
    setTimeout(() => {
        document.getElementById("total-chats").innerText = `Chats created ${roomID.length}`;
    }, 2500);
}

function playAudio(id) {
    if (music) {
        var x = document.getElementById(id);
        x.play();
        x.volume = 0.1;
    }
}

function myAccount() {
    location.replace("../account");
}

function shareFacebook() {
    let url2 = location.href;
    const urltoshare = url2 + "?url=" + localStorage.getItem("room");
    const texttoshow1 = "Hello, join my chat room here";
    const url = `https://www.facebook.com/sharer.php?u=${urltoshare}`;
    window.open(url, "MsgWindow", "width=700,height=500");
}

function shareTwitter() {
    let url = location.href;
    const datatoshare1 = url + "?url=" + localStorage.getItem("room");
    const texttoshow1 = `Hello, i just created a room in eChat : \n \n Join my room by clicking this link `;
    const url1 = `https://twitter.com/intent/tweet?text=${texttoshow1}${datatoshare1}`;
    window.open(url1, "MsgWindow", "width=700,height=500");
}

function shareLink() {
    let url = location.href;
    /* Get the text field */
    document.getElementById("link").classList.remove("hidden");
    document.getElementById("link").value = url + "?url=" + localStorage.getItem("room");
    var copyText = document.getElementById("link");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.getElementById("shareLink").innerText = "Copied to clipboard!";
    setTimeout(() => {
        document.getElementById("shareLink").innerText = "Copy Link";
    }, 1500);
    document.getElementById("link").classList.add("hidden");
}
let preValue;
let wrapper = document.querySelector(".share-menu");
qrImg = wrapper.querySelector(".qr-code img");

function shareQR() {
    let url = location.href;
    url = url.split("?url=")[0];
    let qrValue = url + "?url=" + localStorage.getItem("room");
    console.log(qrValue);
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        console.log("QR code has been generated!");
    });
}

function checkFocus() {
    if (document.hasFocus()) {
        inWebsite = true;
        document.title = "Messeges";
        messagesNotSeen = 0;
    } else {
        inWebsite = false;
    }
}

function notifyMe() {
    if (!window.Notification) {
        console.log("Browser does not support notifications.");
    } else {
        // check if permission is already granted
        if (Notification.permission === "granted") {
            // show notification here
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === "granted") {
                    // show notification here
                } else {
                    console.log("User blocked notifications.");
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}
const chatnameUSER = localStorage.getItem("roomname");
const timeCreatetAgo = time_ago(Number(localStorage.getItem("chat-ms")));

function chatInfo() {
    Swal.fire(`${chatnameUSER}`, `This chat room has been created on ${chatCreated} \n This was created ${timeCreatetAgo}`, `info`);
}


function defaultTheme(){

    var isTrueSet = (theme == 'true');

    if(isTrueSet){
        changeTheme("dark");
    } else {
        changeTheme("light");
    }
}

function setUserTheme(){

    if(theme){ 
        theme = false;
        changeTheme("light");
        localStorage.setItem("user-theme", false);
    } else {
        theme = true;
        changeTheme("dark");
        localStorage.setItem("user-theme", true);
    }
}


// function changeTheme(mode) {

//     if(mode == "dark"){
//         // Enable Dark Mode
//         document.documentElement.style.setProperty("--li-color", "white");
//         document.documentElement.style.setProperty("--li-background", "#343536");
//         document.documentElement.style.setProperty("--li-chat-bubbles", "#343536");
//         document.documentElement.style.setProperty("--buttons", "#00ADB5");
//         document.documentElement.style.setProperty("--button-color", "white");
//         document.documentElement.style.setProperty("--button-border", "none");
//         document.documentElement.style.setProperty("--button-hover", "#18191A");
//         document.body.classList.toggle("darkmode");
//         document.getElementById("chat").style.backgroundColor = "#242526";
//         document.getElementById("chat").classList.add("darkchat");
//         document.getElementById("message").style.backgroundColor = "#343536";
//         document.getElementById("chat").style.color = "white";

//     } else if (mode == "light"){
//         // Disable Dark Mode
//         document.documentElement.style.setProperty("--li-color", "rgba(0, 0, 0, 0.85)");
//         document.documentElement.style.setProperty("--li-background", "#F1F0F0");
//         document.documentElement.style.setProperty("--li-chat-bubbles", "#efefef");
//         document.documentElement.style.setProperty("--buttons", "white");
//         document.documentElement.style.setProperty("--button-color", "black");
//         document.documentElement.style.setProperty("--button-border", "#E0E1E4");
//         document.documentElement.style.setProperty("--button-hover", "#F2F2F2");
//         document.body.classList.remove("darkmode");
//         document.getElementById("chat").style.backgroundColor = "white";
//         document.getElementById("message").style.backgroundColor = "transparent";
//         document.getElementById("chat").style.color = "black";
//     } else {
//         return false;
//     }
// }

function changeSettings() {
    location.replace("settings.html");
}
let em, mess, tim, use, keyy;

function showMenu(email, message, time, username, key, image, ms) {
    messageKEY = key;
    let uu = firebase.auth().currentUser;
    let menu = document.querySelector(".menus");
    menu.classList.remove("hidden");
    document.getElementById("chat").classList.add("hidden");
    document.getElementById("emailMessage").innerText = `(${email})`;
    document.getElementById("usernameMessage").innerText = username;
    document.getElementById("timeMessage").innerText = time;
    document.getElementById("secondsAgo").innerText = time_ago(Number(ms));
    document.getElementById("profileIMG").src = image;
    let mm = urlify(message);
    document.getElementById("messageMessage").innerHTML = mm;
    let messLenght = message.length * 2;
    if (messLenght < 1024) {
        document.getElementById("messageSize").innerText = `${messLenght} Bytes`;
    } else if (messLenght >= 1024) {
        let mm = Math.floor(messLenght * 0.001);
        document.getElementById("messageSize").innerText = `${mm} KB`;
    }
    if (uu.email == email) {
        // Ok
        document.getElementById("deleteMessageButton").style.display = "inline";
    } else {
        document.getElementById("deleteMessageButton").style.display = "none";
    }
    em = email;
    mess = message;
    tim = time;
    use = username;
    keyy = key;

    document.getElementById("replies").innerHTML = "";
    showReply(key);
}

function closeMenu() {
    document.getElementById("menus").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
    document.getElementById("page").classList.remove("hidden");
    window.speechSynthesis.cancel();
}
let utter = new SpeechSynthesisUtterance();
utter.lang = "en-US";
utter.text = "";
utter.volume = 0.75;

function ttsMessage() {
    utter.text = mess;
    window.speechSynthesis.speak(utter);
}

function deleteChat() {
    Swal.fire({
        title: "Are you sure you want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    if (user.email == em) {
                        firebase.database().ref("rooms/" + room + "/chats").child(keyy).remove();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The message (" + mess + ") was deleted.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        
                    } else {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "You don't have permission to delete this message.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return false;
                    }
                }
            });
        }
    });
}

function copyText() {
    document.getElementById("tt").value = mess;
    document.getElementById("tt").classList.remove("hidden");
    let copyText = document.getElementById("tt");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    document.getElementById("tt").classList.add("hidden");
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The text is copied to your clipboard.",
        showConfirmButton: false,
        timer: 1500,
    });
}

window.addEventListener("load", function (e) {
    if (navigator.onLine) {
        this.document.getElementById("chatname").style.color = "rgb(90, 144, 90)";
        enableChat();
    } else {
        this.document.getElementById("chatname").style.color = "lightred";
        disableChat();
    }
}, false);

window.addEventListener("online", function (e) {
    this.document.getElementById("chatname").style.color = "green";
    this.document.getElementById("wifi").classList.add("hidden");
    this.document.getElementById("page").classList.remove("hidden");
    enableChat();
}, false);

window.addEventListener("offline", function (e) {
    this.document.getElementById("chatname").style.color = "red";
    this.document.getElementById("wifi").classList.remove("hidden");
    this.document.getElementById("page").classList.add("hidden");
    disableChat();
}, false);

var speech = false;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join("");
    speech = false;
    document.getElementById("speechToText").style.color = "black";
    document.getElementById("message").value = transcript;
    //console.log(transcript);
});

if (speech == true) {
    recognition.addEventListener("end", () => {
        playAudio("myAudio");
        speech = false;
        document.getElementById("speechToText").style.color = "black";
    });
}

function startMic() {
    if (speech == true) {
        recognition.stop();
        playAudio("myAudio");
        speech = false;
        document.getElementById("speechToText").style.color = "black";
    } else {
        playAudio("myAudio");
        speech = true;
        recognition.start();
        document.getElementById("speechToText").style.color = "red";
    }
}

// Use a closure to keep vars out of global scope
(function () {
    var ID = "tooltip",
        CLS_ON = "tooltip_ON",
        FOLLOW = true,
        DATA = "_tooltip",
        OFFSET_X = 20,
        OFFSET_Y = 10,
        showAt = function (e) {
            var ntop = e.pageY + OFFSET_Y,
                nleft = e.pageX + OFFSET_X;
            $("#" + ID).html($(e.target).data(DATA)).css({
                position: "absolute",
                top: ntop,
                left: nleft,
            }).show();
        };

    $(document).on("mouseenter", ".titleBIG [title]", function (e) {
        $(this).data(DATA, $(this).attr("title"));
        $(this).removeAttr("title").addClass(CLS_ON);
        $("<div id='" + ID + "' />").appendTo("body");
        showAt(e);
    });

    $(document).on("mouseleave", "." + CLS_ON, function (e) {
        $(this).attr("title", $(this).data(DATA)).removeClass(CLS_ON);
        $("#" + ID).remove();
    });

    if (FOLLOW) {
        $(document).on("mousemove", "." + CLS_ON, showAt);
    }

})();

var ID = "tooltip"; // The ID of the styleable tooltip
var CLS_ON = "tooltip_ON"; // Does not matter, make it somewhat unique
var FOLLOW = true; // TRUE to enable mouse following, FALSE to have static tooltips
var DATA = "_tooltip"; // Does not matter, make it somewhat unique
var OFFSET_X = 20,
    OFFSET_Y = 10; // Tooltip's distance to the cursor

const antiMalwareKEY = "3734f688d11cfb4eb2b5f724a62ac37d2b3516e1085139f25317de1a30ea5732";
const requestSERVER = "https://www.virustotal.com/api/v3/urls/";

function checkLink(urlScan) {
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "x-apikey": antiMalwareKEY,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            url: urlScan
        }),
    };
    fetch("https://www.virustotal.com/api/v3/urls", options).then((response) => response.json()).then((response) => {
        let id = response.data.id;
        id = id.split("u-")[1];
        id = id.split("-")[0];
        setTimeout(() => {
            checkResults(id);
        }, 15000);

    }).catch((err) => console.error(err));
}

function checkResults(id) {
    const options2 = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "x-apikey": antiMalwareKEY
        },
    };
    fetch(`https://www.virustotal.com/api/v3/urls/${id}`, options2).then((response) => response.json()).then((response) => {
        let malware = response.data.attributes.last_analysis_stats.malicious;
        let suspicious = response.data.attributes.last_analysis_stats.suspicious;
        let clean = response.data.attributes.last_analysis_stats.harmless;
        if (malware >= 3 || suspicious >= 10) {
            console.log("This might be a malware!");
        } else if (malware >= 5) {
            console.log("This is a malware!");
            closeUnsafeLink();
        } else {
            //console.log("This is a safe link! " + clean + " antiviruses said this link is safe!");
        }

    }).catch((err) => console.error(err));
}

function printMessage(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}

function joinVideo() {
    location.href = "https://evideo.vercel.app/";
}

function openLink(url) {
    let u = url;
    console.log(u);
    if (document.getElementById("chat").classList.contains("hidden")) {
        // Do nothing
    } else {
        document.getElementById("chat").classList.toggle("hidden");
    }

    document.getElementById("iframeBody").classList.toggle("hidden");

    let iframe = document.getElementById("iframe");
    checkLink(url);
    iframe.src = u;
    document.getElementById("newTab").href = u;
}

function closeLinkMenu() {
    if (document.getElementById("menus").classList.contains("hidden")) {
        document.getElementById("chat").classList.toggle("hidden");
    } else {
        // Do nothing
    }
    document.getElementById("iframeBody").classList.toggle("hidden");
    let iframe = document.getElementById("iframe");
    iframe.src = "";
}


function closeUnsafeLink() {
    let iframe = document.getElementById("iframe");
    iframe.src = "https://www.google.com";
}

function shortenURL(url) {
    // const options3 = {
    //     method: "GET",
    //     headers: {
    //         Accept: "application/json"
    //     }
    // };
    // let i = Math.floor(Math.random() * 1000000000);
    // const req = `${proxy}http://erz.rf.gd/api?api=8e5f5ce453703d84e191b64aed63b1edf2d10385&url=${url}&alias=room-${i}&format=text`;

    // fetch(req, options3).then((response) => {
    //     let dt;
    //     response.toString();
    //     dt.toString();
    //     data = JSON.parse(dt);


    // }).then((data) => {
    //     console.log(data)
    //     // if (response.status == "success") {
    //     //     return response.shortenedUrl;
    //     // } else {
    //     //     return false;
    //     // }
    // }).catch((error) => {
    //     console.log(error);
    // });
}

function goContact() {
    location.href = "https://erzenchat.tk/contact";
}

function goPrivacy() {
    location.href = "../privacy";
}



// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     //location.replace("../");
//     // ...
//   } else {
//     // User is signed out
//     // ...

//     location.href = "account.html";
//   }
// });

let old;
/*
document.getElementById("translate").addEventListener("click", () => {
    let t = document.getElementById("messageMessage").textContent;
    if (t.length > 500){
        showAlert("Error!", "The maximum length to translate is 500 characters!");
        return false;
    }
    old = t;
    translate(t);
});


function translate(text){
    const api = `https://api.mymemory.translated.net/get?q=${text}&langpair=Autodetect|${getLanguage()}`
    fetch(proxy + api).then((response) => response.json()).then((data) => {
        document.getElementById("messageMessage").textContent = data.responseData.translatedText;
        return data.responseData.translatedText;
    }).catch((error) => {
        return text;
    });
}
*/
var getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };


function getLanguage(){
    let shortLang = getFirstBrowserLanguage();
    if (shortLang.indexOf('-') !== -1)
        shortLang = shortLang.split('-')[0];

    if (shortLang.indexOf('_') !== -1)
        shortLang = shortLang.split('_')[0];
        return shortLang;
  }


function showAlert(title, text){
        Swal.fire({
        title: title,
        html: text,
        timer: 1e3,
        timerProgressBar: !0,
        onBeforeOpen: () => {
            Swal.showLoading(), timerInterval = setInterval(() => { }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then(e => {
        e.dismiss, Swal.DismissReason.timer
    });
}


function sendReply(){
    if(messageKEY == false){
        return false;
    }

    let message = document.getElementById("replyMessage").value;
    let name = message.toLowerCase();

    message = message.replace(/["']/g, ""); // Remove quotes
    message = removeTags(message); // Remove tags

    if(message == "" || message.length < 0){
        Swal.fire("You can't send empty messages.")
        return false;
    }
    
    let t = new Date();
    let time = getTime();
    if (t.getMonth() < 10) {
        if (t.getHours() < 10) {
            if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
            } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
            }
        } else {
            if (t.getMinutes() < 10) {
                time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
            } else {
                time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
            }
        }
    } else {
            if (t.getHours() < 10) {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "     0" + t.getHours() + ":" + t.getMinutes();
                }
            } else {
                if (t.getMinutes() < 10) {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":0" + t.getMinutes();
                } else {
                    time = t.getDate() + "/0" + t.getMonth() + "/" + t.getFullYear() + "    " + t.getHours() + ":" + t.getMinutes();
                }
            }
        }

        const arrayBad = bannedwords.length;

        for (let i = 0; i < arrayBad; i++) {
            if (bannedwords[i] == name) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    Swal.fire("Your message has been blocked for using bad words. Please remove them.");
                    return false;
                }
            }
        }
        for (let i = 0; i < arrayBad; i++) {
            if (name.includes(bannedwords[i])) {
                message = message.replace(new RegExp(bannedwords[i], "g"), "****");
                if(browserName == "Safari"){
                    return false;
                }
            }
        }
        if (message.length >= messageLenght) {
            Swal.fire(`You reached the maximun length limit of ${messageLenght} characters! (${message.length})`);
            document.getElementById("message").value = "";
            return false;
        } else {
            firebase.database().ref("rooms/" + room + "/chats/" + messageKEY + "/reply").push().set({
                message: message,
                time: time,
                user: localStorage.getItem("uName"),
                username: username,
                "timespan": t.getTime(),
                image: localStorage.getItem("image") ?? "https://studenti.uni-pr.edu/Images/users/male-empty-user.jpg"
            });
            document.getElementById("replyMessage").value = "";
        }
}


function showReply(key){
    firebase.database().ref("rooms/" + room + "/chats/" + key + "/reply").orderByChild("ms").on("child_added", function (snapshot) {
        // Get the messages
        let owner = snapshot.val().user;
        let message = snapshot.val().message;
        let username = snapshot.val().username;
        let times = snapshot.val().time;
        let postKey = snapshot.key;
        let ms = snapshot.val().timespan;
        let image = snapshot.val().image;
        createReply(owner, message, times, username, postKey, ms, image);
    });
}


function createReply(user, message, time, username, postKey, ms, image) {

    let ul = document.getElementById("replies");

    let messageFirst = `${urlify(String(message))} \n <p class="timemin">${time_ago(ms)}</p>`;
    replyIndex++;

    let imageP = image ?? "https://studenti.uni-pr.edu/Images/users/male-empty-user.jpg";
    let li = document.createElement("li");
    let text = `<div class="first"><div><div class="circular--portrait"><img src="${imageP}" class="img" alt="Profile picture of ${user}"></div></div><div>${username} <br> ${messageFirst}</div></div>`;
    li.innerHTML = text;
    ul.appendChild(li);
    let attribute1 = document.createAttribute("id");
    let attribute2 = document.createAttribute("class");
    let attribute3 = document.createAttribute("title");
    let attribute4 = document.createAttribute("title");
    let attribute5 = document.createAttribute("class");
    let attribute7 = document.createAttribute("data-key");
    let attribute8 = document.createAttribute("class");
    let info = `${user} \n\n ${time}`;
    attribute1.value = `message-id-reply-${key}`;
    attribute2.value = "message-class animate__bounceIn";
    attribute3.value = `${user} \n\n ${time}`;
    attribute4.value = `You are mentioned in this message!\n\n ${info}`;
    attribute5.value = "notify";
    attribute7.value = key;
    attribute8.value = "myMessage";
    li.setAttributeNode(attribute1);
    li.setAttributeNode(attribute2);
    li.setAttributeNode(attribute3);
    li.setAttributeNode(attribute7);
    if (username == username) {
        li.setAttributeNode(attribute8);
    } else {
        let n = message.toString().includes("@" + username);
        if (n) {
            // playAudio("myAudio");
            // document.getElementById(`message-id-${darkIndex}`).style.color = "#DD4132";
            // li.setAttributeNode(attribute4);
            // li.setAttributeNode(attribute5);
        }
    }
    if (inWebsite === true) {} else {
        messagesNotSeen++;
        document.title = `(${messagesNotSeen}) unread messeges!`;
        setTimeout(() => {
            if (inWebsite) {
                playAudio("newMessage");
            } else {}
        }, 750);
        if (music) {
            //
        } else {}
    }
    // No scrolling
    $("#replies").animate({
        scrollTop: $("#replies").prop("scrollHeight")
    }, 0);
    document.getElementById('replies').scrollTop =  document.getElementById('replies').scrollHeight;
}

setInterval(checkFocus, 200);


