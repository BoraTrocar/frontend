import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastroUsuarioModule } from './components/cadastroUsuario/cadastroUsuario.module';
import { ChatModule } from './components/chat/chat.module';
import { LoginModule } from './components/login/login.module';
import { PerfilModule } from './components/perfil/perfil.module';
import { RodapeComponent } from './components/rodape/rodape.component';
import { AnunciosGuard } from './guards/anuncios-guard';
import { AuthGuard } from './guards/auth-guard';

// Firebase imports corretos para NgModule

@NgModule({
  declarations: [AppComponent, RodapeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CadastroUsuarioModule,
    PerfilModule,
    ChatModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
  ],
  providers: [AuthGuard, AnunciosGuard], // SEM os providers do Firebase
  bootstrap: [AppComponent],
})
export class AppModule {}
