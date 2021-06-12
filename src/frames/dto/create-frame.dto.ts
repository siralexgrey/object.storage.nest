export class CreateFrameDto {
    readonly name: string;
    readonly description: string;
    account_id: string;
    readonly config: ConfigDto[];
    readonly filter: FilterDto[];
}

class ConfigDto {
    readonly name: string;
    readonly type: string;
    readonly defaultValue: string;
}

class FilterDto {
    readonly field: string;
    readonly filter_widget_type: string;
}
  