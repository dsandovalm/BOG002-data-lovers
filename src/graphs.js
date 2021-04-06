const graphs = {
  poligon: function(canvas,ctx,datos,maximo){
    //Toma el canvas y encuentra el centro
    let w = canvas.width;
    let h = canvas.height;
    let center = {
      x: w/2,
      y: h/2
    }
    let r = w < h ? w*3/8 : h*3/8; 
    let gap = r/maximo;
    console.log(gap)

    ctx.beginPath();
    ctx.arc( center.x, center.y, r, 0, 2*Math.PI );
    ctx.arc( center.x, center.y, r*8/7, 0, 2*Math.PI );
    ctx.stroke();
    ctx.closePath();

    //Las lineas
    ctx.beginPath();
    for (let i = 0;i<datos.length;i++){
      ctx.moveTo(center.x,center.y);
      //Calcular el angulo
      let angle = (2 * i * Math.PI / datos.length) - (3 * Math.PI / 2);
      ctx.lineTo(center.x + (r * Math.cos(angle)),center.y + (r * Math.sin(angle)));
    }
    ctx.stroke();
    ctx.closePath();


    //Ahora un poligono, empieza abaho
    ctx.beginPath();
    ctx.moveTo(center.x, center.y + (datos[0] * gap ));

    for (let i = 0;i<datos.length;i++){
      //Calcular el angulo
      let angle = (2 * i * Math.PI / datos.length) - (3 * Math.PI / 2);
      ctx.lineTo(center.x + (datos[i] * gap * Math.cos(angle)), center.y + (datos[i] * gap * Math.sin(angle)));
    }
    ctx.lineTo(center.x, center.y + (datos[0] * gap ));
    ctx.stroke();
    ctx.closePath();
  },
  
  max: function (datos){
    let maximo = datos[0];
    for(let i=1;i<datos.length;i++){
      if(datos[i]>maximo){
        maximo = datos[i]
      }
    }
    return maximo;
  },
  min: function (datos){
    let minimo = datos[0];
    for(let i=1;i<datos.length;i++){
      if(datos[i]<minimo){
        minimo = datos[i]
      }
    }
    return minimo;
  },
  
  mid: function (datos){
    console.log(datos[0])
    let floor = datos.sort()[Math.floor((datos.length-1)/2)];
    let ceil = datos.sort()[Math.ceil((datos.length-1)/2)];
    console.log('Bot ' + floor + ', Top ' + ceil);
    return (floor+ceil)/2;
  }

function quartil(datos){
  //Como es que se hayan los cuartiles?
  let floor1 = datos.sort()[Math.floor((datos.length-1)/4)];
  let ceil1 = datos.sort()[Math.ceil((datos.length-1)/4)];
  let floor3 = datos.sort()[Math.floor((datos.length-1)*3/4)];
  let ceil3 = datos.sort()[Math.ceil((datos.length-1)*3/4)];
  console.log('25% ' + (floor1+ceil1)/2 + ', 75% ' + (floor3+ceil3)/2);
  return {
    q1: (floor1+ceil1)/2,
    q3: (floor3+ceil3)/2,
  }
}

function boxPlot(canvas,ctx,datos){
  let start = new Date();
  //Toma el canvas y encuentra el centro
  let w = canvas.width;
  let h = canvas.height;
  let center = {
    x: w/2,
    y: h/2
  }
  let r = w < h ? w*3/8 : h*3/8; 
  
  let maximo = max(datos);
  let minimo = min(datos);
  let m = (h*3/4) /(minimo-maximo);
  let b = (h*7/8) - (m * minimo);
  
  console.log('Min:' + minimo + ', Q1:' + quartil(datos).q1 + ', Q2:' + mid(datos) + ', Q3:' + quartil(datos).q3 + ', Max:' + maximo)
  
  //La caha
  ctx.beginPath();
  ctx.moveTo(w/4, (m * mid(datos)) + b);
  ctx.lineTo(w*3/4, (m * mid(datos)) + b);
  //m*q1+b - m*q2+b
  ctx.moveTo(w/4, (m * quartil(datos).q3) + b);
  ctx.rect(w/4, (m * quartil(datos).q3) + b, w/2, m * (quartil(datos).q1 - quartil(datos).q3));
  ctx.moveTo(w/2, (m * quartil(datos).q3) + b);
  ctx.lineTo(w/2, (m * maximo) + b);
  ctx.moveTo(w/2, (m * quartil(datos).q1) + b);
  ctx.lineTo(w/2, (m * minimo) + b);
  
  
  ctx.stroke();
  ctx.closePath();
  
  //Los puntos
  /*ctx.fillStyle = 'rgba(0,100,100,.1)';
  
  for (let i = 0;i<datos.length;i++){
    ctx.beginPath();
    //Convierte coordenadas
    // y = (h-0/min-max)x + b 
    
    ctx.moveTo(center.x, (m * datos[i]) + b);
    ctx.arc(center.x, (m * datos[i]) + b, 2, 0, 2*Math.PI);
    ctx.fill();
      ctx.closePath();
  }*/
  
  console.log(new Date() - start);
}
}
