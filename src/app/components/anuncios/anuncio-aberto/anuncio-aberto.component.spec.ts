import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnuncioAbertoComponent } from './anuncio-aberto.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';
import { PerfilService } from '../../../services/perfil.service';
import { AnunciosService } from '../../../services/anuncios.service';
import { LoginService } from '../../../services/login.service';
import { Meta } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Componente: AnuncioAbertoComponent', () => {
  let componente: AnuncioAbertoComponent;
  let fixture: ComponentFixture<AnuncioAbertoComponent>;
  let servicoAnuncios: AnunciosService;
  let servicoPerfil: PerfilService;
  let servicoComentario: ComentarioService;
  let servicoLogin: LoginService;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnuncioAbertoComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        AnunciosService,
        PerfilService,
        ComentarioService,
        LoginService,
        Meta
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioAbertoComponent);
    componente = fixture.componentInstance;
    servicoAnuncios = TestBed.inject(AnunciosService);
    servicoPerfil = TestBed.inject(PerfilService);
    servicoComentario = TestBed.inject(ComentarioService);
    servicoLogin = TestBed.inject(LoginService);
    meta = TestBed.inject(Meta);
  });

  it('deve ser criado', () => {
    expect(componente).toBeTruthy();
  });
});
