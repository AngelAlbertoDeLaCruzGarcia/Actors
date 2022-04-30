import { COUNTER_CHANGE } from '../../utils/constants';
export function changeCount(count) {
return {
type: COUNTER_CHANGE,
payload: count
}
}