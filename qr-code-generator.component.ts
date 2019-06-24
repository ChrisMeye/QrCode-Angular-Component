import { Component, Input } from '@angular/core';

declare const QRCode: any;

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.css']
})
export class QrCodeGeneratorComponent {

  @Input( ) qrcodeString:string;
  @Input( ) qrcodeSettings:any;

  private qrCode:any = { };

  constructor( ) { }

  ngOnChanges( changes:any ) {
    if(changes.qrcodeSettings || changes.qrcodeString != this.qrcodeString){
      this.resetQrCode( );
      this.createQrCode( this.qrcodeString );
    }
  }

  private resetQrCode( ):void {
     this.qrCode = {
      "canvas": null,
      "content": null,
      "container": null,
      "ctx": null,
      "settings": {
        "fgColor": "rgb(33, 161, 138)",
        "bgColor": "#333",
        "size": 200,
        "margin": 20,
		"logo":"http://localhost/sysr/assets/images/icons/favi.png",
        "border": 10,
        "innerCircleRadius": .4,
        "imageWidth": 1.8,
        "type": "circle"
		} };

      if(this.qrcodeSettings){
        this.qrCode.settings = Object.assign(this.qrCode.settings, this.qrcodeSettings);
      }

      this.qrCode.container = document.getElementById( "qrcode" );
      this.qrCode.container.innerHTML = "";
  }

  private createQrCode( url:string ){
    const settings = this.qrCode.settings;
    const container = this.qrCode.container;
    this.qrCode.content = url;

    new QRCode( this.qrCode.container, {
    	text: this.qrCode.content,
    	width: settings.size,
    	height: settings.size,
    	colorDark : settings.fgColor,
    	colorLight : settings.bgColor,
    	type : "circle"
    });

    this.qrCode.canvas = this.qrCode.container.getElementsByTagName("CANVAS")[0];
    this.qrCode.ctx = this.qrCode.canvas.getContext('2d');

    container.style.margin = settings.margin + "px";
    container.style.width = settings.size + "px";
    container.style.height = settings.size + "px";
    if(settings.border > 0) {
      container.style.borderStyle="solid";
      container.style.borderColor=settings.bgColor;
      container.style.borderWidth=settings.border+"px";
    }
    if(settings.logo) {
      this.mergeLogoInto( );
    }
	if(settings.sharpness){
	this.sharpen(this.qrCode.ctx, settings.size, settings.size, settings.sharpness);
	}
  }

  private mergeLogoInto( ){
    const settings = this.qrCode.settings;
    const container = this.qrCode.container;
    const base_image = new Image();
    const context = this.qrCode.ctx;

      const innerCircleRadius = settings.size * (settings.innerCircleRadius / 2);

      context.fillStyle = settings.bgColor;

      base_image.src = settings.logo;
      base_image.onload = () => {
        context.beginPath();
        context.arc(settings.size/2, settings.size/2, innerCircleRadius, 0, 2 * Math.PI);
        context.fill();
        const imgPos = settings.size/2 - innerCircleRadius*settings.imageWidth/2;
        context.drawImage(base_image, imgPos, imgPos, innerCircleRadius * settings.imageWidth, innerCircleRadius * settings.imageWidth);

        const imageStr = this.qrCode.canvas.toDataURL();
        container.getElementsByTagName("IMG")[0].src = imageStr;
      }

  }
  
  
  
private sharpen(ctx, w, h, mix) {
	console.log(ctx, w, h, mix);
    var x, sx, sy, r, g, b, a, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;

    while (y--) {
        x = w;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * w + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        srcOff = (scy * w + scx) * 4;
                        wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    ctx.putImageData(dstData, 0, 0);
}

}
