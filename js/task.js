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

  edtAtividade(i){
    var task = this.state.data[i];
  }

  taskSelecionada(i){
    var taskSel = this.state.data[i];
  }

  render(){
    return (
      <div>
        <h1>Cadastro de Atividades</h1>
        <TaskBoxTable data = {this.state.data} rmAtividade = {this.rmAtividade} />
        <TaskBoxForm addAtividade = {this.addAtividade} form = {this.taskSelecionada} />
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
    this.edtAtividade = this.edtAtividade.bind(this);
  }

  rmAtividade(id){
    this.props.rmAtividade(id)
  }

  edtAtividade(){
    this.props.edtAtividade();
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
          <button onClick = {this.props.rmAtividade.bind(this, this.props.id)}>Apagar</button>
          <button onClick = {this.props.edtAtividade.bind(this, this.props.id)}>Editar</button>
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
  }

  handleNameChange(e){
    this.props.form.name = e.target.value;
  }

  handleAtividadeChange(e){
    this.props.form.atividade = e.target.value;
  }

  onSubmit(e){
    e.preventDefault();
    var nome = this.props.form.name;
    var atividade = this.props.form.atividade;
    this.props.addAtividade({name:nome, atividade:atividade});
  }

  render(){
    console.log(this.props);
    return(
      <form onSubmit = {this.onSubmit}>
        <label>Nome: </label>
        <input
          name="name"
          type="text"
          placeholder="Insira aqui"
          defaultValue = {this.props.form.name}
          onChange= {this.handleNameChange}/>

        <label>Atividade: </label>
        <input
          name="atividade"
          type="text"
          placeholder="Insira aqui"
          defaultValue = {this.props.form.atividade}
          onChange= {this.handleAtividadeChange}/>
        <button name="buttonSubmit" type="submit">OK</button>
      </form>
    )
  }
};

ReactDOM.render(<TaskBox />,
document.getElementById('container'))
