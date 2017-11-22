var container = document.getElementById("container");

class ToDo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);

    }

    edit () {
        this.setState({edit: true});
    }

    remove () {
        this.props.remove (this.props.index);
    }

    save () {
        this.props.update (this.refs.newTodo.value, this.props.index);
        this.setState({edit: false});
    }


    showTodo () {
            return(
                <div className="list">
                    <button onClick={this.edit} className="btn edit"></button>
                    <div className ="todoContainer">
                        <p className="todo">{this.props.children}</p>
                    </div>
                    <button onClick={this.remove} className="btn delete"></button>
                </div>
            );
    }

    showEdit () {
            return(
                <div className="list">
                    <div className ="todoContainer">
                        <button onClick={this.save} className="btn save"></button>
                        <textarea className="newtext" ref="newTodo" defaultValue={this.props.children}></textarea>
                    </div>
                </div>
            );
    }

    render() {
        if(this.state.edit) {
            return this.showEdit();
        }
        else {
            return this.showTodo();
        }
    }
};



class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                'Never gonna give you up',
                'Never gonna let you down',
                'Never gonna run around and desert you',
                'Never gonna make you cry',
                'Never gonna say goodbye',
                'Never gonna tell a lie and hurt you'
            ]
        };
        this.editTodo = this.editTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.eachTask = this.eachTask.bind(this);
        this.add = this.add.bind(this);
    }

    removeTodo(i) {
        var arr = this.state.tasks;
        arr.splice(i, 1);
        this.setState ({tasks : arr});
    }
    editTodo(todo, i) {
        var arr = this.state.tasks;
        arr[i] = todo;
        this.setState ({tasks: arr});
    }
    eachTask(task, i) {
        return (
            <ToDo key={i} index={i} update={this.editTodo} remove={this.removeTodo}>
                {task}
            </ToDo>
        )
    }
    add(todo) {
      var arr = this.state.tasks;
      arr.push (todo);
      this.setState ({tasks: arr});
    }

    render () {
        return (
            <div>
                <div className="header1">Your to-do list</div>
                <div className="field">
                    {
                        this.state.tasks.map (this.eachTask)
                    }
                </div>
                <button onClick={this.add.bind(null, "New task")} className="btn new"></button>
            </div>
        );
    }
};

ReactDOM.render(
    <List />,
    container
)
