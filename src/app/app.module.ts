import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { OlvideContrasenaPage } from '../pages/olvide-contrasena/olvide-contrasena';
import { InicioPage } from '../pages/inicio/inicio';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { RecordatorioDeCitasPage } from '../pages/recordatorio-de-citas/recordatorio-de-citas';
import { CerrarSesionPage } from '../pages/cerrar-sesion/cerrar-sesion';
import { MensajePage } from '../pages/mensaje/mensaje';
import { InformacionDeNutriologoPage } from '../pages/informacion-de-nutriologo/informacion-de-nutriologo';
import { SeguimientoPage } from '../pages/seguimiento/seguimiento';
import { DespensaPage } from '../pages/despensa/despensa';
import { EscogerMenuPage } from '../pages/escoger-menu/escoger-menu';
import { CitasPage } from '../pages/citas/citas';
import { ConfirmarCitaPage } from '../pages/confirmar-cita/confirmar-cita';
import { ListaDespensaPage } from '../pages/lista-despensa/lista-despensa';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';
import { AcercaDePage } from '../pages/acerca-de/acerca-de';
import { VerMenuDiaPage } from '../pages/ver-menu-dia/ver-menu-dia';
import { MenuCompletoPage } from '../pages/menu-completo/menu-completo';
import { PreRegistroPage } from '../pages/pre-registro/pre-registro';
import { MenuPage } from "../pages/menu/menu";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';


//Para http
import { HttpModule } from "@angular/http";
import  {PostPreReg} from "../services/postprereg";


@NgModule({
  declarations: [
    MyApp,
    OlvideContrasenaPage,
    InicioPage,
    MensajesPage,
    TabsControllerPage,
    LoginPage,
    RecordatorioDeCitasPage,
    CerrarSesionPage,
    MensajePage,
    InformacionDeNutriologoPage,
    SeguimientoPage,
    DespensaPage,
    EscogerMenuPage,
    CitasPage,
    ConfirmarCitaPage,
    ListaDespensaPage,
    ConfiguracionesPage,
    AcercaDePage,
    VerMenuDiaPage,
    MenuCompletoPage,
    PreRegistroPage,
    MenuPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OlvideContrasenaPage,
    InicioPage,
    MensajesPage,
    TabsControllerPage,
    LoginPage,
    RecordatorioDeCitasPage,
    CerrarSesionPage,
    MensajePage,
    InformacionDeNutriologoPage,
    SeguimientoPage,
    DespensaPage,
    EscogerMenuPage,
    CitasPage,
    ConfirmarCitaPage,
    ListaDespensaPage,
    ConfiguracionesPage,
    AcercaDePage,
    VerMenuDiaPage,
    MenuCompletoPage,
    PreRegistroPage,
    
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostPreReg,
    Camera,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}