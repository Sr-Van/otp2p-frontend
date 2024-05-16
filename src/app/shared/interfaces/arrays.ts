export interface Anuncio {
    header: string;
    description: string;
    type: string;
    price: number;
    mundo: string;
    itemId: string;
    player: string;
    badge: string;
    playerType: string;
}


export interface Trade {
    header: string;
    description: string;
    type: string;
    price: number;
    mundo: string;
    itemId: string;
    trade_player: string;
    date: string;
    situation: string;
}

export interface Comment {
    text: string;
    denuncia: boolean;
    player: string;
    date: string;
}