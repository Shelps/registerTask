var p = [{id:1, name:'Italo', atividade:'Desenvolvedor'},
        {id:2, name:'Guilherme', atividade:'Desenvolvedor'},
        {id:3, name:'Santos', atividade:'Desenvolvedor'}];

var updateState = React.addons.update;

class TaskBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:props.data, form:props.form, editing: 0};
    this.addAtividade =  this.addAtividade.bind(this);
    this.rmAtividade = this.rmAtividade.bind(this);
    this.edtAtividade = this.edtAtividade.bind(this);
    this.handlerEdit = this.handlerEdit.bind(this);
  }

  addAtividade(task){
    if(this.state.editing !== 0){
      for (var i in this.state.data) {
        if(this.state.data[i].id === this.state.editing){
            this.state.data[i].name = task.name;
            this.state.data[i].atividade = task.atividade;
            this.state.editing = 0;
            this.setState({data:this.state.data});
        }
      }
    }else{
      var tasks = this.state.data;
      task.id = Date.now();
      var newTasks = tasks.concat([task]);
      this.setState({data:newTasks});
    }
   }

  rmAtividade(id){
    this.state.data.splice(id, 1);
    this.setState({data:this.state.data});
  }

  edtAtividade(task){
    this.setState({editing:task.id, form:{name: task.name, atividade: task.atividade}});
  }

  handlerEdit(data, e){
    var newState = updateState(this.state, {
      form: {[data]: {$set: e.target.value}}
    });

    this.setState(newState);
  }

  render(){
    return (
      <div>
        <h1>Cadastro de Atividades</h1>
        <TaskBoxTable
          data = {this.state.data}
          rmAtividade = {this.rmAtividade}
          edtAtividade = {this.edtAtividade}/>

        <TaskBoxForm
          addAtividade = {this.addAtividade}
          form = {this.state.form}
          handlerEdit = {this.handlerEdit}/>
      </div>
    )
  }
};

TaskBox.propTypes = {data: React.PropTypes.array};
TaskBox.defaultProps = {data:p, form:{name:'',atividade:''}}

class TaskBoxTable extends React.Component{
  constructor(props){
    super(props);
    this.rmAtividade = this.rmAtividade.bind(this);
    this.edtAtividade = this.edtAtividade.bind(this);
  }

  rmAtividade(id){
    this.props.rmAtividade(id)
  }

  edtAtividade(id){
    this.props.edtAtividade(id);
  }

  render(){
    var that = this;
    this.Task = this.props.data.map(function(data, i){
      return(
        <TaskBoxTableRows
          i = {i}
          task = {data}
          id = {data.id}
          name = {data.name}
          key = {data.id}
          atividade = {data.atividade}
          rmAtividade = {that.rmAtividade}
          edtAtividade = {that.edtAtividade}/>
      )
    });
    return(
      <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Atividades</th>
          <th>Ação</th>
        </tr>
      </thead>
        <tbody>
        {this.Task}
        </tbody>
      </table>
    )
  }
};

class TaskBoxTableRows extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <tr>
        <th>{this.props.name}</th>
        <th>{this.props.atividade}</th>
        <th>
          <button onClick = {this.props.rmAtividade.bind(this, this.props.i)}>Apagar</button>
          <button onClick = {this.props.edtAtividade.bind(this, this.props.task)}>Editar</button>
        </th>
      </tr>
    )
  }
};

class TaskBoxForm extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    var nome = this.props.form.name;
    var atividade = this.props.form.atividade;
    this.props.addAtividade({name:nome, atividade:atividade});
    this.props.form.name = '';
    this.props.form.atividade = '';
  }

  render(){
    return(
      <form onSubmit = {this.onSubmit}>
        <label>Nome: </label>
        <input
          name="name"
          type="text"
          placeholder="Insira aqui"
          value = {this.props.form.name}
          onChange= {this.props.handlerEdit.bind(this, "name")}/>

        <label>Atividade: </label>
        <input
          name="atividade"
          type="text"
          placeholder="Insira aqui"
          value = {this.props.form.atividade}
          onChange= {this.props.handlerEdit.bind(this, "atividade")}/>

        <button name="buttonSubmit" type="submit">OK</button>
      </form>
    )
  }
};

ReactDOM.render(<TaskBox />,
document.getElementById('container'))
