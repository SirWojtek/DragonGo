export type ItemId = string | null;

export interface IInventoryInfo {
  head: ItemId;
  chest: ItemId;
  hands: ItemId;
  legs: ItemId;
  feet: ItemId;
  leftHand: ItemId;
  rightHand: ItemId;
  backpack: ItemId[];
}
