var p = [{id:1, name:'Italo', atividade:'Desenvolvedor'},
        {id:2, name:'Guilherme', atividade:'Desenvolvedor'},
        {id:3, name:'Santos', atividade:'Desenvolvedor'}];

class TaskBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {data:props.data};
    this.addAtividade =  this.addAtividade.bind(this);
    this.rmAtividade = this.rmAtividade.bind(this);
  }

  addAtividade(task){
     var tasks = this.state.data;
     task.id = Date.now();
     var newTasks = tasks.concat([task]);
     this.setState({data:newTasks});
  }

  rmAtividade(id){
    this.state.data.splice(id, 1);
    this.setState({data:this.state.data});
  }

  edtAtividade(){
    console.log('teste edit');
  }

  render(){
    return (
      <div>
        <h1>Cadastro de Atividades</h1>
        <TaskBoxTable data = {this.state.data} rmAtividade = {this.rmAtividade} edtAtividade = {this.edtAtividade}/>
        <TaskBoxForm addAtividade = {this.addAtividade} />
      </div>
    )
  }
};

TaskBox.propTypes = {data: React.PropTypes.array};
TaskBox.defaultProps = {data:p}

class TaskBoxTable extends React.Component{
  constructor(props){
    super(props);
    this.rmAtividade = this.rmAtividade.bind(this);
  }

  rmAtividade(id){
    this.props.rmAtividade(id)
  }

  render(){
    var that = this;
    console.log(this.props);
    this.Task = this.props.data.map(function(data, i){
      return(
        <TaskBoxTableRows
          id = {i}
          name = {data.name}
          key = {data.id}
          atividade = {data.atividade}
          onClick = {that.rmAtividade}/>
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
          <button onClick = {this.props.onClick.bind(this, this.props.id)}>Apagar</button>
          <button onClick = {this.props.onClick.bind(this, this.props.id)}>Editar</button>
        </th>
      </tr>
    )
  }
};

class TaskBoxForm extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAtividadeChange = this.handleAtividadeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {name:'', atividade:''};
  }

  handleNameChange(e){
    this.setState({name:e.target.value})
  }

  handleAtividadeChange(e){
    this.setState({atividade:e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    var nome = this.state.name;
    var atividade = this.state.atividade;
    this.props.addAtividade({name:nome, atividade:atividade});
    this.state = {name:'', atividade:''};
  }

  render(){
    return(
      <form onSubmit = {this.onSubmit}>
        <label>Nome: </label>
        <input
          name="name"
          type="text"
          placeholder="Insira aqui"
          value = {this.state.name}
          onChange= {this.handleNameChange}/>

        <label>Atividade: </label>
        <input
          name="atividade"
          type="text"
          placeholder="Insira aqui"
          value = {this.state.atividade}
          onChange= {this.handleAtividadeChange}/>
        <button name="buttonSubmit" type="submit">OK</button>
      </form>
    )
  }
};

ReactDOM.render(<TaskBox />,
document.getElementById('container'))
