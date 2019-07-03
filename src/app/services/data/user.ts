import {IUser} from '../../store/types/IUser';

export const user: Partial<IUser> = {
  name: 'DragonGo Player',
  logoUrl:
    'https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-01-512.png',
  maxRange: 100,
  levelInfo: {
    level: 1,
    exp: 0,
    expToNextLvl: 100,
  },
  inventory: {
    head: null,
    chest: '1',
    hands: null,
    legs: null,
    feet: null,
    leftHand: null,
    rightHand: '2',
    backpack: [],
  },
};
