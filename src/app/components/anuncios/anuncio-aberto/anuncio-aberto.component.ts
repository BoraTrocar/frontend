import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, of, switchMap } from 'rxjs';
import { Comentario } from 'src/app/models/Comentario';
import { Perfil } from 'src/app/models/Perfil';
import { LoginService } from 'src/app/services/login.service';
import { Anuncio } from '../../../models/Anuncio';
import { AnunciosService } from '../../../services/anuncios.service';
import { ComentarioService } from './../../../services/comentario.service';
import { PerfilService } from './../../../services/perfil.service';

export interface MeuObjeto {
  token: string;
}

@Component({
  selector: 'app-anuncio-aberto',
  templateUrl: './anuncio-aberto.component.html',
  styleUrls: ['./anuncio-aberto.component.scss'],
})
export class AnuncioAbertoComponent {
  anuncio$: Observable<Anuncio> | null;
  perfil$: Observable<Perfil>;
  comentario$: Observable<Comentario[]> | null;
  comentarioFormulario: FormGroup = new FormGroup({});

  imagemURL: any | null = null;

  idN: number = 0;

  constructor(
    private anunciosService: AnunciosService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private comentarioService: ComentarioService,
    private loginService: LoginService,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
    this.anuncio$ = null;
    this.comentario$ = null;
    this.perfil$ = perfilService.listaInfoPerfil();
  }

  abrirChat() {
    return this.router.navigate([`/chat`]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idLivro');
    this.idN = Number(id);

    this.anunciosService.pegarAnuncio(this.idN).subscribe((anuncio) => {
      this.anuncio$ = of(anuncio);
      console.log(anuncio);
      console.log('Dados brutos da imagem:', anuncio.imagem);

      this.imagemURL = anuncio.imagem;
    });

    this.comentarioFormulario = this.formBuilder.group({
      comentario: ['', Validators.required],
    });

    // Convert the Promise to an Observable
    if (id) {
      this.comentario$ = from(
        this.comentarioService.obterComentarios(id)
      ) as Observable<Comentario[]>;
    }
  }

  realizarComentario() {
    if (this.loginService.estaAutenticado() === true) {
      const comentario = this.comentarioFormulario.get('comentario')?.value;

      this.perfil$
        .pipe(
          switchMap((perfil) => {
            const autorComentario: string = perfil.nickname;

            // Assuming you need to update the ComentarioService.insere method to accept autorComentario
            // Otherwise, remove the autorComentario parameter below
            return this.comentarioService.insere(comentario, this.idN);
          })
        )
        .subscribe(() => {
          location.reload();
        });
    } else {
      this.router.navigateByUrl('/login');
      alert('É necessario realizar login para realizar um comentario.');
    }
  }
}
