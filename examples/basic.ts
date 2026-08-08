import { SDK } from "nikki.streams";

SDK.initialize("abc123456789");

function devCallback(data:any){
    console.debug("data ", JSON.stringify(data))
}

let dev = SDK.createDevice("192.168.1.69:3000", devCallback)

dev.connect()


let status = false
setInterval(() => {
    status = !status;
    dev.setLightStatus(status);
}, 3000);