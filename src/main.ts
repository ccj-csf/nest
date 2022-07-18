import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
declare const module: any;
console.log('1111', 1111);
console.log('2222', 2222);
console.log('3333', 3333);
console.log('4444', 4444);
console.log('5555', 5555);
console.log('6666', 6666);
console.log('7777', 7777);
console.log('8888', 8888);
console.log('9999', 9999);
console.log('fix001', 'fix001');
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // // 接口版本化管理
  // app.enableVersioning({
  //   defaultVersion: '1',
  //   type: VersioningType.URI,
  // });
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 创建文档
  generateDocument(app);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();
