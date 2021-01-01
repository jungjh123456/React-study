import { SHOW_ALL, SHOW_DONE } from "../actions";

export default function filter(previousState, action) { 
  // 최초에 초기값 할당
  if (previousState === undefined) {
    return 'SHOW_ALL'; // 초기값
  }

  // filter
  if (action.type === SHOW_DONE) {
    return "SHOW_DONE";
  }
  
 	if (action.type === SHOW_ALL) {
    return  "SHOW_ALL";
  }
  
  // 변경이 안일어났을때 이때만 달라지지 않는다.
  return previousState;
}
