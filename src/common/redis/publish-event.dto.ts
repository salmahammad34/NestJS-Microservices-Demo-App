export class PublishEventDto<T = any> {
    constructor(
      public readonly event: string,
      public readonly data: T,      
      public readonly id?: string | number, 
    ) {}
  }
  