import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariableDto {
  @IsString()
  GRPC_URL: string;

  @IsNumber()
  SERVER_PORT: number;
}

export const EnvironmentVariables = {
  SERVER_PORT: 'SERVER_PORT',
  GRPC_URL: 'GRPC_URL',
};

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariableDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
