import React from 'react';
// import Tabela from './Tabela';

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            cidades: '',
            cidade: ''
        };
    }

    componentDidMount() {
        fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${this.state.nome}`,{method:"GET"}, {
            mode: 'no-cors',
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/xml',
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
            })
        })
        .then(response => response.arrayBuffer())
        .then(buffer => {
            let decoder = new TextDecoder("iso-8859-1");
            return decoder.decode(buffer);
        })
        .then(str => { console.log(str);
            let parser = new window.DOMParser()
            let xml = parser.parseFromString(str, "text/xml");
            let cidades = xml.getElementsByTagName('cidades')[0]; // Obter a tag cidades
            let lista = [];
            cidades.childNodes.forEach((obj, index) => {
                lista.push(obj.childNodes[0].childNodes[0].nodeValue)
            });
  //          console.log(str);
        })
        .catch(erro => console.log(erro) );
    }
    

    changeCidade = event => {
        
    }

    render() {

        return (
            <div>
                <form onSubmit={this.submit} >
                    <div>
                        <label>Nome</label>
                        <input type='text' name='nome' value={this.state.nome}
                            onChange={e => this.setState({
                                nome: e.target.value })
                            }
                        />


                    </div>
                    <div>
                        {this.state.erroMsg}
                    </div>
                </form>

            </div>
        );
   }
}


