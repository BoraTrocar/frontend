import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CadastroUsuarioService } from '../../../services/cadastroUsuario.service';
import { ErrorHandlerService } from './../../../services/error-handler.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastroUsuario.component.html',
  styleUrls: ['./cadastroUsuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroUsuarioFormulario: FormGroup = new FormGroup({});
  maxDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroUsuarioService: CadastroUsuarioService,
    private router: Router,
    private meta: Meta,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });

    const hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.cadastroUsuarioFormulario = this.formBuilder.group({
      nomeUsuario: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      nickname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      cep: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      cidade: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      uf: ['', [Validators.maxLength(2)]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],

      dataNascimento: [
        '',
        [Validators.required /* this.validaDataNascimento() */],
      ],
    });
  }

  private formatarData(data: string): string {
    if (!data) return '';

    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  cadastrarUsuario() {
    if (this.cadastroUsuarioFormulario.invalid) {
      console.error(
        'Formulário inválido:',
        this.cadastroUsuarioFormulario.errors
      );
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const dataNascimentoRaw =
      this.cadastroUsuarioFormulario.get('dataNascimento')?.value;
    const dataNascimentoFormatada = this.formatarData(dataNascimentoRaw);

    const formData = {
      nomeUsuario: this.cadastroUsuarioFormulario.get('nomeUsuario')?.value,
      email: this.cadastroUsuarioFormulario.get('email')?.value,
      nickname: this.cadastroUsuarioFormulario.get('nickname')?.value,
      senha: this.cadastroUsuarioFormulario.get('senha')?.value,
      dataNascimento: dataNascimentoFormatada, // Usando a data formatada
      cep: this.cadastroUsuarioFormulario.get('cep')?.value,
      cidade: this.cadastroUsuarioFormulario.get('cidade')?.value,
      uf: this.cadastroUsuarioFormulario.get('uf')?.value,
      latitude: '-23.557778',
      longitude: '-46.646111',
      imagemPerfil: 'testeURL',
    };

    console.log('Iniciando cadastro com dados:', formData);

    this.cadastroUsuarioService
      .insereNoBanco(
        formData.imagemPerfil,
        formData.nomeUsuario,
        formData.email,
        formData.nickname,
        formData.senha,
        formData.dataNascimento,
        formData.latitude,
        formData.longitude
      )
      .subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          alert('Cadastro efetuado com sucesso');
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          alert('Erro ao realizar cadastro: ' + error);
        },
      });
  }

  testaCep() {
    const cep = this.cadastroUsuarioFormulario.get('cep')?.value;
    if (cep.length === 8) {
      this.cadastroUsuarioService.verificaCEP(cep).subscribe((resposta) => {
        this.cadastroUsuarioFormulario.patchValue({
          cidade: resposta.localidade,
          uf: resposta.uf,
        });
      });
    }
  }

  limpar() {
    this.cadastroUsuarioFormulario.reset();
  }
}
