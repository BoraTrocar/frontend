// anuncios-cadastro.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CadastroAnunciosService } from '../../../services/anuncios-cadastro.service';
import { FirebaseStorageService } from '../../../services/firebase-storage.service'; // Novo serviço
import { ErrorHandlerService } from './../../../services/error-handler.service';

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
  estaEnviando = false; // Controle de estado
  @ViewChild('fileInput') fileInput!: ElementRef; // Adicione esta linha

  condicoes: Condicao[] = [
    { value: 'NOVO', valorVisualizado: 'Novo' },
    { value: 'USADO', valorVisualizado: 'Usado' },
    { value: 'AVARIADO', valorVisualizado: 'Avariado' },
  ];
  imagemPreview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroAnunciosService: CadastroAnunciosService,
    private firebaseStorage: FirebaseStorageService, // Novo serviço
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  ngOnInit(): void {
    this.cadastroAnunciosFormulario = this.formBuilder.group({
      isbn: [[''], [Validators.required, Validators.pattern(/^[0-9-]+$/)]],
      nomeLivro: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      condicao: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }

  selecionaImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);

    if (file && file.type.startsWith('image/')) {
      this.imagemFile = file;

      // Gerar preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagemFile = null;
      this.imagemPreview = null;
      if (file) {
        alert('Por favor, selecione um arquivo de imagem válido');
      }
    }
  }

  async cadastrarAnuncio() {
    if (this.cadastroAnunciosFormulario.invalid || this.estaEnviando) {
      return;
    }

    this.estaEnviando = true;
    const formValues = this.cadastroAnunciosFormulario.value;

    try {
      // 1. Upload da imagem se existir
      let imagemUrl = '';
      if (this.imagemFile) {
        imagemUrl = await this.firebaseStorage.uploadImage(this.imagemFile);
      }

      // 2. Preparar payload
      const payload = {
        isbn: formValues.isbn,
        nomeLivro: formValues.nomeLivro,
        autor: formValues.autor,
        condicao: formValues.condicao,
        categoria: formValues.categoria,
        descricao: formValues.descricao,
        imagem: imagemUrl,
      };

      // 3. Enviar para API
      this.cadastroAnunciosService
        .insere(payload)
        .pipe(
          catchError((error) => {
            this.estaEnviando = false;
            return this.errorHandlerService.handleError(error);
          })
        )
        .subscribe(() => {
          this.estaEnviando = false;
          alert('Livro cadastrado com sucesso');
          this.router.navigateByUrl('/anuncios');
        });
    } catch (error) {
      this.estaEnviando = false;
    }
  }
}
