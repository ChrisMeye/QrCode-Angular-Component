# QrCode Angular Component with images (not finished work in progress)
<img src="readme_images/example 2.png" alt="logo" width="200px" align="right"/>

### Description
This is a simple component you can include in your project which helps you with dealing the qrcode library. Further you are able to put a logo inside the qrcode and easily change settings for your needs.


## Getting started
### Installation
This is the first run of a QrCode Component for Angular.

Copy the component in the module you need. Usually it's Angular_Prohect->src->app


Insert the import in the app.module.ts -> in the example it could be like:
>import { QrCodeGeneratorComponent } from './QrCode-Angular-Component/qr-code-generator.component';
>
>@NgModule({
>  declarations: [
>    AppComponent,
>    ...,
>    QrCodeGeneratorComponent
>  ],
  
  
Last you have to insert in angular.json in script section the qrcode library: (you can change the folder of the library ofc)
>"styles": [
>      "src/styles.css"
>    ],
>    "scripts": [
>      ...,
>      "./src/app/QrCode-Angular-Component/qrcode.js"
>    ]
>  },


Thats it! you are ready to go


### Usage
You can use the component like every other component:
<app-qr-code-generator [qrcodeString]="http://www.google.com" [qrcodeSettings]="{'fgColor': 'red', 'l'}"></app-qr-code-generator>

Possible parameters for settings object are:
      "settings": {
        "fgColor": "rgb(61, 95, 240)",
        "bgColor": "#fff",
        "size": 200,
        "margin": 20,
		    "logo":"/assets/images/icons/favi.png",
        "border": 10,
        "innerCircleRadius": .4,
        "imageWidth": 2
      }

### Screenshots & User guide

**Home Screen**


<img src="images/readme/screenshot_home.png" alt="home" width="100%"/>


  
    
