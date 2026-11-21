export interface Job{
    id : string
    company: string
    position : string
    status: 'applied' | 'interviewing' | 'offer' | 'rejected'   // 联合类型
}