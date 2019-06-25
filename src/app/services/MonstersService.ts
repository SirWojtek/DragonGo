import {Observable, of} from 'rxjs';

import {IMonster} from '../store/types/IMonster';
import {monsters} from './data/monsters';

const MonstersService = {
  fetchMonsters(ids: string[]): Observable<IMonster[]> {
    return of(monsters.filter(m => ids.find(id => m.id === id)));
  },
};

export default MonstersService;
