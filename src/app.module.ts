import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jorgadores.module';

/**
 * Trata-se do modulo root da aplicacao
 * Toda aplicação nest, precisa de um module
 */
@Module({
  imports: [
    MongooseModule.forRoot('string de conexao'),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
