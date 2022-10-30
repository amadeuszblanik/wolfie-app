import { Subject } from "rxjs";

const Update = new Subject<void>();

const store = {
  update: Update,
};

export default store;
