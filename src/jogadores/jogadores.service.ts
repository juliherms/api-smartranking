import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {
    
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarAtualizarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarAtualizarJogadorDto
        
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if(jogadorEncontrado){
            this.atualizar(criarAtualizarJogadorDto)
        } else {
            this.criar(criarAtualizarJogadorDto)
        }        
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloEmail(email): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
        return jogadorEncontrado
    }

    async deletarJogador(email): Promise<any> {
        return await this.jogadorModel.deleteOne({ email });
    }

    private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate(
            { email: criaJogadorDto.email },
            { $set: criaJogadorDto }
        )
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(criaJogadorDto)
        return await jogadorCriado.save()
    }
}
