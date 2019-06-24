This is the first run of a QrCode Component for Angular.

Copy the component in the module you need. Usually it's Angular_Prohect->src->app


Insert the import in the app.module.ts -> in the example it could be like:
import { QrCodeGeneratorComponent } from './QrCode-Angular-Component/qr-code-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    ...,
    QrCodeGeneratorComponent
  ],
  
  
Last you have to insert in angular.json in script section the qrcode library: (you can change the folder of the library ofc)
"styles": [
      "src/styles.css"
    ],
    "scripts": [
      ...,
      "./src/app/QrCode-Angular-Component/qrcode.js"
    ]
  },


Thats it! you are ready to go

You can use the component like every other component:
<app-qr-code-generator [qrcodeString]="http://www.google.com"></app-qr-code-generator>

Possible parameters are:
