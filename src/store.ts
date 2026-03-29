

// pretend "example" of a database. Users can write and read this one string
// using the procedures for it
export class Store {
  private s: string = "";

  setStore(s: string) {
    this.s = s;
  }
  getStore(): string {
    return this.s;
  }
}



export const store = new Store();
