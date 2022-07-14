export interface SelectPrimary{
    title:string,    
    options: {
        value: string;
        label: string;
    }[],
    placeholder:string,
    name:string,
    value?:any,
    className?:string,
    required?:boolean
}