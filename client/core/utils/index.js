// dd monthName, yyyy
import {ruMonths} from "../mock";

export const formatRuDate = (dt) => {
    dt = new Date(dt)
    return `${dt.getDate()} ${ruMonths[dt.getMonth()]} ${dt.getFullYear()} г.`;
}