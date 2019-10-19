import { Epic, ofType } from 'redux-observable';
import { Action } from 'redux-starter-kit';
import { flatMap, map } from 'rxjs/operators';
import MonstersService from '../../services/MonstersService';
import monstersSlice, {
  FETCH_MONSTERS,
  FetchMonstersAction
} from '../slices/monstersSlice';

const fetchMonstersEpic: Epic<Action, Action, void> = action =>
  action.pipe(
    ofType<Action, FetchMonstersAction>(FETCH_MONSTERS),
    flatMap(a => MonstersService.fetchMonsters(a.payload)),
    map(monsters => monstersSlice.actions.updateMonsters(monsters))
  );

export default fetchMonstersEpic;
