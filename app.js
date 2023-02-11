const axios = require("axios")
const {Client , MessageAttachment , MessageEmbed} = require("discord.js")
const client = new Client()
const moment = require("moment")
moment.locale("tr")
let url = "https://api.berkealp.net/kandilli/index.php?last"

client.once('ready', () => {
    console.log('Ready!');
});

client.on("message" , message => {
    if(message.content === "son deprem") {
        axios({
            method: 'post',
            url: url,  
          }).then(x => {
              let depremzaman = x.data[0].Time
              let şiddeti = x.data[0].Magnitude
              let depremnerde = x.data[0].Region
              let url = x.data[0].MapImage
              let type = x.data[0].MagnitudeType
              let enlem = x.data[0].Latitude
              let boylam = x.data[0].Longitude
              let zaman = moment(depremzaman).format("LLLL")
              let geçen = moment(depremzaman).startOf('hour').fromNow()
              console.log(url)
              const attachment = new MessageAttachment(url);
             return message.channel.send(new MessageEmbed().setDescription("```TARIH: ["+zaman+"("+geçen+")]\nSIDDETI: ["+şiddeti+""+type+"]\n\nKONUM: ["+depremnerde+"]\nENLEM: ["+enlem+"]\nBOYLAM: ["+boylam+"]```").setImage(url).setColor("RED"))
          })
}})
    
  client.login("")
