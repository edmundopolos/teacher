import TextIn from "./textInputs/textInput";

class App extends Component {
  state = {
    db: new DB(),
    notes: { 1: { title: "test", _id: 1 }, 2: { title: "test2", _id: 2 } },
    isLoading: true
  };
  async componentDidMount() {
    const notes = await this.state.db.getAllNotes();
    this.setState({
      notes,
      isLoading: false
    });
  }
  handleSave = async notes => {
    let { id } = await this.state.db.createNotes(notes);

    const { note } = this.state;
    this.setState({
      note: {
        ...note,
        [id]: notes
      }
    });
    return id;
  };

  renderPage() {
    if (this.state.isLoading) {
      return <div>Loading....</div>;
    } else {
      console.log("test");
      return <TextIn />;
    }
  }
  render() {
    return <div>{this.renderPage()}</div>;
  }
}
