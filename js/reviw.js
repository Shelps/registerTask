var TaskBox = React.createClass({
  displayName: 'TaskBox',
  getInitialState: function(){
    return {data:[]};
  },

  render: function() {
    return React.createElement('div', {
      className: 'taskBox'
    }, React.createElement('h1',null,'Cadastro de Atividades'),
       React.createElement(TaskBoxTable,{data:this.state.data}),
     React.createElement(TaskBoxForm,null));
  }
});

var TaskBoxTable = React.createClass({
  displayName:'TaskBoxTable',
  render: function(){
    return React.createElement('table',{className:'table'},
    React.createElement('thead',null,
    React.createElement('tr',null,
    React.createElement('th',null,'Nome'),
    React.createElement('th',null,'Atividade'),
    React.createElement('th',null,'Ação'))),
    React.createElement('tbody', null, React.createElement(TaskBoxTableRows, null))
  );
  }
});

var TaskBoxForm = React.createClass({
  displayName:'TaskBoxForm',
  render: function(){
    return React.createElement('form', null,
    React.createElement('div',null,
    React.createElement('label',null,'Nome'),
    React.createElement('input'),
    React.createElement('label',null,'Atividade'),
    React.createElement('input')),
    React.createElement('button', null,'OK'));

  }
});

var TaskBoxTableRows = React.createClass({
    displayName:'TaskBoxTableRows',
    render: function () {
        return (
          React.createElement('tr',null,
          React.createElement('td',null,'Italo'),
          React.createElement('td',null,'Desenvolvedor'),
          React.createElement('td',null,'apagar'))
        );
    }
});

ReactDOM.render(React.createElement(TaskBox, {data:[{teste:'teste'}]}),
document.getElementById('container'));
