import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'


@Injectable()
export class JogadoresService {
    
    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarAtualizarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarAtualizarJogadorDto
        
        const jogadorEncontrado = await this.jogadores.find(
            jogador => jogador.email === email
        )

        if(jogadorEncontrado){
            this.atualizar(jogadorEncontrado,criarAtualizarJogadorDto)
        } else {
            this.criar(criarAtualizarJogadorDto)
        }        
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    async consultarJogadorPeloEmail(email): Promise<Jogador> {

        const jogadorEncontrado = this.jogadores.find(
            jogador => jogador.email === email
        )

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
        return jogadorEncontrado
    }

    async deletarJogador(email): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(
            jogador => jogador.email === email
        )
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
    }

    private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
        const { nome } = criaJogadorDto
        jogadorEncontrado.nome = nome;
       
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
