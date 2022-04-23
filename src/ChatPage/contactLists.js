import imgArya from '../images/Arya_Stark.jpg'
import imgJon from '../images/jon_snow.jpg'
import imgCatelyn from '../images/catelyn_stark.png'
import imgNed from '../images/Ned_Stark.jpg'
import imgRob from '../images/rob_stark.jpg'
import imgSansa from '../images/sansa_stark.jpg'
import record from '../images/welcome_record.ogg'
import video from '../images/example_video.mp4'

let contactLists = [
    ["054-1234567", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"],[record, "record", "snd", "08:41, 04/14/2022"]], new: 1, source: imgSansa },  //jon
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"], [imgNed, "image", "snd", "08:41, 04/14/2022"], [video, "video", "rcv", "08:42, 04/14/2022"]], new: 1, source: imgArya },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgRob },
    { name: "Eddard", phoneNumber: "054-6789012", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgNed },
    { name: "Catelyn", phoneNumber: "054-5678901", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: imgCatelyn }]],
    ["054-2345678", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgSansa },  //arya
    { name: "Jon", phoneNumber: "054-1234567", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"], [imgNed, "image", "rcv", "08:41, 04/14/2022"] [video, "video", "snd", "08:42, 04/14/2022"]], new: 0, source: imgJon },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgRob },
    { name: "Eddard", phoneNumber: "054-6789012", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgNed },
    { name: "Catelyn", phoneNumber: "054-5678901", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: imgCatelyn }]],
    ["054-3456789", [{ name: "Jon", phoneNumber: "054-1234567", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"], [record, "record", "rcv", "08:41, 04/14/2022"]], new: 0, source: imgJon },  //sansa
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgArya },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgRob },
    { name: "Eddard", phoneNumber: "054-6789012", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgNed },
    { name: "Catelyn", phoneNumber: "054-5678901", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: imgCatelyn }]],
    ["054-4567890", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgSansa },  //rob
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgArya },
    { name: "Jon", phoneNumber: "054-1234567", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgJon },
    { name: "Eddard", phoneNumber: "054-6789012", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgNed },
    { name: "Catelyn", phoneNumber: "054-5678901", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: imgCatelyn }]],
    ["054-5678901", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgSansa },  //catelyn
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgArya },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgRob },
    { name: "Eddard", phoneNumber: "054-6789012", messages: [['what is up?', "text", "rcv", "08:40, 04/14/2022"]], new: 1, source: imgNed },
    { name: "Jon", phoneNumber: "054-1234567", messages: [['what is up?',"text","snd","08:40, 04/14/2022"]] , new: 0, source: imgJon }]],
    ["054-6789012", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgSansa },  //eddard
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgArya },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgRob },
    { name: "Jon", phoneNumber: "054-1234567", messages: [['what is up?', "text", "snd", "08:40, 04/14/2022"]], new: 0, source: imgJon },
    { name: "Catelyn", phoneNumber: "054-5678901", messages: [['what is up?',"text","snd","08:40, 04/14/2022"]] , new: 0, source: imgCatelyn }]]
]
export default contactLists;