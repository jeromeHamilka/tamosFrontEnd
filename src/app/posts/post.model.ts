export class Post {
  id: number;
  content: string;
  constructor(id: number = 0, content: string = '') {
    this.id = id;
    this.content = content;
  }
}
