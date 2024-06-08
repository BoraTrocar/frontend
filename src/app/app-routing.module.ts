import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { CadastroUsuarioComponent } from './components/cadastroUsuario/cadastroUsuario/cadastroUsuario.component';
import { PerfilComponent } from './components/perfil/perfil/perfil.component';
import { AnunciosCadastroComponent } from './components/anuncios/anuncios-cadastro/anuncios-cadastro.component';
import { AuthGuard } from './guards/auth-guard';
import { AnunciosGuard } from './guards/anuncios-guard';
import { AnuncioAbertoComponent } from './components/anuncios/anuncio-aberto/anuncio-aberto.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { AnunciosAlterarComponent } from './components/anuncios/anuncios-alterar/anuncios-alterar.component';

const routes: Routes = [
  //Se o caminho for so "localhost/" ele vai redirecionar para "anuncios".
  { path: '', pathMatch: 'full', redirectTo: 'anuncios' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastroUsuario', component: CadastroUsuarioComponent },
  { path: 'perfil', canActivate: [AuthGuard], component: PerfilComponent },
  {
    path: 'anuncios/novo',
    canActivate: [AuthGuard],
    canActivateChild: [AnunciosGuard],
    component: AnunciosCadastroComponent,
  },
  {
    //Somente quando o caminho chamado for "/anuncios" que sera carregado o componente anuncios.
    path: 'anuncios',
    loadChildren: () =>
      import('./components/anuncios/anuncios.module').then(
        (m) => m.AnunciosModule
      ),
  },
  { path: 'livro/:idLivro', component: AnuncioAbertoComponent },
  { path: 'livro/alterar/:idLivro', component: AnunciosAlterarComponent },
  { path: 'chat', canActivate: [AuthGuard], component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
