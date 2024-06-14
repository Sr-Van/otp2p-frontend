import { Anuncio, Trade } from "./arrays";

export interface Register {
    _id: string;
    player: string;
    nome: string;
    mundo: string;
    badge: string;
    ammount: number;
    verified: boolean;
    anuncios: Anuncio[];
    vendas: Trade[];    
    compras: Trade[];
    avaliacao: Comment[];    
}