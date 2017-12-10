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
import { SeguimientoPage } from '../pages/seguimiento/seguimiento';
import { DespensaPage } from '../pages/despensa/despensa';
import { EscogerMenuPage } from '../pages/escoger-menu/escoger-menu';
import { CitasPage } from '../pages/citas/citas';
import { ListaDespensaPage } from '../pages/lista-despensa/lista-despensa';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';
import { AcercaDePage } from '../pages/acerca-de/acerca-de';
import { PreRegistroPage } from '../pages/pre-registro/pre-registro';
import { MenuPage } from "../pages/menu/menu";
import { AlbumPage } from "../pages/album/album";
import { IonicImageViewerModule } from 'ionic-img-viewer';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { AuthService } from '../providers/auth-service/auth-service'

import { OneSignal } from '@ionic-native/onesignal';
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
    
    SeguimientoPage,
    DespensaPage,
    EscogerMenuPage,
    CitasPage,
    ListaDespensaPage,
    ConfiguracionesPage,
    AcercaDePage,
    PreRegistroPage,
    MenuPage,
    AlbumPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
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
    SeguimientoPage,
    DespensaPage,
    EscogerMenuPage,
    CitasPage,
    ListaDespensaPage,
    ConfiguracionesPage,
    AcercaDePage,
    PreRegistroPage,
    MenuPage,
    AlbumPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostPreReg,
    Camera,
    CallNumber,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}