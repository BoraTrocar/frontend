import { CadastroUsuarioService } from '../../../services/cadastroUsuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastroUsuario.component.html',
  styleUrls: ['./cadastroUsuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroUsuarioFormulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private CadastroUsuarioService: CadastroUsuarioService,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
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

  cadastrarUsuario() {
    const nomeUsuario =
      this.cadastroUsuarioFormulario.get('nomeUsuario')?.value;
    const email = this.cadastroUsuarioFormulario.get('email')?.value;
    const nickname = this.cadastroUsuarioFormulario.get('nickname')?.value;
    const senha = this.cadastroUsuarioFormulario.get('senha')?.value;
    const dataNascimento =
      this.cadastroUsuarioFormulario.get('dataNascimento')?.value;
    const cep = this.cadastroUsuarioFormulario.get('cep')?.value;
    const cidade = this.cadastroUsuarioFormulario.get('cidade')?.value;
    const uf = this.cadastroUsuarioFormulario.get('uf')?.value;

    this.CadastroUsuarioService.insereNoBanco(
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      cep,
      cidade,
      uf
    ).subscribe(() => {
      alert('Cadastro efetuado com sucesso');
      this.router.navigateByUrl('/login');
    });
  }

  testaCep() {
    const cep = this.cadastroUsuarioFormulario.get('cep')?.value;
    if (cep.length === 8) {
      this.CadastroUsuarioService.verificaCEP(cep).subscribe((resposta) => {
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
