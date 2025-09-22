import { IsString } from "class-validator";

export class RequestMagicLinkDto {
    @IsString()
    destination: string;
}
