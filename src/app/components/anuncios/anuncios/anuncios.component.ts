import { PesquisaService } from 'src/app/services/pesquisa.service';
import { Anuncio } from '../../../models/Anuncio';
import { AnunciosService } from '../../../services/anuncios.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importe 'of' aqui
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss'],
})
export class AnunciosComponent implements OnInit {
  @Input() anuncios$: Observable<Anuncio[]>;
  imagemURL: any | null = null;
  txtPesquisa: string = '';
  pesquisaRealizada: boolean = false;

  constructor(
    private anunciosService: AnunciosService,
    public loginService: LoginService,
    private pesquisaService: PesquisaService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {
    this.anuncios$ = this.anunciosService.listaTudo();
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  ngOnInit() {
    const paginaRecarregada = localStorage.getItem('paginaRecarregada');
    if (!paginaRecarregada) {
      localStorage.setItem('paginaRecarregada', 'true');
      console.log('Página recarregada');
      window.location.reload();
    } else {
      localStorage.removeItem('paginaRecarregada');
    }
  }

  criaUmAnuncio() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  abrirAnuncio(id: number) {
    this.router.navigate([`livro/${id}`]);
  }

  realizarPesquisa() {
    if (this.txtPesquisa.trim() !== '') {
      this.pesquisaService.realizaPesquisa(this.txtPesquisa.trim()).subscribe(
        (response: any) => {
          //console.log('Resposta da pesquisa:', response);
          this.pesquisaRealizada = true;

          if ((this.pesquisaRealizada = true)) {
            this.anuncios$ = of(response);
          }
        },
        (error) => {
          console.error('Erro na pesquisa:', error);
          this.pesquisaRealizada = false;
        }
      );
    } else {
      console.log('Nenhum termo de pesquisa fornecido.');
      this.pesquisaRealizada = false;
    }
  }

  limparPesquisa() {
    this.txtPesquisa = '';
    this.pesquisaRealizada = false;
    this.anuncios$ = this.anunciosService.listaTudo();
  }
}
