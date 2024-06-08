import { ComentarioService } from './../../../services/comentario.service';
import { PerfilService } from './../../../services/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from '../../../services/anuncios.service';
import { Component, Input } from '@angular/core';
import { Anuncio } from '../../../models/Anuncio';
import { Observable } from 'rxjs/internal/Observable';
import { of, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/models/Perfil';
import { Comentario } from 'src/app/models/Comentario';
import { LoginService } from 'src/app/services/login.service';
import { Meta } from '@angular/platform-browser';

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
    //this.comentario$ = comentarioService.listaComentarios(this.idN);
    this.perfil$ = perfilService.listaInfoPerfil();
  }

  abrirChat() {
    return this.router.navigate([`/chat`]);
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('idLivro');
    const idN = Number(id);

    this.anunciosService.pegarAnuncio(idN).subscribe((anuncio) => {
      this.anuncio$ = of(anuncio);
      console.log(anuncio);
      console.log('Dados brutos da imagem:', anuncio.imagemBlob);

      this.imagemURL = `data:image/jpeg;base64,${anuncio.imagemBlob}`;

    });

    this.comentarioFormulario = this.formBuilder.group({
      comentario: [[''], Validators.required],
    });

    this.idN = idN;
    this.comentario$ = this.comentarioService.listaComentarios(this.idN);
  }

  realizarComentario() {
    if (this.loginService.estaAutenticado() === true) {
      const comentario = this.comentarioFormulario.get('comentario')?.value;

      this.perfil$
        .pipe(
          switchMap((perfil) => {
            const autorComentario: string = perfil.nickname;

            return this.comentarioService.insere(
              comentario,
              autorComentario,
              this.idN
            );
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
