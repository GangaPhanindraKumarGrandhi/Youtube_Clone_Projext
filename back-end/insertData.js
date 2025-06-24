import mongoose from "mongoose";
import Video from "./models/Vedio_model.js"
mongoose.connect("mongodb://localhost:27017/YoutubeClone")
const db =mongoose.connection
db.on("open",async ()=>{
    console.log("Connection Succesful")

 try{
 await Video.deleteMany({});

 await Video.insertMany([
    {
      VedioId:  "video01",
      title: "Learn React In 30 Minutes",
      category:"Education",
      thumbnailUrl: "https://img.youtube.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/hQAHSlTtcmY?autoplay=1&rel=0",
      description: "In this video I will be covering all of the basics of React in only 30 minutes. We will cover create-react-app, components, state, props, rendering, event handling, and so much more. By the end of this video you will have a full understanding of the basics of React, but if you want to take your React knowledge to the next level checkout my full React course linked above for the best React learning experience on the web.",
      channelId: "@WebDevSimplified",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmeBlCnSpcRLqIzjBnwfv3lOuDTRDHLY0jQ&s",
      uploader: "Web Dev Simplified",
      views: "1,389,127 views",
      likes: "27k",
      dislikes: "2k",
      comments: [{"commentId": "comment01","userId":"@jardinek2121", "text":"QUICK TIP: Make sure your playback is at least 1.5 times speed, if you want to become fluent in Todo language.","timestamp":"4 years ago"}],
    },
    {
      VedioId:  "video02",
      title: "Raghuvaran B.tech Songs - Luckkanna Mate Nillu - Dhanush, Amala Paul",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/Mm1Zp80gj1Q/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/Mm1Zp80gj1Q?autoplay=1&rel=0",
      description:" Dhanush, Amala Paul, Saranya Ponvannan, Samidrakani, Surabhi, Amitesh & Vivek. This movie Wriiten & Directed by R. Velraj. Produced by Sravanthi Ravi Kishore. Music of the film composed by Anirudh.",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "49,444,993 views",
      likes: "351k",
      dislikes: "3k",
      comments:[{"commentId": "comment02","userId":"@nayakudisanjay9353","text":"National anthem for singles...💘💘💘","timestamp":"6 years ago "}]
    },
    {
      VedioId:  "video03",
      title: "Chirunama Thana Chirunama Full Video Song  Ekkadiki Pothavu Chinnavada Songs Nikhil, Avika Gor",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/6CcOrjc0bJ4/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/6CcOrjc0bJ4?autoplay=1&rel=0",
      description:"Movie: Ekkadiki Pothavu Chinnavada,Cast: Nikhil Siddharth,Hebah Patel, Nandita Swetha,Avika Gor,Raja Ravindra,Director: Vi Anand,Music: Shekar Chandra,Producer:P.VRao",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "27,285,148 views",
      likes: "141k",
      dislikes: "1k",
      comments:[{"commentId": "comment03","userId":"@prashanth394","text":"2021 లో కూడా ఈ సాంగ్ వినేవాళ్ళు ఒక లైక్ వేసుకోండి భయ్యా...... Superb lyrics","timestamp":"4 years ago"}]
    },
    {
      VedioId:  "video04",
      title: "Julayi Latest Telugu Full Length Movie | Allu Arjun, Ileana | 2021 Telugu Movies",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/tZquI3a1qZw/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/tZquI3a1qZw?autoplay=1&rel=0",
      description:"Cast: Allu Arjun, Ileana D'Cruz, Sonu Sood, Rajendra Prasad,Director: Trivikram Srinivas,Music: Devi Sri Prasad,Producer: S. Radha Krishna, DVV Danayya",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "14,769,203 views",
      likes: "66k",
      dislikes: "2.5k",
      comments:[{"commentId": "comment04","userId":"@Handcrafts_for_u","text":"10 times kante ekkuva sarlu chusinavallu entha mandi unnaru","timestamp":"6 months ago"}]
    },
    {
      VedioId:  "video05",
      title: "Yentavadu Gaani Latest Telugu Movie Songs - Neekem Kaavaalo Cheppu - Ajith, Anushka",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/3_rMnglt5Vk/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/3_rMnglt5Vk?autoplay=1&rel=0",
      description:"Movie: Yentavadu Gaani,Cast: Ajith, Trisha, Anushka,Director: Gautham Menon, Music: Harris Jayraj, Producer: S.Aishwarya,Release Date: May 22, 2015.",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "35,615,157 views",
      likes: "161k",
      dislikes: "3.5k",
      comments:[{"commentId": "comment05","userId":"@ngracypriyanka8511","text":"I miss you daddy. I love you daddy. Who love there father just like here👇","timestamp":"5 years ago"}]
    },
    {
      VedioId:  "video06",
      title: "Raja Rani Telugu Full Length Movie || Aarya, Nayanthara, Nazriya Nazim, Jai",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/qgSpqOHP3H8/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/qgSpqOHP3H8?autoplay=1&rel=0",
      description:"Raja Rani is the story of a newly married couple, Arya & Nayantara who are like Tom and Jerry. Raja Rani is the story of Arya & Nayantara before and after their wedding.",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "44,349,443 views",
      likes: "275k",
      dislikes: "3k",
      comments:[{"commentId": "comment06","userId":"@kpardharam4505","text":"First Half for Girls Side.... Second half for Boys side...and Single's side 💙💙💙😘😘😘 what a movie ..what a Direction.. hattsoff  To the director Attlee sir 🙏💯🔥","timestamp":"5 years ago"}]
    },
    {
      VedioId:  "video07",
      title: "Pokiri Telugu Full HD Movie | 4K | Mahesh Babu, Ileana D'Cruz | 2025 New Telugu Movies",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/sIX8ghgD2x8/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/sIX8ghgD2x8?autoplay=1&rel=0",
      description:"Pokiri Telugu Full HD Movie | 4K | Mahesh Babu, Ileana D'Cruz",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "13,048 views",
      likes: "199k",
      dislikes: "2k",
      comments:[{"commentId": "comment07","userId":"@SampathSyndicate","text":"movie audio normal la lekunda pitch change ayindi pettaru 4k ani cheppi cheating chesaru nenu unlike kottina poo","timestamp":"5 years ago"}]
    },
    {
      VedioId:  "video08",
      title: "#S/O Satyamurthy Movie #AlluArjun Very Heart Touching Scenes",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/W-KUmkuej4s/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/W-KUmkuej4s?autoplay=1&rel=0",
      description:"What a performance by Allu Arjun and Rao Ramesh, superb acting",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "3,922,881 views",
      likes: "33k",
      dislikes: "1k",
      comments:[{"commentId": "comment08","userId":"@NIRANJANKUMAR-vv5le","text":"Trivikram Dialogues+Allu Arjun Acting+DSP BGM 🔥🔥🔥🔥🔥","timestamp":"2 years ago"}]
    },
    {
      VedioId:  "video09",
      title: "Allu Arjun Most Popular Power Pack Action Scene | Upendra | S/O Satyamurthy Movie",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/Tcsg8OIxcRk/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/Tcsg8OIxcRk?autoplay=1&rel=0",
      description:"Uppi acting ,ravishankar voice super combination,love from karnataka because uppi2 fans like here",
      channelId:"@VolgaVideo",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbGAgSo-J4GABR5lfFYzDMM0JpQ1-niCo5A&s",
      uploader:"Volga Video",
      views: "4,875,898 views",
      likes: "22k",
      dislikes: "1.5k",
      comments:[{"commentId": "comment09","userId":"@pradeepac.b4257","text":"ನಮ್ಮ ಕರ್ನಾಟಕದ ಸ್ಯಾಂಡಲ್ ವುಡ್ ನ ಉಪೇಂದ್ರ ಸರ್ ಅವರ ಆಕ್ಟಿಂಗ್ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ","timestamp":"6 years ago"}]

    },
    {
      VedioId:  "video10",
      title: "Magadheera Movie Action Scene | Ram Charan, Kajal Aggarwal | Sunil, DevGill, SriHari | SS Rajamouli",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/A2hTZDss95Y/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/A2hTZDss95Y?autoplay=1&rel=0",
      description:"Magadheera is our Telugu-language fantasy action film directed by S. S. Rajamouli and produced by Allu Aravind under Geetha Arts, on a story by V. Vijayendra Prasad. The film stars Ram Charan, Srihari, Kajal Aggarwal and Dev Gill in lead roles. Music composed by MM Keeravani. Cinematography by K. K. Senthil Kumar. Edited by Kotagiri Venkateswara Rao.",
      channelId:"@geethaarts",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiftZuFII19ZkgXtdLgPH3n97KAXfA7tpLSQ&s",
      uploader:"Geetha Arts",
      views: "1,501,429 views",
      likes: "11k",
      dislikes: "2k",
      comments:[{"commentId": "comment10","userId":"@deepakdkdr7169","text":"This scene in the movie is carried by MM.KEERAVANI SIR BACKGROUND MUSIC 🎶 🎵 ❤❤","timestamp":"5 years ago"}]
    },
    {
      VedioId:  "video11",
      title: "Magadheera Telugu Full Movie | 4K | Dolby Audio | Ram Charan, Kajal Aggarwal, Dev Gill | SSRajamouli",
      category:"Movie",
      thumbnailUrl: "https://img.youtube.com/vi/1DIrsAOkx1c/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/1DIrsAOkx1c?autoplay=1&rel=0",
      description:"Magadheera is our Telugu-language fantasy action film directed by S. S. Rajamouli and produced by Allu Aravind under Geetha Arts, on a story by V. Vijayendra Prasad. The film stars Ram Charan, Srihari, Kajal Aggarwal and Dev Gill in lead roles. Music composed by MM Keeravani. Cinematography by K. K. Senthil Kumar. Edited by Kotagiri Venkateswara Rao.",
      channelId:"@geethaarts",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiftZuFII19ZkgXtdLgPH3n97KAXfA7tpLSQ&s",
      uploader:"Geetha Arts",
      views: "54216,352 views",
      likes: "55k",
      dislikes: "2k",
      comments:[{"commentId": "comment11","userId":"@RavikumarJSP","text":"Ee cenima chusi baytiki vellaleka again theatre ki velli aa sound vine vanni ","timestamp":"1 year ago"}]
    },
    {
      VedioId:  "video12",
      title: "Nuvvostanante Nenoddantana Video Songs | Aakasam Thakela Video Song | Siddharth",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/81fRS0FildI/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/81fRS0FildI?autoplay=1&rel=0",
      description:"Siri (Trisha) & Sivarama Krishna (Srihari) are orphans. Their rich father leaves their mother for another woman. And so their mother dies in distress. With this kind of troubled childhood, Sivarama Krishna (Srihari) takes care of his little sister Siri and makes sure that she gets all the brotherly love she needs",
      channelId:"@SriBalajiMusic",
      channelLogo:"https://yt3.googleusercontent.com/OEFzd658gBRbDAMLHMA2uPcB5Oy4j8w30cgwfMz51RDnbSA5U35or0NVAbgeoVAr-cBwpkQvug=s900-c-k-c0x00ffffff-no-rj",
      uploader:"Sri Balaji Music",
      views: "56,468,833 views",
      likes: "195k",
      dislikes: "2k",
      comments:[{"commentId": "comment12","userId":"@ravib1082","text":"Thrisha's expressions in this song is priceless. Most underrated beauty.","timestamp":"4 years ago"}]

    },
    {
      VedioId:  "video13",
      title: "Oye Video Songs | Oye Oye (Title Song) Video Song | Siddharth, Shamili | Sri Balaji Video",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/nmAI4ut_Yro/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/nmAI4ut_Yro?autoplay=1&rel=0",
      description:"Uday (Siddharth) is a rich and spoilt brat who believes in short term pleasures. Sandhya (Shamili) is a loner who lives on her own. She is a responsible girl with long term plans and strict principles. Uday falls in love with Sandhya at the very first sight. And she joins her place as a paying guest.",
      channelId:"@SriBalajiMusic",
      channelLogo:"https://yt3.googleusercontent.com/OEFzd658gBRbDAMLHMA2uPcB5Oy4j8w30cgwfMz51RDnbSA5U35or0NVAbgeoVAr-cBwpkQvug=s900-c-k-c0x00ffffff-no-rj",
      uploader:"Sri Balaji Music",
      views: "25,866,432 views",
      likes: "95k",
      dislikes: "2k",
      comments:[{"commentId": "comment13","userId":"@vishiyas","text":"Got a chance to see the live performance of this Song at a Vizag with a live band. The drum work is exceptional, I mean seriously good stuff and real talent. Intricate notes and many types of drums were used to get the song right.","timestamp":'4 months ago'}]
    },
    {
      VedioId:  "video14",
      title: "Bala Tripuramani - Full Video | Brahmotsavam | Mahesh Babu | Kajal Aggarwal | Mickey J Meyer",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/zq55GTBp8ho/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/zq55GTBp8ho?autoplay=1&rel=0",
      description:"Presenting the full video of Bala Tripuramani sung by Rahul Nambiar. ",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "7,856,764 views",
      likes: "93k",
      dislikes: "3k",
      comments:[{"commentId": "comment14","userId":"@NameisChakri","text":"Kajal is like a Princess who came from wonderland ❤","timestamp":"4 months ago"}]
    },
    {
      VedioId:  "video15",
      title: "என்னை சொந்தம் Ennai Sondham - Bhediya | Varun Dhawan, Kriti Sanon | Sachin-Jigar",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/kZHStsm4jSY/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/kZHStsm4jSY?autoplay=1&rel=0",
      description:"Starring: Varun Dhawan, Kriti Sanon, Deepak Dobriyal, Abhishek Banerjee, Paalin Kabak ",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "3,850 views",
      likes: "933k",
      dislikes: "13k",
      comments:[{"commentId": "comment15","userId":"@avenjustortamil8291","text":"Dai Yara neenga enga irundhu da vandhu irukinga Unga YouTube channel la indha Movie oda all Songs Tamil Version Available ah irukku edhuku da original irukkum bodhu thirumbo Release pandinga","timestamp":"2 years ago"}]

    },
    {
      VedioId:  "video16",
      title: "நான் மெல்ல மெல்ல காதலில் Naan Mella Mella Kaadhalil | Sidharth Malhotra,Neha Sharma | Denniz Joseph",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/rDlMFLi1F2M/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/rDlMFLi1F2M?autoplay=1&rel=0",
      description:"Song: Naan Mella Mella Kaadhalil Singer: Denniz JosephTamil Writer: Rupendar KiranMixing: Pankaj Rajpoot",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "2,894 views",
      likes: "933k",
      dislikes: "13k",
      comments:[{"commentId": "comment16","userId":"@NEHADEVASIA","text":"Amazing job... The try to do in Tamil was really good... The voice is nice...","timestamp":"2 months ago"}]

    },
    {
      VedioId:  "video17",
      title: "Naa Kosam - Full Video | Bangarraju | Naga Chaitanya | Krithi Shetty | Anup Rubens",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/BDgK6E-2LyM/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/BDgK6E-2LyM?autoplay=1&rel=0",
      description:"Akkineni Nagarjuna, Akkineni Naga Chaitanya, Ramya Krishna, Krithi Shetty, Rao Ramesh, Brahmaji, Vennela Kishore, Jhansi, Anitha Chowdhary, Rohini, Praveen, Padma Soorya & Ranjith",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "2,894 views",
      likes: "933k",
      dislikes: "13k",
      comments:[{"commentId": "comment17","userId":"@sanjukumar580","text":"ఈ పాట అంటే ఎంతమందికి ఇష్టం...😍🔥ఈ పాట వింటున్న సేపు ఏదో లోకానికి వెళ్ళి పోయినట్టు ఉంది అనూప్ రుబీన్స్  అద్భుతమైన మ్యూజిక్ ఇచ్చాడు సిద్ శ్రీరామ్ పాటకి ప్రాణం పోశాడు సూపర్👌👌","timestamp":"3 years ago"}]
    },
    {
      VedioId:  "video18",
      title: "Spirit Of Jersey - Full Video | Jersey | Nani, Shraddha Srinath | Anirudh Ravichander",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/_xuI60USDjw/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/_xuI60USDjw?autoplay=1&rel=0",
      description:"Presenting the full video of Spirit Of Jersey sung by Kaala Bhairava.",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "15,462,388 views",
      likes: "223k",
      dislikes: "3k",
      comments:[{"commentId": "comment18","userId":"@sudheemadhav","text":"Idk when iam listening to this song I remember virat kohli nd his efforts for winning Every match for India 😊😊","timestamp":"1 day ago"}]

    },
    {
      VedioId:  "video19",
      title: "Run - Full Video | Bruce Lee The Fighter | Ram Charan | Sai Sharan & Nivaz",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/OpjbJXciXwU/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/OpjbJXciXwU?autoplay=1&rel=0",
      description:"Presenting the full video of Run from Bruce Lee The Fighter featuring Ram Charan. ",
      channelId:"@zeemusicsouth",
      channelLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6C9iS5H7mVslUBcWSX-Sdnh3E16ws6V19ROEfeQtjH9rEQcudgFt_jTptPpZfGnpgXo&usqp=CAU",
      uploader:"Zee Music South",
      views: "15,462,388 views",
      likes: "225k",
      dislikes: "9k",
      comments:[{"commentId": "comment19","userId":"@akhilabhoopathi9456","text":"Ramcharan ki avaru poti raru raleru. He z king of dance","timestamp":"4 years ago"}]
    },
    {
      VedioId:  "video20",
      title: "Gabbar Singh Songs | Pillaa Nuvveleni Jeevitham Full Video Song | Latest Telugu Superhits",
      category:"Music",
      thumbnailUrl: "https://img.youtube.com/vi/2Uc9Pw9uS9k/maxresdefault.jpg",
      src:"https://www.youtube.com/embed/2Uc9Pw9uS9k?autoplay=1&rel=0",
      description:"Watch & Enjoy Gabbar Singh Latest Telugu Movie Songs, Starring Pawan Kalyan, Shruti Hassan & others, Music Composed by Devi Sri Prasad, Directed by Harish Shankar S. #GabbarSingh #PawanKalyan #DeviSriPrasad",
      channelId:"@SriBalajiMovies",
      channelLogo:"https://yt3.googleusercontent.com/OEFzd658gBRbDAMLHMA2uPcB5Oy4j8w30cgwfMz51RDnbSA5U35or0NVAbgeoVAr-cBwpkQvug=s900-c-k-c0x00ffffff-no-rj",
      uploader:"SriBalajiMovies",
      views: "15,776,441 views",
      likes: "255k",
      dislikes: "6k",
      comments:[{"commentId": "comment20","userId":"@murughanandhanv.m6309","text":"Welcome to Tamilnadu Pawan Kalyan 👌👌💯👑👑 DSP music king 👑💯","timestamp":"4 months ago"}]
    }
    
 ])
console.log("Data Added Successfully")
 }catch(err){
  console.error("Error inserting data:", err);
 }
 });
 const AllData = await Video.find({})

export default AllData
  