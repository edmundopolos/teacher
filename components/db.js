import React, { Component } from "react";
import PouchDB from "pouchdb-react-native";

export default class DB extends Component {
  constructor() {
    super();
    this.db = new PouchDB("Note");
  }
  getAllNotes() {
    let allNotes = this.db.allDocs({ include_docs: true });
    let notes = {};
    allNotes.rows.forEach(n => (notes[n.id] = n.doc));
    return notes;
  }

  creatNotes(note) {
    note.createdAt = new Date();
    note.updatedAt = new Date();

    const res = this.db.post({ ...note });
    return res;
  }

  get(id) {
    const data = this.db.get(id);
    return data;
  }
  delete(id, rev) {
    const data = this.db.remove({ _id: id, _rev: rev });
    return data;
  }

  destroy(id) {
    const data = this.db.destroy();
    return data;
  }
  render() {
    return <div></div>;
  }
}
