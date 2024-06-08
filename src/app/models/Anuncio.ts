export interface Anuncio {
  idLivro: number;
  isbn: string;
  nomeLivro: string;
  imagemBlob: Uint8Array;
  autor: string;
  categoria: string;
  condicao: string;
  descricao: string;
  usuario: string;
}
