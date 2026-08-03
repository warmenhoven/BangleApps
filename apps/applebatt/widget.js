(function(){
  const intervalLow = 120000;
  const intervalHigh = 30000;


  function draw() {
    var x = this.x, y = this.y, w = this.width-5;
    const l = E.getBattery();
    const lw=(w)*(l/100)

    g.setColor("#808080");
    g.fillRect({x:x+2,y:y+2,w:w,h:16,r:6})
    let col=g.theme.fg
    if(l<20) col="#f00"
    if(Bangle.isCharging()) col="#0f0"
    g.setColor(col);
    g.fillRect({x:x+2,y:y+2,w:lw,h:16,r:6})
    g.setFontAlign(0,0).setColor(g.theme.bg)
    g.setFont("14").drawString(l,x+2+(w/2),y+12)
    if (Bangle.isCharging()) changeInterval(id, intervalHigh);
      else changeInterval(id, intervalLow);
  }


  WIDGETS["applebatt"] = { area:"tr", width:32, draw:draw };
  Bangle.on('charging', () => WIDGETS["applebatt"].draw());
  var id = setInterval(() => WIDGETS["applebatt"].draw(), intervalLow);

})();