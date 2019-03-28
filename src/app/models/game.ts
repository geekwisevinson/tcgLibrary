export class Game {
  title: string;
  developer: string;
  details: string;
  comments: string[];
  own: boolean;
  os: string;
  meta: any;
  constructor({title, developer, details, comments, own, os, meta}) {
    this.title = title;
    this.developer = developer;
    this.details = details;
    this.comments = comments;
    this.own = own;
    this.os = os;
    this.meta = meta;
  }
}
