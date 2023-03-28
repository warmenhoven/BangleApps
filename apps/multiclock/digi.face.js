(() => {

function getFace(){

    var W = g.getWidth();
    var H = g.getHeight();
    var scale = W/240;

    const is12Hour = (require("Storage").readJSON("setting.json", 1) || {})["12hour"];

    var buf = Graphics.createArrayBuffer(W,92,1,{msb:true});
    function flip() {
      g.setColor(g.theme.fg);
      g.drawImage({width:buf.getWidth(),height:buf.getHeight(),buffer:buf.buffer},0,H/2-34);
    }
    
    var W = g.getWidth();
    var H = g.getHeight();

    function d02(value) {
      return ('0' + value).substr(-2);
    }
    function getHours(now) {
      if (!is12Hour)
        return now.getHours();
      if (!now.getHours())
        return 12;
      return now.getHours() - (now.getHours() > 12 ? 12 : 0);
    }

    function drawTime() {
      buf.clear();
      buf.setColor(1);
      var now = new Date();
      const hour = d02(getHours(now));
      const minutes = d02(now.getMinutes());
      const seconds = d02(now.getSeconds());
      const time = hour + ":" + minutes + ":" + seconds;
      buf.setFont("Vector",54*scale);
      buf.setFontAlign(0,-1);
      buf.drawString(time,W/2,0);
      buf.setFont("6x8",scale<1?1:2);
      buf.setFontAlign(0,-1);
      var date = now.toString().substr(0,15);
      buf.drawString(date, W/2, 70*scale);
      flip();
    }  
    return {init:drawTime, tick:drawTime, tickpersec:true};
}

return getFace;

})();
