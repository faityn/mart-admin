import moment from 'moment';

export const date = (v)=>{
    return moment(v).format('YYYY-MM-DD')
}

export const dateTime = (v)=>{
    return moment(v).format('YYYY-MM-DD (HH:mm)')
}
