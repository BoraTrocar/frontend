import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroAnunciosService } from '../../../services/anuncios-cadastro.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

interface Condicao {
  value: string;
  valorVisualizado: string;
}

@Component({
  selector: 'app-anuncios-cadastro',
  templateUrl: './anuncios-cadastro.component.html',
  styleUrls: ['./anuncios-cadastro.component.scss'],
})
export class AnunciosCadastroComponent {
  cadastroAnunciosFormulario: FormGroup = new FormGroup({});
  valorSelecionado: string = '';
  imagemFile: File | undefined | null;

  condicoes: Condicao[] = [
    { value: 'novo', valorVisualizado: 'Novo' },
    { value: 'usado', valorVisualizado: 'Usado' },
    { value: 'avariado', valorVisualizado: 'Avariado' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cadastroAnunciosService: CadastroAnunciosService,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  ngOnInit(): void {
    this.cadastroAnunciosFormulario = this.formBuilder.group({
      isbn: [[''], Validators.pattern(/^[0-9-]+$/)],
      nomeLivro: ['', [Validators.required]],
      autor: [''],
      condicao: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: [''],
    });
  }

  selecionaImagem(fileInput: HTMLInputElement) {
    const file = fileInput.files?.item(0);
    if (file) {
      console.log('Arquivo anexado:', file);
      this.imagemFile = file;
    }
  }

  cadastrarAnuncio() {
    const isbn = this.cadastroAnunciosFormulario.get('isbn')?.value;
    const nomeLivro = this.cadastroAnunciosFormulario.get('nomeLivro')?.value;
    const autor = this.cadastroAnunciosFormulario.get('autor')?.value;
    const condicao = this.cadastroAnunciosFormulario.get('condicao')?.value;
    const categoria = this.cadastroAnunciosFormulario.get('categoria')?.value;
    const descricao = this.cadastroAnunciosFormulario.get('descricao')?.value;
    const imagemFile = this.imagemFile;

    console.log(imagemFile);

    //const imagem = this.imagem ?? new File([], 'gambiarra');

    if (imagemFile) {
      this.cadastroAnunciosService
        .insere(isbn, nomeLivro, autor, condicao, categoria, descricao, imagemFile)
        .subscribe(() => {
          alert('Livro cadastrado com sucesso');
          this.router.navigateByUrl('/anuncios');
        });
    }
  }
}
