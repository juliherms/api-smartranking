import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jorgadores.module';

/**
 * Trata-se do modulo root da aplicacao
 * Toda aplicação nest, precisa de um module
 */
@Module({
  imports: [JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
