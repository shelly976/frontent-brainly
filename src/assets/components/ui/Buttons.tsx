 interface buttonprops{
    variant:"primary"|"secondary",
    size:"md"|"sm"|"lg",
    text:string,
    startIcon?:any,
    endIcon?:any,
    onClick?: ()=>void;
}
export const Button=(props:buttonprops)=>{
   return<button></button>
}
