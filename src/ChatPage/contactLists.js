import img1 from '../images/WhatsApp Image 2021-11-23 at 20.47.52.jpeg' //jon
import img2 from '../images/WhatsApp Image 2021-11-23 at 20.47.52.jpeg' //arya
import img3 from '../images/WhatsApp Image 2022-04-01 at 09.26.16.jpeg' //sansa
import img4 from '../images/WhatsApp Image 2022-04-01 at 09.26.16.jpeg' //rob

let contactLists = [
    ["054-1234567", [{ name: "Sansa", phoneNumber: "054-3456789", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]], new: 1, source: img3 },  //jon
    { name: "Arya", phoneNumber: "054-2345678", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]], new: 1, source: img2 },
    { name: "Rob", phoneNumber: "054-4567890", messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: img4 }]],
    ["054-3456789", [{ name: "Jon", phoneNumber: "054-1234567",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 0, source: img1 }, //sansa
    { name: "Arya", phoneNumber: "054-2345678",  messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]], new: 1, source: img2 },
    { name: "Rob", phoneNumber: "054-4567890",  messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: img4 }]],
    ["054-2345678", [{ name: "Jon", phoneNumber: "054-1234567",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 0, source: img1 },  //arya
    { name: "Sansa", phoneNumber: "054-3456789",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 2, source: img3 },
    { name: "Rob", phoneNumber: "054-4567890",  messages: [['what is up?',"text","rcv","08:40, 04/14/2022"]] , new: 1, source: img4 }]],
    ["054-4567890", [{ name: "Jon", phoneNumber: "054-1234567",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 0, source: img1 }, //rob
    { name: "Sansa", phoneNumber: "054-3456789",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 2, source: img3 },
    { name: "Arya", phoneNumber: "054-2345678",  messages: [['what is up?',"text","snd","08:40, 04/14/2022"]], new: 1, source: img2 }]]
]
export default contactLists;