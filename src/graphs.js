function initLOL(context){
	context.strokeStyle = 'rgb(167, 153, 102)';
	context.fillStyle = 'rgba(225, 214, 172,.5)'
}

const graphics = {
  poligon: function(canvas,ctx,datos,maximo,dif){
		initLOL(ctx);
    //Toma el canvas y encuentra el centro
    let w = canvas.width;
    let h = canvas.height;
    let center = {
      x: w/2,
      y: h/2
    }
    let r = w < h ? w*3/8 : h*3/8; 
    let gap = r/maximo;

    ctx.beginPath();
    ctx.arc( center.x, center.y, r, 0, 2*Math.PI );
		ctx.moveTo(center.x + (r*8/7) , center.y )
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
		ctx.fill();
		ctx.stroke();
    ctx.closePath();

		//Letras
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.fillText("A", center.x, center.y + r*4/3);
		ctx.fillText("D", center.x + (r * Math.cos((2 * Math.PI / 3) - (3 * Math.PI / 2))*4/3),center.y + (r * Math.sin((2 * Math.PI / 3) - (3 * Math.PI / 2))*4/3));
		ctx.fillText("M", center.x + (r * Math.cos((4 * Math.PI / 3) - (3 * Math.PI / 2))*4/3),center.y + (r * Math.sin((4 * Math.PI / 3) - (3 * Math.PI / 2))*4/3));
		ctx.closePath();

		//Dificultad

		ctx.beginPath();
		let angle = (2 * dif * Math.PI / maximo) - (3 * Math.PI / 2);
		ctx.arc( center.x, center.y, r, angle , 0,true );
		ctx.lineTo(center.x + (r*8/7) , center.y );
    ctx.arc( center.x, center.y, r*8/7, 0, angle );
		ctx.fillStyle = '#31CED7';
		ctx.fill();
		ctx.closePath();

  },

  /* boxPlot: function (canvas,ctx,datos){
    //Toma el canvas y encuentra el centro
    let w = canvas.width;
    let h = canvas.height;
    let center = {
      x: w/2,
      y: h/2
    }
    
    let maximo = statistic.max(datos);
    let minimo = statistic.min(datos);
    let m = (h*3/4) /(minimo-maximo);
    let b = (h*7/8) - (m * minimo);
     
    //La caha
    ctx.beginPath();
    ctx.moveTo(w/4, (m * statistic.mid(datos)) + b);
    ctx.lineTo(w*3/4, (m * statistic.mid(datos)) + b);
    //m*q1+b - m*q2+b
    ctx.moveTo(w/4, (m * statistic.quartil(datos).q3) + b);
    ctx.rect(w/4, (m * statistic.quartil(datos).q3) + b, w/2, m * (statistic.quartil(datos).q1 - statistic.quartil(datos).q3));
    ctx.moveTo(w/2, (m * statistic.quartil(datos).q3) + b);
    ctx.lineTo(w/2, (m * maximo) + b);
    ctx.moveTo(w/2, (m * statistic.quartil(datos).q1) + b);
    ctx.lineTo(w/2, (m * minimo) + b);

    ctx.stroke();
    ctx.closePath();

    
    //Los puntos
    ctx.fillStyle = 'rgba(0,100,100,.1)';
    
    for (let i = 0;i<datos.length;i++){
      ctx.beginPath();
      //Convierte coordenadas
      // y = (h-0/min-max)x + b 
      
      ctx.moveTo(center.x, (m * datos[i]) + b);
      ctx.arc(center.x, (m * datos[i]) + b, 2, 0, 2*Math.PI);
      ctx.fill();
        ctx.closePath();
    }
  }*/
}

/* const statistic = {
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
    let floor = datos.sort()[Math.floor((datos.length-1)/2)];
    let ceil = datos.sort()[Math.ceil((datos.length-1)/2)];
    return (floor+ceil)/2;
  },
  quartil: function (datos){
    //Como es que se hayan los cuartiles?
    let floor1 = datos.sort()[Math.floor((datos.length-1)/4)];
    let ceil1 = datos.sort()[Math.ceil((datos.length-1)/4)];
    let floor3 = datos.sort()[Math.floor((datos.length-1)*3/4)];
    let ceil3 = datos.sort()[Math.ceil((datos.length-1)*3/4)];
    return {
      q1: (floor1+ceil1)/2,
      q3: (floor3+ceil3)/2,
    }
  },
} */

export default graphics
