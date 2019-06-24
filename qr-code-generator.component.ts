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
        "fgColor": "rgb(61, 95, 240)",
        "bgColor": "#fff",
        "size": 200,
        "margin": 20,
		"logo":"http://localhost/sysr/assets/images/icons/favi.png",
        "border": 10,
        "innerCircleRadius": .4,
        "imageWidth": 2
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
    	colorLight : settings.bgColor
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

}
