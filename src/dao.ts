import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";
import { Tec } from "./model/Tec";

export default class DAO {
  db = lowdb(new FileSync("db.json"));

  constructor() {
    this.db.defaults({ tecs: [] }).write();
  }

  listTecs(): Tec[] {
    return sortByName(this.db.get("tecs").value());
  }

  findTec(id: string): Tec {
    // @ts-ignore
    return this.db.get("tecs").find({ id }).value();
  }

  createTec(tec: Tec): void {
    // @ts-ignore
    this.db.get("tecs").push(tec)
      .write();
  }

  updateTec(tec: Tec): void {
    // @ts-ignore
    this.db.get("tecs").find({ id: Tec.id})
      .assign({ name: tec.name, cor: tec.cor, comp: tec.comp, vm: tec.vm })
      .write();
  }

  deleteTec(id: string): void {
    // @ts-ignore
    this.db.get("tecs").remove({ id: id }).write();
  }
}
   
function sortByName(tecs: Tec[]): Tec[] {
  return tecs.sort((a: Tec, b: Tec) =>
    a.name.toLowerCase() > b.name.toLowerCase() ?1 : -1
  );
}
