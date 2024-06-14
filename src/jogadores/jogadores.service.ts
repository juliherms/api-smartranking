import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'


@Injectable()
export class JogadoresService {
    
    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarAtualizarJogadorDto: CriarJogadorDto): Promise<void> {
        this.criar(criarAtualizarJogadorDto)
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto
        const jogador: Jogador = {
            _id: uuidv4(),
            nome: nome,
            telefone: telefoneCelular,
            email: email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }
        this.logger.log(`cria jogador: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    }
}
