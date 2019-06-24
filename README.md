This is the first run of a QrCode Component for Angular.

Copy the component in the module you need. Usually it's Angular_Prohect->src->app


Insert the import in the app.module.ts -> in the example it could be like:
import { QrCodeGeneratorComponent } from './qr-code-generator.component';

and also in same file the decleration 

@NgModule({
  declarations: [
    AppComponent,
    ...,
	  QrCodeGeneratorComponent
  ],
  
Thats it! you are ready to go
