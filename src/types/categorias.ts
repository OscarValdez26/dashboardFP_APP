export type CategoriasType = {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  tipoCategoria: string;
  idCategoriaPadre: null;
  subcategorias: SubcategoriasType[] | [];
};

type SubcategoriasType = {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  tipoCategoria: string;
  idCategoriaPadre: number;
};
