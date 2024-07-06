import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe) //habilita as validações
    async criarAtualizarJogador(@Body() criarAtualizarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarAtualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if(email) {
            return await this.jogadoresService.consultarJogadorPeloEmail(email);
        } else {
            return await this.jogadoresService.consultarTodosJogadores();
        }        
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        this.jogadoresService.deletarJogador(email);
    }
}
