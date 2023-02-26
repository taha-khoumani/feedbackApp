export function mediaQueries([d,t,m],size){
    if(size >= 1024) return d
    else if (size >= 768) return t
    else return m
}