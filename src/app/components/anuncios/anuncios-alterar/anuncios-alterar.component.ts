import { AnunciosAlterarService } from '../../../services/anuncios-alterar.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnunciosService } from '../../../services/anuncios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

interface Condicao {
  value: string;
  valorVisualizado: string;
}

@Component({
  selector: 'app-anuncios-alterar',
  templateUrl: './anuncios-alterar.component.html',
  styleUrls: ['./anuncios-alterar.component.scss'],
})
export class AnunciosAlterarComponent {
  aleteraAnunciosFormulario: FormGroup = new FormGroup({});
  idN: number = 0;

  condicoes: Condicao[] = [
    { value: 'novo', valorVisualizado: 'Novo' },
    { value: 'usado', valorVisualizado: 'Usado' },
    { value: 'avariado', valorVisualizado: 'Avariado' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService,
    private route: ActivatedRoute,
    private router: Router,
    private anunciosAlterarService: AnunciosAlterarService,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  ngOnInit(): void {
    this.aleteraAnunciosFormulario = this.formBuilder.group({
      isbn: [[''], Validators.pattern(/^[0-9-]+$/)],
      nomeLivro: ['', [Validators.required]],
      autor: [''],
      condicao: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: [''],
    });

    var id = this.route.snapshot.paramMap.get('idLivro');
    this.idN = Number(id);
    this.insereNoForm(this.idN);
  }

  insereNoForm(idLivro: number) {
    const anuncio$ = this.anunciosService.pegarAnuncio(idLivro);
    anuncio$.subscribe((anuncio) => {
      this.aleteraAnunciosFormulario = this.formBuilder.group({
        isbn: [anuncio.isbn, Validators.pattern(/^[0-9-]+$/)],
        nomeLivro: [anuncio.nomeLivro, [Validators.required]],
        autor: [anuncio.autor],
        condicao: [anuncio.condicao, [Validators.required]],
        categoria: [anuncio.categoria, [Validators.required]],
        descricao: [anuncio.descricao],
      });
    });
  }

  processaAlteracao(idLivro: number) {
    const isbn = this.aleteraAnunciosFormulario.get('isbn')?.value;
    const nomeLivro = this.aleteraAnunciosFormulario.get('nomeLivro')?.value;
    const autor = this.aleteraAnunciosFormulario.get('autor')?.value;
    const condicao = this.aleteraAnunciosFormulario.get('condicao')?.value;
    const categoria = this.aleteraAnunciosFormulario.get('categoria')?.value;
    const descricao = this.aleteraAnunciosFormulario.get('descricao')?.value;

    this.anunciosAlterarService
      .altera(idLivro, isbn, nomeLivro, autor, condicao, categoria, descricao)
      .subscribe(() => {
        alert('Livro alterado com sucesso');
        this.router.navigateByUrl('/perfil');
      });
  }
}
